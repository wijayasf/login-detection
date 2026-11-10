"use client";

import Icon from "@/components/ui/Icon";

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="toast" role="status"><Icon name="check" /><span>{message}</span><button onClick={onClose} aria-label="Tutup pesan"><Icon name="close" size={15} /></button></div>;
}
