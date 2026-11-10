"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toast from "@/components/ui/Toast";
import { can } from "@/domain/rbac";
import { DETECTIONS } from "@/infrastructure/mockData";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function DashboardView() {
  const { session } = usePrototype();
  const role = session!.role;
  const [period, setPeriod] = useState("Today");
  const [cleanup, setCleanup] = useState(false);
  const [toast, setToast] = useState("");

  const exportCsv = () => {
    const csv = ["id,time,camera,type,severity,duration", ...DETECTIONS.map((row) => Object.values(row).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "prototype-detections.csv"; link.click(); URL.revokeObjectURL(url);
    setToast("Synthetic report exported locally.");
  };

  return (
    <main className="page">
      <div className="page-header"><div><h1>Detection dashboard</h1><p>Global History & Reports menggunakan synthetic records. Operator tidak dapat membuka route ini.</p></div><div className="page-actions"><span className="status-badge running">LIVE UI · MOCK DATA</span><button className="button" onClick={exportCsv} disabled={!can(role, "reports.export")}><Icon name="download" /> Export CSV</button>{can(role, "history.cleanup") && <button className="button danger" onClick={() => setCleanup(true)}><Icon name="trash" /> Retention cleanup</button>}</div></div>
      <div className="toolbar"><div className="segmented" aria-label="Report period">{["Today", "Yesterday", "7 days", "30 days"].map((item) => <button key={item} className={period === item ? "active" : ""} onClick={() => setPeriod(item)}>{item}</button>)}</div><select aria-label="Report source" defaultValue="all" style={{ width: 170 }}><option value="all">All sources</option><option value="cctv">CCTV</option><option value="demo">Demo</option></select><select aria-label="Camera filter" defaultValue="all" style={{ width: 190 }}><option value="all">All cameras</option><option>Gate Utama</option><option>Loading Yard</option></select></div>
      <section className="metrics-grid" aria-label="Report KPIs">
        {[['Detections','24','+4 from prior period'],['High severity','7','Requires review'],['Cameras with alerts','3','of 4 mock cameras'],['Average duration','17s','Synthetic metric']].map(([label,value,hint]) => <article className="card metric" key={label}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>)}
      </section>
      <section className="dashboard-grid">
        <article className="card chart-card"><div className="card-head" style={{ margin: '-16px -16px 0' }}><div><h2>Detections over time</h2><p>{period} · synthetic hourly activity</p></div></div><div className="bar-chart" aria-label="Synthetic detection bars">{[35,58,44,76,62,88,51,69].map((height,index) => <div className="bar" key={index} style={{ height: `${height}%` }}><span>{String(index * 3).padStart(2,'0')}:00</span></div>)}</div></article>
        <article className="card chart-card"><div className="card-head" style={{ margin: '-16px -16px 0' }}><div><h2>By severity</h2><p>Distribution of mock records</p></div></div><div className="donut" aria-label="Synthetic severity distribution" /></article>
      </section>
      <section className="card" style={{ marginTop: 12 }}><div className="card-head"><div><h2>Detection history</h2><p>Global reports are separate from camera-level operational evidence.</p></div><span className="permission-badge allowed">reports.read</span></div><div className="table-wrap"><table><thead><tr><th>ID</th><th>Time</th><th>Camera</th><th>Type</th><th>Severity</th><th>Duration</th></tr></thead><tbody>{DETECTIONS.map((row) => <tr key={row.id}><td className="tabular">{row.id}</td><td className="tabular">{row.time}</td><td>{row.camera}</td><td>{row.type}</td><td><span className={`severity ${row.severity}`}>{row.severity}</span></td><td>{row.duration}</td></tr>)}</tbody></table></div></section>
      <ConfirmDialog open={cleanup} title="Simulate retention cleanup?" description="Super Admin-only demonstration. No record will be deleted; the prototype will only display a success state." confirmLabel="Confirm simulation" danger={false} onClose={() => setCleanup(false)} onConfirm={() => setToast("Retention cleanup simulated. No data was deleted.")} />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}
