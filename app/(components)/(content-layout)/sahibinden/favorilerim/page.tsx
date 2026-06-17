import Link from "next/link";
import { Heart, LogIn } from "lucide-react";
import type { Metadata } from "next";
import ListingCard from "../components/ListingCard";
import { getMyFavorites } from "../actions/favorites";
import { getMarketUser } from "../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Favorilerim — sahibinden" };

export default async function FavoritesPage() {
  const user = await getMarketUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <Heart className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h1 className="text-xl font-bold text-slate-800">Favorileriniz</h1>
        <p className="mt-1 text-sm text-slate-500">Favori ilanlarınızı görmek için giriş yapın.</p>
        <Link href="/estate/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
          <LogIn className="h-4 w-4" /> Giriş Yap
        </Link>
      </div>
    );
  }

  const favorites = await getMyFavorites();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <Heart className="h-6 w-6 fill-rose-500 text-rose-500" /> Favorilerim
      </h1>
      <p className="mt-0.5 text-sm text-slate-500">{favorites.length} ilan</p>

      {favorites.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Heart className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Henüz favori ilanınız yok</p>
          <Link href="/sahibinden/ilanlar" className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white">İlanlara göz at</Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((l: any) => <ListingCard key={l.id} listing={l} favorited />)}
        </div>
      )}
    </div>
  );
}
