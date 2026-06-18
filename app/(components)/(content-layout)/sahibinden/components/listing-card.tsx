import Link from "next/link";
import FavoriteButton from "./favorite-button";
import { formatPrice, timeAgo } from "../lib/format";
import { LISTING_TYPE_LABELS } from "../lib/categories";

type Listing = {
  id: string;
  title: string;
  price: number;
  currency: string;
  type: string;
  images: string[];
  city: string | null;
  district: string | null;
  isUrgent: boolean;
  isShowcase: boolean;
  createdAt: Date | string;
  category?: { name: string; slug: string } | null;
};

export default function ListingCard({
  listing,
  favorited = false,
  view = "grid",
}: {
  listing: Listing;
  favorited?: boolean;
  view?: "grid" | "list";
}) {
  const img = listing.images?.[0];
  const place = [listing.city, listing.district].filter(Boolean).join(" / ");

  if (view === "list") {
    return (
      <Link
        href={`/sahibinden/ilan/${listing.id}`}
        className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-yellow-400 hover:shadow-md sm:gap-4"
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-40">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={listing.title} className="h-full w-full object-cover" />
          ) : (
            <Placeholder />
          )}
          {listing.isShowcase && <Badge className="bg-yellow-400 text-gray-900">Vitrin</Badge>}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-yellow-600 sm:text-base">
              {listing.title}
            </h3>
            <FavoriteButton listingId={listing.id} initial={favorited} />
          </div>
          <p className="mt-1 text-base font-bold text-yellow-600 sm:text-lg">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1 text-xs text-gray-500">
            {listing.isUrgent && <span className="font-semibold text-red-500">Acil</span>}
            <span>{place || "—"}</span>
            <span className="text-gray-300">•</span>
            <span>{timeAgo(listing.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/sahibinden/ilan/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-yellow-400 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={listing.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <Placeholder />
        )}
        <div className="absolute left-2 top-2 flex gap-1">
          {listing.isShowcase && (
            <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-gray-900">
              Vitrin
            </span>
          )}
          {listing.isUrgent && (
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              Acil
            </span>
          )}
        </div>
        <div className="absolute right-2 top-2">
          <FavoriteButton listingId={listing.id} initial={favorited} />
        </div>
        <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {LISTING_TYPE_LABELS[listing.type] ?? listing.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-800 group-hover:text-yellow-600">
          {listing.title}
        </h3>
        <p className="mt-1.5 text-lg font-bold text-yellow-600">
          {formatPrice(listing.price, listing.currency)}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-gray-500">
          <span className="truncate">{place || "—"}</span>
          <span className="shrink-0">{timeAgo(listing.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${className}`}>
      {children}
    </span>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center text-gray-300">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  );
}
