# Alpha Pod Hub

Local clone of the Alpha Pod Trading website (hub.alphapodtrading.com).

## Quick Start

```bash
python3 server.py
# → http://localhost:3456
```

## What's Included

- **SPA shell**: React app with all JS/CSS bundles (17 assets)
- **API proxy**: All `/api/*` calls forwarded to live backend with JWT auth
- **Captured pages**: 17 HTML pages captured from live site
- **Trinity + Heatseeker**: Legacy pages served as iframes from floww backend

## Architecture

```
Browser → localhost:3456 (this server)
  ├── /           → index.html (SPA shell with proxy injection)
  ├── /assets/*   → JS/CSS bundles
  ├── /api/*      → proxy → api.alphapodtrading.com (with JWT)
  ├── /trinity    → iframe → floww backend (localhost:3000)
  ├── /heatseeker → iframe → floww backend (localhost:3000)
  └── /captured/* → static HTML captures from live site
```

## Trinity + Heatseeker

These are legacy pages from the floww project. They require the floww dev server running:

```bash
cd /Users/nav/Documents/GitHub/floww/frontend && npm start
# → http://localhost:3000
```

The iframe pages will auto-detect the backend and show an error if it's not running.

## API Data

Live alerts data captured from the API:
- `api-data/alerts-live-p1-fresh.json` — real-time alerts feed
- `api-data/alerts-by-premium.json` — sorted by premium
- `api-data/alerts-by-size.json` — sorted by size

## Credits

- Original site: https://hub.alphapodtrading.com
- API: https://api.alphapodtrading.com
- Trinity/Heatseeker: floww project (Confluence Decoder)
