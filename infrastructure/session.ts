import { ROLES } from "@/domain/rbac";
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

const LOGIN_METHODS: readonly LoginMethod[] = ["MICROSOFT_ENTRA", "GOOGLE", "HYBRID", "EMAIL_PASSWORD"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(new Date(value).getTime());
}

function isPrototypeSession(value: unknown): value is PrototypeSession {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;

  const session = value as Record<string, unknown>;
  return (
    isNonEmptyString(session.accountId) &&
    isNonEmptyString(session.displayName) &&
    typeof session.role === "string" &&
    ROLES.includes(session.role as PrototypeSession["role"]) &&
    typeof session.method === "string" &&
    LOGIN_METHODS.includes(session.method as LoginMethod) &&
    isValidTimestamp(session.createdAt) &&
    isValidTimestamp(session.expiresAt)
  );
}

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
    const parsed: unknown = JSON.parse(raw);
    return isPrototypeSession(parsed) ? parsed : null;
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
