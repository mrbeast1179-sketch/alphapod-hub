# Alpha Pod Hub — Complete Clone

A full clone of [hub.alphapodtrading.com](https://hub.alphapodtrading.com) — a professional options flow monitoring dashboard.

## Quick Start

```bash
cd /Users/nav/GitHub/hub-alphapodtrading
python3 server.py
# → http://localhost:3456
# Click SIGN IN (uses demo@alphapod.dev / pro tier)
```

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **API Data** | 2,148+ JSON files | 48.5MB cached from live backend |
| **Tickers** | 278 | Deep-dive data for all supported tickers |
| **Technical Analysis** | 253 | Per-ticker TA indicators |
| **Chart Data** | 948 | Daily/Weekly/Monthly OHLCV for all tickers |
| **Flow Alerts** | 167 pages | Complete paginated alerts |
| **GEX Data** | 408 files | SPX Gamma Exposure DTE 0–365 |
| **Alpha Flow** | 37 files | All 30 historical dates + latest |
| **Flow Digest** | 17 files | Historical + latest |
| **Captured HTML** | 16 pages | Rendered SPA pages with real data |
| **Placeholder Pages** | 7 pages | Mock data for unreleased features |
| **Comparison Report** | 1 | Side-by-side clone vs live analysis |

## Pages (15 routes, all HTTP 200)

### Data-Rich (6 pages)
- **Flow Alerts** — Real-time unusual options activity table
- **Alpha Flow** — Sector heatmaps + top 10 trades
- **Daily Report** — Flow digest with Hit List
- **SPX GEX** — Gamma Exposure chart + King Nodes
- **Ticker Analysis** — Deep-dive charts, Greeks, options flow (e.g. /t/NVDA)
- **Earnings** — Earnings calendar

### Mock Pages (7 pages)
- Dashboard, Heatmaps, Key Levels, SPX Alerts, Signals, Trade Log, Performance
- These features are "Coming in a later phase" on the live site
- We've built mock pages with realistic sample data

## Architecture

```
React SPA (Vite) + FastAPI backend
├── Frontend: Single index.html → index-CFbq_e3t.js (784KB)
├── Backend: https://api.alphapodtrading.com (proxied)
├── Auth: JWT via /api/auth/dev-token (demo tier)
└── SSE: Real-time alerts at /api/alerts/stream
```

## Server Features

- **ThreadingHTTPServer** — Multi-threaded for concurrent requests
- **SPA routing** — All routes fall back to index.html
- **API proxy** — `/api/*` forwards to live backend with auto-JWT
- **Fetch interceptor** — Injected into HTML rewrites API calls to proxy
- **HTML capture** — POST `/capture` saves rendered pages to `captured/`
- **MIME types** — Proper font/asset content types
- **CORS** — OPTIONS preflight handler
- **Security** — Token locking (atomic writes), path traversal sanitization, 10MB payload limit

## API Endpoints (14 total)

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/dev-token` | Dev login |
| `POST /api/auth/sse-token` | SSE stream token |
| `GET /api/alerts` | Paginated alerts (15+ filter params) |
| `GET /api/alerts/{id}` | Single alert detail |
| `SSE /api/alerts/stream` | Real-time alert push |
| `GET /api/alpha-flow` | Latest alpha flow |
| `GET /api/alpha-flow?date={date}` | Dated alpha flow |
| `GET /api/alpha-flow/dates` | Available dates |
| `GET /api/flow-digest` | Latest digest |
| `GET /api/flow-digest?date={date}` | Dated digest |
| `GET /api/deep-dive/{TICKER}` | Ticker overview |
| `GET /api/deep-dive/{TICKER}/ta` | Technical analysis |
| `GET /api/deep-dive/{TICKER}/chart?timeframe={1D\|1W\|1M}` | Chart data |
| `GET /api/gex/spx?dte={0-365}` | SPX GEX by DTE |

## Repository

```
├── api-data/          # 2,148+ API data snapshots (48.5MB)
├── archive/           # tickers-complete.json + api-manifest.json
├── captured/          # 16 rendered HTML captures
├── screenshots/       # Live + clone comparison screenshots
├── assets/            # 14 JS/CSS production files
├── fonts/             # 19 font files (WOFF2 + CSS)
├── server.py          # Local dev server (274 lines)
├── index.html         # SPA entry point
├── COMPARISON-REPORT.html  # Clone vs live comparison
├── README.md          # This file
├── .nojekyll          # GitHub Pages
└── _config.yml        # GitHub Pages config
```

## GitHub Pages

Deployed at: https://jattmoosewala5911.github.io/hub-alphapodtrading/

## Last Verified

June 1, 2026 — All 15 routes HTTP 200, API proxy working, static assets serving, GitHub Pages live.
