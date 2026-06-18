import Link from "next/link";
import { notFound } from "next/navigation";
import { validateRequest } from "@/app/auth";
import {
  getStoreBySlug,
  getStoreListings,
  getUserReviews,
  getUserRating,
  getUserFavoriteIds,
} from "../../data";
import { formatDate } from "../../lib/format";
import ListingCard from "../../components/listing-card";
import ReviewSection, { Stars } from "../../components/review-section";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  CORPORATE: "Kurumsal Mağaza",
  CAR_GALLERY: "Oto Galeri",
  REAL_ESTATE_OFFICE: "Emlak Ofisi",
  AUTHORIZED_DEALER: "Yetkili Bayi",
  INDIVIDUAL: "Bireysel",
};

export default async function StorePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  const { user } = await validateRequest();
  const [{ items, total, pages }, reviews, rating, favIds] = await Promise.all([
    getStoreListings(store.id, Number(page) || 1),
    getUserReviews(store.owner.id),
    getUserRating(store.owner.id),
    user ? getUserFavoriteIds(user.id) : Promise.resolve(new Set<string>()),
  ]);

  const reviewDto = reviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: new Date(r.createdAt).toISOString(),
    authorName: r.author.displayName || r.author.username || "Üye",
    authorAvatar: r.author.avatarUrl ?? null,
  }));

  const canReview = !!user && user.id !== store.owner.id;

  return (
    <div>
      {/* Mağaza başlık */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="h-32 w-full bg-gradient-to-r from-yellow-300 to-amber-400 sm:h-44">
          {store.banner && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={store.banner} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
          <div className="-mt-12 h-20 w-20 shrink-0 overflow-hidden rounded-xl border-4 border-white bg-gray-100 shadow sm:-mt-16 sm:h-24 sm:w-24">
            {store.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={store.logo} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-600">
                {store.name[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">{store.name}</h1>
              {store.isVerified && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">✓ Onaylı</span>
              )}
            </div>
            <p className="text-sm text-gray-500">{TYPE_LABELS[store.type] ?? store.type}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Stars value={rating.avg} size={13} /> {rating.avg.toFixed(1)} ({rating.count})
              </span>
              <span>Üyelik: {formatDate(store.memberSince)}</span>
              <span>{store._count.listings} ilan</span>
              {store.city && <span>{store.city}</span>}
            </div>
          </div>
          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              className="rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-700"
            >
              {store.phone}
            </a>
          )}
        </div>
        {store.about && <p className="border-t border-gray-100 p-4 text-sm text-gray-600">{store.about}</p>}
      </div>

      {/* İlanlar */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-gray-800">Mağaza İlanları ({total})</h2>
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            Bu mağazada henüz aktif ilan yok.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
            ))}
          </div>
        )}
        {pages > 1 && (
          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={`/sahibinden/magaza/${slug}?page=${n}`}
                className={`rounded-lg border px-3.5 py-2 text-sm ${
                  n === (Number(page) || 1)
                    ? "border-yellow-400 bg-yellow-400 font-bold text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Değerlendirmeler */}
      <div className="mt-6">
        <ReviewSection
          targetUserId={store.owner.id}
          storeId={store.id}
          reviews={reviewDto}
          avg={rating.avg}
          count={rating.count}
          canReview={canReview}
          isLoggedIn={!!user}
        />
      </div>
    </div>
  );
}
