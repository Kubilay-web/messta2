import { validateRequest } from "@/app/auth";
import { getClientFromUserId } from "../../../../actions/client-portal";
import { getPublicListings } from "../../../../actions/listings";
import { getClientInterestListingIds } from "../../../../actions/client-interests";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Building2, Heart, MapPin, Home, Search } from "lucide-react";
import SaveSearchButton from "../../../../components/portal/SaveSearchButton";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlanlar - Müşteri Portalı" };

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

type SP = Record<string, string | undefined>;

export default async function ClientListingsPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const sp = await searchParams;
  const filters = {
    listingType:  sp.type  || undefined,
    propertyType: sp.ptype || undefined,
    city:         sp.city  || undefined,
    minPrice:     sp.min ? Number(sp.min) : undefined,
    maxPrice:     sp.max ? Number(sp.max) : undefined,
    q:            sp.q     || undefined,
  };

  const [listings, favIds] = await Promise.all([
    client.agencyId ? getPublicListings(client.agencyId, filters) : Promise.resolve([]),
    getClientInterestListingIds(client.id),
  ]);
  const favSet = new Set(favIds);

  const inputCls =
    "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-black focus:border-blue-500 focus:outline-none";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-black">İlanlar</h1>
          <Badge variant="secondary" className="text-xs text-black">{listings.length}</Badge>
        </div>
        <SaveSearchButton clientId={client.id} filters={filters} />
      </div>

      {/* Filtre çubuğu (sunucu tarafı GET) */}
      <form method="get" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <input
          type="text" name="q" defaultValue={sp.q ?? ""}
          placeholder="Ara: başlık…"
          className={`${inputCls} col-span-2 lg:col-span-2`}
        />
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
        <input
          type="text" name="city" defaultValue={sp.city ?? ""}
          placeholder="Şehir"
          className={inputCls}
        />
        <div className="flex gap-2">
          <input
            type="number" name="min" defaultValue={sp.min ?? ""}
            placeholder="Min ₺"
            className={`${inputCls} w-full`}
          />
          <input
            type="number" name="max" defaultValue={sp.max ?? ""}
            placeholder="Max ₺"
            className={`${inputCls} w-full`}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 sm:col-span-1 lg:col-span-6 h-9 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Search className="w-4 h-4" /> Filtrele
        </button>
      </form>

      {/* Sonuçlar */}
      {listings.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-black">Kriterlerinize uygun ilan bulunamadı.</p>
            <p className="text-xs text-gray-400 mt-1">Filtreleri değiştirip tekrar deneyin.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((l) => {
            const p     = l.property;
            const cover = p?.images?.[0]?.url;
            const fav   = favSet.has(l.id);
            return (
              <Link key={l.id} href={`/estate/portal/client/listing/${l.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="relative h-44 w-full bg-gray-100">
                    {cover ? (
                      <Image src={cover} alt={l.title} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Home className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 text-[10px] bg-blue-600">
                      {listingTypeLabel[l.listingType] ?? l.listingType}
                    </Badge>
                    {fav && (
                      <span className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm font-semibold text-black line-clamp-2">{l.title}</p>
                    {p && (
                      <p className="text-xs text-black flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                        {p.neighborhood && `${p.neighborhood}, `}{p.district}, {p.city}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {p?.propertyType && (
                        <Badge variant="outline" className="text-[10px] text-black">
                          {propertyTypeLabel[p.propertyType] ?? p.propertyType}
                        </Badge>
                      )}
                      {p?.roomCount && (
                        <Badge variant="outline" className="text-[10px] text-black">{p.roomCount}</Badge>
                      )}
                      {p?.grossArea && (
                        <Badge variant="outline" className="text-[10px] text-black">{p.grossArea} m²</Badge>
                      )}
                    </div>
                    <p className="text-lg font-extrabold text-blue-600">
                      {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                      {l.monthlyRent && (
                        <span className="text-xs font-normal text-black"> · {l.monthlyRent.toLocaleString("tr-TR")}/ay</span>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
