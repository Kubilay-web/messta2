import Link from "next/link";
import { ChevronLeft, ChevronRight, Map as MapIcon, LayoutGrid, SearchX } from "lucide-react";
import MarketShell from "../_components/market/MarketShell";
import SearchForm from "../_components/market/SearchForm";
import ListingCard from "../_components/market/ListingCard";
import MapResults from "../_components/market/MapResults";
import SaveSearchButton from "../_components/market/SaveSearchButton";
import { getMarketplacePage, getMarketplaceCities } from "../../actions/marketplace";
import { getMyFavoriteIds } from "../../actions/favorites";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İlanlar — EmlakPazarı",
  description: "Satılık ve kiralık emlak ilanlarını şehir, fiyat, oda ve özelliklere göre filtreleyin; harita üzerinde keşfedin.",
};

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const arr = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

export default async function MarketSearchPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(first(sp.page)) || 1);
  const view = first(sp.view) === "map" ? "map" : "list";

  const filters = {
    listingType: first(sp.type),
    propertyType: first(sp.ptype),
    city: first(sp.city),
    minPrice: first(sp.min) ? Number(first(sp.min)) : undefined,
    maxPrice: first(sp.max) ? Number(first(sp.max)) : undefined,
    rooms: first(sp.rooms),
    minArea: first(sp.minArea) ? Number(first(sp.minArea)) : undefined,
    maxArea: first(sp.maxArea) ? Number(first(sp.maxArea)) : undefined,
    amenities: arr(sp.am),
    sort: first(sp.sort),
  };

  const [{ items, total, pages }, cities, favIds] = await Promise.all([
    getMarketplacePage(filters, page, view === "map" ? 200 : 12),
    getMarketplaceCities(),
    getMyFavoriteIds(),
  ]);
  const favSet = new Set(favIds);
  const hasFilters = Object.values(filters).some((v) => (Array.isArray(v) ? v.length : v));

  const qs = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    Object.entries(sp).forEach(([k, v]) => {
      if (k === "page" || k === "view") return;
      arr(v).forEach((x) => p.append(k, x));
    });
    Object.entries(over).forEach(([k, v]) => v != null && p.set(k, String(v)));
    return `/realestate/ilanlar?${p.toString()}`;
  };

  const pill = "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition";

  return (
    <MarketShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        {/* Başlık + görünüm */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">İlanlar</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              <b className="text-slate-900">{total}</b> ilan bulundu
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <SaveSearchButton
                filters={{
                  listingType: filters.listingType, propertyType: filters.propertyType, city: filters.city,
                  minPrice: filters.minPrice, maxPrice: filters.maxPrice, rooms: filters.rooms, q: first(sp.q),
                }}
              />
            )}
            <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <Link href={qs({ view: undefined })} className={`${pill} ${view === "list" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
                <LayoutGrid className="h-4 w-4" /> Liste
              </Link>
              <Link href={qs({ view: "map" })} className={`${pill} ${view === "map" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
                <MapIcon className="h-4 w-4" /> Harita
              </Link>
            </div>
          </div>
        </div>

        <SearchForm sp={sp} cities={cities} />

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <SearchX className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="font-semibold text-slate-700">Aramanıza uygun ilan bulunamadı</p>
            <p className="mt-1 text-sm text-slate-500">Filtreleri genişletmeyi veya farklı bir şehir denemeyi deneyin.</p>
          </div>
        ) : view === "map" ? (
          <MapResults listings={items as any[]} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((l) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
            </div>

            {pages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-4">
                {page > 1 && (
                  <Link href={qs({ page: page - 1 })} className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-slate-50">
                    <ChevronLeft className="h-4 w-4" /> Önceki
                  </Link>
                )}
                {Array.from({ length: pages }, (_, i) => i + 1)
                  .filter((n) => Math.abs(n - page) <= 2 || n === 1 || n === pages)
                  .map((n, i, a) => (
                    <span key={n} className="flex items-center">
                      {i > 0 && a[i - 1] !== n - 1 && <span className="px-1 text-slate-400">…</span>}
                      <Link href={qs({ page: n })} className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold shadow-sm ${n === page ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                        {n}
                      </Link>
                    </span>
                  ))}
                {page < pages && (
                  <Link href={qs({ page: page + 1 })} className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-slate-50">
                    Sonraki <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </MarketShell>
  );
}
