"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X, Building2, Loader2, ExternalLink, Phone } from "lucide-react";
import { moderateListing } from "../actions/moderation";
import { LISTING_TYPE_LABEL, PROPERTY_TYPE_LABEL, listingPrice, locationText, timeAgo } from "../lib/format";

export default function ModerationRow({ l }: { l: any }) {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "APPROVED" | "REJECTED">(null);
  const [gone, setGone] = useState(false);

  const decide = async (decision: "APPROVED" | "REJECTED") => {
    setBusy(decision);
    const res = await moderateListing(l.id, decision);
    setBusy(null);
    if ((res as any)?.error) {
      alert((res as any).error);
      return;
    }
    setGone(true);
    if (decision === "APPROVED" && (res as any)?.notified?.notifiedUsers) {
      // sessiz: bildirim gönderildi
    }
    router.refresh();
  };

  if (gone) return null;

  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <Link href={`/sahibinden/ilan/${l.id}`} className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {l.property?.images?.[0]?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={l.property.images[0].url} alt={l.title} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-slate-300"><Building2 className="h-7 w-7" /></div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/sahibinden/ilan/${l.id}`} className="flex items-center gap-1 font-bold text-slate-900 hover:text-amber-600">
          <span className="line-clamp-1">{l.title}</span> <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </Link>
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
          {LISTING_TYPE_LABEL[l.listingType]} • {PROPERTY_TYPE_LABEL[l.property?.propertyType ?? ""] ?? "—"} • {locationText(l.property) || "—"}
        </p>
        <p className="mt-1 text-sm font-extrabold text-amber-600">{listingPrice(l)}</p>
        <p className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
          <span>{l.property?.ownerName ?? "İlan sahibi"}</span>
          {l.property?.ownerPhone && <span className="flex items-center gap-0.5"><Phone className="h-3 w-3" /> {l.property.ownerPhone}</span>}
          <span>• {timeAgo(l.createdAt)}</span>
        </p>

        <div className="mt-2 flex gap-2">
          <button onClick={() => decide("APPROVED")} disabled={!!busy} className="flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white disabled:opacity-60">
            {busy === "APPROVED" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Onayla
          </button>
          <button onClick={() => decide("REJECTED")} disabled={!!busy} className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60">
            {busy === "REJECTED" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />} Reddet
          </button>
        </div>
      </div>
    </div>
  );
}
