"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DemoAccount, accountById } from "@/infrastructure/mockIdentity";
import {
  PrototypeSession,
  clearStoredSession,
  createSession,
  isSessionExpired,
  readStoredSession,
  writeStoredSession,
} from "@/infrastructure/session";

type PrototypeContextValue = {
  session: PrototypeSession | null;
  ready: boolean;
  signIn: (account: DemoAccount) => { ok: true } | { ok: false; reason: "inactive" };
  switchAccount: (accountId: string) => boolean;
  logout: () => void;
  expireSession: () => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<PrototypeSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredSession(window.localStorage);
    if (stored && !isSessionExpired(stored)) setSession(stored);
    else if (stored) clearStoredSession(window.localStorage);
    setReady(true);
  }, []);

  const persist = useCallback((next: PrototypeSession | null) => {
    setSession(next);
    if (next) writeStoredSession(window.localStorage, next);
    else clearStoredSession(window.localStorage);
  }, []);

  const signIn = useCallback((account: DemoAccount) => {
    if (account.status !== "ACTIVE") return { ok: false as const, reason: "inactive" as const };
    persist(createSession(account));
    return { ok: true as const };
  }, [persist]);

  const switchAccount = useCallback((accountId: string) => {
    const account = accountById(accountId);
    if (!account || account.status !== "ACTIVE") return false;
    persist(createSession(account));
    return true;
  }, [persist]);

  const logout = useCallback(() => persist(null), [persist]);

  const expireSession = useCallback(() => {
    if (!session) return;
    persist({ ...session, expiresAt: new Date(Date.now() - 1000).toISOString() });
  }, [persist, session]);

  const value = useMemo(() => ({ session, ready, signIn, switchAccount, logout, expireSession }), [session, ready, signIn, switchAccount, logout, expireSession]);
  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error("usePrototype must be used inside PrototypeProvider");
  return context;
}
