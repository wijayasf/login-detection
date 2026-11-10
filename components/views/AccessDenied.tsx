"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { Permission } from "@/domain/rbac";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function AccessDenied({ permission }: { permission?: Permission }) {
  const { session } = usePrototype();
  return (
    <main className="state-page" data-testid="access-denied">
      <div className="state-symbol danger"><Icon name="lock" size={30} /></div>
      <h1>Akses tidak tersedia untuk role ini</h1>
      <p>Halaman atau tindakan ini tidak termasuk izin <strong>{session?.displayName ?? "akun aktif"}</strong>. Navigasi yang disembunyikan bukan satu-satunya pemeriksaan; akses URL juga dievaluasi oleh policy prototype.</p>
      {permission && <code>{permission}</code>}
      <div className="state-actions"><Link className="button primary" href="/monitoring">Kembali ke Monitoring</Link></div>
      <small>Prototype frontend only. Produksi tetap memerlukan enforcement di FastAPI.</small>
    </main>
  );
}
