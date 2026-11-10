"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrototype } from "@/providers/PrototypeProvider";

export default function HomePage() {
  const { session, ready } = usePrototype();
  const router = useRouter();
  useEffect(() => { if (ready) router.replace(session ? "/monitoring" : "/login"); }, [ready, session, router]);
  return <div className="boot-screen" role="status">Membuka prototype…</div>;
}
