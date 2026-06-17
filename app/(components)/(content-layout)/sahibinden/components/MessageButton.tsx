"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send, Loader2, X } from "lucide-react";
import { startThread } from "../actions/messages";

export default function MessageButton({
  listingId,
  listingTitle,
  loggedIn,
}: {
  listingId: string;
  listingTitle: string;
  loggedIn: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onOpen = () => {
    if (!loggedIn) {
      if (confirm("Mesaj göndermek için giriş yapın. Giriş sayfasına gidilsin mi?")) router.push("/estate/login");
      return;
    }
    setOpen(true);
  };

  const onSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const body = String(new FormData(e.currentTarget).get("body") || "");
    if (!body.trim()) return;
    setBusy(true);
    setErr(null);
    const res = await startThread(listingId, body);
    setBusy(false);
    if ((res as any)?.error) {
      setErr((res as any).error);
      return;
    }
    setOpen(false);
    router.push(`/sahibinden/mesajlar/${(res as any).threadId}`);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <MessageCircle className="h-4 w-4 text-amber-500" /> Mesaj gönder
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">İlan sahibine mesaj</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <p className="mb-3 line-clamp-1 text-xs text-slate-500">{listingTitle}</p>
            <form onSubmit={onSend} className="space-y-2.5">
              <textarea
                name="body"
                rows={4}
                required
                autoFocus
                defaultValue={`Merhaba, "${listingTitle}" ilanı hâlâ mevcut mu?`}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
              {err && <p className="text-sm font-medium text-rose-600">{err}</p>}
              <button type="submit" disabled={busy} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-white shadow-lg shadow-amber-500/25 disabled:opacity-60">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {busy ? "Gönderiliyor…" : "Gönder"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
