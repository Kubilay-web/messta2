import Link from "next/link";
import { Heart } from "lucide-react";
import MarketShell from "../_components/market/MarketShell";
import ListingCard from "../_components/market/ListingCard";
import { getMyFavorites } from "../../actions/favorites";
import { requireRealestateUser } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  await requireRealestateUser();
  const favorites = await getMyFavorites();

  return (
    <MarketShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20">
            <Heart className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Favorilerim</h1>
            <p className="text-sm text-slate-500">{favorites.length} ilan</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <Heart className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="font-semibold text-slate-700">Henüz favori ilanınız yok</p>
            <p className="mt-1 text-sm text-slate-500">İlan kartlarındaki kalp ikonuna dokunarak favorilere ekleyin.</p>
            <Link href="/realestate/ilanlar" className="mt-5 inline-block rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25">
              İlanlara göz at
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((l) => <ListingCard key={l!.id} listing={l as any} favorited />)}
          </div>
        )}
      </div>
    </MarketShell>
  );
}
