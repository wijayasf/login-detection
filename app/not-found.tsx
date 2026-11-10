import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return <main className="state-page standalone"><div className="state-symbol"><Icon name="search" size={30} /></div><h1>Halaman tidak ditemukan</h1><p>Route ini tidak tersedia di prototype RBAC.</p><Link className="button primary" href="/">Kembali ke awal</Link></main>;
}
