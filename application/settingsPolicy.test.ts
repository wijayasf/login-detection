import { describe, expect, it } from "vitest";

import { settingsAccess } from "@/application/settingsPolicy";

describe("settings field-level policy", () => {
  it("allows every role to update object and display settings", () => {
    for (const role of ["SUPER_ADMIN", "MAINTAINER", "OPERATOR", "SUPERVISOR"] as const) {
      expect(settingsAccess(role, "objects"), role).toBe("allowed");
      expect(settingsAccess(role, "display"), role).toBe("allowed");
    }
  });

  it("allows tuning only for Super Admin and Maintainer", () => {
    expect(settingsAccess("SUPER_ADMIN", "tuning")).toBe("allowed");
    expect(settingsAccess("MAINTAINER", "tuning")).toBe("allowed");
    expect(settingsAccess("OPERATOR", "tuning")).toBe("denied");
    expect(settingsAccess("SUPERVISOR", "tuning")).toBe("denied");
  });

  it("keeps Advanced Settings allowed for Super Admin, pending for Maintainer, and denied otherwise", () => {
    expect(settingsAccess("SUPER_ADMIN", "advanced")).toBe("allowed");
    expect(settingsAccess("MAINTAINER", "advanced")).toBe("pending");
    expect(settingsAccess("OPERATOR", "advanced")).toBe("denied");
    expect(settingsAccess("SUPERVISOR", "advanced")).toBe("denied");
  });
});
