import { DemoAccount, LoginMethod } from "@/infrastructure/mockIdentity";

export type PrototypeSession = {
  accountId: string;
  displayName: string;
  role: DemoAccount["role"];
  method: LoginMethod;
  createdAt: string;
  expiresAt: string;
};

export const SESSION_KEY = "da-rbac-prototype-session";

export function createSession(account: DemoAccount, now = new Date()): PrototypeSession {
  if (account.status !== "ACTIVE") throw new Error("ACCOUNT_INACTIVE");
  return {
    accountId: account.id,
    displayName: account.displayName,
    role: account.role,
    method: account.method,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
  };
}

export function isSessionExpired(session: PrototypeSession, now = new Date()): boolean {
  return new Date(session.expiresAt).getTime() <= now.getTime();
}

export function readStoredSession(storage: Pick<Storage, "getItem">): PrototypeSession | null {
  const raw = storage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PrototypeSession;
    return parsed.accountId && parsed.role && parsed.expiresAt ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStoredSession(storage: Pick<Storage, "setItem">, session: PrototypeSession): void {
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession(storage: Pick<Storage, "removeItem">): void {
  storage.removeItem(SESSION_KEY);
}
