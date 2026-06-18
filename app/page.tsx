import Link from "next/link";
import { validateRequest } from "@/app/auth";
import {
  getListings,
  getUserFavoriteIds,
} from "./(components)/(content-layout)/sahibinden/data";
import ListingCard from "./(components)/(content-layout)/sahibinden/components/listing-card";
import EmlakHeroSearch from "./(components)/(content-layout)/sahibinden/components/emlak-hero-search";

export const dynamic = "force-dynamic";

const CATEGORY_TILES = [
  { name: "Satılık Daire", slug: "satilik-daire", icon: "🏢" },
  { name: "Kiralık Daire", slug: "kiralik-daire", icon: "🔑" },
  { name: "Satılık Arsa", slug: "satilik-arsa", icon: "🌳" },
  { name: "Dükkan & Mağaza", slug: "satilik-dukkan", icon: "🏬" },
  { name: "Kiralık Ofis", slug: "kiralik-ofis", icon: "🏤" },
  { name: "Günlük Kiralık", slug: "gunluk-kiralik-konut", icon: "🏖️" },
];

const POPULAR_CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana"];

export default async function Home() {
  const { user } = await validateRequest();
  const [vitrin, son, favIds] = await Promise.all([
    getListings({ categorySlug: "emlak", perPage: 8 }),
    getListings({ categorySlug: "emlak", perPage: 10, sort: "newest" }),
    user ? getUserFavoriteIds(user.id) : Promise.resolve(new Set<string>()),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ colorScheme: "light" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="rounded bg-yellow-400 px-2 py-1 text-lg font-extrabold leading-none text-gray-900">
              emlak
            </span>
            <span className="hidden text-sm font-semibold text-gray-400 sm:inline">.com</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/sahibinden/kategori/emlak" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              İlanlar
            </Link>
            <Link href="/haberler" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 sm:block">
              Haberler
            </Link>
            {user ? (
              <Link href="/sahibinden/hesabim" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Hesabım
              </Link>
            ) : (
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Giriş / Üye Ol
              </Link>
            )}
            <Link
              href="/sahibinden/ilan-ver"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:px-4"
            >
              + İlan Ver
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(17,24,39,.82), rgba(17,24,39,.35)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Hayalindeki evi <span className="text-yellow-400">kolayca</span> bul
            </h1>
            <p className="mt-3 text-sm text-gray-200 sm:text-lg">
              Satılık, kiralık ve günlük binlerce emlak ilanı. Konuma göre ara, haritada gör,
              360° gez, randevu al.
            </p>
          </div>
          <div className="mt-6 max-w-4xl">
            <EmlakHeroSearch />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10">
        {/* Kategoriler */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-800 sm:text-xl">Emlak Kategorileri</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORY_TILES.map((c) => (
              <Link
                key={c.slug}
                href={`/sahibinden/kategori/${c.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center transition hover:border-yellow-400 hover:shadow-md"
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Vitrin */}
        {vitrin.items.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">Vitrindeki Emlak İlanları</h2>
              <Link href="/sahibinden/kategori/emlak" className="text-sm font-semibold text-yellow-600 hover:underline">
                Tümünü gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {vitrin.items.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
              ))}
            </div>
          </section>
        )}

        {/* Popüler şehirler */}
        <section className="rounded-2xl bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-800 sm:text-xl">Popüler Şehirler</h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CITIES.map((city) => (
              <Link
                key={city}
                href={`/sahibinden/kategori/emlak?city=${encodeURIComponent(city)}`}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50"
              >
                📍 {city}
              </Link>
            ))}
          </div>
        </section>

        {/* Son ilanlar */}
        {son.items.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">Son Eklenen İlanlar</h2>
              <Link href="/sahibinden/kategori/emlak?sort=newest" className="text-sm font-semibold text-yellow-600 hover:underline">
                Tümünü gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {son.items.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center sm:p-10">
          <h2 className="text-xl font-extrabold text-white sm:text-3xl">Emlağını ücretsiz yayınla</h2>
          <p className="mt-2 text-sm text-blue-100 sm:text-base">
            Dakikalar içinde ilanını ver, milyonlara ulaş.
          </p>
          <Link
            href="/sahibinden/ilan-ver"
            className="mt-5 inline-block rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
          >
            Hemen İlan Ver
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-800">Emlak</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/sahibinden/kategori/satilik-daire" className="hover:text-yellow-600">Satılık Daire</Link></li>
              <li><Link href="/sahibinden/kategori/kiralik-daire" className="hover:text-yellow-600">Kiralık Daire</Link></li>
              <li><Link href="/sahibinden/kategori/satilik-arsa" className="hover:text-yellow-600">Satılık Arsa</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-800">Hesap</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/sahibinden/ilan-ver" className="hover:text-yellow-600">İlan Ver</Link></li>
              <li><Link href="/sahibinden/hesabim/ilanlarim" className="hover:text-yellow-600">İlanlarım</Link></li>
              <li><Link href="/sahibinden/hesabim/favorilerim" className="hover:text-yellow-600">Favorilerim</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-800">Keşfet</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/sahibinden" className="hover:text-yellow-600">Tüm Pazaryeri</Link></li>
              <li><Link href="/haberler" className="hover:text-yellow-600">Haberler</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-800">Kurumsal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-yellow-600">Hakkımızda</Link></li>
              <li><Link href="/" className="hover:text-yellow-600">İletişim</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} emlak — Eğitim amaçlı demo uygulaması.
        </div>
      </footer>
    </div>
  );
}
