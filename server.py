#!/usr/bin/env python3
"""Alpha Pod Hub local dev server. Serves SPA + proxies ALL API calls to live backend."""

import http.server
import json
import os
import urllib.request
import urllib.error
import re
import threading

PORT = 3456
STATIC_DIR = "/Users/nav/Documents/GitHub/alphapod-hub"
API_BASE = "https://api.alphapodtrading.com"
TOKEN_FILE = "/tmp/ap_jwt.txt"

MIMES = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.map': 'application/javascript',
}

_token_lock = threading.Lock()

def get_token():
    with _token_lock:
        try:
            with open(TOKEN_FILE) as f:
                t = f.read().strip()
                if t and len(t) > 20:
                    return t
        except Exception:
            pass
        data = json.dumps({"email": "demo@alphapod.dev", "tier": "pro"}).encode()
        req = urllib.request.Request(
            f"{API_BASE}/api/auth/dev-token",
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        resp = urllib.request.urlopen(req, timeout=10)
        result = json.loads(resp.read())
        token = result["access_token"]
        # Atomic write: write to temp file, then rename
        tmp = TOKEN_FILE + ".tmp"
        with open(tmp, "w") as f:
            f.write(token)
        os.rename(tmp, TOKEN_FILE)
        print("[server] Got fresh JWT")
        return token

# Inject this script before </head> in HTML files to redirect API calls to our proxy
PROXY_SCRIPT = """
<script>
(function() {
  var API = 'https://api.alphapodtrading.com';
  var PX  = '/api-proxy';
  // Rewrite fetch
  var _fetch = window.fetch;
  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.startsWith(API)) {
      url = PX + url.slice(API.length);
    } else if (url && url.url && url.url.startsWith(API)) {
      url = new Request(PX + url.url.slice(API.length), url);
    }
    return _fetch.call(this, url, opts);
  };
  // Rewrite XMLHttpRequest
  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(m, url) {
    if (typeof url === 'string' && url.startsWith(API)) {
      url = PX + url.slice(API.length);
    }
    return _open.apply(this, arguments);
  };
  // Rewrite EventSource (SSE)
  var _ES = window.EventSource;
  window.EventSource = function(url, opts) {
    if (typeof url === 'string' && url.startsWith(API)) {
      url = PX + url.slice(API.length);
    }
    return new _ES(url, opts);
  };
})();
</script>
"""


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        return MIMES.get(ext, super().guess_type(path))

    def send_header(self, keyword, value):
        # Track whether an ACAO header has already been emitted for this
        # response so end_headers() doesn't add a duplicate (browsers reject
        # responses carrying two Access-Control-Allow-Origin values).
        if keyword.lower() == "access-control-allow-origin":
            self._acao_sent = True
        super().send_header(keyword, value)

    def end_headers(self):
        # Defense-in-depth: ensure EVERY response (including static files served
        # by SimpleHTTPRequestHandler) carries an ACAO header, but only once.
        if not getattr(self, "_acao_sent", False):
            super().send_header("Access-Control-Allow-Origin", "*")
        self._acao_sent = False
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?")[0]

        # Proxy ALL API calls (original /api/ and our /api-proxy/ rewrite)
        if path.startswith("/api/") or path.startswith("/api-proxy/"):
            self.proxy_api("GET")
            return

        # Check if file exists
        local = os.path.join(STATIC_DIR, path.lstrip("/"))
        if os.path.isfile(local):
            # For HTML files, inject the proxy script
            if path.endswith(".html") or path == "/":
                self.serve_html_with_proxy(local)
                return
            super().do_GET()
            return

        # SPA fallback
        local_index = os.path.join(STATIC_DIR, "index.html")
        if os.path.exists(local_index):
            self.serve_html_with_proxy(local_index)
        else:
            super().do_GET()

    def serve_html_with_proxy(self, filepath):
        """Serve HTML file with proxy script injected before </head>."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                html = f.read()
            # Inject proxy script before </head>
            if '</head>' in html:
                html = html.replace('</head>', PROXY_SCRIPT + '</head>')
            elif '</body>' in html:
                html = html.replace('</body>', PROXY_SCRIPT + '</body>')
            else:
                html = PROXY_SCRIPT + html
            data = html.encode('utf-8')
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

    def do_POST(self):
        path = self.path.split("?")[0]
        if path.startswith("/api/") or path.startswith("/api-proxy/"):
            self.proxy_api("POST")
            return
        if path == "/capture":
            self.handle_capture()
            return
        self.send_error(404)

    MAX_CAPTURE_BYTES = 10 * 1024 * 1024  # 10MB limit

    def handle_capture(self):
        """Save captured HTML pages to disk."""
        length = int(self.headers.get("Content-Length", 0))
        if length > self.MAX_CAPTURE_BYTES:
            msg = json.dumps({"error": f"Payload too large ({length} > {self.MAX_CAPTURE_BYTES})"}).encode()
            self.send_response(413)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(msg)
            return
        body = self.rfile.read(length) if length > 0 else b"{}"
        try:
            data = json.loads(body)
            name = data.get("name", "unknown")
            html = data.get("html", "")
            # Sanitize name: allow only alphanumeric, hyphens, underscores
            safe_name = "".join(c for c in name if c.isalnum() or c in "-_")
            if not safe_name:
                safe_name = "unknown"
            outdir = os.path.join(STATIC_DIR, "captured")
            os.makedirs(outdir, exist_ok=True)
            outpath = os.path.join(outdir, f"{safe_name}.html")
            with open(outpath, "w", encoding="utf-8") as f:
                f.write(html)
            size_kb = len(html) / 1024
            print(f"[capture] Saved {safe_name}.html ({size_kb:.1f} KB)")
            resp = json.dumps({"ok": True, "name": safe_name, "size_kb": round(size_kb, 1)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(resp)
        except Exception as e:
            msg = json.dumps({"error": str(e)}).encode()
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(msg)

    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def proxy_api(self, method):
        path = self.path
        # Strip /api-proxy/ prefix back to /api/
        if path.startswith("/api-proxy"):
            path = path[len("/api-proxy"):]  # /api-proxy/X -> /X
        
        body = None
        if method == "POST":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length) if length > 0 else None
        
        try:
            token = get_token()
            url = f"{API_BASE}{path}"
            req = urllib.request.Request(url, data=body, method=method)
            req.add_header("Authorization", f"Bearer {token}")
            if body:
                req.add_header("Content-Type", "application/json")
            resp = urllib.request.urlopen(req, timeout=30)
            data = resp.read()
            self.send_response(resp.status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except urllib.error.HTTPError as e:
            data = e.read()
            self.send_response(e.code)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            msg = json.dumps({"error": str(e)}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(msg)

    def log_message(self, fmt, *args):
        print("[http]", fmt % args)


if __name__ == "__main__":
    try:
        get_token()
        print("[server] JWT ready")
    except Exception as e:
        print(f"[server] Token warning: {e}")
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    server.daemon_threads = True
    print(f"[server] Alpha Pod Hub at http://localhost:{PORT}")
    print(f"[server] API proxy: /api/* -> {API_BASE}/api/*")
    print("[server] HTML files get auto-injected fetch interceptor")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
