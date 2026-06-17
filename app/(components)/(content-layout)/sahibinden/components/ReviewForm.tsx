"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { addReview } from "../actions/reviews";

export default function ReviewForm({ targetUserId, loggedIn }: { targetUserId: string; loggedIn: boolean }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
        <CheckCircle2 className="h-5 w-5" /> Değerlendirmeniz kaydedildi. Teşekkürler!
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggedIn) {
      if (confirm("Değerlendirme için giriş yapın. Giriş sayfasına gidilsin mi?")) router.push("/estate/login");
      return;
    }
    if (rating < 1) { setErr("Lütfen yıldız seçin."); return; }
    setBusy(true);
    setErr(null);
    const comment = String(new FormData(e.currentTarget).get("comment") || "");
    const res = await addReview(targetUserId, rating, comment);
    setBusy(false);
    if ((res as any)?.error) { setErr((res as any).error); return; }
    setDone(true);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-bold text-slate-800">Bu satıcıyı değerlendir</p>
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i)}
            className="p-0.5"
            aria-label={`${i} yıldız`}
          >
            <Star className={`h-7 w-7 transition ${i <= (hover || rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
          </button>
        ))}
      </div>
      <textarea
        name="comment"
        rows={2}
        placeholder="Deneyiminizi yazın (opsiyonel)"
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
      />
      {err && <p className="mt-1 text-sm font-medium text-rose-600">{err}</p>}
      <button type="submit" disabled={busy} className="mt-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 text-sm font-bold text-white shadow disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4" />} Değerlendir
      </button>
    </form>
  );
}
