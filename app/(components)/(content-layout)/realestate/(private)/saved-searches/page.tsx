import Link from "next/link";
import { Bookmark, ArrowRight, Search } from "lucide-react";
import MarketShell from "../_components/market/MarketShell";
import { getMySavedSearches } from "../../actions/favorites";
import SavedSearchRow from "../_components/market/SavedSearchRow";
import { propertyTypeLabel, listingTypeLabel } from "../_components/market/labels";
import { requireRealestateUser } from "../../lib/auth";

export const dynamic = "force-dynamic";

function toQuery(s: any) {
  const p = new URLSearchParams();
  if (s.listingType) p.set("type", s.listingType);
  if (s.propertyType) p.set("ptype", s.propertyType);
  if (s.city) p.set("city", s.city);
  if (s.minPrice != null) p.set("min", String(s.minPrice));
  if (s.maxPrice != null) p.set("max", String(s.maxPrice));
  if (s.rooms) p.set("rooms", s.rooms);
  if (s.q) p.set("q", s.q);
  return `/realestate/ilanlar?${p.toString()}`;
}

function summary(s: any) {
  return (
    [
      s.listingType && listingTypeLabel[s.listingType],
      s.propertyType && propertyTypeLabel[s.propertyType],
      s.city,
      s.rooms,
      (s.minPrice || s.maxPrice) && `${s.minPrice ?? 0} – ${s.maxPrice ?? "∞"}`,
      s.q && `"${s.q}"`,
    ]
      .filter(Boolean)
      .join(" · ") || "Tüm ilanlar"
  );
}

export default async function SavedSearchesPage() {
  await requireRealestateUser();
  const searches = await getMySavedSearches();

  return (
    <MarketShell>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
            <Bookmark className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Kayıtlı Aramalarım</h1>
            <p className="text-sm text-slate-500">{searches.length} arama</p>
          </div>
        </div>

        {searches.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <Search className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="font-semibold text-slate-700">Henüz kayıtlı arama yok</p>
            <p className="mt-1 text-sm text-slate-500">İlanlar sayfasında filtre uygulayıp “Aramayı kaydet” ile ekleyin.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {searches.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <Link href={toQuery(s)} className="group min-w-0 flex-1">
                  <p className="font-bold text-slate-900 group-hover:text-blue-600">{s.name}</p>
                  <p className="truncate text-xs text-slate-500">{summary(s)}</p>
                </Link>
                <div className="flex items-center gap-2">
                  <Link href={toQuery(s)} className="flex items-center gap-1 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow">
                    Aç <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <SavedSearchRow id={s.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MarketShell>
  );
}
