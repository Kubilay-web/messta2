import Link from "next/link";
import { MapPin, Bed, Maximize, Bath, Building2 } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import {
  propertyTypeLabel,
  listingTypeLabel,
  listingTypeBadge,
  listingPrice,
  locationText,
} from "./labels";

type CardListing = {
  id: string;
  title: string;
  listingType: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
  agency?: { name: string; logo?: string | null } | null;
  property?: {
    city?: string | null;
    district?: string | null;
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

  return (
    <Link
      href={`/realestate/property/${listing.id}`}
      className="group relative block overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"
    >
      {/* Görsel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Building2 className="h-12 w-12" />
          </div>
        )}

        {/* Alt karartma + fiyat */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <FavoriteButton listingId={listing.id} initial={favorited} />

        {/* Rozetler */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-sm ${listingTypeBadge[listing.listingType] ?? "bg-slate-700"}`}>
            {listingTypeLabel[listing.listingType] ?? listing.listingType}
          </span>
          {p?.isFeatured && (
            <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              ★ Öne çıkan
            </span>
          )}
        </div>

        {/* Fiyat (görsel üzerinde) */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <p className="text-lg font-extrabold text-white drop-shadow">{listingPrice(listing)}</p>
          {p?.propertyType && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 backdrop-blur">
              {propertyTypeLabel[p.propertyType] ?? p.propertyType}
            </span>
          )}
        </div>
      </div>

      {/* Gövde */}
      <div className="p-4">
        <h3 className="line-clamp-1 font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
          <span className="line-clamp-1">{locationText(p) || "—"}</span>
        </p>

        {/* Özellikler */}
        <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-600">
          {p?.roomCount && (
            <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-slate-400" /> {p.roomCount}</span>
          )}
          {p?.grossArea != null && (
            <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-slate-400" /> {p.grossArea} m²</span>
          )}
          {p?.bathroomCount != null && (
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-slate-400" /> {p.bathroomCount}</span>
          )}
        </div>

        {listing.agency?.name && (
          <p className="mt-2 line-clamp-1 text-[11px] text-slate-400">{listing.agency.name}</p>
        )}
      </div>
    </Link>
  );
}
