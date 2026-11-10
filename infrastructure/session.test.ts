import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS, accountById } from "@/infrastructure/mockIdentity";
import {
  SESSION_KEY,
  clearStoredSession,
  createSession,
  isSessionExpired,
  readStoredSession,
  writeStoredSession,
} from "@/infrastructure/session";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

describe("mock identity and session", () => {
  it("assigns exactly one valid role to every demo account", () => {
    for (const account of DEMO_ACCOUNTS) {
      expect(typeof account.role).toBe("string");
      expect(Array.isArray(account.role)).toBe(false);
    }
    expect(DEMO_ACCOUNTS.filter((account) => account.status === "ACTIVE").map((account) => account.role).sort()).toEqual(
      ["MAINTAINER", "OPERATOR", "SUPERVISOR", "SUPER_ADMIN"],
    );
  });

  it("creates a one-hour session only for an active account", () => {
    const now = new Date("2026-11-10T02:00:00.000Z");
    const session = createSession(accountById("usr-sa")!, now);
    expect(session.role).toBe("SUPER_ADMIN");
    expect(session.createdAt).toBe("2026-11-10T02:00:00.000Z");
    expect(session.expiresAt).toBe("2026-11-10T03:00:00.000Z");
    expect(() => createSession(accountById("usr-inactive")!, now)).toThrow("ACCOUNT_INACTIVE");
  });

  it("detects the exact expiry boundary", () => {
    const session = createSession(accountById("usr-o")!, new Date("2026-11-10T02:00:00.000Z"));
    expect(isSessionExpired(session, new Date("2026-11-10T02:59:59.999Z"))).toBe(false);
    expect(isSessionExpired(session, new Date("2026-11-10T03:00:00.000Z"))).toBe(true);
  });

  it("round-trips, clears, and rejects malformed stored state", () => {
    const storage = memoryStorage();
    const session = createSession(accountById("usr-s")!, new Date("2026-11-10T02:00:00.000Z"));
    writeStoredSession(storage, session);
    expect(readStoredSession(storage)).toEqual(session);
    clearStoredSession(storage);
    expect(readStoredSession(storage)).toBeNull();
    storage.setItem(SESSION_KEY, "not-json");
    expect(readStoredSession(storage)).toBeNull();
    storage.setItem(SESSION_KEY, JSON.stringify({ accountId: "x" }));
    expect(readStoredSession(storage)).toBeNull();
  });
});
