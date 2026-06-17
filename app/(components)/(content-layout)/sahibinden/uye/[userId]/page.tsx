import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { User, CalendarDays, Building2, MessageSquare, SearchX } from "lucide-react";
import ListingCard from "../../components/ListingCard";
import StarRating from "../../components/StarRating";
import ReviewForm from "../../components/ReviewForm";
import { getSellerProfile, getSellerReviews } from "../../actions/reviews";
import { getMyFavoriteIds } from "../../actions/favorites";
import { getMarketUser } from "../../lib/auth";
import { formatDate, timeAgo } from "../../lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ userId: string }> }): Promise<Metadata> {
  const { userId } = await params;
  const profile = await getSellerProfile(userId);
  if (!profile) return { title: "Üye bulunamadı — sahibinden" };
  return { title: `${profile.user.name} — Üye Profili • sahibinden`, description: `${profile.user.name} üyesinin tüm ilanları ve değerlendirmeleri.` };
}

export default async function SellerProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const [profile, reviews, favIds, me] = await Promise.all([
    getSellerProfile(userId),
    getSellerReviews(userId),
    getMyFavoriteIds(),
    getMarketUser(),
  ]);
  if (!profile) notFound();

  const { user, listings, rating, listingCount } = profile;
  const favSet = new Set(favIds);
  const isSelf = me?.id === userId;

  return (
    <div>
      {/* Profil başlığı */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(60%_60%_at_20%_0%,rgba(245,158,11,0.4),transparent)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-8 sm:flex-row sm:items-center sm:py-10">
          <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-xl">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-9 w-9 text-amber-500" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{user.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
              <span className="rounded-full bg-white/10 px-2.5 py-1"><StarRating value={rating.avg} count={rating.count} /></span>
              <span className="flex items-center gap-1"><Building2 className="h-4 w-4 text-amber-400" /> {listingCount} aktif ilan</span>
              {user.memberSince && <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-amber-400" /> Üyelik: {formatDate(user.memberSince)}</span>}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:py-8">
        {/* İlanlar */}
        <section>
          <h2 className="mb-3 text-lg font-extrabold text-slate-900">Üyenin İlanları</h2>
          {listings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <SearchX className="mx-auto mb-3 h-12 w-12 text-slate-300" />
              <p className="font-semibold text-slate-700">Yayında ilan yok</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {listings.map((l: any) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
            </div>
          )}
        </section>

        {/* Değerlendirmeler */}
        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <MessageSquare className="h-5 w-5 text-amber-500" /> Değerlendirmeler ({rating.count})
            </h2>
            {reviews.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">Henüz değerlendirme yok.</p>
            ) : (
              <div className="space-y-2.5">
                {reviews.map((r: any) => (
                  <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-slate-800">{r.authorName}</p>
                      <span className="text-[11px] text-slate-400">{timeAgo(r.createdAt)}</span>
                    </div>
                    <StarRating value={r.rating} />
                    {r.comment && <p className="mt-1 text-sm text-slate-600">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {!isSelf && <ReviewForm targetUserId={userId} loggedIn={!!me} />}
            {isSelf && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Bu sizin profiliniz. Kendinizi değerlendiremezsiniz.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
