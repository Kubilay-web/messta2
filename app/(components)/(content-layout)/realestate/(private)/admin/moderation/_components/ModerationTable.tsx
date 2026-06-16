"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, X, Building2, ExternalLink } from "lucide-react";
import { moderateListing } from "../../../../actions/moderation";
import {
  propertyTypeLabel, listingTypeLabel, listingPrice, locationText,
} from "../../../_components/market/labels";

type Row = {
  id: string;
  title: string;
  listingType: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
  property?: {
    city?: string | null;
    district?: string | null;
    propertyType?: string | null;
    roomCount?: string | null;
    ownerName?: string | null;
    ownerPhone?: string | null;
    images?: { url: string }[];
  } | null;
};

export default function ModerationTable({ listings }: { listings: Row[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const decide = async (id: string, decision: "APPROVED" | "REJECTED") => {
    setBusy(id);
    const res = await moderateListing(id, decision);
    setBusy(null);
    if (res?.error) alert(res.error);
    else router.refresh();
  };

  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
        <Check className="mx-auto mb-2 h-10 w-10 text-emerald-500 opacity-60" />
        Onay bekleyen ilan yok. Hepsi temiz! 👍
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {listings.map((l) => {
        const cover = l.property?.images?.[0]?.url;
        return (
          <div key={l.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
            <div className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-28">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt={l.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  <Building2 className="h-7 w-7" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold">{l.title}</p>
              <p className="text-sm text-blue-700 font-medium">{listingPrice(l)}</p>
              <p className="text-xs text-gray-500">
                {listingTypeLabel[l.listingType]} ·{" "}
                {l.property?.propertyType ? propertyTypeLabel[l.property.propertyType] : ""} · {locationText(l.property)}
              </p>
              <p className="text-xs text-gray-400">
                {l.property?.ownerName ?? "—"} · {l.property?.ownerPhone ?? "—"}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/realestate/property/${l.id}`} target="_blank" className="flex items-center gap-1 rounded-lg border px-2.5 py-2 text-xs hover:bg-gray-50">
                <ExternalLink className="h-3.5 w-3.5" /> Önizle
              </Link>
              <button onClick={() => decide(l.id, "REJECTED")} disabled={busy === l.id} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50">
                <X className="h-4 w-4" /> Reddet
              </button>
              <button onClick={() => decide(l.id, "APPROVED")} disabled={busy === l.id} className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
                <Check className="h-4 w-4" /> Onayla
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
