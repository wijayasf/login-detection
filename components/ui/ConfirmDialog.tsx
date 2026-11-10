"use client";

import Icon from "@/components/ui/Icon";
import { useDialogFocus } from "@/components/ui/useDialogFocus";

export default function ConfirmDialog({ open, title, description, confirmLabel, danger = false, onConfirm, onClose }: {
  open: boolean; title: string; description: string; confirmLabel: string; danger?: boolean; onConfirm: () => void; onClose: () => void;
}) {
  const dialogRef = useDialogFocus<HTMLElement>(open, onClose);
  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} tabIndex={-1} className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description" onMouseDown={(event) => event.stopPropagation()}>
        <button data-autofocus className="icon-button dialog-close" onClick={onClose} aria-label="Tutup konfirmasi"><Icon name="close" /></button>
        <div className={`dialog-symbol ${danger ? "danger" : "warning"}`}><Icon name="alert" size={24} /></div>
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-description">{description}</p>
        <div className="dialog-actions"><button className="button" onClick={onClose}>Batal</button><button className={`button ${danger ? "danger" : "primary"}`} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</button></div>
      </section>
    </div>
  );
}
