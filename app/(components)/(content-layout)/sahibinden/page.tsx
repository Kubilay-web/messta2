import Link from "next/link";
import { validateRequest } from "@/app/auth";
import {
  getCategoryTree,
  getFeaturedListings,
  getListings,
  getUserFavoriteIds,
  getRecentViews,
} from "./data";
import ListingCard from "./components/listing-card";

export const dynamic = "force-dynamic";

export default async function SahibindenHome() {
  const { user } = await validateRequest();
  const [categories, featured, latest, favIds, recent] = await Promise.all([
    getCategoryTree(),
    getFeaturedListings(10),
    getListings({ perPage: 12, sort: "newest" }),
    user ? getUserFavoriteIds(user.id) : Promise.resolve(new Set<string>()),
    user ? getRecentViews(user.id, 5) : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 p-6 sm:p-10">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-4xl">
          Aradığın her şey bir tık uzağında
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-800 sm:text-base">
          Emlak, vasıta, ikinci el ve sıfır ürünler — milyonlarca ilan arasından seç.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={`/sahibinden/kategori/${c.slug}`}
              className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-white"
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Kategoriler */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-800">Kategoriler</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/sahibinden/kategori/${c.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center transition hover:border-yellow-400 hover:shadow-md"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-medium text-gray-700">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Vitrin / Öne çıkanlar */}
      {featured.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Vitrindeki İlanlar</h2>
            <Link href="/sahibinden/ara" className="text-sm font-semibold text-yellow-600 hover:underline">
              Tümünü gör →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
            ))}
          </div>
        </section>
      )}

      {/* Son gezdiklerin */}
      {recent.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-800">Son Gezdiğin İlanlar</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {recent.map((l: any) => (
              <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
            ))}
          </div>
        </section>
      )}

      {/* Son ilanlar */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Son Eklenen İlanlar</h2>
          <Link href="/sahibinden/ara" className="text-sm font-semibold text-yellow-600 hover:underline">
            Tümünü gör →
          </Link>
        </div>
        {latest.items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {latest.items.map((l) => (
              <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <p className="text-gray-500">Henüz ilan yok. İlk ilanı sen ver!</p>
      <Link
        href="/sahibinden/ilan-ver"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Ücretsiz İlan Ver
      </Link>
    </div>
  );
}
