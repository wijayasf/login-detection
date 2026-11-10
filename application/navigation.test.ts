import { describe, expect, it } from "vitest";

import { isPathAllowed, navigationFor, permissionForPath } from "@/application/navigation";

const labelsFor = (role: Parameters<typeof navigationFor>[0]) => navigationFor(role).map((item) => item.label);

describe("role-aware navigation and route policy", () => {
  it("shows the full navigation to Super Admin", () => {
    expect(labelsFor("SUPER_ADMIN")).toEqual([
      "Monitoring",
      "Dashboard",
      "Settings",
      "User Management",
      "Process Logs",
      "System Diagnostics",
    ]);
  });

  it("shows reports, logs, and diagnostics to Maintainer but not users", () => {
    expect(labelsFor("MAINTAINER")).toEqual([
      "Monitoring",
      "Dashboard",
      "Settings",
      "Process Logs",
      "System Diagnostics",
    ]);
  });

  it("keeps Operator navigation operational only", () => {
    expect(labelsFor("OPERATOR")).toEqual(["Monitoring", "Settings"]);
  });

  it("adds reports to Supervisor without privileged administration", () => {
    expect(labelsFor("SUPERVISOR")).toEqual(["Monitoring", "Dashboard", "Settings"]);
  });

  it("blocks protected paths consistently with their navigation permission", () => {
    expect(isPathAllowed("OPERATOR", "/dashboard")).toBe(false);
    expect(isPathAllowed("OPERATOR", "/admin/logs")).toBe(false);
    expect(isPathAllowed("OPERATOR", "/admin/diagnostics")).toBe(false);
    expect(isPathAllowed("SUPERVISOR", "/admin/users")).toBe(false);
    expect(isPathAllowed("MAINTAINER", "/admin/users/123")).toBe(false);
    expect(isPathAllowed("SUPER_ADMIN", "/admin/users")).toBe(true);
    expect(isPathAllowed("MAINTAINER", "/admin/diagnostics")).toBe(true);
    expect(isPathAllowed("SUPERVISOR", "/dashboard")).toBe(true);
  });

  it("maps nested pages and leaves public utility routes unguarded", () => {
    expect(permissionForPath("/camera?id=cam-01")).toBe("camera.read");
    expect(permissionForPath("/monitoring/wall")).toBe("monitor.read");
    expect(permissionForPath("/login")).toBeNull();
  });
});
