import Link from "next/link";
import { notFound } from "next/navigation";
import { validateRequest } from "@/app/auth";
import {
  getListingById,
  getSimilarListings,
  getUserFavoriteIds,
  getPriceHistory,
  getUserReviews,
  getUserRating,
  getTopCategorySlug,
  getRegionPriceStats,
} from "../../data";
import { incrementView, recordRecentView } from "../../actions";
import { formatPrice, formatDate, timeAgo } from "../../lib/format";
import { CATEGORY_ATTRIBUTES, LISTING_TYPE_LABELS } from "../../lib/categories";
import ImageGallery from "../../components/image-gallery";
import ContactSeller from "../../components/contact-seller";
import FavoriteButton from "../../components/favorite-button";
import ListingCard from "../../components/listing-card";
import ReviewSection, { Stars } from "../../components/review-section";
import MapView from "../../components/map-view";
import MortgageCalculator from "../../components/mortgage-calculator";
import VideoEmbed from "../../components/video-embed";
import Tour360 from "../../components/tour-360";
import AppointmentForm from "../../components/appointment-form";
import DepositButton from "../../components/deposit-button";
import CompareButton from "../../components/compare-button";
import EmlakFeaturesView from "../../components/emlak-features-view";
import type { EmlakFeatures } from "../../lib/emlak-features";

export const dynamic = "force-dynamic";

// Tüm kategori attribute'larından tek bir etiket sözlüğü
const ATTR_LABELS: Record<string, string> = Object.values(CATEGORY_ATTRIBUTES)
  .flat()
  .reduce((acc, f) => {
    acc[f.key] = f.label;
    return acc;
  }, {} as Record<string, string>);

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  await incrementView(id);

  const { user } = await validateRequest();
  if (user) await recordRecentView(id);
  const [similar, favIds, priceHistory, sellerReviews, sellerRating, topSlug, regionStats] = await Promise.all([
    getSimilarListings(listing.categoryId, listing.id, 5),
    user ? getUserFavoriteIds(user.id) : Promise.resolve(new Set<string>()),
    getPriceHistory(listing.id),
    getUserReviews(listing.userId),
    getUserRating(listing.userId),
    getTopCategorySlug(listing.categoryId),
    getRegionPriceStats(listing.categoryId, listing.city),
  ]);

  const isEmlak = topSlug === "emlak";
  const grossArea = Number((listing.attributes as Record<string, unknown> | null)?.grossArea) || 0;

  const sellerReviewDto = sellerReviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: new Date(r.createdAt).toISOString(),
    authorName: r.author.displayName || r.author.username || "Üye",
    authorAvatar: r.author.avatarUrl ?? null,
  }));

  const attrs = (listing.attributes as Record<string, unknown> | null) ?? {};
  const emlakFeatures = (attrs.features as EmlakFeatures | undefined) ?? null;
  const attrEntries = Object.entries(attrs).filter(
    ([k, v]) => k !== "features" && v !== "" && v !== null && v !== undefined,
  );
  const place = [listing.city, listing.district, listing.neighborhood].filter(Boolean).join(" / ");
  const isOwner = user?.id === listing.userId;

  function attrValue(v: unknown) {
    if (v === true) return "Evet";
    if (v === false) return "Hayır";
    return String(v);
  }

  return (
    <div>
      <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-gray-500">
        <Link href="/sahibinden" className="hover:text-yellow-600">Anasayfa</Link>
        <span>/</span>
        <Link href={`/sahibinden/kategori/${listing.category.slug}`} className="hover:text-yellow-600">
          {listing.category.name}
        </Link>
      </nav>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Sol: görsel + açıklama */}
        <div className="space-y-5 lg:col-span-2">
          <ImageGallery images={listing.images} title={listing.title} />

          {/* Açıklama */}
          <section className="rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-lg font-bold text-gray-800">Açıklama</h2>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {listing.description || "Açıklama girilmemiş."}
            </div>
          </section>

          {/* Emlak medya: kat planı + video + 360° */}
          {listing.tourImageUrl && (
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-lg font-bold text-gray-800">🌐 360° Sanal Tur</h2>
              <Tour360 image={listing.tourImageUrl} />
            </section>
          )}
          {listing.videoUrl && (
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-lg font-bold text-gray-800">🎥 Video Tur</h2>
              <VideoEmbed url={listing.videoUrl} />
            </section>
          )}
          {listing.floorPlans && listing.floorPlans.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-lg font-bold text-gray-800">📐 Kat Planı</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {listing.floorPlans.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noreferrer" className="overflow-hidden rounded-lg border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Kat planı ${i + 1}`} className="h-40 w-full object-contain bg-gray-50" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Konum */}
          {place && (
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-2 text-lg font-bold text-gray-800">Konum</h2>
              <p className="text-sm text-gray-600">{place}</p>
              {typeof listing.latitude === "number" && typeof listing.longitude === "number" ? (
                <div className="mt-3">
                  <MapView lat={listing.latitude} lng={listing.longitude} height={300} />
                </div>
              ) : (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(place)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-yellow-600 hover:underline"
                >
                  Haritada göster →
                </a>
              )}
            </section>
          )}
        </div>

        {/* Sağ: özet + iletişim */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-lg font-bold text-gray-800">{listing.title}</h1>
              <FavoriteButton listingId={listing.id} initial={favIds.has(listing.id)} />
            </div>
            <p className="mt-2 text-2xl font-extrabold text-yellow-600">
              {formatPrice(listing.price, listing.currency)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                {LISTING_TYPE_LABELS[listing.type] ?? listing.type}
              </span>
              {listing.isUrgent && (
                <span className="rounded bg-red-50 px-2 py-1 font-semibold text-red-600">Acil</span>
              )}
              <span className="text-gray-600">İlan No: {listing.listingNo}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
              <span>{timeAgo(listing.createdAt)}</span>
              <span>•</span>
              <span>{listing.viewCount} görüntülenme</span>
            </div>

            {(listing.isNegotiable || listing.acceptsSwap || listing.securePayment) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {listing.isNegotiable && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    💬 Pazarlık payı var
                  </span>
                )}
                {listing.acceptsSwap && (
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    🔄 Takasa açık
                  </span>
                )}
                {listing.securePayment && (
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    🛡️ Güvenli ödeme
                  </span>
                )}
              </div>
            )}

            {priceHistory.length > 0 && (
              <details className="mt-3 rounded-lg bg-gray-50 p-2 text-xs">
                <summary className="cursor-pointer font-semibold text-gray-600">
                  Fiyat geçmişi ({priceHistory.length})
                </summary>
                <ul className="mt-2 space-y-1">
                  {priceHistory.map((h) => (
                    <li key={h.id} className="flex items-center justify-between text-gray-500">
                      <span>{formatDate(h.createdAt)}</span>
                      <span className={h.newPrice < h.oldPrice ? "text-green-600" : "text-red-500"}>
                        {formatPrice(h.oldPrice, h.currency)} → {formatPrice(h.newPrice, h.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {isOwner && (
              <Link
                href={`/sahibinden/ilan/${listing.id}/duzenle`}
                className="mt-3 block w-full rounded-lg border border-gray-300 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                İlanı Düzenle
              </Link>
            )}

            <div className="mt-3">
              <CompareButton listingId={listing.id} />
            </div>
          </div>

          {isEmlak && (
            <AppointmentForm listingId={listing.id} isOwner={isOwner} isLoggedIn={!!user} />
          )}
          {isEmlak && listing.type === "SALE" && (
            <DepositButton
              listingId={listing.id}
              isOwner={isOwner}
              isLoggedIn={!!user}
              suggested={Math.max(1000, Math.round(listing.price * 0.02))}
            />
          )}

          {listing.store && (
            <Link
              href={`/sahibinden/magaza/${listing.store.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-yellow-400"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {listing.store.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={listing.store.logo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-600">
                    {listing.store.name[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-semibold text-gray-800">
                  {listing.store.name}
                  {listing.store.isVerified && <span className="text-blue-600">✓</span>}
                </p>
                <p className="text-xs text-gray-600">Mağaza vitrinini gör →</p>
              </div>
            </Link>
          )}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 text-sm">
            <span className="text-gray-600">Satıcı puanı</span>
            <span className="flex items-center gap-1">
              <Stars value={sellerRating.avg} size={14} />
              <span className="font-semibold text-gray-700">{sellerRating.avg.toFixed(1)}</span>
              <span className="text-gray-600">({sellerRating.count})</span>
            </span>
          </div>

          <ContactSeller
            listingId={listing.id}
            phone={listing.contactPhone}
            showPhone={listing.showPhone}
            contactName={listing.contactName || listing.user.displayName || listing.user.name}
            isOwner={isOwner}
            isLoggedIn={!!user}
          />
        </div>
      </div>

      {/* Özellikler */}
      {attrEntries.length > 0 && (
        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-bold text-gray-800">İlan Bilgileri</h2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {attrEntries.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-gray-50 py-2 text-sm">
                <dt className="text-gray-500">{ATTR_LABELS[k] ?? k}</dt>
                <dd className="font-medium text-gray-800">{attrValue(v)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-gray-600">İlan tarihi: {formatDate(listing.createdAt)}</p>
        </section>
      )}

      {/* Emlak detaylı özellik matrisi */}
      {isEmlak && emlakFeatures && (
        <div className="mt-5">
          <EmlakFeaturesView features={emlakFeatures} />
        </div>
      )}

      {/* Bölge fiyat analizi */}
      {regionStats && (
        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-bold text-gray-800">📊 Bölge Fiyat Analizi</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label={`${listing.city} Ort. Fiyat`} value={formatPrice(regionStats.avgPrice, listing.currency)} />
            {regionStats.avgPerM2 && (
              <Stat label="Ort. m² Fiyatı" value={formatPrice(regionStats.avgPerM2, listing.currency)} />
            )}
            <Stat
              label="Bu İlan"
              value={formatPrice(listing.price, listing.currency)}
              tone={listing.price <= regionStats.avgPrice ? "good" : "bad"}
            />
            {grossArea > 0 && regionStats.avgPerM2 && (
              <Stat label="Tahmini Değer" value={formatPrice(regionStats.avgPerM2 * grossArea, listing.currency)} />
            )}
          </div>
          <p className="mt-2 text-xs text-gray-600">
            {regionStats.count} benzer ilana göre hesaplanmıştır.{" "}
            {listing.price <= regionStats.avgPrice
              ? "Bu ilan bölge ortalamasının altında veya yakınında. 👍"
              : "Bu ilan bölge ortalamasının üzerinde."}
          </p>
        </section>
      )}

      {/* Kredi hesaplama (emlak satılık) */}
      {isEmlak && listing.type === "SALE" && (
        <div className="mt-5">
          <MortgageCalculator price={listing.price} currency={listing.currency} />
        </div>
      )}

      {/* Satıcı değerlendirmeleri */}
      <div className="mt-6">
        <ReviewSection
          targetUserId={listing.userId}
          storeId={listing.store?.id}
          reviews={sellerReviewDto}
          avg={sellerRating.avg}
          count={sellerRating.count}
          canReview={!!user && !isOwner}
          isLoggedIn={!!user}
        />
      </div>

      {/* Benzer ilanlar */}
      {similar.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-gray-800">Benzer İlanlar</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
}) {
  const color = tone === "good" ? "text-green-700" : tone === "bad" ? "text-red-600" : "text-gray-800";
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}
