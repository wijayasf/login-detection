# Product

<!-- impeccable:product-schema 1 -->

> Context source: inferred from the explicit approved Task 5 brief because no structured interview tool was available. Open decisions remain labeled and are not converted into permissions.

## Platform

web

## Stack

Next.js 15.5.29, React 19.1.0, TypeScript 5.7.2; local mock data and client-side simulated sessions. This is a standalone prototype with no backend or deployment.

## Users

Four simulated operational roles evaluate the proposed access model: Super Admin, Maintainer, Operator, and Supervisor. Reviewers include application stakeholders, engineering, QA, and CIT Pusat representatives who will later approve identity-provider and security decisions.

## Product Purpose

Demonstrate how login choices, one-role-per-user sessions, role-aware navigation, protected routes, field-level controls, and administrative states could work around the current Detection Anomaly experience. Success means stakeholders can exercise and review the approved permission matrix without mistaking the prototype for real authentication or backend security.

## Positioning

The prototype applies a single typed permission policy to the real Kiki information architecture, including the important separations between camera enablement, analysis lifecycle, reports, diagnostics, and settings groups.

## Operating Context

Desktop monitoring console used to review mock cameras, detections, reports, configuration, users, logs, and diagnostics. All mutations affect browser-local mock state only. Tablet and mobile widths show a desktop-only notice.

## Capabilities and Constraints

- Four simulated login methods and four active role accounts, plus an inactive account state.
- Central permission keys with `can`, `canAny`, and `canAll` helpers.
- Kiki-style authenticated shell and required pages.
- No OAuth, password validation, FastAPI, database, camera stream, inference, email, or production credential.
- Maintainer access to Advanced Settings remains pending and defaults to denied.
- Production authorization would require independent FastAPI enforcement and integration work.

## Brand Commitments

Detection Anomaly name and the Kiki desktop UI remain authoritative: black/navy surfaces, cool thin borders, restrained blue actions, compact outlined icons, dense operational cards, tables, camera tiles, and persistent sidebar.

## Evidence on Hand

- Original source and Task 1–4C reports at baseline commit `3a2ed8327e296d18cb3a09a5743978785f504e7f`.
- Task 1 Chrome screenshots for Monitoring, Dashboard, Settings, and Camera Detail.
- Approved Task 5 role-permission matrix.
- No production identity provider, CIT policy, tenant configuration, or backend authorization implementation is supplied.

## Product Principles

1. Permission decisions come from keys, never scattered role-name checks.
2. Hidden navigation is not authorization; direct routes are guarded too.
3. Separate visibility, mutation, camera enablement, and analysis lifecycle.
4. Pending is not allowed.
5. Every simulated action states its local-only boundary.

## Accessibility & Inclusion

Keyboard-visible focus, programmatic labels, semantic state text, confirmation for high-impact actions, and readable desktop-only messaging are required. No WCAG conformance claim is made.
