"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitInquiry } from "../actions/inquiry";

export default function InquiryForm({
  listingId,
  listingTitle,
  allowOffer = true,
}: {
  listingId: string;
  listingTitle: string;
  allowOffer?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setErr(null);
    const res = await submitInquiry({
      listingId,
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || "") || undefined,
      message: String(fd.get("message") || "") || undefined,
      offerAmount: fd.get("offer") ? Number(fd.get("offer")) : null,
    });
    setBusy(false);
    if ((res as any)?.error) setErr((res as any).error);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-500" />
        <p className="font-bold text-emerald-800">Talebiniz iletildi!</p>
        <p className="mt-1 text-sm text-emerald-600">İlan sahibi en kısa sürede sizinle iletişime geçecek.</p>
      </div>
    );
  }

  const inp =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <p className="text-sm font-semibold text-slate-800">İlan sahibine mesaj gönder</p>
      <input name="name" required placeholder="Ad Soyad *" className={inp} />
      <input name="phone" required placeholder="Telefon *" inputMode="tel" className={inp} />
      <input name="email" type="email" placeholder="E-posta (opsiyonel)" className={inp} />
      {allowOffer && (
        <input name="offer" type="number" placeholder="Teklifiniz (₺, opsiyonel)" className={inp} />
      )}
      <textarea
        name="message"
        rows={3}
        defaultValue={`"${listingTitle}" ilanı hakkında bilgi almak istiyorum.`}
        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
      />
      {err && <p className="text-sm font-medium text-rose-600">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-white shadow-lg shadow-amber-500/25 transition hover:opacity-95 disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {busy ? "Gönderiliyor…" : "Mesaj Gönder"}
      </button>
      <p className="text-center text-[11px] text-slate-400">
        Bilgileriniz yalnızca ilan sahibiyle paylaşılır.
      </p>
    </form>
  );
}
