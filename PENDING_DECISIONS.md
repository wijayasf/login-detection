# Pending Decisions

## Maintainer Advanced Settings

Status: **PENDING APPROVAL**.

Current prototype behavior:

- `advanced.settings.read` is denied for Maintainer.
- `advanced.settings.update` is denied for Maintainer.
- The Settings page shows a pending/restricted explanation without revealing values or rendering an enabled mutation control.
- Automated tests require the state to remain `pending`, while `can(...)` remains false.

Required decision before production implementation: confirm whether Maintainer may view, update, both, or neither. Approval must explicitly name the permission(s); general tuning access does not imply Advanced Settings access.

## Production identity provider

Status: **NOT SELECTED**.

Microsoft Entra ID, Google, hybrid provider choice, and email/password are demonstration alternatives only. Selection requires identity ownership, user population, account lifecycle, security, compliance, recovery, and audit requirements outside Task 5.

## Enforcement architecture

Status: **OUTSIDE PROTOTYPE SCOPE**.

Production requires server-side authorization, a trusted identity/session boundary, audit events, policy-change governance, and denial at every backend mutation. This prototype intentionally proves UI behavior only.

## Data retention policy

Status: **NOT DEFINED**.

The Super Admin-only cleanup control simulates confirmation but has no deletion behavior. Retention period, legal hold, audit record, scope preview, and recovery requirements remain unresolved.

## Diagnostic administration

Status: **NOT DEFINED**.

The prototype models `diagnostics.manage` as Super Admin-only and leaves service restart explicitly unimplemented. Production diagnostic actions and operational safeguards require separate definition.
