# Detection Anomaly — Standalone RBAC Interactive Prototype

Public, desktop-first Next.js prototype for reviewing login alternatives, one-role-per-user RBAC, role-aware navigation, protected routes, field-level settings access, and high-impact action controls.

- Repository: [github.com/wijayasf/login-detection](https://github.com/wijayasf/login-detection)
- Published demo: [wijayasf.github.io/login-detection](https://wijayasf.github.io/login-detection/)

This is not a production application. It does not connect to Microsoft Entra ID, Google, FastAPI, a database, CCTV, inference, email, or a credential store. Sessions and mutations are browser-local demonstrations. Do not enter real credentials.

## Quick start

Requirements:

- macOS or another desktop environment
- Node.js 22 or newer (verified with `v26.3.0`)
- npm 11 or newer (verified with `11.16.0`)
- viewport width of at least 1100px

From a fresh terminal:

```bash
cd /Users/wijaysali/Projects/detection-anomaly-rbac-prototype
npm install
npm run dev -- -p 3001
```

Open [http://localhost:3001/login](http://localhost:3001/login). Use only the displayed demo accounts. The four active accounts cover Super Admin, Maintainer, Operator, and Supervisor; an inactive account is included to demonstrate rejection.

To stop the application, return to the terminal running Next.js and press `Ctrl+C`. To restart it, run `npm run dev -- -p 3001` again. All in-memory page edits reset on refresh; the simulated session remains in browser `localStorage` until logout or expiry.

## Verification commands

```bash
npm run typecheck
npm test
npm run build
npm run build:pages
```

`npm run smoke` is used after the local server is running and captures browser evidence under `evidence/screenshots/`.

To exercise the exact GitHub Pages project path locally:

```bash
npm run build:pages
npm run serve:export
# In another terminal:
npm run smoke:pages
```

Open [http://127.0.0.1:3002/login-detection/](http://127.0.0.1:3002/login-detection/). Stop the exported-site server with `Ctrl+C`.

## GitHub Pages deployment

Pushing `main` starts `.github/workflows/deploy-pages.yml`. The workflow uses Node.js 22, installs the lockfile with `npm ci`, runs TypeScript and unit-test gates, creates a static export, validates `out/`, and deploys the artifact through the GitHub Pages environment. It can also be started manually from **Actions → Verify and deploy GitHub Pages → Run workflow**.

`NEXT_PUBLIC_BASE_PATH` controls project hosting. Local development leaves it empty; the Pages workflow sets it to `/login-detection`. Next.js applies that prefix to framework navigation and assets at build time. Do not add `/login-detection` to component links manually.

This repository does not need deployment secrets. GitHub's short-lived Pages identity is granted only `pages: write` and `id-token: write` in the deployment job; other workflow access remains read-only.

## Prototype architecture

- `domain/rbac.ts` — single permission vocabulary, role matrix, pending-decision metadata, and policy helpers.
- `application/` — permission-derived navigation, route mapping, and settings-section policy.
- `infrastructure/` — fictitious accounts, synthetic operational data, and local session serialization.
- `providers/PrototypeProvider.tsx` — browser-local session state and role-switch testing operations.
- `components/auth/` — desktop gate and authenticated route boundary.
- `components/shell/` — Kiki-derived navigation shell and explicit role-testing tool.
- `components/views/` — login, operational, reporting, settings, administration, and restricted-state surfaces.
- `app/` — Next.js App Router entry points; production build uses static export.

The prototype intentionally separates:

- camera registration enable/disable from analysis start/stop/restart;
- operational evidence from global reports/history;
- diagnostic viewing from diagnostic mutation;
- ordinary camera update from reset-to-default;
- settings object/display controls from tuning and Advanced Settings.

## Role behavior

- Every user has exactly one role.
- Every role can use Monitoring, video analysis, camera CRUD and availability, analysis lifecycle, evidence, object detection settings, and display settings.
- Super Admin and Maintainer can tune detection and read sanitized process logs.
- Super Admin, Maintainer, and Supervisor can view/filter/export global reports.
- Only Super Admin can manage users, clean retention history, manage diagnostics, reset a camera to default, or update Advanced Settings.
- Maintainer diagnostics are read-only.
- Maintainer Advanced Settings remains **PENDING APPROVAL** and therefore denied.
- Operator has no Dashboard, reports, logs, tuning, diagnostics, user management, or cleanup access.

See [RBAC_MATRIX.md](./RBAC_MATRIX.md) for the complete policy and [PERMISSION_CHECKLIST.md](./PERMISSION_CHECKLIST.md) for verification evidence.

## Login and session testing

The login page demonstrates four non-production alternatives: Microsoft Entra ID, Google, a hybrid Microsoft/Google choice, and fictitious email/password. No provider selection is recommended or implied. See [LOGIN_OPTIONS.md](./LOGIN_OPTIONS.md).

After login, open **Role testing tool — not production** at the bottom of the sidebar to switch active demo accounts or simulate expiry. If a role switch makes the current route unauthorized, the prototype redirects to Access Denied.

Suggested public-demo walkthrough:

1. Sign in as **Super Admin** to review the Dashboard, User Management, diagnostics, camera reset, reports, and all settings.
2. Switch to **Maintainer** to confirm diagnostic mutation is denied and Advanced Settings remains **PENDING APPROVAL** and unavailable.
3. Switch to **Operator** to confirm the operational-only navigation and denied Dashboard, reports, tuning, logs, diagnostics, and administration routes.
4. Switch to **Supervisor** to review global reports while confirming tuning, diagnostics, administration, and Advanced Settings remain denied.
5. Use **Simulate session expiry**, **Return to Login**, and **Logout** to exercise browser-local session behavior.

## Public demo safety

All accounts, people, cameras, events, logs, evidence, and exports are fictitious or synthetic. The published bundle contains no `.env` file, database, API key, access token, private endpoint, real CCTV stream, corporate email, or customer/employee record. The original Detection Anomaly application and its internal audit material are not part of this repository.

**Prototype Mode — No Real Authentication.** Client-side route guards and permission checks are demonstration behavior, not a security boundary. The application has no OAuth exchange, backend, API route, server action, middleware, FastAPI connection, database connection, or persistent authorization enforcement. Never enter real credentials or operational data.

## Logs and troubleshooting

Next.js logs appear in the terminal running `npm run dev -- -p 3001`. The Process Logs page contains authored synthetic records; it never reads system or application log files.

- Port already in use: run `lsof -nP -iTCP:3001 -sTCP:LISTEN`, stop only the process you own, then restart.
- Desktop-only notice: widen the browser viewport to at least 1100px. The dashboard is deliberately not rendered below that width.
- Stale role/session: use Logout, clear only the site data for `localhost:3001`, or use the role-testing tool.
- Dependency mismatch: remove no files from the original Kiki project. In this standalone directory, rerun `npm install`, then the three verification commands.
- Access denied after switching roles: this is expected when the new role lacks the current route permission; return through an allowed sidebar item.

## Updating safely

This directory is an independent Git repository. To update it safely, first preserve local work, run `git status`, confirm `origin` is `https://github.com/wijayasf/login-detection.git`, then fetch and inspect before fast-forwarding:

```bash
cd /Users/wijaysali/Projects/detection-anomaly-rbac-prototype
git status --short
git remote -v
git fetch origin
git log --oneline --decorate --graph HEAD..origin/main
git merge --ff-only origin/main
```

Never run this workflow in `/Users/wijaysali/Projects/detection-anomaly`.

## Known limitations

- No security boundary exists: UI hiding and route guards are prototype behavior, not server authorization.
- Refresh resets page-local camera/user/settings edits.
- CSV export contains synthetic records.
- `npm audit` currently reports two transitive PostCSS advisories through Next 15 (one moderate, one high). npm recommends a Next 16 major upgrade; that framework migration is deferred to a separately reviewed change because this fidelity prototype is verified on Next 15.5.29.
- No mobile/tablet experience is implemented.
