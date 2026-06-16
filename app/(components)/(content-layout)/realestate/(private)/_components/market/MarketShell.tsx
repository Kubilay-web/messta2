import Link from "next/link";
import { Building2, Search, Home, Heart, Bookmark, PlusCircle, MapPin } from "lucide-react";
import MobileMenu from "./MobileMenu";

// Modern pazar yeri kabuğu — cam (glass) yapışkan üst bar + zengin alt bilgi.
export default function MarketShell({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/realestate", label: "Anasayfa", Icon: Home },
    { href: "/realestate/ilanlar", label: "İlanlar", Icon: Search },
    { href: "/realestate/favorites", label: "Favoriler", Icon: Heart },
    { href: "/realestate/saved-searches", label: "Aramalarım", Icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Üst bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <Link href="/realestate" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="text-base font-extrabold tracking-tight sm:text-[17px]">
              Emlak<span className="text-blue-600">Pazarı</span>
            </span>
          </Link>

          {/* Masaüstü nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <Link
              href="/realestate/user/properties/create-property"
              className="ml-1.5 flex items-center gap-1.5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.03]"
            >
              <PlusCircle className="h-4 w-4" /> İlan Ver
            </Link>
          </nav>

          {/* Mobil: İlan Ver (ikon) + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/realestate/user/properties/create-property"
              aria-label="İlan Ver"
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
            >
              <PlusCircle className="h-5 w-5" />
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>

      {children}

      {/* Alt bilgi */}
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-lg font-extrabold tracking-tight">EmlakPazarı</span>
              </div>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Tüm emlak ofislerinin ve bireysel ilan sahiplerinin satılık & kiralık ilanları tek modern pazar yerinde.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <Link href="/realestate/ilanlar" className="text-slate-600 hover:text-blue-600">Tüm İlanlar</Link>
              <Link href="/realestate/favorites" className="text-slate-600 hover:text-blue-600">Favoriler</Link>
              <Link href="/realestate/user/properties/create-property" className="text-slate-600 hover:text-blue-600">İlan Ver</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Türkiye geneli emlak ilanları</p>
            <p>© {new Date().getFullYear()} EmlakPazarı — tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
