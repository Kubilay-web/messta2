import Link from "next/link";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { getUnreadMessageCount } from "../data";

export const dynamic = "force-dynamic";

export default async function HesabimOverview() {
  const { user } = await validateRequest();
  if (!user) return null;

  const [activeCount, totalListings, favCount, unread] = await Promise.all([
    prisma.shListing.count({ where: { userId: user.id, status: "ACTIVE" } }),
    prisma.shListing.count({ where: { userId: user.id } }),
    prisma.shFavorite.count({ where: { userId: user.id } }),
    getUnreadMessageCount(user.id),
  ]);

  const cards = [
    { label: "Yayındaki İlanlar", value: activeCount, href: "/sahibinden/hesabim/ilanlarim", color: "bg-green-50 text-green-700" },
    { label: "Toplam İlan", value: totalListings, href: "/sahibinden/hesabim/ilanlarim", color: "bg-blue-50 text-blue-700" },
    { label: "Favorilerim", value: favCount, href: "/sahibinden/hesabim/favorilerim", color: "bg-red-50 text-red-700" },
    { label: "Okunmamış Mesaj", value: unread, href: "/sahibinden/hesabim/mesajlarim", color: "bg-yellow-50 text-yellow-700" },
  ];

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Genel Bakış</h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
            <span className={`inline-block rounded-lg px-2 py-1 text-xs font-semibold ${c.color}`}>{c.label}</span>
            <p className="mt-2 text-3xl font-extrabold text-gray-800">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-600">Yeni bir şey mi satmak istiyorsun?</p>
        <Link
          href="/sahibinden/ilan-ver"
          className="mt-3 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Ücretsiz İlan Ver
        </Link>
      </div>
    </div>
  );
}
