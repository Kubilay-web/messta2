import Link from "next/link";
import { TrendingUp, Building2, Home as HomeIcon, KeyRound, MapPin, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import SearchForm from "./components/SearchForm";
import CategoryGrid from "./components/CategoryGrid";
import ListingCard from "./components/ListingCard";
import RecentlyViewed from "./components/RecentlyViewed";
import { getFeaturedListings, getMarketplaceListings, getMarketplaceCities, getMarketStats, getCityCounts } from "./actions/listings";
import { getMyFavoriteIds } from "./actions/favorites";

export const dynamic = "force-dynamic";

export default async function SahibindenHome() {
  const [featured, latest, cities, stats, cityCounts, favIds] = await Promise.all([
    getFeaturedListings(8),
    getMarketplaceListings({ sort: "newest" }, 8),
    getMarketplaceCities(),
    getMarketStats(),
    getCityCounts(8),
    getMyFavoriteIds(),
  ]);
  const favSet = new Set(favIds);

  const statCards = [
    { label: "Toplam İlan", value: stats.total, Icon: Building2, accent: "text-amber-600 bg-amber-50" },
    { label: "Satılık", value: stats.sale, Icon: HomeIcon, accent: "text-emerald-600 bg-emerald-50" },
    { label: "Kiralık", value: stats.rent, Icon: KeyRound, accent: "text-sky-600 bg-sky-50" },
    { label: "Emlak Ofisi", value: stats.agencies, Icon: TrendingUp, accent: "text-violet-600 bg-violet-50" },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_50%_0%,rgba(245,158,11,0.35),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5" /> Türkiye'nin en gelişmiş emlak pazarı
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Hayalinizdeki <span className="text-amber-400">eve</span> bir adım uzaktasınız
            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Satılık & kiralık binlerce ilan; bireysel ve ofis ilanları tek yerde. Hızlı arama, harita ve karşılaştırma.
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-4xl">
            <SearchForm cities={cities} compact />
          </div>

          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-400" /> Anında sonuç</span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Moderasyonlu ilanlar</span>
            <span className="opacity-40">•</span>
            <Link href="/sahibinden/ilan-ver" className="font-semibold text-amber-300 hover:underline">Ücretsiz ilan ver →</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10">
        {/* İstatistikler */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`mb-2 grid h-9 w-9 place-items-center rounded-lg ${s.accent}`}>
                <s.Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900">{s.value.toLocaleString("tr-TR")}</p>
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Kategoriler */}
        <section>
          <h2 className="mb-4 text-lg font-extrabold text-slate-900">Kategoriler</h2>
          <CategoryGrid />
        </section>

        {/* Öne çıkan ilanlar */}
        {featured.length > 0 && (
          <section>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                <Sparkles className="h-5 w-5 text-amber-500" /> Vitrindeki İlanlar
              </h2>
              <Link href="/sahibinden/ilanlar" className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline">
                Tümü <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featured.map((l) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
            </div>
          </section>
        )}

        {/* Popüler şehirler */}
        {cityCounts.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-extrabold text-slate-900">Popüler Şehirler</h2>
            <div className="flex flex-wrap gap-2">
              {cityCounts.map((c) => (
                <Link
                  key={c.city}
                  href={`/sahibinden/ilanlar?city=${encodeURIComponent(c.city)}`}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-700"
                >
                  <MapPin className="h-4 w-4 text-amber-500" /> {c.city}
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-500">{c.count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* En yeni ilanlar */}
        {latest.length > 0 && (
          <section>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">En Yeni İlanlar</h2>
              <Link href="/sahibinden/ilanlar?sort=newest" className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline">
                Tümü <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {latest.map((l) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
            </div>
          </section>
        )}

        {/* Son gezilenler */}
        <RecentlyViewed />

        {/* CTA */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-2xl font-black sm:text-3xl">Mülkünüzü saniyeler içinde yayınlayın</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-amber-50">
            Ücretsiz ilan verin, binlerce alıcı ve kiracıya ulaşın. İsterseniz ilanınızı vitrine taşıyın.
          </p>
          <Link
            href="/sahibinden/ilan-ver"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-amber-700 shadow-lg transition hover:scale-105"
          >
            Hemen İlan Ver <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
