"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/sahibinden/hesabim", label: "Genel Bakış", exact: true },
  { href: "/sahibinden/hesabim/ilanlarim", label: "İlanlarım" },
  { href: "/sahibinden/hesabim/favorilerim", label: "Favorilerim" },
  { href: "/sahibinden/hesabim/aramalarim", label: "Aramalarım" },
  { href: "/sahibinden/hesabim/randevular", label: "Randevular" },
  { href: "/sahibinden/hesabim/mesajlarim", label: "Mesajlarım" },
  { href: "/sahibinden/hesabim/rezervasyonlarim", label: "Rezervasyonlarım" },
  { href: "/sahibinden/hesabim/kaporalar", label: "Kaporalar" },
  { href: "/sahibinden/hesabim/abonelikler", label: "Abonelikler & Planlar" },
  { href: "/sahibinden/hesabim/cuzdan", label: "Cüzdanım" },
  { href: "/sahibinden/hesabim/bildirimler", label: "Bildirimler" },
  { href: "/sahibinden/hesabim/magaza", label: "Mağazam" },
  { href: "/sahibinden/hesabim/danismanlar", label: "Danışmanlar" },
  { href: "/sahibinden/hesabim/toplu-yukle", label: "Toplu Yükle" },
  { href: "/sahibinden/hesabim/engellenenler", label: "Engellenenler" },
];

export default function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col">
      {ITEMS.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
              active ? "bg-yellow-400 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
