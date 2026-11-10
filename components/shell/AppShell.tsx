"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { navigationFor, isPathAllowed } from "@/application/navigation";
import { DEMO_ACCOUNTS } from "@/infrastructure/mockIdentity";
import { ROLE_LABELS } from "@/domain/rbac";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/monitoring";
  const router = useRouter();
  const { session, switchAccount, logout, expireSession } = usePrototype();
  const [testingOpen, setTestingOpen] = useState(false);
  if (!session) return null;
  const navigation = navigationFor(session.role);

  const onSwitch = (accountId: string) => {
    const account = DEMO_ACCOUNTS.find((entry) => entry.id === accountId);
    if (!account || account.status !== "ACTIVE") return;
    const allowed = isPathAllowed(account.role, pathname);
    switchAccount(accountId);
    if (!allowed) router.push(`/access-denied?reason=role-change&from=${encodeURIComponent(pathname)}`);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navigasi utama">
        <Link href="/monitoring" className="brand" aria-label="Detection Anomaly Monitoring">
          <span className="brand-mark"><Icon name="camera" size={19} /></span>
          <span><strong>Detection Anomaly</strong><small>RBAC prototype</small></span>
        </Link>
        <div className="sidebar-search" aria-hidden="true"><Icon name="search" size={15} /><span>Search prototype…</span><kbd>⌘ K</kbd></div>
        <nav className="nav-list">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`) || (item.href === "/monitoring" && pathname.startsWith("/camera"));
            return <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}><Icon name={item.icon} /><span>{item.label}</span></Link>;
          })}
        </nav>
        <div className="sidebar-foot">
          <span className="prototype-chip"><i /> Prototype only</span>
          <button className="testing-toggle" onClick={() => setTestingOpen((value) => !value)} aria-expanded={testingOpen}><Icon name="switch" /><span>Role testing tool</span><Icon name="chevron" size={14} /></button>
          {testingOpen && (
            <div className="testing-panel">
              <strong>Testing tool — not production</strong>
              <label htmlFor="account-switcher">Simulated account</label>
              <select id="account-switcher" value={session.accountId} onChange={(event) => onSwitch(event.target.value)}>
                {DEMO_ACCOUNTS.filter((account) => account.status === "ACTIVE").map((account) => <option key={account.id} value={account.id}>{account.displayName} — {ROLE_LABELS[account.role]}</option>)}
              </select>
              <button className="text-button" onClick={() => { expireSession(); router.push("/session-expired"); }}>Simulate session expiry</button>
            </div>
          )}
          <div className="identity-card">
            <div className="avatar" aria-hidden="true">{session.displayName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
            <div><strong>{session.displayName}</strong><span>{ROLE_LABELS[session.role]}</span></div>
            <button className="icon-button" aria-label="Logout" title="Logout" onClick={() => { logout(); router.push("/login"); }}><Icon name="logout" /></button>
          </div>
        </div>
      </aside>
      <div className="app-content">
        <header className="session-bar">
          <div><span className="session-dot" /> Simulated local session</div>
          <div className="session-meta"><span>{ROLE_LABELS[session.role]}</span><strong>Prototype Mode — No Real Authentication</strong></div>
        </header>
        {children}
      </div>
    </div>
  );
}
