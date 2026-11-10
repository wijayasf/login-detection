# UI Component Mapping

This prototype extends the established Kiki visual and interaction language without modifying the original Detection Anomaly repository.

| Original Kiki concept | Standalone prototype implementation | RBAC addition |
|---|---|---|
| Persistent dark navigation | `components/shell/AppShell.tsx` | Navigation entries are derived from central permissions; identity and role are always visible |
| Monitoring camera wall | `MonitoringView.tsx` | Camera CRUD, availability, and analysis lifecycle are independently gated |
| Camera detail and evidence | `CameraDetailView.tsx` | Evidence remains operational; tuning and reset-to-default use separate controls |
| Dashboard/history | `DashboardView.tsx` | Route is report-gated; export is separate; cleanup appears only for Super Admin |
| Settings groups | `SettingsView.tsx` | Objects/display, tuning, and Advanced Settings expose allowed, denied, or pending states |
| Operational status tables | `ProcessLogsView.tsx` and `DiagnosticsView.tsx` | Logs are read-only; Maintainer diagnostics viewing does not grant management |
| Compact Kiki controls | Shared `Icon`, `ConfirmDialog`, `Toast`, and CSS tokens | High-impact simulated actions use confirmation and explicit local-only copy |
| No existing login shell | `LoginView.tsx` | Four neutral simulated methods and active/inactive demo-account behavior |
| No existing user administration | `UserManagementView.tsx` | Super Admin-only lifecycle UI with exactly one role selector per user |

All media tiles are local SVG mock frames. All tables and metrics use authored synthetic data. No original component is imported across repositories and no original source file is modified.
