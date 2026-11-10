# Permission Verification Checklist

Final executable review matrix for the local prototype. “Visible” distinguishes an actionable control from a restricted explanation or hidden navigation. “Enabled” applies to the mutation control, not the explanatory panel.

| Role | Page | Action | Permission | Visible | Enabled | Expected behavior | Result | Evidence |
|---|---|---|---|---|---|---|---|---|
| Unauthenticated | Login | Choose any of four demo methods | N/A | Yes | Yes | Demonstrate alternatives without provider request or provider choice | PASS | `01-login-options-inactive-rejection.png`; browser smoke |
| Inactive demo | Login | Sign in | Session precondition | Yes | No effective sign-in | Show rejection and create no session | PASS | `session.test.ts`; `01-login-options-inactive-rejection.png` |
| Super Admin | Monitoring | Camera create/update/delete | `camera.create/update/delete` | Yes | Yes | Mutate React state only | PASS | `rbac.test.ts`; `02-super-admin-monitoring.png`; browser smoke created a camera |
| Super Admin | Monitoring | Camera enable/disable | `camera.enable/disable` | Yes | Yes | Change availability independently from analysis | PASS | Browser smoke toggled Gate Utama availability |
| Super Admin | Monitoring | Analysis start/stop/restart | `analysis.start/stop/restart` | Yes | Yes | Change processing state independently from camera availability | PASS | Browser smoke stopped and restarted Gate Utama analysis |
| Super Admin | Camera Detail | Read operational evidence | `evidence.read` | Yes | Yes | Open local synthetic replay | PASS | `rbac.test.ts`; `06-super-admin-camera-reset-confirmation.png` |
| Super Admin | Camera Detail | Reset camera defaults | `camera.reset_default` | Yes | Yes | Open keyboard-correct confirmation; change no configuration | PASS | `06-super-admin-camera-reset-confirmation.png`; keyboard smoke |
| Super Admin | Dashboard | Read/filter/export reports | `reports.read/export` | Yes | Yes | Render synthetic global reports and download local CSV | PASS | `03-super-admin-dashboard.png`; CSV download assertion |
| Super Admin | Dashboard | Retention cleanup | `history.cleanup` | Yes | Yes | Confirm simulation and delete no record | PASS | Browser smoke confirmation and local-only toast |
| Super Admin | Settings | Objects/display | `detect.objects.update`, `display.settings.update` | Yes | Yes | Edit local state | PASS | `04-super-admin-settings.png` |
| Super Admin | Settings | Detection tuning | `detection.tuning.update` | Yes | Yes | Enable sensitivity/cadence controls | PASS | `settingsPolicy.test.ts`; `04b-super-admin-settings-advanced.png` |
| Super Admin | Settings | Advanced Settings | `advanced.settings.update` | Yes | Yes | Expose synthetic runtime profile | PASS | `04b-super-admin-settings-advanced.png` |
| Super Admin | User Management | Create/edit/assign one role/activate/deactivate/reset | `users.*` | Yes | Yes | Mutate local rows only; exactly one role selector | PASS | `05-super-admin-user-management.png`; `05a-super-admin-user-lifecycle.png` |
| Super Admin | Process Logs | Read sanitized logs | `process.logs.read` | Yes | Read-only | Render authored static entries only | PASS | `05b-super-admin-process-logs.png` |
| Super Admin | Diagnostics | Read/manage | `diagnostics.read/manage` | Yes | Yes | Run local health-check simulation; contact no service | PASS | `05c-super-admin-diagnostics-manage.png` |
| Maintainer | Monitoring / Camera | Operational camera, analysis, evidence | Common operational set | Yes | Yes | Same local operational controls as approved roles | PASS | `08-maintainer-monitoring.png`; `rbac.test.ts` |
| Maintainer | Dashboard | Read/filter/export reports | `reports.read/export` | Yes | Yes | Render/export synthetic reports | PASS | `navigation.test.ts`; browser nav assertion |
| Maintainer | Dashboard | Retention cleanup | `history.cleanup` | No | No | Control absent | PASS | `rbac.test.ts` |
| Maintainer | Settings | Objects/display/tuning | Respective update permissions | Yes | Yes | Objects/display and tuning editable | PASS | `09-maintainer-settings-pending.png`; browser slider assertion |
| Maintainer | Settings | Advanced Settings | `advanced.settings.read/update` | Restricted panel | No | Show **PENDING APPROVAL**; expose no value/control | PASS | `rbac.test.ts`; `09b-maintainer-settings-advanced-pending.png` |
| Maintainer | Process Logs | Read sanitized logs | `process.logs.read` | Yes | Read-only | Render authored entries only | PASS | Maintainer nav assertion; `rbac.test.ts` |
| Maintainer | Diagnostics | Read summary | `diagnostics.read` | Yes | Read-only | Show health summary | PASS | `10-maintainer-diagnostics-read-only.png` |
| Maintainer | Diagnostics | Run administrative check | `diagnostics.manage` | Yes as denied control | No | Keep action disabled with explanation | PASS | `10-maintainer-diagnostics-read-only.png`; browser disabled assertion |
| Maintainer | User Management | Any lifecycle action | `users.*` | Nav hidden / route denied | No | Prevent page access | PASS | `navigation.test.ts`; Maintainer nav assertion |
| Maintainer | Camera Detail | Reset camera defaults | `camera.reset_default` | Restricted panel | No | Explain reset is not included in camera update | PASS | `rbac.test.ts` |
| Operator | Monitoring / Camera | Operational camera, analysis, evidence | Common operational set | Yes | Yes | Provide local operational controls | PASS | `11-operator-monitoring.png`; `rbac.test.ts` |
| Operator | Dashboard | Read/export reports | `reports.read/export` | Nav hidden / denial shown on URL | No | Direct URL renders `reports.read` denial | PASS | `12-operator-dashboard-denied.png` |
| Operator | Settings | Objects/display | Respective update permissions | Yes | Yes | Editable local controls | PASS | `13-operator-settings-restricted.png` |
| Operator | Settings | Tuning | `detection.tuning.update` | Yes as restricted group | No | Disable controls and mark restricted | PASS | `13b-operator-settings-advanced-restricted.png` |
| Operator | Settings | Advanced Settings | `advanced.settings.update` | Restricted panel | No | Expose no value/control | PASS | `13b-operator-settings-advanced-restricted.png` |
| Operator | Logs / Diagnostics / Users | Open privileged page | Respective read permissions | Nav hidden / route denied | No | Prevent page access | PASS | `navigation.test.ts`; Operator nav assertion |
| Operator | Camera Detail | Reset camera defaults | `camera.reset_default` | Restricted panel | No | Show “Reset unavailable”; ordinary update remains allowed | PASS | `14-operator-camera-reset-restricted.png` |
| Supervisor | Monitoring / Camera | Operational camera, analysis, evidence | Common operational set | Yes | Yes | Provide local operational controls | PASS | `15-supervisor-monitoring.png`; `rbac.test.ts` |
| Supervisor | Dashboard | Read/filter/export reports | `reports.read/export` | Yes | Yes | Render/export synthetic reports | PASS | `16-supervisor-dashboard.png` |
| Supervisor | Dashboard | Retention cleanup | `history.cleanup` | No | No | Control absent | PASS | `16-supervisor-dashboard.png`; browser assertion |
| Supervisor | Settings | Objects/display | Respective update permissions | Yes | Yes | Editable local controls | PASS | `17-supervisor-settings-restricted.png` |
| Supervisor | Settings | Tuning / Advanced | Tuning and advanced update permissions | Restricted groups | No | Disable tuning and expose no Advanced value/control | PASS | `17b-supervisor-settings-advanced-restricted.png` |
| Supervisor | Logs / Diagnostics / Users | Open privileged page | Respective read permissions | Nav hidden / route denied | No | Prevent page access | PASS | `navigation.test.ts`; Supervisor nav assertion |
| Any active role | Role testing tool | Switch to a less privileged account | Route permission | Yes in testing tool | Yes | Re-evaluate current route and redirect when newly denied | PASS | `07-role-change-access-denied.png` |
| Any active role | Role testing tool | Expire session | Session state | Yes in testing tool | Yes | Show distinct recovery screen | PASS | `18-session-expired.png` |
| Any role | Any application route | View below 1100px | Desktop gate | Notice only | N/A | Do not render dashboard/application shell | PASS | `19-desktop-only-notice.png` |

Supporting automated checks: `domain/rbac.test.ts`, `application/navigation.test.ts`, `application/settingsPolicy.test.ts`, and `infrastructure/session.test.ts` (20/20 passing before finish fixes; final rerun recorded in `PROTOTYPE_TEST_REPORT.md`). All screenshot paths are under `evidence/screenshots/`.
