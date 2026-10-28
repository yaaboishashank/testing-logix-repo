# LOGIX test repository

Small Node.js ES6 backend with local simulated operations. No database, API keys,
network services or npm dependencies required. Node.js 22 or newer.

## Run

```bash
npm start
```

Open http://localhost:3100/health. The port avoids LOGIX's backend port 3000.
All demo endpoints use GET and do not create real orders, send email, or upload data.

Available endpoints:

- /v1/order and /v2/order
- /v1/catalog and /v2/catalog
- /v1/receipt and /v2/receipt
- /v1/stock and /v2/stock
- /v1/backup and /v2/backup
- /v2/report

Add `?fail=1` to simulate an operation failure (HTTP 503).
Without it, the operation succeeds (HTTP 200).

This is an intentionally simplified testing fixture, not a production backend.
