import { describe, expect, it } from "vitest";

import {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ROLES,
  accessState,
  can,
  canAll,
  canAny,
  isPending,
} from "@/domain/rbac";

const commonOperationalPermissions = [
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
] as const;

describe("RBAC policy", () => {
  it("grants the shared operational baseline to every role", () => {
    for (const role of ROLES) {
      expect(canAll(role, commonOperationalPermissions), role).toBe(true);
    }
  });

  it("keeps camera availability and analysis lifecycle as separate permissions", () => {
    for (const role of ROLES) {
      expect(canAll(role, ["camera.enable", "camera.disable"]), role).toBe(true);
      expect(canAll(role, ["analysis.start", "analysis.stop", "analysis.restart"]), role).toBe(true);
    }
    expect(new Set(PERMISSIONS).size).toBe(PERMISSIONS.length);
  });

  it("limits tuning and process logs to Super Admin and Maintainer", () => {
    for (const role of ["SUPER_ADMIN", "MAINTAINER"] as const) {
      expect(canAll(role, ["detection.tuning.update", "process.logs.read"]), role).toBe(true);
    }
    for (const role of ["OPERATOR", "SUPERVISOR"] as const) {
      expect(canAny(role, ["detection.tuning.update", "process.logs.read"]), role).toBe(false);
    }
  });

  it("grants reports to Super Admin, Maintainer, and Supervisor only", () => {
    for (const role of ["SUPER_ADMIN", "MAINTAINER", "SUPERVISOR"] as const) {
      expect(canAll(role, ["reports.read", "reports.export"]), role).toBe(true);
    }
    expect(canAny("OPERATOR", ["reports.read", "reports.export"])).toBe(false);
  });

  it("reserves privileged mutations for Super Admin", () => {
    const privileged = [
      "history.cleanup",
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

    expect(canAll("SUPER_ADMIN", privileged)).toBe(true);
    for (const role of ["MAINTAINER", "OPERATOR", "SUPERVISOR"] as const) {
      expect(canAny(role, privileged), role).toBe(false);
    }
  });

  it("keeps Maintainer Advanced Settings pending and denied by default", () => {
    expect(isPending("MAINTAINER", "advanced.settings.read")).toBe(true);
    expect(isPending("MAINTAINER", "advanced.settings.update")).toBe(true);
    expect(accessState("MAINTAINER", "advanced.settings.read")).toBe("pending");
    expect(accessState("MAINTAINER", "advanced.settings.update")).toBe("pending");
    expect(can("MAINTAINER", "advanced.settings.read")).toBe(false);
    expect(can("MAINTAINER", "advanced.settings.update")).toBe(false);
  });

  it("has no duplicate permission assignment inside any role", () => {
    for (const role of ROLES) {
      expect(new Set(ROLE_PERMISSIONS[role]).size, role).toBe(ROLE_PERMISSIONS[role].length);
    }
  });
});
