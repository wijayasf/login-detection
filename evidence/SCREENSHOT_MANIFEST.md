# Browser Evidence Manifest

Provenance for every shipping raster in `evidence/screenshots/`:

- Creator: `scripts/browser-smoke.mjs`
- Rendering engine: locally installed Google Chrome launched headlessly through Playwright
- Source: the local Next.js prototype at `http://127.0.0.1:3001`
- Capture date: 2026-11-10 (Asia/Jakarta)
- Desktop viewport: 1440×1000
- Desktop-gate viewport: 900×800
- Content: synthetic mock data only; no CCTV frame, provider UI, production record, or external asset
- Post-processing: none

| Files | Purpose |
|---|---|
| `01-*` | Login options and inactive-account rejection |
| `02-*`–`06-*` | Super Admin Monitoring, reports, settings, user lifecycle, logs, diagnostics, and camera reset |
| `07-*` | Route re-evaluation after switching from Super Admin to Operator |
| `08-*`–`10-*` | Maintainer navigation, editable tuning, pending Advanced Settings, and read-only diagnostics |
| `11-*`–`14-*` | Operator operational access, route denial, settings restrictions, and camera-reset restriction |
| `15-*`–`17-*` | Supervisor operational/report access with settings restrictions and no cleanup |
| `18-*` | Simulated session-expired state |
| `19-*` | Desktop-only notice with dashboard absent below 1100px |

The exact executable assertions that precede each capture are in `scripts/browser-smoke.mjs`.
