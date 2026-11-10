"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import MockFrame from "@/components/ui/MockFrame";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toast from "@/components/ui/Toast";
import { can } from "@/domain/rbac";
import { DETECTIONS, INITIAL_CAMERAS } from "@/infrastructure/mockData";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function CameraDetailView() {
  const params = useSearchParams();
  const camera = INITIAL_CAMERAS.find((item) => item.id === params.get("id")) ?? INITIAL_CAMERAS[0];
  const { session } = usePrototype();
  const role = session!.role;
  const [running, setRunning] = useState(camera.state === "running");
  const [replay, setReplay] = useState<string | null>(null);
  const [reset, setReset] = useState(false);
  const [toast, setToast] = useState("");

  return (
    <main className="page">
      <div className="page-header"><div><div className="inline-actions" style={{ marginBottom: 8 }}><Link className="button small" href="/monitoring">← Monitoring</Link><span className="type-tag">{camera.mode}</span><span className={`status-badge ${running ? "running" : "stopped"}`}>{running ? "running" : "stopped"}</span></div><h1>{camera.name}</h1><p>{camera.id} · {camera.location} · local mock media only</p></div><div className="page-actions">{running ? <button className="button" onClick={() => { setRunning(false); setToast("Analysis stopped locally."); }} disabled={!can(role, "analysis.stop")}><Icon name="pause" /> Stop analysis</button> : <button className="button primary" onClick={() => { setRunning(true); setToast("Analysis started locally."); }} disabled={!can(role, "analysis.start")}><Icon name="play" /> Start analysis</button>}<button className="button" onClick={() => { setRunning(true); setToast("Analysis restart simulated."); }} disabled={!can(role, "analysis.restart")}><Icon name="restart" /> Restart</button></div></div>
      <section className="detail-layout">
        <article className="card video-panel"><MockFrame label={replay ? `REPLAY ${replay}` : `${camera.name} · ${running ? "SIMULATED LIVE" : "STOPPED"}`} active={running || Boolean(replay)} /><div className="video-toolbar"><div><strong>{replay ? "Stored replay evidence" : "Camera view"}</strong><div className="muted">{replay ? "Local synthetic timeline" : "No MJPEG, RTSP, or frame request"}</div></div><div className="inline-actions">{replay && <button className="button small" onClick={() => setReplay(null)}>Back to mock live</button>}<span className="permission-badge allowed">evidence.read</span></div></div></article>
        <aside className="card"><div className="card-head"><div><h2>Detections</h2><p>Camera-level operational evidence</p></div><span>{DETECTIONS.length}</span></div><div className="detection-list">{DETECTIONS.slice(0,3).map((event) => <button className="detection-item" key={event.id} onClick={() => setReplay(event.id)} disabled={!can(role, "evidence.read")}><span className="detection-thumb"><Icon name="play" /></span><span><strong>{event.type}</strong><span>{event.camera}</span><small>{event.time} · {event.severity}</small></span></button>)}</div></aside>
      </section>
      <section className="detail-bottom">
        <article className="card"><div className="card-head"><div><h2>Camera configuration</h2><p>Permission groups remain separate.</p></div><span className="permission-badge allowed">camera.update</span></div><div className="settings-body"><div className="setting-row"><div><h3>Objects to Detect</h3><p>Editable for all approved roles.</p></div><select aria-label="Camera object profile" defaultValue="people-vehicles"><option value="people-vehicles">People + vehicles</option><option value="people">People</option><option value="vehicles">Vehicles</option></select></div><div className="setting-row"><div><h3>Display Settings</h3><p>Local overlay presentation.</p></div><button className="switch on" role="switch" aria-checked="true" aria-label="Show detection labels" /></div><div className="setting-row"><div><h3>Sensitivity & Speed</h3><p>Super Admin and Maintainer only.</p></div><input aria-label="Camera sensitivity" type="number" defaultValue="72" disabled={!can(role, "detection.tuning.update")} /></div></div></article>
        <article className="card"><div className="card-head"><div><h2>Camera administration</h2><p>Reset is independent from ordinary camera update.</p></div>{can(role, "camera.reset_default") ? <span className="permission-badge allowed">SA ONLY</span> : <span className="permission-badge denied">RESTRICTED</span>}</div><div className="card-pad"><p className="muted">Resetting defaults is a high-impact simulated action. No original camera configuration exists in this project.</p>{can(role, "camera.reset_default") ? <button className="button danger" onClick={() => setReset(true)}><Icon name="restart" /> Reset camera to default</button> : <div className="restricted-panel"><h3>Reset unavailable</h3><p>Requires <code>camera.reset_default</code>. Camera update permission does not include this action.</p></div>}</div></article>
      </section>
      <ConfirmDialog open={reset} title="Reset mock camera defaults?" description="The prototype will only show a confirmation result. No camera, API, or configuration file is changed." confirmLabel="Simulate reset" danger onClose={() => setReset(false)} onConfirm={() => setToast("Camera default reset simulated. No configuration changed.")} />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}
