import { getAgencyByIdOrSlug } from "../../../../actions/agencies";
import { getPublicListings } from "../../../../actions/listings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Search } from "lucide-react";
import ListingsResults from "../../../../components/public/ListingsResults";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlanlar" };

const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

type SP = Record<string, string | undefined>;

export default async function AgencyListingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ agencyId: string }>;
  searchParams: Promise<SP>;
}) {
  const { agencyId } = await params;
  const sp = await searchParams;

  const agency = await getAgencyByIdOrSlug(agencyId);
  if (!agency || !agency.siteEnabled) return notFound();

  const filters = {
    listingType:  sp.type  || undefined,
    propertyType: sp.ptype || undefined,
    city:         sp.city  || undefined,
    minPrice:     sp.min ? Number(sp.min) : undefined,
    maxPrice:     sp.max ? Number(sp.max) : undefined,
    q:            sp.q     || undefined,
  };

  const listings = await getPublicListings(agency.id, filters);
  const basePath = `/estate/agency/${agencyId}/ilanlar`;

  const inputCls =
    "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst bar */}
      <div className="bg-[#0F2F56] text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {agency.logo && <img src={agency.logo} alt={agency.name} className="h-9 object-contain" />}
            <div>
              <p className="font-bold">{agency.name}</p>
              <p className="text-xs text-white/70 flex items-center gap-1"><Building2 className="w-3 h-3" /> Tüm İlanlar</p>
            </div>
          </div>
          <Link href={`/estate/agency/${agencyId}`} className="text-sm text-white/80 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Siteye dön
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Filtre çubuğu */}
        <form method="get" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-white p-3 rounded-2xl border">
          <input type="text" name="q" defaultValue={sp.q ?? ""} placeholder="Ara: başlık…" className={`${inputCls} col-span-2`} />
          <select name="type" defaultValue={sp.type ?? ""} className={inputCls}>
            <option value="">Tümü (tip)</option>
            <option value="SALE">Satılık</option>
            <option value="RENT">Kiralık</option>
            <option value="SHORT_RENT">Kısa Dönem</option>
          </select>
          <select name="ptype" defaultValue={sp.ptype ?? ""} className={inputCls}>
            <option value="">Tümü (konut)</option>
            {Object.entries(propertyTypeLabel).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <input type="text" name="city" defaultValue={sp.city ?? ""} placeholder="Şehir" className={inputCls} />
          <div className="flex gap-2">
            <input type="number" name="min" defaultValue={sp.min ?? ""} placeholder="Min ₺" className={`${inputCls} w-full`} />
            <input type="number" name="max" defaultValue={sp.max ?? ""} placeholder="Max ₺" className={`${inputCls} w-full`} />
          </div>
          <button type="submit" className="col-span-2 sm:col-span-1 lg:col-span-6 h-9 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
            <Search className="w-4 h-4" /> Filtrele
          </button>
        </form>

        {/* Sonuçlar (liste / harita) */}
        {listings.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-700">Kriterlerinize uygun ilan bulunamadı.</p>
          </div>
        ) : (
          <ListingsResults listings={listings as any[]} basePath={basePath} />
        )}
      </div>
    </div>
  );
}
