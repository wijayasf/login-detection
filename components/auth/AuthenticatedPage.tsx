"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import AccessDenied from "@/components/views/AccessDenied";
import { Permission, can } from "@/domain/rbac";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function AuthenticatedPage({ permission, children }: { permission: Permission; children: React.ReactNode }) {
  const { session, ready } = usePrototype();
  const router = useRouter();

  useEffect(() => {
    if (ready && !session) router.replace("/login");
  }, [ready, session, router]);

  if (!ready || !session) return <div className="boot-screen" role="status">Memeriksa sesi prototype…</div>;

  return (
    <AppShell>
      {can(session.role, permission) ? children : <AccessDenied permission={permission} />}
    </AppShell>
  );
}
