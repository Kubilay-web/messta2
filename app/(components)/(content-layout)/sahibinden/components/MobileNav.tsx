"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Search, Heart, Bookmark, GitCompareArrows, PlusCircle, User, LogIn, MessageCircle, Bell } from "lucide-react";

const items = [
  { href: "/sahibinden", label: "Anasayfa", Icon: Home },
  { href: "/sahibinden/ilanlar", label: "Tüm İlanlar", Icon: Search },
  { href: "/sahibinden/mesajlar", label: "Mesajlarım", Icon: MessageCircle },
  { href: "/sahibinden/bildirimler", label: "Bildirimler", Icon: Bell },
  { href: "/sahibinden/favorilerim", label: "Favorilerim", Icon: Heart },
  { href: "/sahibinden/aramalarim", label: "Aramalarım", Icon: Bookmark },
  { href: "/sahibinden/karsilastir", label: "Karşılaştır", Icon: GitCompareArrows },
];

export default function MobileNav({ loggedIn }: { loggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menü"
        className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-screen w-[82%] max-w-xs flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="text-lg font-extrabold tracking-tight">
                sahibinden<span className="text-amber-500">.</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Kapat" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              {items.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  <Icon className="h-5 w-5 text-slate-400" /> {label}
                </Link>
              ))}
            </nav>

            <div className="space-y-2 border-t border-slate-100 p-3">
              <Link
                href="/sahibinden/ilan-ver"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-bold text-white shadow-lg shadow-amber-500/25"
              >
                <PlusCircle className="h-5 w-5" /> Ücretsiz İlan Ver
              </Link>
              {loggedIn ? (
                <Link
                  href="/sahibinden/hesabim"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 font-semibold text-slate-700"
                >
                  <User className="h-5 w-5" /> Hesabım
                </Link>
              ) : (
                <Link
                  href="/estate/login"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 font-semibold text-slate-700"
                >
                  <LogIn className="h-5 w-5" /> Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
