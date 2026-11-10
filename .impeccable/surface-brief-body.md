# Task 5 RBAC Prototype Surface

- Mode: Operate
- Scope: standalone desktop-first prototype that extends the established Kiki UI
- Audience/job: stakeholders and QA exercise login, role switching, protected navigation, and action-level policy states
- Constraints: no production auth/backend; local mock state; pending decisions remain denied; no responsive dashboard below 1100px

## Direction contract

**THESIS:** Permission changes must be visible at the exact point of work without turning the monitoring console into a permissions dashboard. Refuse the generic admin-template split between operational UI and RBAC UI.

**OWN-WORLD:** Inherit Kiki's black/navy console, cool 1px borders, restrained blue primary actions, compact outlined icons, 8–10px control radii, tabular metrics, and dense but ordered information. Permission states use existing semantic green, amber, red, and muted text.

**STORY:** A reviewer signs in through a clearly simulated method, lands in Monitoring, changes role through an explicitly labeled testing tool, and sees navigation, routes, fields, and high-impact actions re-evaluate from one policy source.

**FIRST VIEWPORT:** Login uses a two-column dark composition with brand/context on the left and the method/account form on the right. Authenticated views use the Kiki sidebar, a narrow identity bar, and the operational page immediately—no marketing hero or permission summary cards before the work.

**FORM:** Code-led extension of an established Operate surface; precise brief, no concept tournament. seed: none (unavailable).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
