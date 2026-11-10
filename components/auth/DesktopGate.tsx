"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

const DESKTOP_MIN_WIDTH = 1100;

export default function DesktopGate({ children }: { children: React.ReactNode }) {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (desktop === null) return <div className="boot-screen" role="status">Menyiapkan prototype…</div>;
  if (!desktop) {
    return (
      <main className="desktop-notice" data-testid="desktop-only-notice">
        <div className="desktop-notice-mark"><Icon name="monitor" size={30} /></div>
        <h1>Prototype ini dirancang untuk desktop</h1>
        <p>Untuk pengalaman monitoring yang optimal, silakan buka aplikasi melalui desktop atau laptop.</p>
        <small>Aturan tampilan: dashboard tidak dirender di bawah lebar viewport 1100px. Lebar viewport bukan deteksi jenis perangkat.</small>
      </main>
    );
  }
  return children;
}
