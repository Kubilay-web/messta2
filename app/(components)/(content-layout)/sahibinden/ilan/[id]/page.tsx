import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MapPin, BedDouble, Maximize, Bath, Building2, Calendar, ArrowUpDown, Flame, Eye, ChevronRight,
  Layers, BadgeCheck, Video, Compass, TrendingDown, LineChart, ShieldCheck,
} from "lucide-react";
import Gallery from "../../components/Gallery";
import MapEmbed from "../../components/MapEmbed";
import InquiryForm from "../../components/InquiryForm";
import MortgageCalculator from "../../components/MortgageCalculator";
import ShareButton from "../../components/ShareButton";
import ContactReveal from "../../components/ContactReveal";
import FavoriteButton from "../../components/FavoriteButton";
import CompareButton from "../../components/CompareButton";
import RecentTracker from "../../components/RecentTracker";
import RecentlyViewed from "../../components/RecentlyViewed";
import ListingCard from "../../components/ListingCard";
import MessageButton from "../../components/MessageButton";
import ReportButton from "../../components/ReportButton";
import { getMarketUser } from "../../lib/auth";
import {
  getMarketplaceListingDetail, getListingMeta, getSimilarListings, getPriceHistory,
} from "../../actions/listings";
import { getMyFavoriteIds } from "../../actions/favorites";
import { getSellerRating } from "../../actions/reviews";
import StarRating from "../../components/StarRating";
import {
  PROPERTY_TYPE_LABEL, LISTING_TYPE_LABEL, LISTING_TYPE_BADGE, HEATING_LABEL,
  AMENITY_DEFS, formatPrice, listingPrice, locationText, formatDate, timeAgo,
  deedStatusLabel, buildStatusLabel, structureTypeLabel, usageStatusLabel,
  zoningStatusLabel, subTypeLabel, FACING_LABEL,
} from "../../lib/format";
import { groupFeatures } from "../../lib/features";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const l = await getListingMeta(id);
  if (!l) return { title: "İlan bulunamadı — sahibinden" };
  const loc = locationText(l.property);
  return {
    title: `${l.title} — sahibinden`,
    description: `${LISTING_TYPE_LABEL[l.listingType] ?? ""} ${PROPERTY_TYPE_LABEL[l.property?.propertyType ?? ""] ?? ""} ${loc} • ${formatPrice(l.askingPrice, l.currency)}`,
    openGraph: { images: l.property?.images?.[0]?.url ? [l.property.images[0].url] : [] },
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getMarketplaceListingDetail(id);
  if (!data?.listing) notFound();

  const { listing, property, agent } = data;
  const [favIds, similar, priceHistory, marketUser] = await Promise.all([
    getMyFavoriteIds(),
    getSimilarListings(id, property?.city, listing.listingType),
    getPriceHistory(id),
    getMarketUser(),
  ]);
  const isOwnListing = !!marketUser && listing.ownerUserId === marketUser.id;
  const sellerRating = listing.ownerUserId ? await getSellerRating(listing.ownerUserId) : { avg: 0, count: 0 };
  const isFav = favIds.includes(id);
  const priceDropped =
    listing.previousPrice != null && listing.askingPrice != null && listing.askingPrice < listing.previousPrice;

  const specs: { Icon: any; label: string; value: string }[] = [
    property?.roomCount ? { Icon: BedDouble, label: "Oda", value: property.roomCount } : null,
    property?.grossArea != null ? { Icon: Maximize, label: "Brüt m²", value: `${property.grossArea} m²` } : null,
    property?.netArea != null ? { Icon: Maximize, label: "Net m²", value: `${property.netArea} m²` } : null,
    property?.bathroomCount != null ? { Icon: Bath, label: "Banyo", value: String(property.bathroomCount) } : null,
    property?.floorNo != null ? { Icon: ArrowUpDown, label: "Kat", value: String(property.floorNo) } : null,
    property?.totalFloors != null ? { Icon: Layers, label: "Toplam Kat", value: String(property.totalFloors) } : null,
    property?.buildingAge != null ? { Icon: Calendar, label: "Bina Yaşı", value: `${property.buildingAge}` } : null,
    property?.heatingType ? { Icon: Flame, label: "Isıtma", value: HEATING_LABEL[property.heatingType] ?? property.heatingType } : null,
  ].filter(Boolean) as any[];

  const activeAmenities = AMENITY_DEFS.filter((a) => (property as any)?.[a.key]);
  const isRent = listing.listingType === "RENT" || listing.listingType === "SHORT_RENT";

  // Gruplu özellikler (iç/dış/muhit/ulaşım/manzara)
  const featureGroups = groupFeatures((property as any)?.features ?? []);

  // Detaylı bilgi tablosu (sahibinden tarzı)
  const facingText = ((property as any)?.facing ?? []).map((f: string) => FACING_LABEL[f] ?? f).join(", ");
  const detailRows: { label: string; value: string }[] = [
    property?.subType ? { label: "Kategori", value: subTypeLabel(property.subType)! } : null,
    (property as any)?.dues != null ? { label: "Aidat", value: formatPrice((property as any).dues, listing.currency) + " / ay" } : null,
    property?.deedStatus ? { label: "Tapu Durumu", value: deedStatusLabel(property.deedStatus)! } : null,
    property?.buildStatus ? { label: "Yapının Durumu", value: buildStatusLabel(property.buildStatus)! } : null,
    property?.structureType ? { label: "Yapı Tipi", value: structureTypeLabel(property.structureType)! } : null,
    property?.usageStatus ? { label: "Kullanım Durumu", value: usageStatusLabel(property.usageStatus)! } : null,
    facingText ? { label: "Cephe", value: facingText } : null,
    (property as any)?.inSite ? { label: "Site İçerisinde", value: property?.siteName ? `Evet (${property.siteName})` : "Evet" } : null,
    // Arsa
    property?.zoningStatus ? { label: "İmar Durumu", value: zoningStatusLabel(property.zoningStatus)! } : null,
    property?.blockNo ? { label: "Ada No", value: property.blockNo } : null,
    property?.parcelNo ? { label: "Parsel No", value: property.parcelNo } : null,
    property?.kaks ? { label: "KAKS / Emsal", value: property.kaks } : null,
    property?.gabari ? { label: "Gabari", value: property.gabari } : null,
    property?.facadeCount != null ? { label: "Cephe Sayısı", value: String(property.facadeCount) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const extraBadges: string[] = [
    (property as any)?.creditEligible ? "Krediye Uygun" : null,
    (property as any)?.swappable ? "Takaslı" : null,
    (property as any)?.accessible ? "Engelliye Uygun" : null,
  ].filter(Boolean) as string[];

  // JSON-LD (schema.org) — Google emlak zenginleştirmesi
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isRent ? "RentAction" : "Residence",
    name: listing.title,
    description: (listing.description || property?.description || "").slice(0, 300),
    url: `/sahibinden/ilan/${id}`,
    image: property?.images?.map((im: any) => im.url).slice(0, 6) ?? [],
    ...(property?.grossArea
      ? { floorSize: { "@type": "QuantitativeValue", value: property.grossArea, unitCode: "MTK" } }
      : {}),
    ...(property?.roomCount ? { numberOfRooms: property.roomCount } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: property?.district ?? undefined,
      addressRegion: property?.city ?? undefined,
      addressCountry: "TR",
      streetAddress: property?.neighborhood ?? undefined,
    },
    ...(property?.latitude && property?.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: property.latitude, longitude: property.longitude } }
      : {}),
    offers: {
      "@type": "Offer",
      price: isRent && listing.monthlyRent ? listing.monthlyRent : listing.askingPrice,
      priceCurrency: listing.currency ?? "TRY",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:py-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RecentTracker id={id} />

      {/* Breadcrumb */}
      <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-slate-500">
        <Link href="/sahibinden" className="hover:text-amber-600">Anasayfa</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/sahibinden/ilanlar?type=${listing.listingType}`} className="hover:text-amber-600">{LISTING_TYPE_LABEL[listing.listingType]}</Link>
        {property?.city && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/sahibinden/ilanlar?city=${encodeURIComponent(property.city)}`} className="hover:text-amber-600">{property.city}</Link>
          </>
        )}
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sol: galeri + detaylar */}
        <div className="space-y-6 lg:col-span-2">
          <Gallery images={property?.images ?? []} title={listing.title} />

          {/* Başlık + fiyat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold text-white ${LISTING_TYPE_BADGE[listing.listingType] ?? "bg-slate-700"}`}>
                    {LISTING_TYPE_LABEL[listing.listingType]}
                  </span>
                  {listing.channel === "INDIVIDUAL" && (
                    <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                      <BadgeCheck className="h-3 w-3" /> Sahibinden
                    </span>
                  )}
                  {(listing as any).verified && (
                    <span className="flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-600">
                      <ShieldCheck className="h-3 w-3" /> Onaylı İlan
                    </span>
                  )}
                  {listing.urgentUntil && new Date(listing.urgentUntil) > new Date() && (
                    <span className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                      <Flame className="h-3 w-3" /> Acil
                    </span>
                  )}
                  <span className="text-xs text-slate-400">İlan No: {listing.listingNo}</span>
                </div>
                <h1 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{listing.title}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-amber-500" /> {locationText(property) || "—"}
                </p>
              </div>
              <div className="text-right">
                {priceDropped && (
                  <p className="flex items-center justify-end gap-1.5 text-sm">
                    <span className="text-slate-400 line-through">{formatPrice(listing.previousPrice, listing.currency)}</span>
                    <span className="flex items-center gap-0.5 rounded-md bg-rose-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                      <TrendingDown className="h-3 w-3" /> Düştü
                    </span>
                  </p>
                )}
                <p className="text-2xl font-black text-amber-600 sm:text-3xl">{listingPrice(listing)}</p>
                {listing.isNegotiable && <p className="text-xs text-slate-400">Pazarlık payı var</p>}
                {isRent && listing.deposit != null && (
                  <p className="mt-0.5 text-xs text-slate-500">Depozito: {formatPrice(listing.deposit, listing.currency)}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {listing.views} görüntülenme</span>
              <span className="opacity-40">•</span>
              <span>{timeAgo(listing.publishedAt ?? listing.createdAt)} yayınlandı</span>
              <span className="ml-auto flex items-center gap-2">
                <ShareButton title={listing.title} />
              </span>
            </div>
          </div>

          {/* Özellikler tablosu */}
          {specs.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-3 text-sm font-bold text-slate-800">Temel Özellikler</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.map((s, i) => (
                  <div key={i} className="rounded-xl bg-slate-50 p-3">
                    <s.Icon className="h-4 w-4 text-amber-500" />
                    <p className="mt-1.5 text-[11px] font-medium text-slate-400">{s.label}</p>
                    <p className="text-sm font-bold text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detaylı bilgiler */}
          {(detailRows.length > 0 || extraBadges.length > 0) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-3 text-sm font-bold text-slate-800">Detaylı Bilgiler</h2>
              {detailRows.length > 0 && (
                <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {detailRows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between border-b border-slate-50 py-2 text-sm">
                      <dt className="text-slate-500">{r.label}</dt>
                      <dd className="font-semibold text-slate-800">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {extraBadges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {extraBadges.map((b) => (
                    <span key={b} className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                      <BadgeCheck className="h-4 w-4" /> {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Donanım (temel) */}
          {activeAmenities.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-3 text-sm font-bold text-slate-800">Öne Çıkan Özellikler</h2>
              <div className="flex flex-wrap gap-2">
                {activeAmenities.map((a) => (
                  <span key={a.key} className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                    <BadgeCheck className="h-4 w-4" /> {a.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gruplu özellikler (iç/dış/muhit/ulaşım/manzara) */}
          {featureGroups.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-4 text-sm font-bold text-slate-800">Özellikler & İmkanlar</h2>
              <div className="space-y-4">
                {featureGroups.map(({ group, items }) => (
                  <div key={group.key}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((it) => (
                        <span key={it.key} className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[13px] text-slate-600 ring-1 ring-slate-100">
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> {it.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Açıklama */}
          {(listing.description || property?.description) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-3 text-sm font-bold text-slate-800">Açıklama</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {listing.description || property?.description}
              </p>
            </div>
          )}

          {/* Fiyat geçmişi */}
          {priceHistory.length > 1 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                <LineChart className="h-4 w-4 text-amber-500" /> Fiyat Geçmişi
              </h2>
              <div className="space-y-1.5">
                {priceHistory.map((h, i) => {
                  const prev = i > 0 ? priceHistory[i - 1].price : null;
                  const diff = prev != null ? h.price - prev : 0;
                  return (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 py-1.5 text-sm last:border-0">
                      <span className="text-slate-500">{formatDate(h.createdAt)}</span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{formatPrice(h.price, h.currency)}</span>
                        {diff !== 0 && (
                          <span className={`text-xs font-bold ${diff < 0 ? "text-emerald-600" : "text-rose-600"}`}>
                            {diff < 0 ? "↓" : "↑"} {formatPrice(Math.abs(diff), h.currency)}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Video / Sanal tur */}
          {(listing.videoUrl || listing.virtualTourUrl) && (
            <div className="flex flex-wrap gap-2">
              {listing.videoUrl && (
                <a href={listing.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  <Video className="h-4 w-4 text-rose-500" /> Tanıtım Videosu
                </a>
              )}
              {listing.virtualTourUrl && (
                <a href={listing.virtualTourUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  <Compass className="h-4 w-4 text-sky-500" /> 360° Sanal Tur
                </a>
              )}
            </div>
          )}

          {/* Harita */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
              <MapPin className="h-4 w-4 text-amber-500" /> Konum
            </h2>
            <MapEmbed lat={property?.latitude} lng={property?.longitude} query={locationText(property)} height={340} />
          </div>
        </div>

        {/* Sağ: iletişim + kredi + benzer */}
        <aside className="space-y-4">
          <div className="space-y-3 lg:sticky lg:top-20">
            {/* İletişim kartı */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {agent?.imageUrl || listing.agency?.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={agent?.imageUrl || listing.agency?.logo || ""} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-amber-600">
                    <Building2 className="h-6 w-6" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {agent ? `${agent.firstName} ${agent.lastName}` : listing.agentName || listing.agency?.name || "İlan Sahibi"}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {listing.channel === "INDIVIDUAL" ? "Bireysel ilan sahibi" : listing.agency?.name}
                  </p>
                  {listing.channel !== "INDIVIDUAL" && listing.agency?.slug && (
                    <Link href={`/sahibinden/agency/${listing.agency.slug}`} className="text-xs font-semibold text-amber-600 hover:underline">
                      Mağazadaki tüm ilanlar →
                    </Link>
                  )}
                  {listing.channel === "INDIVIDUAL" && listing.ownerUserId && (
                    <Link href={`/sahibinden/uye/${listing.ownerUserId}`} className="mt-0.5 flex items-center gap-1.5 hover:underline">
                      <StarRating value={sellerRating.avg} count={sellerRating.count} />
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <ContactReveal phone={agent?.phone || property?.ownerPhone} name={agent ? `${agent.firstName} ${agent.lastName}` : property?.ownerName} />
                {!isOwnListing && (
                  <MessageButton listingId={id} listingTitle={listing.title} loggedIn={!!marketUser} />
                )}
                <FavoriteButton listingId={id} initial={isFav} variant="button" />
                <CompareButton listingId={id} variant="button" />
                <ReportButton listingId={id} loggedIn={!!marketUser} />
              </div>
            </div>

            {/* Talep formu */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <InquiryForm listingId={id} listingTitle={listing.title} allowOffer={listing.isNegotiable} />
            </div>

            {/* Kredi hesaplama (satılık) */}
            {!isRent && listing.askingPrice > 0 && (
              <MortgageCalculator price={listing.askingPrice} currency={listing.currency ?? "TRY"} />
            )}
          </div>
        </aside>
      </div>

      {/* Benzer ilanlar */}
      {similar.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-extrabold text-slate-900">Benzer İlanlar</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {similar.slice(0, 4).map((l) => <ListingCard key={l.id} listing={l} favorited={favIds.includes(l.id)} />)}
          </div>
        </section>
      )}

      {/* Son gezilenler */}
      <div className="mt-10">
        <RecentlyViewed excludeId={id} />
      </div>
    </div>
  );
}
