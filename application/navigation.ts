import { Permission, Role, can } from "@/domain/rbac";

export type NavigationItem = {
  href: string;
  label: string;
  icon: "monitor" | "dashboard" | "settings" | "users" | "logs" | "diagnostics";
  permission: Permission;
};

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { href: "/monitoring", label: "Monitoring", icon: "monitor", permission: "monitor.read" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard", permission: "reports.read" },
  { href: "/settings", label: "Settings", icon: "settings", permission: "display.settings.update" },
  { href: "/admin/users", label: "User Management", icon: "users", permission: "users.read" },
  { href: "/admin/logs", label: "Process Logs", icon: "logs", permission: "process.logs.read" },
  { href: "/admin/diagnostics", label: "System Diagnostics", icon: "diagnostics", permission: "diagnostics.read" },
] as const;

export function navigationFor(role: Role): NavigationItem[] {
  return NAVIGATION_ITEMS.filter((item) => can(role, item.permission));
}

export function permissionForPath(pathname: string): Permission | null {
  if (pathname.startsWith("/dashboard")) return "reports.read";
  if (pathname.startsWith("/admin/users")) return "users.read";
  if (pathname.startsWith("/admin/logs")) return "process.logs.read";
  if (pathname.startsWith("/admin/diagnostics")) return "diagnostics.read";
  if (pathname.startsWith("/settings")) return "display.settings.update";
  if (pathname.startsWith("/camera")) return "camera.read";
  if (pathname.startsWith("/monitoring")) return "monitor.read";
  return null;
}

export function isPathAllowed(role: Role, pathname: string): boolean {
  const permission = permissionForPath(pathname);
  return permission ? can(role, permission) : true;
}
