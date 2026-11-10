"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { ROLE_LABELS } from "@/domain/rbac";
import { DEMO_ACCOUNTS, LoginMethod } from "@/infrastructure/mockIdentity";
import { isSessionExpired } from "@/infrastructure/session";
import { usePrototype } from "@/providers/PrototypeProvider";

const METHODS: Array<{ id: LoginMethod; label: string; help: string }> = [
  { id: "MICROSOFT_ENTRA", label: "Microsoft Entra ID", help: "Simulated corporate provider" },
  { id: "GOOGLE", label: "Google", help: "Simulated OIDC provider" },
  { id: "HYBRID", label: "Microsoft + Google", help: "Provider choice demonstration" },
  { id: "EMAIL_PASSWORD", label: "Email / Password", help: "Fictitious local form" },
];

export default function LoginView() {
  const router = useRouter();
  const { session, ready, signIn, logout } = usePrototype();
  const [method, setMethod] = useState<LoginMethod>("MICROSOFT_ENTRA");
  const [accountId, setAccountId] = useState("usr-sa");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !session) return;
    if (isSessionExpired(session)) logout();
    else router.replace("/monitoring");
  }, [ready, session, logout, router]);
  const selected = useMemo(() => DEMO_ACCOUNTS.find((account) => account.id === accountId) ?? DEMO_ACCOUNTS[0], [accountId]);

  const selectMethod = (next: LoginMethod) => {
    setMethod(next);
    const matching = DEMO_ACCOUNTS.find((account) => account.method === next && account.status === "ACTIVE");
    if (matching) setAccountId(matching.id);
    setError("");
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = signIn(selected);
    if (!result.ok) {
      setError("Akun demo ini tidak aktif. Pilih akun aktif untuk melanjutkan.");
      return;
    }
    router.push("/monitoring");
  };

  return (
    <main className="login-page">
      <section className="login-context">
        <div className="login-brand"><span className="brand-mark"><Icon name="camera" size={22} /></span><div><strong>Detection Anomaly</strong><div className="muted">Standalone RBAC prototype</div></div></div>
        <div className="login-context-copy">
          <h1>Pantau kamera dan temuan dalam satu tempat.</h1>
          <p>Demonstrasi login dan izin yang mempertahankan tampilan Kiki. Semua data, sesi, dan tindakan di halaman ini hanya mock lokal.</p>
          <div className="login-flow"><span>Login</span><i /><span>Role</span><i /><span>Permission</span><i /><span>UI</span></div>
        </div>
        <small className="muted">Tidak terhubung ke Microsoft, Google, FastAPI, database, atau CCTV.</small>
      </section>
      <section className="login-form-side">
        <div className="prototype-banner"><Icon name="alert" /><strong>Prototype Mode — No Real Authentication</strong></div>
        <h2>Masuk ke Detection Anomaly</h2>
        <p>Pilih metode dan akun demonstrasi. Jangan gunakan kredensial perusahaan.</p>
        <div className="method-list" aria-label="Login method demonstrations">
          {METHODS.map((entry) => <button key={entry.id} type="button" className={`method-card ${method === entry.id ? "active" : ""}`} onClick={() => selectMethod(entry.id)} aria-pressed={method === entry.id}><strong>{entry.label}</strong><small>{entry.help}</small></button>)}
        </div>
        <div className="notice info"><Icon name="shield" /><span>{method === "EMAIL_PASSWORD" ? "Email dan password di bawah hanya nilai fiktif. Tidak ada validasi atau penyimpanan password." : "Provider sign-in disimulasikan. Tidak ada redirect OAuth atau token provider."}</span></div>
        <form onSubmit={submit}>
          {method === "EMAIL_PASSWORD" && <div className="field-row"><div><label htmlFor="demo-email">Email fiktif</label><input id="demo-email" value={selected.email} readOnly /></div><div><label htmlFor="demo-password">Password fiktif</label><input id="demo-password" type="password" value="prototype-only" readOnly /></div></div>}
          <label>Demo account</label>
          {DEMO_ACCOUNTS.map((account) => (
            <label key={account.id} className="account-option">
              <input type="radio" name="account" value={account.id} checked={accountId === account.id} onChange={() => { setAccountId(account.id); setError(""); }} />
              <span><strong>{account.displayName}</strong><span>{account.methodLabel}</span></span>
              <span><span className="role-badge">{ROLE_LABELS[account.role]}</span>{account.status === "INACTIVE" && <span className="status-badge failed">Inactive</span>}</span>
            </label>
          ))}
          <p className="form-error" role="alert">{error}</p>
          <button className="button primary login-submit" type="submit">Sign In to Prototype <Icon name="chevron" /></button>
        </form>
      </section>
    </main>
  );
}
