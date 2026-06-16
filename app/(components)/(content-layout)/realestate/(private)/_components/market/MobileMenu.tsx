"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Search, Heart, Bookmark, PlusCircle } from "lucide-react";

const items = [
  { href: "/realestate", label: "Anasayfa", Icon: Home },
  { href: "/realestate/ilanlar", label: "İlanlar", Icon: Search },
  { href: "/realestate/favorites", label: "Favoriler", Icon: Heart },
  { href: "/realestate/saved-searches", label: "Aramalarım", Icon: Bookmark },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  // Sayfa değişince menüyü kapat
  useEffect(() => setOpen(false), [pathname]);
  // Açıkken arka plan kaymasını engelle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Çekmece body'ye portal ile basılır → header'daki backdrop-filter "containing block"
  // sorununu aşar; tam yükseklik + en üst z-index garanti olur.
  const drawer =
    mounted && open
      ? createPortal(
          <div className="fixed inset-0 z-[9999]">
            {/* Karartma */}
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

            {/* Çekmece — tam yükseklik, beyaz */}
            <div className="absolute inset-y-0 right-0 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl">
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                <span className="text-base font-extrabold tracking-tight">
                  Emlak<span className="text-blue-600">Pazarı</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Kapat"
                  className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {items.map(({ href, label, Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        active ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="shrink-0 border-t border-slate-100 p-3">
                <Link
                  href="/realestate/user/properties/create-property"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
                >
                  <PlusCircle className="h-4 w-4" /> İlan Ver
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Menü"
        className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
      >
        <Menu className="h-5 w-5" />
      </button>
      {drawer}
    </div>
  );
}
