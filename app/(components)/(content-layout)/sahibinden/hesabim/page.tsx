import Link from "next/link";
import { PlusCircle, Building2, Eye, MessageSquare, Heart, User, Phone, Mail, Inbox } from "lucide-react";
import type { Metadata } from "next";
import MyListingsTable from "../components/MyListingsTable";
import { getMyListings, getMyInquiries } from "../actions/my-listings";
import { requireMarketUser, isMarketAdmin } from "../lib/auth";
import { formatPrice, timeAgo } from "../lib/format";
import { ShieldCheck, Flag, Crown } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Hesabım — sahibinden" };

export default async function AccountPage() {
  const user = await requireMarketUser();
  const [listings, inquiries] = await Promise.all([getMyListings(), getMyInquiries()]);

  const totalViews = listings.reduce((s, l) => s + (l.views ?? 0), 0);
  const totalLeads = listings.reduce((s, l) => s + (l._count?.crmLeads ?? 0), 0);
  const totalFavs = listings.reduce((s, l) => s + (l._count?.favorites ?? 0), 0);

  const stats = [
    { label: "İlan", value: listings.length, Icon: Building2, cls: "text-amber-600 bg-amber-50" },
    { label: "Görüntülenme", value: totalViews, Icon: Eye, cls: "text-sky-600 bg-sky-50" },
    { label: "Favori", value: totalFavs, Icon: Heart, cls: "text-rose-600 bg-rose-50" },
    { label: "Talep", value: totalLeads, Icon: MessageSquare, cls: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      {/* Başlık */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
            <User className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{user.name ?? "Hesabım"}</h1>
            <p className="text-sm text-slate-500">İlanlarınızı ve taleplerinizi yönetin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/sahibinden/hesabim/uyelik" className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100">
            <Crown className="h-4 w-4" /> Üyelik & Kontör
          </Link>
          <Link href="/sahibinden/ilan-ver" className="flex items-center gap-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25">
            <PlusCircle className="h-4 w-4" /> Yeni İlan
          </Link>
        </div>
      </div>

      {/* Admin hızlı erişim */}
      {isMarketAdmin(user) && (
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/sahibinden/admin/moderasyon" className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100">
            <ShieldCheck className="h-4 w-4" /> İlan Moderasyonu
          </Link>
          <Link href="/sahibinden/admin/raporlar" className="flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">
            <Flag className="h-4 w-4" /> Şikayet Yönetimi
          </Link>
        </div>
      )}

      {/* İstatistik */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`mb-2 grid h-9 w-9 place-items-center rounded-lg ${s.cls}`}><s.Icon className="h-5 w-5" /></div>
            <p className="text-2xl font-black text-slate-900">{s.value.toLocaleString("tr-TR")}</p>
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* İlanlar */}
        <section className="lg:col-span-3">
          <h2 className="mb-3 text-lg font-extrabold text-slate-900">İlanlarım</h2>
          <MyListingsTable rows={listings as any} />
        </section>

        {/* Talepler */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Inbox className="h-5 w-5 text-amber-500" /> Gelen Talepler
          </h2>
          {inquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              Henüz talep yok.
            </div>
          ) : (
            <div className="space-y-2.5">
              {inquiries.map((q: any) => (
                <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900">{q.contactName}</p>
                    <span className="text-[11px] text-slate-400">{timeAgo(q.createdAt)}</span>
                  </div>
                  <Link href={`/sahibinden/ilan/${q.listing?.id}`} className="line-clamp-1 text-xs text-amber-600 hover:underline">
                    {q.listing?.title}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-600">
                    <a href={`tel:${q.contactPhone}`} className="flex items-center gap-1 hover:text-amber-600"><Phone className="h-3.5 w-3.5" /> {q.contactPhone}</a>
                    {q.contactEmail && <a href={`mailto:${q.contactEmail}`} className="flex items-center gap-1 hover:text-amber-600"><Mail className="h-3.5 w-3.5" /> {q.contactEmail}</a>}
                  </div>
                  {q.value != null && <p className="mt-1 text-xs font-semibold text-emerald-600">Teklif: {formatPrice(q.value, q.currency ?? "TRY")}</p>}
                  {q.requirements && <p className="mt-1 line-clamp-2 text-xs text-slate-500">{q.requirements}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
