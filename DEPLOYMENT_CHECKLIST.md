# Deployment Checklist — Detection Anomaly RBAC Prototype

Status vocabulary: **PASSED**, **FAILED**, **BLOCKED**, **NOT_TESTED**.

## Source and account safety

- **PASSED** — GitHub CLI account is `wijayasf`.
- **PASSED** — Authorized public repository exists and was empty before publication.
- **PASSED** — Prototype source is isolated from the original Detection Anomaly repository.
- **PASSED** — Public-content review found only fictitious identities and synthetic operational data.
- **PASSED** — No environment file, database, secret, token, private key, private endpoint, or real CCTV URL is in the publication set.
- **PASSED** — `.gitignore` excludes dependencies, build outputs, `.env*`, local secrets, caches, and temporary evidence outputs.
- **PASSED** — Visible no-real-authentication warning and browser-only authorization limitation are documented.

## Static deployment compatibility

- **PASSED** — `output: "export"`, trailing slash, and unoptimized-image settings are present.
- **PASSED** — Base path is configurable and set once at build time.
- **PASSED** — Local development remains prefix-free.
- **PASSED** — GitHub Pages export uses `/login-detection` without duplication.
- **PASSED** — Direct-route HTML and framework assets resolve under the project path.
- **PASSED** — No required server actions, API routes, middleware, OAuth callback, FastAPI service, or database exists.

## Pre-push gates

- **PASSED** — TypeScript verification.
- **PASSED** — 4 unit-test files / 20 tests.
- **PASSED** — Static Pages build / 15 routes.
- **PASSED** — Export output and expected files.
- **PASSED** — 27-scenario local browser smoke / 4 roles / 0 console errors.
- **PASSED** — Session-expiry return, logout return, and desktop-only notice.
- **PASSED** — Representative screenshots visually reviewed.

## Git and workflow

- **PASSED** — Exact staged publication set reviewed (123 paths); forbidden outputs and secret patterns absent.
- **NOT_TESTED** — Initial commit created on `main` with approved author identity.
- **PASSED** — `origin` configured to the authorized repository; remote confirmed empty immediately before commit.
- **NOT_TESTED** — Non-force push to `origin/main` completed.
- **NOT_TESTED** — Pages publishing source configured as GitHub Actions.
- **NOT_TESTED** — GitHub Actions build and deployment jobs succeeded.

## Public website

- **NOT_TESTED** — Root and `/login/` return HTTP 200.
- **NOT_TESTED** — JavaScript, CSS, and icon assets load without unexpected 404s.
- **NOT_TESTED** — No base-path duplication or redirect loop.
- **NOT_TESTED** — Super Admin experience.
- **NOT_TESTED** — Maintainer restrictions and Advanced Settings pending/denied state.
- **NOT_TESTED** — Operator restrictions.
- **NOT_TESTED** — Supervisor reports and restrictions.
- **NOT_TESTED** — Camera Detail and User Management demonstrations.
- **NOT_TESTED** — Direct URL reload, logout, session expiry, Return to Login, and desktop notice.
- **NOT_TESTED** — Public browser run has zero critical console errors.
- **NOT_TESTED** — Public screenshots captured with synthetic data only.

## Final integrity

- **NOT_TESTED** — Original repository branch and HEAD match the recorded baseline.
- **NOT_TESTED** — Original tracked working tree remains unchanged.
- **NOT_TESTED** — Original `.env` SHA-256 remains unchanged.
- **NOT_TESTED** — Original `data/monitoring.db` SHA-256 remains unchanged.

## Accepted advisory

- **PASSED with documented exception** — No critical npm advisory; two transitive PostCSS advisories remain (one moderate, one high). Their supported automatic remediation requires a separately reviewed Next 16 major upgrade.
