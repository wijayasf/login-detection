"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toast from "@/components/ui/Toast";
import { ROLE_LABELS, ROLES, Role, can } from "@/domain/rbac";
import { INITIAL_USERS } from "@/infrastructure/mockData";
import { usePrototype } from "@/providers/PrototypeProvider";

type UserRow = { id: string; name: string; email: string; role: Role; active: boolean; method: string };
type PendingAction = { title: string; description: string; label: string; danger: boolean; run: () => void };

export default function UserManagementView() {
  const { session } = usePrototype();
  const role = session!.role;
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<UserRow | "new" | null>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase())), [users, query]);

  const confirmStatus = (user: UserRow) => setPending({
    title: `${user.active ? "Deactivate" : "Activate"} mock user?`,
    description: `${user.name} will be ${user.active ? "blocked from future prototype sign-in demonstrations" : "marked active"}. No real identity provider is contacted.`,
    label: user.active ? "Deactivate locally" : "Activate locally",
    danger: user.active,
    run: () => { setUsers((items) => items.map((item) => item.id === user.id ? { ...item, active: !item.active } : item)); setToast(`User ${user.active ? "deactivated" : "activated"} locally.`); },
  });

  const confirmReset = (user: UserRow) => setPending({
    title: "Reset mock access?",
    description: `This only records a local success state for ${user.name}. No email, token, password, or provider reset is sent.`,
    label: "Simulate reset access",
    danger: false,
    run: () => setToast("Access reset simulated. No message was sent."),
  });

  return (
    <main className="page">
      <div className="page-header"><div><h1>User Management</h1><p>Super Admin-only local user lifecycle demonstration. Each user has exactly one role.</p></div><button className="button primary" onClick={() => setEditing("new")} disabled={!can(role, "users.create")}><Icon name="plus" /> Create user</button></div>
      <div className="notice warning" style={{ marginBottom: 12 }}><Icon name="alert" /><span>No database, identity provider, email, invitation, or password reset service is connected.</span></div>
      {editing && <UserForm user={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={(value) => { if (editing === "new") setUsers((items) => [...items, { ...value, id: `usr-local-${items.length + 1}`, active: true, method: "Prototype local" }]); else setUsers((items) => items.map((item) => item.id === editing.id ? { ...item, ...value } : item)); setEditing(null); setToast(editing === "new" ? "Mock user created locally." : "Mock user updated locally."); }} />}
      <section className="card"><div className="card-head"><div className="search-field"><Icon name="search" /><input aria-label="Search users" placeholder="Search name, email, or role…" value={query} onChange={(event) => setQuery(event.target.value)} /></div><span className="muted">{filtered.length} mock users</span></div><div className="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Login method</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td><strong>{user.name}</strong><div className="muted">{user.email}</div></td><td><span className="role-badge">{ROLE_LABELS[user.role]}</span></td><td>{user.method}</td><td><span className={`status-badge ${user.active ? "running" : "failed"}`}>{user.active ? "Active" : "Inactive"}</span></td><td><div className="inline-actions"><button className="button small" onClick={() => setEditing(user)} disabled={!can(role, "users.update")}><Icon name="edit" size={14} /> Edit</button><button className="button small" onClick={() => confirmStatus(user)} disabled={!can(role, user.active ? "users.deactivate" : "users.activate")}>{user.active ? "Deactivate" : "Activate"}</button><button className="button small" onClick={() => confirmReset(user)} disabled={!can(role, "users.reset_access")}>Reset access</button></div></td></tr>)}</tbody></table></div></section>
      <ConfirmDialog open={Boolean(pending)} title={pending?.title ?? "Confirm"} description={pending?.description ?? ""} confirmLabel={pending?.label ?? "Confirm"} danger={pending?.danger} onClose={() => setPending(null)} onConfirm={() => pending?.run()} />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </main>
  );
}

function UserForm({ user, onClose, onSave }: { user: UserRow | null; onClose: () => void; onSave: (value: Pick<UserRow, "name" | "email" | "role">) => void }) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<Role>(user?.role ?? "OPERATOR");
  return <form className="card form-panel" onSubmit={(event) => { event.preventDefault(); onSave({ name, email, role }); }}><div className="card-head" style={{ margin: '-16px -16px 16px' }}><div><h2>{user ? "Edit mock user" : "Create mock user"}</h2><p>One role per user. No identity is provisioned.</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close user form"><Icon name="close" /></button></div><div className="field-row"><div><label htmlFor="user-name">Display name</label><input id="user-name" required value={name} onChange={(event) => setName(event.target.value)} /></div><div><label htmlFor="user-email">Fictitious email</label><input id="user-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div></div><label htmlFor="user-role">Single assigned role</label><select id="user-role" value={role} onChange={(event) => setRole(event.target.value as Role)}>{ROLES.map((entry) => <option key={entry} value={entry}>{ROLE_LABELS[entry]}</option>)}</select><div className="form-actions"><button className="button" type="button" onClick={onClose}>Cancel</button><button className="button primary" type="submit">Save mock user</button></div></form>;
}
