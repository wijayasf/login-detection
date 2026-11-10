# Deployment Report — Detection Anomaly RBAC Prototype

## Publication target

- GitHub account: `wijayasf` (verified with `gh api user`)
- Repository: `https://github.com/wijayasf/login-detection.git`
- Branch: `main`
- Published URL: `https://wijayasf.github.io/login-detection/`
- Login URL: `https://wijayasf.github.io/login-detection/login/`
- Commit SHA: **PENDING — Git repository initialization**
- Workflow run: **PENDING — first push**
- Deployment status: **PENDING**

## Deployment design

The Next.js 15 App Router application remains a fully static client-side prototype. `next.config.mjs` reads `NEXT_PUBLIC_BASE_PATH`; development uses no prefix, while GitHub Actions builds with `/login-detection`. Static export, trailing-slash routing, and unoptimized images are retained for GitHub Pages compatibility.

`.github/workflows/deploy-pages.yml` uses GitHub's official Pages actions. It installs with `npm ci`, runs TypeScript verification and unit tests, exports and validates `out/`, uploads one Pages artifact, and deploys through the `github-pages` environment. No repository secrets or third-party deployment service are required.

## Public safety review

**PASSED before Git initialization.** The publication set contains only fictitious demo identities and synthetic cameras, events, logs, screenshots, and exports. No `.env` files, SQLite databases, credentials, tokens, private keys, real corporate email addresses, private network endpoints, real CCTV URLs, server APIs, or copied original-application source were found.

The application retains the visible warning **“Prototype Mode — No Real Authentication.”** Its route guards and RBAC controls run in the browser and must not be interpreted as production authorization.

## Pre-push verification

| Gate | Result | Evidence |
| --- | --- | --- |
| TypeScript | PASSED | `npm run typecheck` |
| Unit tests | PASSED | 4 files, 20 tests |
| Pages static build | PASSED | `npm run build:pages`; 15 static routes |
| Export structure | PASSED | `out/index.html`, `out/login/index.html`, and `out/_next/` present |
| Base-path assets | PASSED | Generated HTML references `/login-detection/_next/...`; no duplicate prefix found |
| Local Pages-path browser smoke | PASSED | 27 screenshots; 4 roles; 0 console errors |
| Session expiry and logout | PASSED | Return-to-login and explicit logout scenarios verified |
| Desktop-only notice | PASSED | Narrow viewport renders the designed desktop notice |

Representative local evidence is stored in `evidence/pages-local-screenshots/`.

## Public verification

Pending the authorized initial push and GitHub Pages workflow. This section must be updated with the workflow URL, deployed commit, HTTP/asset checks, role smoke result, and public screenshot location before Task 6 is marked complete.

## Dependency review

`npm audit` reports two non-critical transitive PostCSS advisories through Next 15: one moderate and one high. The npm-supported automatic resolution requires a Next 16 major upgrade, which is intentionally deferred to a separately reviewed framework migration. No critical advisory is reported.

## Recovery / resume

```bash
cd /Users/wijaysali/Projects/detection-anomaly-rbac-prototype
sed -n '1,260p' TASK6_STATUS.md
git status --short --branch 2>/dev/null || true
gh auth status
gh run list --repo wijayasf/login-detection --workflow deploy-pages.yml --limit 5
```

Resume only the first unfinished step recorded in `TASK6_STATUS.md`. Never force-push or perform prototype deployment work inside `/Users/wijaysali/Projects/detection-anomaly`.
