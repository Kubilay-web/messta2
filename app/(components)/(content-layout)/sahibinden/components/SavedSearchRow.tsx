"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Search, Loader2, Bell, BellOff } from "lucide-react";
import { deleteSavedSearch, setSearchNotify } from "../actions/searches";
import { PROPERTY_TYPE_LABEL, LISTING_TYPE_LABEL } from "../lib/format";

type Saved = {
  id: string;
  name: string;
  listingType: string | null;
  propertyType: string | null;
  city: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rooms: string | null;
  q: string | null;
  notify?: boolean;
};

export default function SavedSearchRow({ s }: { s: Saved }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [notify, setNotify] = useState(s.notify ?? true);
  const [notifyBusy, setNotifyBusy] = useState(false);

  const toggleNotify = async () => {
    if (notifyBusy) return;
    setNotifyBusy(true);
    const next = !notify;
    setNotify(next);
    await setSearchNotify(s.id, next);
    setNotifyBusy(false);
  };

  const href = (() => {
    const p = new URLSearchParams();
    if (s.listingType) p.set("type", s.listingType);
    if (s.propertyType) p.set("ptype", s.propertyType);
    if (s.city) p.set("city", s.city);
    if (s.minPrice != null) p.set("min", String(s.minPrice));
    if (s.maxPrice != null) p.set("max", String(s.maxPrice));
    if (s.rooms) p.set("rooms", s.rooms);
    if (s.q) p.set("q", s.q);
    return `/sahibinden/ilanlar?${p.toString()}`;
  })();

  const chips = [
    s.listingType && LISTING_TYPE_LABEL[s.listingType],
    s.propertyType && PROPERTY_TYPE_LABEL[s.propertyType],
    s.city,
    s.rooms,
    s.minPrice != null ? `≥ ₺${s.minPrice.toLocaleString("tr-TR")}` : null,
    s.maxPrice != null ? `≤ ₺${s.maxPrice.toLocaleString("tr-TR")}` : null,
    s.q,
  ].filter(Boolean) as string[];

  const onDelete = async () => {
    if (!confirm("Bu kayıtlı aramayı silmek istiyor musunuz?")) return;
    setBusy(true);
    await deleteSavedSearch(s.id);
    setBusy(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <p className="font-bold text-slate-900">{s.name}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {chips.length ? chips.map((c, i) => (
            <span key={i} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{c}</span>
          )) : <span className="text-xs text-slate-400">Tüm ilanlar</span>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={toggleNotify}
          disabled={notifyBusy}
          title={notify ? "E-posta bildirimi açık" : "E-posta bildirimi kapalı"}
          className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
            notify ? "border-amber-200 bg-amber-50 text-amber-600" : "border-slate-200 text-slate-400 hover:bg-slate-50"
          }`}
        >
          {notify ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </button>
        <a href={href} className="flex h-9 items-center gap-1.5 rounded-lg bg-amber-500 px-3 text-sm font-semibold text-white">
          <Search className="h-4 w-4" /> Aç
        </a>
        <button onClick={onDelete} disabled={busy} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
