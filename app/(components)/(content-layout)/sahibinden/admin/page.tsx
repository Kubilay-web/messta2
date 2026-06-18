import Link from "next/link";
import { getAdminStats } from "../data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const s = await getAdminStats();
  const cards = [
    { label: "Toplam İlan", value: s.total, color: "bg-blue-50 text-blue-700" },
    { label: "Yayında", value: s.active, color: "bg-green-50 text-green-700" },
    { label: "Onay Bekleyen", value: s.pending, color: "bg-yellow-50 text-yellow-700", href: "/sahibinden/admin/ilanlar?status=PENDING" },
    { label: "Açık Şikayet", value: s.openReports, color: "bg-red-50 text-red-700", href: "/sahibinden/admin/sikayetler" },
    { label: "Mağaza", value: s.stores, color: "bg-indigo-50 text-indigo-700" },
    { label: "Satıcı", value: s.sellers, color: "bg-purple-50 text-purple-700" },
  ];

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Yönetim Paneli</h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map((c) => {
          const inner = (
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <span className={`inline-block rounded-lg px-2 py-1 text-xs font-semibold ${c.color}`}>{c.label}</span>
              <p className="mt-2 text-3xl font-extrabold text-gray-800">{c.value}</p>
            </div>
          );
          return c.href ? (
            <Link key={c.label} href={c.href} className="transition hover:opacity-80">{inner}</Link>
          ) : (
            <div key={c.label}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
