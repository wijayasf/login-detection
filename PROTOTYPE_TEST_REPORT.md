# Prototype Test Report

Date: 2026-11-10 (Asia/Jakarta)

## Automated results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | PASS | `npm run typecheck`, exit 0 |
| RBAC/unit tests | PASS | `npm test`: 4 files, 20 tests |
| Next.js production/static build | PASS | `npm run build`: 15 static routes generated with Next.js 15.5.29 (including the local SVG app icon) |
| Dependency audit | PARTIAL | Critical findings eliminated; two transitive PostCSS findings remain (1 moderate, 1 high), requiring a Next 16 major upgrade per npm |

Automated tests cover the shared operational baseline, camera/analysis permission separation, reports, tuning/logs, Super Admin-only mutations, Maintainer pending Advanced Settings, role-derived navigation, protected routes, settings-group states, one-role-per-user demo accounts, inactive-account rejection, local session persistence, malformed storage, and expiry boundaries.

## Browser results

| Check | Result | Evidence |
|---|---|---|
| Local readiness | PASS | Next.js served the prototype on port 3001; `/login/` returned HTTP 200 after canonical redirect |
| Four-role permission smoke | PASS | `npm run smoke`: `BROWSER_SMOKE_PASS screenshots=26 roles=4 console_errors=0` |
| Login and inactive account | PASS | `evidence/screenshots/01-login-options-inactive-rejection.png` |
| Role navigation and direct-route protection | PASS | Browser assertions plus screenshots `02`, `07`, `08`, `11`, `12`, `15` |
| High-impact confirmations/restrictions | PASS | Retention cleanup, user lifecycle, diagnostic manage/read-only, camera reset, and restricted alternatives exercised |
| Settings field states | PASS | Top and Advanced Settings captures for all four roles; Maintainer pending values/control absent |
| CSV export | PASS | Browser download event, filename `prototype-detections.csv`; contents derive from synthetic records |
| Session expiry | PASS | `18-session-expired.png` |
| Desktop-only gate | PASS | 900×800 viewport; dashboard heading absent; `19-desktop-only-notice.png` |
| Browser console/network | PASS | Zero console errors and zero HTTP errors in the final run |
| Dialog keyboard behavior | PASS | Initial focus, focus wrap, Escape close, and trigger-focus restoration asserted for the camera form and reset confirmation |
| Visual QA | PASS | Every one of the 26 screenshots opened and inspected; no clipping of required evidence, overlap, broken hierarchy, or hidden dashboard below breakpoint |

See `PERMISSION_CHECKLIST.md` and `evidence/SCREENSHOT_MANIFEST.md` for the requirement-to-evidence mapping and raster provenance.

## Scope exclusions

No real authentication, token validation, FastAPI call, database operation, CCTV/media request, inference job, email, provider redirect, production log read, commit, push, PR, or deployment is part of these checks.
