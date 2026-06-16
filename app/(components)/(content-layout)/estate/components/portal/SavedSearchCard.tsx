"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2, ArrowRight, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { deleteSavedSearch, markSavedSearchSeen } from "../../actions/saved-searches";

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

type Search = {
  id: string;
  name: string;
  listingType: string | null;
  propertyType: string | null;
  city: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  q: string | null;
  total: number;
  fresh: number;
};

export default function SavedSearchCard({ search }: { search: Search }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const href = (() => {
    const p = new URLSearchParams();
    if (search.listingType) p.set("type", search.listingType);
    if (search.propertyType) p.set("ptype", search.propertyType);
    if (search.city) p.set("city", search.city);
    if (search.minPrice != null) p.set("min", String(search.minPrice));
    if (search.maxPrice != null) p.set("max", String(search.maxPrice));
    if (search.q) p.set("q", search.q);
    const qs = p.toString();
    return `/estate/portal/client/listings${qs ? `?${qs}` : ""}`;
  })();

  const chips: string[] = [];
  if (search.listingType) chips.push(listingTypeLabel[search.listingType] ?? search.listingType);
  if (search.propertyType) chips.push(propertyTypeLabel[search.propertyType] ?? search.propertyType);
  if (search.city) chips.push(search.city);
  if (search.minPrice != null || search.maxPrice != null)
    chips.push(`${search.minPrice?.toLocaleString("tr-TR") ?? "0"} – ${search.maxPrice?.toLocaleString("tr-TR") ?? "∞"} ₺`);
  if (search.q) chips.push(`"${search.q}"`);

  async function view() {
    setBusy(true);
    try {
      await markSavedSearchSeen(search.id);
      router.push(href);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Bu kayıtlı aramayı silmek istiyor musunuz?")) return;
    setBusy(true);
    try {
      await deleteSavedSearch(search.id);
      toast.success("Silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-600" />
            <p className="font-semibold text-black">{search.name}</p>
          </div>
          {search.fresh > 0 && (
            <Badge className="bg-red-500 text-white text-[10px]">{search.fresh} yeni</Badge>
          )}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c, i) => (
              <Badge key={i} variant="outline" className="text-[10px] text-black">{c}</Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {search.total} eşleşen ilan{search.fresh > 0 && ` · ${search.fresh} tanesi yeni`}
        </p>

        <div className="flex gap-2 pt-1">
          <button
            onClick={view}
            disabled={busy}
            className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            İlanları Gör <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={remove}
            disabled={busy}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border text-red-600 hover:bg-red-50 disabled:opacity-60"
            title="Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
