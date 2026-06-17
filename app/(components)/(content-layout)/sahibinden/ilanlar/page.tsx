import Link from "next/link";
import { SearchX, LayoutGrid, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";
import SearchForm from "../components/SearchForm";
import ListingCard from "../components/ListingCard";
import SaveSearchButton from "../components/SaveSearchButton";
import Pagination from "../components/Pagination";
import MapResults from "../components/MapResults";
import CategoryTree from "../components/CategoryTree";
import { getMarketplacePage, getMarketplaceCities, getFacetCounts, type MarketFilters } from "../actions/listings";
import { getMyFavoriteIds } from "../actions/favorites";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İlanlar — sahibinden",
  description: "Satılık ve kiralık emlak ilanlarını şehir, fiyat, oda ve özelliklere göre filtreleyin.",
};

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const arr = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);
const num = (v: string | string[] | undefined) => (first(v) ? Number(first(v)) : undefined);

export default async function MarketSearchPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(first(sp.page)) || 1);
  const view = first(sp.view) === "map" ? "map" : "list";

  const filters: MarketFilters = {
    listingType: first(sp.type),
    propertyType: first(sp.ptype),
    subType: first(sp.sub),
    city: first(sp.city),
    district: first(sp.district),
    minPrice: num(sp.min),
    maxPrice: num(sp.max),
    rooms: first(sp.rooms),
    minArea: num(sp.minArea),
    maxArea: num(sp.maxArea),
    amenities: arr(sp.am),
    features: arr(sp.feat),
    facing: arr(sp.facing),
    buildStatus: first(sp.build),
    deedStatus: first(sp.deed),
    usageStatus: first(sp.usage),
    creditEligible: first(sp.credit) === "1",
    furnished: first(sp.furnished) === "1",
    inSite: first(sp.site) === "1",
    verified: first(sp.verified) === "1",
    q: first(sp.q),
    sort: first(sp.sort),
    minLat: num(sp.minLat),
    maxLat: num(sp.maxLat),
    minLng: num(sp.minLng),
    maxLng: num(sp.maxLng),
  };

  const [{ items, total, pages }, cities, favIds, counts] = await Promise.all([
    getMarketplacePage(filters, page, view === "map" ? 300 : 12),
    getMarketplaceCities(),
    getMyFavoriteIds(),
    getFacetCounts(filters),
  ]);
  const favSet = new Set(favIds);
  const hasFilters = Object.values(filters).some((v) => (Array.isArray(v) ? v.length : v));
  const inArea = filters.minLat != null;

  const qs = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    Object.entries(sp).forEach(([k, v]) => {
      if (k === "page" || k === "view") return;
      arr(v).forEach((x) => p.append(k, x));
    });
    Object.entries(over).forEach(([k, v]) => v != null && p.set(k, String(v)));
    return `/sahibinden/ilanlar?${p.toString()}`;
  };

  const toggle = "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      {/* Başlık + görünüm */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">İlanlar</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            <b className="text-slate-900">{total.toLocaleString("tr-TR")}</b> ilan bulundu
            {inArea && <span className="ml-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">harita alanında</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <SaveSearchButton
              filters={{
                listingType: filters.listingType, propertyType: filters.propertyType, city: filters.city,
                minPrice: filters.minPrice ?? null, maxPrice: filters.maxPrice ?? null, rooms: filters.rooms, q: filters.q,
              }}
            />
          )}
          <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <Link href={qs({ view: undefined })} className={`${toggle} ${view === "list" ? "bg-amber-500 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
              <LayoutGrid className="h-4 w-4" /> Liste
            </Link>
            <Link href={qs({ view: "map" })} className={`${toggle} ${view === "map" ? "bg-amber-500 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
              <MapIcon className="h-4 w-4" /> Harita
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SearchForm sp={sp} cities={cities} />
      </div>

      {/* Mobil: kategori ağacı açılır */}
      <details className="mt-4 lg:hidden">
        <summary className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
          <SlidersHorizontal className="h-4 w-4 text-amber-500" /> Kategoriler & Durum
        </summary>
        <div className="mt-2">
          <CategoryTree sp={sp} counts={counts} />
        </div>
      </details>

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* Masaüstü kategori sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <CategoryTree sp={sp} counts={counts} />
          </div>
        </aside>

        {/* Sonuçlar */}
        <div className="min-w-0">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <SearchX className="mx-auto mb-3 h-12 w-12 text-slate-300" />
              <p className="font-semibold text-slate-700">Aramanıza uygun ilan bulunamadı</p>
              <p className="mt-1 text-sm text-slate-500">Filtreleri genişletmeyi veya farklı bir şehir denemeyi deneyin.</p>
              {inArea && (
                <Link href={qs({ minLat: undefined, maxLat: undefined, minLng: undefined, maxLng: undefined })} className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white">
                  Harita alan filtresini kaldır
                </Link>
              )}
            </div>
          ) : view === "map" ? (
            <MapResults listings={items as any[]} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {items.map((l) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
              </div>
              <Pagination page={page} pages={pages} hrefFor={(p) => qs({ page: p })} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
