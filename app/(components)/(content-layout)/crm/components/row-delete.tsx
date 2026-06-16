"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";

export function RowDelete({
  action,
  id,
  message = "Bu kayıt silinsin mi?",
}: {
  action: (id: string) => Promise<any>;
  id: string;
  message?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(message)) return;
    setBusy(true);
    try {
      await action(id);
      toast.success("Silindi.");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Silinemedi.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
      aria-label="Sil"
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </button>
  );
}
