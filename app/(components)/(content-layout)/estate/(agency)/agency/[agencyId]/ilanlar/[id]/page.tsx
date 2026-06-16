import { getAgencyByIdOrSlug } from "../../../../../actions/agencies";
import { getPublicListingDetail } from "../../../../../actions/listings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Home, Maximize, BedDouble, Bath, Phone, Mail, CheckCircle2, Tag } from "lucide-react";
import ListingLeadForm from "../../../../../components/public/ListingLeadForm";
import ListingMiniMap from "../../../../../components/public/ListingMiniMap";
import MortgageCalculator from "../../../../../components/public/MortgageCalculator";
import { Metadata } from "next";

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getPublicListingDetail(id);
  return { title: data?.listing.title ?? "İlan" };
}

export default async function PublicListingDetailPage({
  params,
}: {
  params: Promise<{ agencyId: string; id: string }>;
}) {
  const { agencyId, id } = await params;
  const [agency, data] = await Promise.all([
    getAgencyByIdOrSlug(agencyId),
    getPublicListingDetail(id),
  ]);

  if (!agency || !agency.siteEnabled || !data) return notFound();

  const { listing, property, agent } = data;
  const images = property?.images ?? [];
  const cover = images.find((i) => i.isCover)?.url ?? images[0]?.url;
  const rest = images.filter((i) => i.url !== cover).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst bar */}
      <div className="bg-[#0F2F56] text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {agency.logo && <img src={agency.logo} alt={agency.name} className="h-9 object-contain" />}
            <p className="font-bold">{agency.name}</p>
          </div>
          <Link href={`/estate/agency/${agencyId}/ilanlar`} className="text-sm text-white/80 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> İlanlara dön
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SOL: içerik */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galeri */}
          <div className="space-y-2">
            <div className="relative h-72 sm:h-96 w-full bg-gray-100 rounded-2xl overflow-hidden">
              {cover ? (
                <img src={cover} alt={listing.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center"><Home className="w-12 h-12 text-gray-300" /></div>
              )}
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {listingTypeLabel[listing.listingType] ?? listing.listingType}
              </span>
            </div>
            {rest.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {rest.map((im, i) => (
                  <div key={i} className="h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img src={im.url} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Başlık + konum */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold">{listing.title}</h1>
            {property && (
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                {property.neighborhood && `${property.neighborhood}, `}{property.district}, {property.city}
              </p>
            )}
            <p className="text-xs text-muted-foreground">İlan No: {listing.listingNo}</p>
          </div>

          {/* Özellikler */}
          {property && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.propertyType && (
                <Spec icon={<Home className="w-4 h-4" />} label="Tip" value={propertyTypeLabel[property.propertyType] ?? property.propertyType} />
              )}
              {property.roomCount && <Spec icon={<BedDouble className="w-4 h-4" />} label="Oda" value={property.roomCount} />}
              {property.grossArea && <Spec icon={<Maximize className="w-4 h-4" />} label="Brüt" value={`${property.grossArea} m²`} />}
              {property.bathroomCount != null && <Spec icon={<Bath className="w-4 h-4" />} label="Banyo" value={String(property.bathroomCount)} />}
            </div>
          )}

          {/* Açıklama */}
          {(listing.description || property?.description) && (
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Açıklama</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {listing.description || property?.description}
              </p>
            </div>
          )}

          {/* Öne çıkanlar */}
          {listing.highlights && listing.highlights.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Öne Çıkanlar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Harita */}
          {property?.latitude != null && property?.longitude != null && (
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Konum</h2>
              <ListingMiniMap lat={property.latitude} lng={property.longitude} title={listing.title} />
            </div>
          )}
        </div>

        {/* SAĞ: fiyat + danışman + iletişim + hesaplayıcı */}
        <div className="space-y-5">
          {/* Fiyat */}
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-muted-foreground flex items-center gap-1"><Tag className="w-4 h-4 text-blue-600" /> Fiyat</p>
            <p className="text-3xl font-extrabold text-blue-600">
              {listing.askingPrice.toLocaleString("tr-TR")} {listing.currency}
            </p>
            {listing.monthlyRent && (
              <p className="text-sm text-muted-foreground">Aylık kira: {listing.monthlyRent.toLocaleString("tr-TR")} {listing.currency}</p>
            )}
            {listing.isNegotiable && <p className="text-xs text-green-600 mt-1">Pazarlık payı var</p>}
          </div>

          {/* Danışman */}
          {agent && (
            <div className="rounded-2xl border bg-white p-5 space-y-3">
              <div className="flex items-center gap-3">
                {agent.imageUrl ? (
                  <img src={agent.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 grid place-items-center text-blue-600 font-bold">
                    {agent.firstName?.[0]}{agent.lastName?.[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{agent.firstName} {agent.lastName}</p>
                  <p className="text-xs text-muted-foreground">Danışman</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                {agent.phone && <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline"><Phone className="w-4 h-4" /> {agent.phone}</a>}
                {agent.email && <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-blue-600 hover:underline"><Mail className="w-4 h-4" /> {agent.email}</a>}
              </div>
            </div>
          )}

          {/* Lead formu */}
          <ListingLeadForm agencyId={listing.agencyId} listingTitle={listing.title} listingType={listing.listingType} />

          {/* Kredi hesaplayıcı (satılık için) */}
          {listing.listingType === "SALE" && (
            <MortgageCalculator price={listing.askingPrice} currency={listing.currency} />
          )}
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="flex items-center justify-center text-blue-600 mb-1">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
}
