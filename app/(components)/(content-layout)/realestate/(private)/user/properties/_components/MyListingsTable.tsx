"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Eye, MessageSquare, Building2, Sparkles, Clock, CheckCircle2, XCircle } from "lucide-react";
import { deleteMyListing, promoteMyListing } from "../../../../actions/my-listings";
import {
  propertyTypeLabel,
  listingTypeLabel,
  listingTypeBadge,
  listingPrice,
  locationText,
} from "../../../_components/market/labels";

type Row = {
  id: string;
  title: string;
  listingType: string;
  status: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
  views?: number;
  moderationStatus?: string;
  featuredUntil?: string | Date | null;
  property?: {
    city?: string | null;
    district?: string | null;
    propertyType?: string | null;
    roomCount?: string | null;
    images?: { url: string }[];
  } | null;
  _count?: { crmLeads: number };
};

const modBadge: Record<string, { label: string; cls: string; Icon: any }> = {
  PENDING: { label: "Onay bekliyor", cls: "bg-amber-100 text-amber-700", Icon: Clock },
  APPROVED: { label: "Yayında", cls: "bg-emerald-100 text-emerald-700", Icon: CheckCircle2 },
  REJECTED: { label: "Reddedildi", cls: "bg-red-100 text-red-700", Icon: XCircle },
};

export default function MyListingsTable({ listings }: { listings: Row[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Bu ilan silinsin mi? Geri alınamaz.")) return;
    setBusy(id);
    const res = await deleteMyListing(id);
    setBusy(null);
    if (res?.error) alert(res.error);
    else router.refresh();
  };

  const promote = async (id: string) => {
    if (!confirm("Bu ilan 7 gün boyunca öne çıkarılsın mı?")) return;
    setBusy(id);
    const res = await promoteMyListing(id, 7);
    setBusy(null);
    if (res?.error) alert(res.error);
    else router.refresh();
  };

  const isFeatured = (l: Row) => l.featuredUntil != null && new Date(l.featuredUntil) > new Date();

  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
        <Building2 className="mx-auto mb-2 h-10 w-10 opacity-30" />
        Henüz ilanınız yok. “Yeni İlan Ver” ile başlayın.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => {
        const cover = l.property?.images?.[0]?.url;
        return (
          <div key={l.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-[16/10] bg-gray-100">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt={l.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  <Building2 className="h-9 w-9" />
                </div>
              )}
              <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white ${listingTypeBadge[l.listingType] ?? "bg-gray-700"}`}>
                {listingTypeLabel[l.listingType] ?? l.listingType}
              </span>
              {(() => {
                const m = modBadge[l.moderationStatus ?? "APPROVED"] ?? modBadge.APPROVED;
                const Icon = m.Icon;
                return (
                  <span className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${m.cls}`}>
                    <Icon className="h-3 w-3" /> {m.label}
                  </span>
                );
              })()}
              {isFeatured(l) && (
                <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                  <Sparkles className="h-3 w-3" /> Öne çıkan
                </span>
              )}
            </div>

            <div className="p-3">
              <p className="font-bold text-blue-700">{listingPrice(l)}</p>
              <h3 className="line-clamp-1 text-sm font-semibold">{l.title}</h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                {l.property?.propertyType ? `${propertyTypeLabel[l.property.propertyType]} · ` : ""}
                {locationText(l.property)}
              </p>

              <div className="mt-2 flex items-center gap-3 border-t pt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {l.views ?? 0}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {l._count?.crmLeads ?? 0} talep</span>
              </div>

              <div className="mt-3 flex gap-1.5">
                <Link href={`/realestate/property/${l.id}`} target="_blank" className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-xs hover:bg-gray-50">
                  <Eye className="h-3.5 w-3.5" /> Gör
                </Link>
                <Link href={`/realestate/user/properties/edit-property/${l.id}`} className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-xs hover:bg-gray-50">
                  <Pencil className="h-3.5 w-3.5" /> Düzenle
                </Link>
                <button onClick={() => remove(l.id)} disabled={busy === l.id} className="flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {!isFeatured(l) && (
                <button onClick={() => promote(l.id)} disabled={busy === l.id} className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-violet-50 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-50">
                  <Sparkles className="h-3.5 w-3.5" /> 7 gün öne çıkar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
