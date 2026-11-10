# Login Options Demonstrated

No production login provider is selected by this prototype.

| Option | Prototype behavior | Production questions intentionally unresolved |
|---|---|---|
| Microsoft Entra ID | Local account selection labeled as simulated; no OAuth redirect or token | Tenant ownership, app registration, conditional access, group/claim mapping, guest policy |
| Google | Local account selection labeled as simulated; no OIDC call | Workspace boundary, app verification, domain restriction, claim mapping |
| Microsoft + Google | Demonstrates a provider choice only | Account linking, duplicate identity handling, precedence, recovery, audit semantics |
| Email / Password | Read-only fictitious values; password is neither validated nor stored | Credential store, hashing, MFA, recovery, lockout, verification, session revocation |

All four paths create the same one-hour browser-local session structure. The active role comes from the selected fictitious account, not from an external claim. The inactive demo account is rejected before session creation.

The role testing tool is explicitly marked **not production**. It is present so stakeholders can compare permissions without repeatedly logging out; it must not be treated as a future impersonation design.
