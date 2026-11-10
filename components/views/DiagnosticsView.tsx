"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Toast from "@/components/ui/Toast";
import { can } from "@/domain/rbac";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function DiagnosticsView() {
  const { session } = usePrototype();
  const role = session!.role;
  const [toast, setToast] = useState("");
  const manage = can(role, "diagnostics.manage");
  return <main className="page"><div className="page-header"><div><h1>System Diagnostics</h1><p>Sanitized synthetic health information. Maintainer access is explicitly read-only.</p></div><span className={`permission-badge ${manage ? "allowed" : "pending"}`}>{manage ? "FULL DEMO ACCESS" : "READ ONLY"}</span></div><section className="diagnostic-grid">{[["CPU","29%","Nominal"],["Memory","64%","Within mock threshold"],["GPU","N/A","No runtime connected"]].map(([label,value,hint]) => <article className="card card-pad" key={label}><span className="muted">{label}</span><div className="diagnostic-value">{value}</div><small className="muted">{hint}</small></article>)}</section><section className="card" style={{ marginTop: 12 }}><div className="card-head"><div><h2>Diagnostic controls</h2><p>Viewing metrics and performing administrative actions use separate permissions.</p></div></div><div className="card-pad"><div className="permission-grid"><div className="permission-cell"><strong>View health summary</strong><small>diagnostics.read · allowed</small></div><div className="permission-cell"><strong>Run mock health check</strong><small>diagnostics.manage · {manage ? "allowed" : "denied"}</small></div><div className="permission-cell"><strong>Restart services</strong><small>Not implemented or implied by this prototype</small></div></div><div className="inline-actions" style={{ marginTop: 16 }}><button className="button primary" disabled={!manage} onClick={() => setToast("Full health check simulated. No service was contacted.")}><Icon name="diagnostics" /> Run mock health check</button>{!manage && <span className="muted">Maintainer can inspect but cannot run administrative diagnostics.</span>}</div></div></section>{toast && <Toast message={toast} onClose={() => setToast("")} />}</main>;
}
