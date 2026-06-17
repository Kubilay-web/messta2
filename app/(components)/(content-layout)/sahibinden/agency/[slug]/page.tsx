import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Building2, Phone, Mail, MapPin, BadgeCheck, Users, Home as HomeIcon, KeyRound, CalendarDays, SearchX,
} from "lucide-react";
import ListingCard from "../../components/ListingCard";
import Pagination from "../../components/Pagination";
import { getAgencyBySlug } from "../../actions/agency";
import { getMyFavoriteIds } from "../../actions/favorites";
import { formatDate } from "../../lib/format";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAgencyBySlug(slug);
  if (!data) return { title: "Ofis bulunamadı — sahibinden" };
  return { title: `${data.agency.name} — Mağaza • sahibinden`, description: `${data.agency.name} ofisinin tüm satılık ve kiralık ilanları.` };
}

export default async function AgencyShowcasePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SP>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const type = first(sp.type);
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const data = await getAgencyBySlug(slug, type, page, 12);
  if (!data) notFound();

  const { agency, items, total, pages, stats } = data;
  const favIds = await getMyFavoriteIds();
  const favSet = new Set(favIds);

  const tabs = [
    { key: undefined as string | undefined, label: "Tümü", count: stats.total },
    { key: "SALE", label: "Satılık", count: stats.sale },
    { key: "RENT", label: "Kiralık", count: stats.rent },
  ];

  const statBadges = [
    { label: "İlan", value: stats.total, Icon: Building2 },
    { label: "Satılık", value: stats.sale, Icon: HomeIcon },
    { label: "Kiralık", value: stats.rent, Icon: KeyRound },
    { label: "Danışman", value: stats.agents, Icon: Users },
  ];

  const tabHref = (k?: string) => {
    const p = new URLSearchParams();
    if (k) p.set("type", k);
    const qs = p.toString();
    return `/sahibinden/agency/${slug}${qs ? `?${qs}` : ""}`;
  };
  const pageHref = (n: number) => {
    const p = new URLSearchParams();
    if (type) p.set("type", type);
    p.set("page", String(n));
    return `/sahibinden/agency/${slug}?${p.toString()}`;
  };

  return (
    <div>
      {/* Vitrin başlığı */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(60%_60%_at_20%_0%,rgba(245,158,11,0.4),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-xl">
              {agency.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
              ) : (
                <Building2 className="h-9 w-9 text-amber-500" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{agency.name}</h1>
                <BadgeCheck className="h-5 w-5 text-amber-400" />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                {agency.city && <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-amber-400" /> {agency.city}</span>}
                {agency.phone && <a href={`tel:${agency.phone}`} className="flex items-center gap-1 hover:text-white"><Phone className="h-4 w-4 text-amber-400" /> {agency.phone}</a>}
                {agency.primaryEmail && <a href={`mailto:${agency.primaryEmail}`} className="flex items-center gap-1 hover:text-white"><Mail className="h-4 w-4 text-amber-400" /> {agency.primaryEmail}</a>}
                <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-amber-400" /> Üyelik: {formatDate(agency.createdAt)}</span>
              </div>
              {agency.address && <p className="mt-1 text-xs text-slate-400">{agency.address}</p>}
            </div>
          </div>

          {/* İstatistikler */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statBadges.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <s.Icon className="h-5 w-5 text-amber-400" />
                <p className="mt-1.5 text-xl font-black text-white">{s.value.toLocaleString("tr-TR")}</p>
                <p className="text-[11px] font-medium text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:py-8">
        {/* Sekmeler */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = (t.key ?? "") === (type ?? "");
            return (
              <Link
                key={t.label}
                href={tabHref(t.key)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active ? "border-amber-500 bg-amber-500 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${active ? "bg-white/25" : "bg-slate-100 text-slate-500"}`}>{t.count}</span>
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <SearchX className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="font-semibold text-slate-700">Bu kategoride yayında ilan yok</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map((l) => <ListingCard key={l.id} listing={l} favorited={favSet.has(l.id)} />)}
            </div>
            <Pagination page={page} pages={pages} hrefFor={pageHref} />
          </>
        )}
      </div>
    </div>
  );
}
