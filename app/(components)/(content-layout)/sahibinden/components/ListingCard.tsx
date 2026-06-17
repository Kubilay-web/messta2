import Link from "next/link";
import { MapPin, BedDouble, Maximize, Bath, Building2, Eye, Star, TrendingDown, Flame } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import CompareButton from "./CompareButton";
import {
  PROPERTY_TYPE_LABEL,
  LISTING_TYPE_LABEL,
  LISTING_TYPE_BADGE,
  listingPrice,
  locationText,
  timeAgo,
} from "../lib/format";
import { cldThumb } from "../lib/cld";

export type CardListing = {
  id: string;
  title: string;
  listingType: string;
  askingPrice?: number | null;
  previousPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
  views?: number | null;
  createdAt?: Date | string | null;
  featuredUntil?: Date | string | null;
  urgentUntil?: Date | string | null;
  highlightUntil?: Date | string | null;
  channel?: string | null;
  agency?: { name: string; logo?: string | null } | null;
  property?: {
    city?: string | null;
    district?: string | null;
    neighborhood?: string | null;
    propertyType?: string | null;
    roomCount?: string | null;
    grossArea?: number | null;
    bathroomCount?: number | null;
    isFeatured?: boolean | null;
    images?: { url: string }[];
  } | null;
};

export default function ListingCard({
  listing,
  favorited = false,
}: {
  listing: CardListing;
  favorited?: boolean;
}) {
  const p = listing.property;
  const cover = p?.images?.[0]?.url;
  const now = Date.now();
  const isActive = (d?: Date | string | null) => !!d && new Date(d).getTime() > now;
  const featured = isActive(listing.featuredUntil) || !!p?.isFeatured;
  const urgent = isActive(listing.urgentUntil);
  const highlight = isActive(listing.highlightUntil);
  const priceDropped =
    listing.previousPrice != null && listing.askingPrice != null && listing.askingPrice < listing.previousPrice;

  return (
    <Link
      href={`/sahibinden/ilan/${listing.id}`}
      className={`group relative block overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        highlight
          ? "border-sky-400 ring-2 ring-sky-300"
          : featured
            ? "border-amber-300 ring-1 ring-amber-200"
            : "border-slate-200 hover:border-amber-300"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cldThumb(cover, 600, 450)}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Building2 className="h-12 w-12" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <FavoriteButton listingId={listing.id} initial={favorited} />
        <CompareButton listingId={listing.id} />

        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold text-white shadow-sm ${LISTING_TYPE_BADGE[listing.listingType] ?? "bg-slate-700"}`}>
            {LISTING_TYPE_LABEL[listing.listingType] ?? listing.listingType}
          </span>
          {featured && (
            <span className="flex items-center gap-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              <Star className="h-3 w-3 fill-white" /> Vitrin
            </span>
          )}
          {urgent && (
            <span className="flex items-center gap-0.5 rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              <Flame className="h-3 w-3" /> Acil
            </span>
          )}
          {priceDropped && (
            <span className="flex items-center gap-0.5 rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              <TrendingDown className="h-3 w-3" /> Fiyat düştü
            </span>
          )}
        </div>

        <div className="absolute inset-x-2.5 bottom-2.5 flex items-end justify-between gap-2">
          <p className="text-lg font-extrabold text-white drop-shadow-sm">{listingPrice(listing)}</p>
          {p?.propertyType && (
            <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 backdrop-blur">
              {PROPERTY_TYPE_LABEL[p.propertyType] ?? p.propertyType}
            </span>
          )}
        </div>
      </div>

      <div className="p-3.5">
        <h3 className="line-clamp-1 font-bold text-slate-900 transition-colors group-hover:text-amber-600">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          <span className="line-clamp-1">{locationText(p) || "—"}</span>
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-2.5 text-xs font-medium text-slate-600">
          {p?.roomCount && (
            <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-slate-400" /> {p.roomCount}</span>
          )}
          {p?.grossArea != null && (
            <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-slate-400" /> {p.grossArea} m²</span>
          )}
          {p?.bathroomCount != null && (
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-slate-400" /> {p.bathroomCount}</span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span className="line-clamp-1">
            {listing.channel === "INDIVIDUAL" ? "Sahibinden" : listing.agency?.name || ""}
          </span>
          <span className="flex shrink-0 items-center gap-2">
            {listing.views != null && (
              <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" /> {listing.views}</span>
            )}
            {listing.createdAt && <span>{timeAgo(listing.createdAt)}</span>}
          </span>
        </div>
      </div>
    </Link>
  );
}
