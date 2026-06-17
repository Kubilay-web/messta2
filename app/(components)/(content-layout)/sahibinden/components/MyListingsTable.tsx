"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye, Heart, MessageSquare, Pencil, Trash2, Rocket, Power, Building2, Loader2, MoreVertical, RefreshCw, Clock,
} from "lucide-react";
import { deleteMyListing, setListingStatus, bumpListing } from "../actions/my-listings";
import { LISTING_TYPE_LABEL, listingPrice, locationText, PROPERTY_TYPE_LABEL } from "../lib/format";

type Row = {
  id: string;
  title: string;
  listingType: string;
  status: string;
  askingPrice: number;
  currency: string | null;
  monthlyRent: number | null;
  views: number;
  moderationStatus: string;
  featuredUntil: Date | string | null;
  expiresAt?: Date | string | null;
  property: {
    city: string | null;
    district: string | null;
    propertyType: string | null;
    roomCount: string | null;
    images: { url: string }[];
  } | null;
  _count: { crmLeads: number; favorites: number };
};

function ModBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    APPROVED: ["Yayında", "bg-emerald-50 text-emerald-600"],
    PENDING: ["Onay bekliyor", "bg-amber-50 text-amber-600"],
    REJECTED: ["Reddedildi", "bg-rose-50 text-rose-600"],
  };
  const [label, cls] = map[status] ?? ["—", "bg-slate-100 text-slate-500"];
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${cls}`}>{label}</span>;
}

export default function MyListingsTable({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const run = async (id: string, fn: () => Promise<any>) => {
    setBusyId(id);
    const res = await fn();
    setBusyId(null);
    setOpenId(null);
    if (res?.error) alert(res.error);
    else router.refresh();
  };

  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <Building2 className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <p className="font-semibold text-slate-700">Henüz ilanınız yok</p>
        <Link href="/sahibinden/ilan-ver" className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white">İlk ilanını ver</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const featured = r.featuredUntil && new Date(r.featuredUntil) > new Date();
        const busy = busyId === r.id;
        return (
          <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex gap-3">
              <Link href={`/sahibinden/ilan/${r.id}`} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {r.property?.images?.[0]?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.property.images[0].url} alt={r.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-slate-300"><Building2 className="h-7 w-7" /></div>
                )}
                {featured && <span className="absolute left-1 top-1 rounded bg-amber-500 px-1 py-0.5 text-[9px] font-bold text-white">Vitrin</span>}
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/sahibinden/ilan/${r.id}`} className="line-clamp-1 font-bold text-slate-900 hover:text-amber-600">{r.title}</Link>
                  <div className="relative shrink-0">
                    <button onClick={() => setOpenId(openId === r.id ? null : r.id)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100">
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4 text-slate-500" />}
                    </button>
                    {openId === r.id && (
                      <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                        <Link href={`/sahibinden/hesabim/ilan/${r.id}/duzenle`} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <Pencil className="h-4 w-4" /> Düzenle
                        </Link>
                        <button onClick={() => run(r.id, () => bumpListing(r.id))} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <RefreshCw className="h-4 w-4" /> Yenile (öne al)
                        </button>
                        <Link href={`/sahibinden/hesabim/ilan/${r.id}/doping`} className="flex items-center gap-2 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50">
                          <Rocket className="h-4 w-4" /> {featured ? "Vitrini uzat" : "Öne çıkar (Doping)"}
                        </Link>
                        <button
                          onClick={() => run(r.id, () => setListingStatus(r.id, r.status === "ACTIVE" ? "WITHDRAWN" : "ACTIVE"))}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Power className="h-4 w-4" /> {r.status === "ACTIVE" ? "Yayından kaldır" : "Yayına al"}
                        </button>
                        <button
                          onClick={() => { if (confirm("Bu ilanı silmek istediğinize emin misiniz?")) run(r.id, () => deleteMyListing(r.id)); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" /> Sil
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                  {LISTING_TYPE_LABEL[r.listingType]} • {PROPERTY_TYPE_LABEL[r.property?.propertyType ?? ""] ?? "—"} • {locationText(r.property) || "—"}
                </p>
                <p className="mt-1 text-sm font-extrabold text-amber-600">{listingPrice(r)}</p>

                <div className="mt-1.5 flex flex-wrap items-center gap-2.5 text-[11px] text-slate-500">
                  <ModBadge status={r.moderationStatus} />
                  {r.status !== "ACTIVE" && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-bold text-slate-500">Pasif</span>}
                  <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" /> {r.views}</span>
                  <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" /> {r._count.favorites}</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="h-3 w-3" /> {r._count.crmLeads} talep</span>
                  {r.expiresAt && (() => {
                    const days = Math.ceil((new Date(r.expiresAt).getTime() - Date.now()) / 86400000);
                    return (
                      <span className={`flex items-center gap-0.5 ${days <= 7 ? "font-semibold text-rose-500" : ""}`}>
                        <Clock className="h-3 w-3" /> {days > 0 ? `${days} gün kaldı` : "süresi doldu"}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
