import Link from "next/link";
import { Home, Search, Heart, Bookmark, GitCompareArrows, PlusCircle, User, LogIn, MapPin, ShieldCheck, MessageCircle } from "lucide-react";
import MobileNav from "./MobileNav";
import CompareBar from "./CompareBar";
import NotificationBell from "./NotificationBell";
import type { MarketUser } from "../lib/auth";
import { getUnreadTotal } from "../actions/messages";
import { getUnreadNotificationCount } from "../actions/notifications";

const navItems = [
  { href: "/sahibinden", label: "Anasayfa", Icon: Home },
  { href: "/sahibinden/ilanlar", label: "İlanlar", Icon: Search },
  { href: "/sahibinden/favorilerim", label: "Favoriler", Icon: Heart },
  { href: "/sahibinden/aramalarim", label: "Aramalarım", Icon: Bookmark },
  { href: "/sahibinden/karsilastir", label: "Karşılaştır", Icon: GitCompareArrows },
];

export default async function Shell({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: MarketUser | null;
}) {
  const [unread, notifUnread] = user
    ? await Promise.all([getUnreadTotal(), getUnreadNotificationCount()])
    : [0, 0];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-4">
          <Link href="/sahibinden" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25">
              <Home className="h-5 w-5" />
            </span>
            <span className="text-[17px] font-extrabold tracking-tight">
              sahibinden<span className="text-amber-500">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-700"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user && <NotificationBell initialUnread={notifUnread} />}
            {user && (
              <Link
                href="/sahibinden/mesajlar"
                aria-label="Mesajlar"
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              >
                <MessageCircle className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <Link
                href="/sahibinden/hesabim"
                className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex"
              >
                <User className="h-4 w-4" /> {user.name?.split(" ")[0] ?? "Hesabım"}
              </Link>
            ) : (
              <Link
                href="/estate/login"
                className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex"
              >
                <LogIn className="h-4 w-4" /> Giriş
              </Link>
            )}

            <Link
              href="/sahibinden/ilan-ver"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.03] md:flex"
            >
              <PlusCircle className="h-4 w-4" /> İlan Ver
            </Link>

            <Link
              href="/sahibinden/ilan-ver"
              aria-label="İlan Ver"
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 md:hidden"
            >
              <PlusCircle className="h-5 w-5" />
            </Link>

            <MobileNav loggedIn={!!user} />
          </div>
        </div>
      </header>

      {children}

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <Home className="h-5 w-5" />
                </span>
                <span className="text-lg font-extrabold tracking-tight">sahibinden<span className="text-amber-500">.</span></span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-slate-500">
                Satılık & kiralık emlak ilanları, bireysel ve ofis ilanları tek modern pazar yerinde.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Keşfet</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li><Link href="/sahibinden/ilanlar?type=SALE" className="hover:text-amber-600">Satılık</Link></li>
                <li><Link href="/sahibinden/ilanlar?type=RENT" className="hover:text-amber-600">Kiralık</Link></li>
                <li><Link href="/sahibinden/ilanlar?ptype=LAND" className="hover:text-amber-600">Arsa</Link></li>
                <li><Link href="/sahibinden/ilanlar?ptype=OFFICE" className="hover:text-amber-600">İş Yeri</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Hesabım</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li><Link href="/sahibinden/ilan-ver" className="hover:text-amber-600">Ücretsiz İlan Ver</Link></li>
                <li><Link href="/sahibinden/favorilerim" className="hover:text-amber-600">Favorilerim</Link></li>
                <li><Link href="/sahibinden/aramalarim" className="hover:text-amber-600">Kayıtlı Aramalarım</Link></li>
                <li><Link href="/sahibinden/hesabim" className="hover:text-amber-600">İlanlarım</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Güvenli Alışveriş</h4>
              <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                Tüm ilanlar yayınlanmadan önce moderasyondan geçer. Dolandırıcılığa karşı dikkatli olun.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Türkiye geneli emlak ilanları</p>
            <p>© {new Date().getFullYear()} sahibinden — tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      <CompareBar />
    </div>
  );
}
