# Approved RBAC Matrix

Legend: **A** allowed, **D** denied, **P** pending approval and denied by default.

| Capability | Super Admin | Maintainer | Operator | Supervisor |
|---|:---:|:---:|:---:|:---:|
| Monitoring / camera read | A | A | A | A |
| Video analysis | A | A | A | A |
| Camera create, update, delete | A | A | A | A |
| Camera enable / disable | A | A | A | A |
| Analysis start / stop / restart | A | A | A | A |
| Camera operational evidence | A | A | A | A |
| Objects to Detect update | A | A | A | A |
| Display Settings update | A | A | A | A |
| Detection tuning | A | A | D | D |
| Process Logs read | A | A | D | D |
| Global Reports / History read | A | A | D | A |
| Reports export | A | A | D | A |
| Retention cleanup | A | D | D | D |
| Diagnostics read | A | A | D | D |
| Diagnostics manage | A | D | D | D |
| User lifecycle and single-role assignment | A | D | D | D |
| Reset camera to default | A | D | D | D |
| Advanced Settings read | A | P | D | D |
| Advanced Settings update | A | P | D | D |

## Enforced distinctions

The following are separate permissions and controls, even where the same roles currently receive both:

- `camera.enable` / `camera.disable` control camera registration availability.
- `analysis.start` / `analysis.stop` / `analysis.restart` control processing lifecycle.
- `evidence.read` covers camera-level operational evidence.
- `reports.read` / `reports.export` cover the global reporting surface.
- `diagnostics.read` does not imply `diagnostics.manage`.
- `camera.update` does not imply `camera.reset_default`.
- `detect.objects.update`, `display.settings.update`, `detection.tuning.update`, and `advanced.settings.update` are independent settings groups.

The executable source of truth is `domain/rbac.ts`. Navigation, route boundaries, settings states, and action controls consume this policy; pages do not maintain a second role matrix.
