"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function SessionExpiredPage() {
  return <main className="state-page standalone" data-testid="session-expired"><div className="state-symbol warning"><Icon name="clock" size={30} /></div><h1>Sesi prototype telah berakhir</h1><p>Ini adalah demonstrasi state session expired. Tidak ada token provider atau backend session yang digunakan.</p><Link className="button primary" href="/login">Kembali ke Login</Link></main>;
}
