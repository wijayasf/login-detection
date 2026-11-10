"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Toast from "@/components/ui/Toast";
import { SettingsSection, settingsAccess } from "@/application/settingsPolicy";
import { ROLE_LABELS } from "@/domain/rbac";
import { usePrototype } from "@/providers/PrototypeProvider";

const sectionMeta: Record<SettingsSection, { title: string; description: string }> = {
  objects: { title: "Objects to Detect", description: "Select object classes included in local mock detection settings." },
  display: { title: "Display Settings", description: "Control overlays, labels, and presentation preferences." },
  tuning: { title: "Sensitivity & Speed", description: "Adjust detection thresholds and processing cadence." },
  advanced: { title: "Advanced Settings", description: "Higher-risk configuration kept separate from every other settings group." },
};

export default function SettingsView() {
  const { session } = usePrototype();
  const role = session!.role;
  const [values, setValues] = useState({ people: true, vehicle: true, boxes: true, labels: true, sensitivity: 72, cadence: 8, advanced: "balanced" });
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState("");
  const update = <K extends keyof typeof values>(key: K, value: typeof values[K]) => { setValues((current) => ({ ...current, [key]: value })); setDirty(true); };

  return (
    <main className="page narrow">
      <div className="page-header"><div><h1>Global settings</h1><p>Permission is evaluated per field group. Opening Settings never grants permission to edit every value.</p></div><div className="page-actions"><span className="role-badge">{ROLE_LABELS[role]}</span><button className="button" disabled={!dirty} onClick={() => { setDirty(false); setToast("Local changes discarded."); }}>Discard</button><button className="button primary" disabled={!dirty} onClick={() => { setDirty(false); setToast("Settings saved to local prototype state only."); }}>Save mock changes</button></div></div>
      <div className="notice info" style={{ marginBottom: 12 }}><Icon name="shield" /><span>Production must whitelist permitted fields server-side. Disabled or hidden controls in this prototype are not security enforcement.</span></div>
      <section className="settings-list">
        <SettingsCard section="objects" role={role}>
          <SettingToggle title="People" description="Include people in mock object selection." on={values.people} disabled={false} onChange={() => update("people", !values.people)} />
          <SettingToggle title="Vehicles" description="Include vehicles in mock object selection." on={values.vehicle} disabled={false} onChange={() => update("vehicle", !values.vehicle)} />
        </SettingsCard>
        <SettingsCard section="display" role={role}>
          <SettingToggle title="Detection boxes" description="Show bounding boxes on local mock frames." on={values.boxes} disabled={false} onChange={() => update("boxes", !values.boxes)} />
          <SettingToggle title="Object labels" description="Show class labels beside detected objects." on={values.labels} disabled={false} onChange={() => update("labels", !values.labels)} />
        </SettingsCard>
        <SettingsCard section="tuning" role={role}>
          <div className="setting-row"><div><h3>Detection sensitivity</h3><p>Higher values surface more mock events.</p></div><div><label htmlFor="sensitivity">Sensitivity: {values.sensitivity}%</label><input id="sensitivity" type="range" min="20" max="95" value={values.sensitivity} disabled={settingsAccess(role, "tuning") !== "allowed"} onChange={(event) => update("sensitivity", Number(event.target.value))} /></div></div>
          <div className="setting-row"><div><h3>Processing cadence</h3><p>Demonstration value only; no inference process exists.</p></div><div><label htmlFor="cadence">Frames per second</label><input id="cadence" type="number" min="1" max="30" value={values.cadence} disabled={settingsAccess(role, "tuning") !== "allowed"} onChange={(event) => update("cadence", Number(event.target.value))} /></div></div>
        </SettingsCard>
        <SettingsCard section="advanced" role={role}>
          {settingsAccess(role, "advanced") === "allowed" ? <div className="setting-row"><div><h3>Runtime profile</h3><p>Synthetic advanced option; no backend configuration is exposed.</p></div><select aria-label="Runtime profile" value={values.advanced} onChange={(event) => update("advanced", event.target.value)}><option value="balanced">Balanced</option><option value="precision">Precision preference</option><option value="throughput">Throughput preference</option></select></div> : <div className="restricted-panel"><h3>{settingsAccess(role, "advanced") === "pending" ? "Pending stakeholder approval" : "Restricted for this role"}</h3><p>{settingsAccess(role, "advanced") === "pending" ? "Maintainer access to Advanced Settings remains an unresolved decision. Pending is treated as denied, so no values or mutation controls are exposed." : "Advanced Settings require advanced.settings.update. Other settings permissions do not imply access here."}</p><span className={`permission-badge ${settingsAccess(role, "advanced")}`}>{settingsAccess(role, "advanced") === "pending" ? "PENDING_DECISION" : "DENIED"}</span></div>}
        </SettingsCard>
      </section>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}

function SettingsCard({ section, role, children }: { section: SettingsSection; role: Parameters<typeof settingsAccess>[0]; children: React.ReactNode }) {
  const state = settingsAccess(role, section);
  const meta = sectionMeta[section];
  return <article className="card settings-section" data-testid={`settings-${section}`}><div className="card-head"><div><h2>{meta.title}</h2><p>{meta.description}</p></div><span className={`permission-badge ${state}`}>{state === "allowed" ? "EDITABLE" : state === "pending" ? "PENDING APPROVAL" : "RESTRICTED"}</span></div><div className="settings-body">{children}</div></article>;
}

function SettingToggle({ title, description, on, disabled, onChange }: { title: string; description: string; on: boolean; disabled: boolean; onChange: () => void }) {
  return <div className="setting-row"><div><h3>{title}</h3><p>{description}</p></div><button type="button" className={`switch ${on ? "on" : ""}`} onClick={onChange} disabled={disabled} role="switch" aria-checked={on} aria-label={title} /> </div>;
}
