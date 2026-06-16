import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft, MapPin, Bed, Bath, Maximize, Building2, Layers, CalendarClock,
  Flame, Phone, Mail, CheckCircle2, Eye, Video, Box, Tag,
} from "lucide-react";
import MarketShell from "../../_components/market/MarketShell";
import ListingCard from "../../_components/market/ListingCard";
import InquiryForm from "../../_components/market/InquiryForm";
import MortgageBox from "../../_components/market/MortgageBox";
import FavoriteButton from "../../_components/market/FavoriteButton";
import {
  propertyTypeLabel, listingTypeLabel, listingTypeBadge, listingPrice, formatPrice, locationText,
} from "../../_components/market/labels";
import {
  getMarketplaceListingDetail, getSimilarListings, getListingMeta,
} from "../../../actions/marketplace";
import { getMyFavoriteIds } from "../../../actions/favorites";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const l = await getListingMeta(id);
  if (!l) return { title: "İlan bulunamadı — EmlakPazarı" };
  const loc = [l.property?.district, l.property?.city].filter(Boolean).join(", ");
  const price = listingPrice(l);
  const title = `${l.title} — ${price} | EmlakPazarı`;
  const desc =
    (l.description?.slice(0, 155) ||
      `${listingTypeLabel[l.listingType] ?? ""} ${l.property?.propertyType ? propertyTypeLabel[l.property.propertyType] : ""} ${l.property?.roomCount ?? ""} ${loc} — ${price}`).trim();
  const cover = l.property?.images?.[0]?.url;
  return {
    title, description: desc,
    openGraph: { title, description: desc, type: "website", images: cover ? [{ url: cover }] : undefined },
  };
}

const featureLabels: { key: string; label: string }[] = [
  { key: "hasElevator", label: "Asansör" },
  { key: "hasParking", label: "Otopark" },
  { key: "isFurnished", label: "Eşyalı" },
  { key: "hasGarden", label: "Bahçe" },
  { key: "hasPool", label: "Havuz" },
  { key: "hasBalcony", label: "Balkon" },
];

function Spec({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default async function MarketPropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getMarketplaceListingDetail(id);
  if (!data) return notFound();

  const { listing, property, agent } = data;
  const images = property?.images ?? [];
  const cover = images.find((i) => i.isCover)?.url ?? images[0]?.url;
  const rest = images.filter((i) => i.url !== cover).slice(0, 4);
  const isSale = listing.listingType === "SALE";

  const [similar, favIds] = await Promise.all([
    getSimilarListings(listing.id, property?.city ?? undefined, listing.listingType),
    getMyFavoriteIds(),
  ]);
  const isFav = favIds.includes(listing.id);

  const specs: { icon: any; label: string; value: string }[] = [];
  if (property?.roomCount) specs.push({ icon: Bed, label: "Oda", value: property.roomCount });
  if (property?.grossArea != null) specs.push({ icon: Maximize, label: "Brüt", value: `${property.grossArea} m²` });
  if (property?.netArea != null) specs.push({ icon: Maximize, label: "Net", value: `${property.netArea} m²` });
  if (property?.bathroomCount != null) specs.push({ icon: Bath, label: "Banyo", value: String(property.bathroomCount) });
  if (property?.floorNo != null) specs.push({ icon: Layers, label: "Kat", value: `${property.floorNo}${property.totalFloors ? ` / ${property.totalFloors}` : ""}` });
  if (property?.buildingAge != null) specs.push({ icon: CalendarClock, label: "Bina Yaşı", value: `${property.buildingAge}` });
  if (property?.heatingType) specs.push({ icon: Flame, label: "Isıtma", value: property.heatingType });

  return (
    <MarketShell>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Link href="/realestate/ilanlar" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> İlanlara dön
        </Link>

        {/* Galeri */}
        <div className="grid gap-2.5 sm:grid-cols-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 sm:col-span-3">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300"><Building2 className="h-14 w-14" /></div>
            )}
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${listingTypeBadge[listing.listingType] ?? "bg-slate-700"}`}>
              {listingTypeLabel[listing.listingType] ?? listing.listingType}
            </span>
          </div>
          {rest.length > 0 && (
            <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-1">
              {rest.map((im, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.url} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Sol */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {property?.propertyType ? propertyTypeLabel[property.propertyType] ?? property.propertyType : "Mülk"}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Eye className="h-3.5 w-3.5" /> {listing.views ?? 0} görüntülenme</span>
                {listing.isNegotiable && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">Pazarlık payı var</span>
                )}
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{listing.title}</h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-slate-500">
                <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                {property?.address ? `${property.address}, ` : ""}{locationText(property)}
              </p>
              <p className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                {listingPrice(listing)}
              </p>
              {listing.deposit ? (
                <p className="text-sm text-slate-500">Depozito: {formatPrice(listing.deposit, listing.currency ?? "TRY")}</p>
              ) : null}
            </div>

            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map((s) => <Spec key={s.label} {...s} />)}
              </div>
            )}

            {property && featureLabels.some((f) => (property as any)[f.key]) && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bold text-slate-900">Özellikler</h3>
                <div className="flex flex-wrap gap-2">
                  {featureLabels.filter((f) => (property as any)[f.key]).map((f) => (
                    <span key={f.key} className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> {f.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(listing.description || property?.description) && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-slate-900">Açıklama</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {listing.description || property?.description}
                </p>
                {listing.highlights?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {listing.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        <Tag className="h-3 w-3" /> {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {(listing.videoUrl || listing.virtualTourUrl) && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 font-bold text-slate-900">Video & Sanal Tur</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.videoUrl && (
                    <a href={listing.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                      <Video className="h-4 w-4" /> Videoyu izle
                    </a>
                  )}
                  {listing.virtualTourUrl && (
                    <a href={listing.virtualTourUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                      <Box className="h-4 w-4" /> 360° sanal tur
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sağ — yapışkan */}
          <div className="lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-20">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-400">İlan sahibi</p>
                <div className="mt-2 flex items-center gap-3">
                  {listing.agency?.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={listing.agency.logo} alt={listing.agency.name} className="h-11 w-11 rounded-xl object-cover" />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Building2 className="h-5 w-5" /></span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900">{listing.agency?.name ?? "Emlak Ofisi"}</p>
                    {listing.agency?.city && <p className="text-xs text-slate-400">{listing.agency.city}</p>}
                  </div>
                </div>
                {agent && (
                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
                    <p className="font-semibold text-slate-900">{agent.firstName} {agent.lastName}</p>
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-slate-500 hover:text-blue-600"><Phone className="h-4 w-4" /> {agent.phone}</a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-slate-500 hover:text-blue-600"><Mail className="h-4 w-4" /> <span className="truncate">{agent.email}</span></a>
                    )}
                  </div>
                )}
              </div>

              <FavoriteButton listingId={listing.id} initial={isFav} variant="button" />
              <InquiryForm listingId={listing.id} listingType={listing.listingType} />
              {isSale && listing.askingPrice ? (
                <MortgageBox price={listing.askingPrice} currency={listing.currency ?? "TRY"} />
              ) : null}
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-extrabold tracking-tight">Benzer İlanlar</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>
    </MarketShell>
  );
}
