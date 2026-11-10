"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import MockFrame from "@/components/ui/MockFrame";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toast from "@/components/ui/Toast";
import { useDialogFocus } from "@/components/ui/useDialogFocus";
import { can } from "@/domain/rbac";
import { INITIAL_CAMERAS, MockCamera } from "@/infrastructure/mockData";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function MonitoringView() {
  const { session } = usePrototype();
  const role = session!.role;
  const [cameras, setCameras] = useState<MockCamera[]>(INITIAL_CAMERAS);
  const [mode, setMode] = useState<"CCTV" | "DEMO">("CCTV");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<MockCamera | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MockCamera | null>(null);
  const [toast, setToast] = useState("");
  const visible = useMemo(() => cameras.filter((camera) => camera.mode === mode && `${camera.name} ${camera.location}`.toLowerCase().includes(query.toLowerCase())), [cameras, mode, query]);

  const updateCamera = (id: string, patch: Partial<MockCamera>, message: string) => {
    setCameras((items) => items.map((camera) => camera.id === id ? { ...camera, ...patch } : camera));
    setToast(message);
  };

  return (
    <main className="page">
      <div className="page-header">
        <div><h1>Monitoring</h1><p>Camera wall dengan mock state lokal. CCTV enable/disable dan detection processing tetap menjadi kontrol terpisah.</p></div>
        <div className="page-actions">
          <div className="segmented" aria-label="Camera mode"><button className={mode === "CCTV" ? "active" : ""} onClick={() => setMode("CCTV")}>CCTV</button><button className={mode === "DEMO" ? "active" : ""} onClick={() => setMode("DEMO")}>Demo</button></div>
          <button className="button primary" onClick={() => setEditing("new")} disabled={!can(role, "camera.create")}><Icon name="plus" /> Add camera</button>
        </div>
      </div>
      <div className="toolbar">
        <div className="search-field"><Icon name="search" /><input aria-label="Search cameras" placeholder="Search camera or location…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <span className="status-badge running">{cameras.filter((camera) => camera.state === "running").length} analysis running</span>
        <span className="status-badge">{cameras.filter((camera) => camera.enabled).length} CCTV enabled</span>
        <span className="muted">Synthetic data</span>
      </div>
      {visible.length ? <section className="camera-grid" aria-label={`${mode} camera wall`}>
        {visible.map((camera) => (
          <article className="card camera-card" key={camera.id} data-testid={`camera-${camera.id}`}>
            <Link href={`/camera?id=${encodeURIComponent(camera.id)}`} aria-label={`Open ${camera.name} detail`}><MockFrame label={camera.name} active={camera.state === "running"} /></Link>
            <div className="camera-meta">
              <div className="camera-meta-top"><strong>{camera.name}</strong><span className="type-tag">{camera.mode}</span><span className={`status-badge ${camera.state}`}>{camera.state}</span></div>
              <p>{camera.location} · {camera.lastSeen} · {camera.alerts} operational alerts</p>
              <div className="camera-controls">
                <div aria-label="CCTV registration controls">
                  <button className="button small" disabled={!can(role, camera.enabled ? "camera.disable" : "camera.enable")} onClick={() => updateCamera(camera.id, { enabled: !camera.enabled }, `${camera.name} ${camera.enabled ? "disabled" : "enabled"} locally.`)}><Icon name="power" size={15} /> {camera.enabled ? "Disable CCTV" : "Enable CCTV"}</button>
                </div>
                <div aria-label="Detection analysis controls">
                  {camera.state === "running" ? <button className="icon-button" aria-label={`Stop analysis ${camera.name}`} title="Stop analysis" disabled={!can(role, "analysis.stop")} onClick={() => updateCamera(camera.id, { state: "stopped" }, `Analysis stopped for ${camera.name}.`)}><Icon name="pause" /></button> : <button className="icon-button" aria-label={`Start analysis ${camera.name}`} title="Start analysis" disabled={!can(role, "analysis.start")} onClick={() => updateCamera(camera.id, { state: "running" }, `Analysis started for ${camera.name}.`)}><Icon name="play" /></button>}
                  <button className="icon-button" aria-label={`Restart analysis ${camera.name}`} title="Restart analysis" disabled={!can(role, "analysis.restart")} onClick={() => updateCamera(camera.id, { state: "running" }, `Analysis restarted for ${camera.name}.`)}><Icon name="restart" /></button>
                  <button className="icon-button" aria-label={`Edit ${camera.name}`} title="Edit camera" disabled={!can(role, "camera.update")} onClick={() => setEditing(camera)}><Icon name="edit" /></button>
                  <button className="icon-button" aria-label={`Delete ${camera.name}`} title="Delete camera" disabled={!can(role, "camera.delete")} onClick={() => setDeleteTarget(camera)}><Icon name="trash" /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section> : <div className="empty-state"><Icon name="camera" size={34} /><h2>No cameras in this view</h2><p>Change the mode or search query. No real camera source is contacted.</p></div>}

      {editing && <CameraForm camera={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={(data) => {
        if (editing === "new") setCameras((items) => [...items, { ...data, id: `CCTV-MOCK-${items.length + 1}`, mode: "CCTV", enabled: true, state: "stopped", alerts: 0, lastSeen: "Never" }]);
        else setCameras((items) => items.map((camera) => camera.id === editing.id ? { ...camera, ...data } : camera));
        setEditing(null); setToast(editing === "new" ? "Mock camera created locally." : "Mock camera updated locally.");
      }} />}
      <ConfirmDialog open={Boolean(deleteTarget)} title="Delete mock camera?" description={`This removes ${deleteTarget?.name ?? "the camera"} from browser state only. It does not contact the Detection Anomaly API.`} confirmLabel="Delete mock camera" danger onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) setCameras((items) => items.filter((camera) => camera.id !== deleteTarget.id)); setToast("Mock camera removed locally."); }} />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}

function CameraForm({ camera, onClose, onSave }: { camera: MockCamera | null; onClose: () => void; onSave: (value: Pick<MockCamera, "name" | "location">) => void }) {
  const [name, setName] = useState(camera?.name ?? "");
  const [location, setLocation] = useState(camera?.location ?? "");
  const dialogRef = useDialogFocus<HTMLFormElement>(true, onClose);
  const titleId = camera ? "edit-camera-title" : "add-camera-title";
  return <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}><form ref={dialogRef} tabIndex={-1} className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); if (name.trim() && location.trim()) onSave({ name: name.trim(), location: location.trim() }); }}><button data-autofocus type="button" className="icon-button dialog-close" onClick={onClose} aria-label="Close camera form"><Icon name="close" /></button><h2 id={titleId}>{camera ? "Edit mock camera" : "Add mock camera"}</h2><p>Metadata is stored in React state only. No source URL or credential is requested.</p><label htmlFor="camera-name">Camera name</label><input id="camera-name" value={name} onChange={(event) => setName(event.target.value)} required /><label htmlFor="camera-location">Location</label><input id="camera-location" value={location} onChange={(event) => setLocation(event.target.value)} required /><div className="dialog-actions"><button type="button" className="button" onClick={onClose}>Cancel</button><button className="button primary" type="submit">Save locally</button></div></form></div>;
}
