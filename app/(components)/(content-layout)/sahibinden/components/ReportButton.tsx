"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, X, Loader2, CheckCircle2 } from "lucide-react";
import { reportListing, REPORT_REASONS } from "../actions/reports";

export default function ReportButton({ listingId, loggedIn }: { listingId: string; loggedIn: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setErr(null);
    const res = await reportListing(listingId, String(fd.get("reason") || ""), String(fd.get("details") || ""));
    setBusy(false);
    if ((res as any)?.error) {
      setErr((res as any).error);
      return;
    }
    setDone(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full items-center justify-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-rose-500"
      >
        <Flag className="h-3.5 w-3.5" /> İlanı şikayet et
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-slate-900"><Flag className="h-4 w-4 text-rose-500" /> İlanı şikayet et</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>

            {done ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-500" />
                <p className="font-bold text-slate-800">Şikayetiniz alındı</p>
                <p className="mt-1 text-sm text-slate-500">İncelenmek üzere ekibimize iletildi. Teşekkürler.</p>
                <button onClick={() => setOpen(false)} className="mt-4 rounded-xl bg-slate-800 px-5 py-2 text-sm font-semibold text-white">Kapat</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Şikayet nedeni</label>
                  <select name="reason" required defaultValue="" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20">
                    <option value="" disabled>Seçiniz…</option>
                    {REPORT_REASONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
                <textarea name="details" rows={3} placeholder="Açıklama (opsiyonel)" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
                {!loggedIn && <p className="text-[11px] text-slate-400">Giriş yapmadan da şikayet edebilirsiniz.</p>}
                {err && <p className="text-sm font-medium text-rose-600">{err}</p>}
                <button type="submit" disabled={busy} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 font-bold text-white shadow-lg shadow-rose-600/20 disabled:opacity-60">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flag className="h-4 w-4" />}
                  {busy ? "Gönderiliyor…" : "Şikayeti Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
