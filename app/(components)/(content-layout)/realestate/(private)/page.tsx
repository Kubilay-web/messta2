import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, MapPin, Building2, ShieldCheck, Search } from "lucide-react";
import MarketShell from "./_components/market/MarketShell";
import SearchForm from "./_components/market/SearchForm";
import ListingCard from "./_components/market/ListingCard";
import {
  getFeaturedListings,
  getMarketplacePage,
  getMarketplaceCities,
} from "../actions/marketplace";
import { getMyFavoriteIds } from "../actions/favorites";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "EmlakPazarı — Satılık & Kiralık İlanlar",
  description:
    "Tüm emlak ofislerinin ve bireysel ilan sahiplerinin satılık, kiralık konut, ofis ve arsa ilanları tek modern pazar yerinde. Ara, favorile, danışmana ulaş.",
};

function SectionHeader({ icon: Icon, title, href }: { icon: any; title: string; href: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="flex min-w-0 items-center gap-2.5 text-lg font-extrabold tracking-tight sm:text-xl">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </span>
        <span className="truncate">{title}</span>
      </h2>
      <Link href={href} className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600">
        <span className="hidden sm:inline">Tümünü gör</span>
        <span className="sm:hidden">Tümü</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default async function MarketHome() {
  const [featured, page, cities, favIds] = await Promise.all([
    getFeaturedListings(6),
    getMarketplacePage({ sort: "newest" }, 1, 8),
    getMarketplaceCities(),
    getMyFavoriteIds(),
  ]);
  const latest = page.items;
  const favSet = new Set(favIds);

  return (
    <MarketShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* dekoratif ışık lekeleri */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Türkiye'nin modern emlak pazarı
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Hayalindeki gayrimenkulü <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">keşfet</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-lg">
            Binlerce satılık ve kiralık ilan; ofis portföyleri ve bireysel ilan sahipleri tek yerde. Ara, favorile, doğrudan iletişime geç.
          </p>

          <div className="mt-8 max-w-4xl">
            <SearchForm cities={cities} compact />
          </div>

          {/* güven istatistikleri */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-x-8">
            <span className="flex items-center gap-2 text-white/80"><Building2 className="h-4 w-4 text-blue-300" /> <b className="text-white">{page.total}</b> aktif ilan</span>
            <span className="flex items-center gap-2 text-white/80"><MapPin className="h-4 w-4 text-blue-300" /> <b className="text-white">{cities.length}</b> şehir</span>
            <span className="flex items-center gap-2 text-white/80"><ShieldCheck className="h-4 w-4 text-blue-300" /> Ücretsiz ilan ver</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:space-y-14 sm:py-12">
        {/* Popüler şehirler */}
        {cities.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400">
              <Search className="h-4 w-4" /> Popüler şehirler
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 12).map((c) => (
                <Link
                  key={c}
                  href={`/realestate/ilanlar?city=${encodeURIComponent(c)}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Öne çıkanlar */}
        {featured.length > 0 && (
          <section>
            <SectionHeader icon={TrendingUp} title="Öne Çıkan İlanlar" href="/realestate/ilanlar" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />
              ))}
            </div>
          </section>
        )}

        {/* En yeni */}
        <section>
          <SectionHeader icon={Building2} title="En Yeni İlanlar" href="/realestate/ilanlar" />
          {latest.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 sm:p-16">
              Henüz yayınlanmış ilan bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />
              ))}
            </div>
          )}
        </section>

        {/* İlan ver çağrısı */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <h2 className="text-2xl font-extrabold sm:text-3xl">Mülkünü ücretsiz yayınla</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Dakikalar içinde ilanını oluştur, binlerce alıcı ve kiracıya ulaş; gelen talepleri tek panelden yönet.
          </p>
          <Link
            href="/realestate/user/properties/create-property"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:scale-[1.03]"
          >
            Hemen İlan Ver <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </MarketShell>
  );
}
