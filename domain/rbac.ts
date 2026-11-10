export const ROLES = ["SUPER_ADMIN", "MAINTAINER", "OPERATOR", "SUPERVISOR"] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "monitor.read",
  "video.analyze",
  "camera.create",
  "camera.read",
  "camera.update",
  "camera.delete",
  "camera.enable",
  "camera.disable",
  "analysis.start",
  "analysis.stop",
  "analysis.restart",
  "evidence.read",
  "detect.objects.update",
  "display.settings.update",
  "detection.tuning.update",
  "process.logs.read",
  "reports.read",
  "reports.export",
  "history.cleanup",
  "diagnostics.read",
  "diagnostics.manage",
  "users.read",
  "users.create",
  "users.update",
  "users.assign_role",
  "users.activate",
  "users.deactivate",
  "users.reset_access",
  "camera.reset_default",
  "advanced.settings.read",
  "advanced.settings.update",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const COMMON: Permission[] = [
  "monitor.read", "video.analyze", "camera.create", "camera.read", "camera.update",
  "camera.delete", "camera.enable", "camera.disable", "analysis.start", "analysis.stop",
  "analysis.restart", "evidence.read", "detect.objects.update", "display.settings.update",
];

export const ROLE_PERMISSIONS: Readonly<Record<Role, readonly Permission[]>> = {
  SUPER_ADMIN: [
    ...COMMON,
    "detection.tuning.update", "process.logs.read", "reports.read", "reports.export",
    "history.cleanup", "diagnostics.read", "diagnostics.manage", "users.read", "users.create",
    "users.update", "users.assign_role", "users.activate", "users.deactivate",
    "users.reset_access", "camera.reset_default", "advanced.settings.read", "advanced.settings.update",
  ],
  MAINTAINER: [
    ...COMMON,
    "detection.tuning.update", "process.logs.read", "reports.read", "reports.export",
    "diagnostics.read",
  ],
  OPERATOR: [...COMMON],
  SUPERVISOR: [...COMMON, "reports.read", "reports.export"],
};

export const PENDING_PERMISSIONS: ReadonlyArray<{ role: Role; permission: Permission; note: string }> = [
  {
    role: "MAINTAINER",
    permission: "advanced.settings.read",
    note: "Maintainer access to Advanced Settings is pending stakeholder approval and remains denied.",
  },
  {
    role: "MAINTAINER",
    permission: "advanced.settings.update",
    note: "Maintainer access to Advanced Settings is pending stakeholder approval and remains denied.",
  },
];

const permissionSets = Object.fromEntries(
  ROLES.map((role) => [role, new Set<Permission>(ROLE_PERMISSIONS[role])]),
) as Record<Role, Set<Permission>>;

export function can(role: Role, permission: Permission): boolean {
  return permissionSets[role].has(permission);
}

export function canAny(role: Role, permissions: readonly Permission[]): boolean {
  return permissions.some((permission) => can(role, permission));
}

export function canAll(role: Role, permissions: readonly Permission[]): boolean {
  return permissions.every((permission) => can(role, permission));
}

export function isPending(role: Role, permission: Permission): boolean {
  return PENDING_PERMISSIONS.some((entry) => entry.role === role && entry.permission === permission);
}

export function accessState(role: Role, permission: Permission): "allowed" | "pending" | "denied" {
  if (can(role, permission)) return "allowed";
  return isPending(role, permission) ? "pending" : "denied";
}

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  MAINTAINER: "Maintainer",
  OPERATOR: "Operator",
  SUPERVISOR: "Supervisor",
};
