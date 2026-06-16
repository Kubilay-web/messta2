"use client";

import Link from "next/link";
import {
  Building2, FileText, Users, User, CalendarCheck,
  DollarSign, TrendingUp, Clock, CheckCircle, ArrowRight,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AgencyAnalytics } from "../../actions/analytics";

const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",  EXPIRED: "Süresi Doldu",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", COMPLETED: "default", DRAFT: "outline",
  CANCELLED: "destructive", EXPIRED: "destructive",
};
const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const listingStatusLabel: Record<string, string> = {
  ACTIVE: "Aktif", PENDING: "Beklemede", RESERVED: "Rezerve",
  SOLD: "Satıldı", RENTED: "Kiralandı", WITHDRAWN: "Geri Çekildi",
};
const listingStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", PENDING: "secondary", RESERVED: "outline",
  SOLD: "secondary", RENTED: "secondary", WITHDRAWN: "destructive",
};

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

const base = "/estate/dashboard";

const kpiConfig = (analytics: AgencyAnalytics) => [
  {
    title:    "Mülk",
    value:    analytics.counts.properties,
    icon:     Building2,
    color:    "bg-blue-50 text-blue-600",
    href:     `${base}/properties`,
  },
  {
    title:    "Aktif İlan",
    value:    analytics.counts.activeListings,
    sub:      `Toplam: ${analytics.counts.totalListings}`,
    icon:     FileText,
    color:    "bg-green-50 text-green-600",
    href:     `${base}/listings`,
  },
  {
    title:    "Aktif Sözleşme",
    value:    analytics.counts.activeContracts,
    sub:      `Toplam: ${analytics.counts.totalContracts}`,
    icon:     CheckCircle,
    color:    "bg-purple-50 text-purple-600",
    href:     `${base}/contracts`,
  },
  {
    title:    "Danışman",
    value:    analytics.counts.agents,
    icon:     User,
    color:    "bg-teal-50 text-teal-600",
    href:     `${base}/agents`,
  },
  {
    title:    "Müşteri",
    value:    analytics.counts.clients,
    icon:     Users,
    color:    "bg-amber-50 text-amber-600",
    href:     `${base}/users/clients`,
  },
  {
    title:    "Planl. Ziyaret",
    value:    analytics.counts.scheduledVisits,
    sub:      `Toplam: ${analytics.counts.totalVisits}`,
    icon:     CalendarCheck,
    color:    "bg-rose-50 text-rose-600",
    href:     `${base}/visits`,
  },
  {
    title:    "Satış Cirosu",
    value:    fmt(analytics.revenue.totalSaleValue),
    icon:     TrendingUp,
    color:    "bg-green-50 text-green-600",
    href:     `${base}/finance/revenue`,
  },
  {
    title:    "Toplam Komisyon",
    value:    fmt(analytics.revenue.totalCommission),
    icon:     DollarSign,
    color:    "bg-purple-50 text-purple-600",
    href:     `${base}/finance/commissions`,
  },
  {
    title:    "Bekl. Ödeme",
    value:    fmt(analytics.revenue.pendingPayments),
    icon:     Clock,
    color:    "bg-amber-50 text-amber-600",
    href:     `${base}/payments`,
  },
];

export default function DashboardDetails({
  analytics,
  agencySlug,
}: {
  analytics:  AgencyAnalytics;
  agencySlug: string;
}) {
  const kpis = kpiConfig(analytics);

  return (
    <div className="space-y-6">

      {/* ── KPI Kartları ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map(({ title, value, sub, icon: Icon, color, href }) => (
          <Link key={title} href={href}>
            <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-black uppercase tracking-wide truncate">{title}</p>
                  <p className="text-xl font-extrabold text-black leading-tight">{value}</p>
                  {sub && <p className="text-[10px] text-black mt-0.5">{sub}</p>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* ── Son Sözleşmeler & Son İlanlar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Son Sözleşmeler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Son Sözleşmeler
              </span>
              <Link href={`${base}/contracts`}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Tümü <ArrowRight className="w-3 h-3" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {analytics.recentContracts.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-black">Sözleşme bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {analytics.recentContracts.map((c) => (
                  <div key={c.id} className="flex items-start justify-between gap-2 px-4 py-3 hover:bg-gray-50">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black">{c.contractNo}</p>
                      <p className="text-xs text-black truncate">{c.clientName}</p>
                      <p className="text-[10px] text-black">{fmtDate(c.createdAt)}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <Badge variant="outline" className="text-[10px] text-black block w-fit ml-auto">
                        {contractTypeLabel[c.contractType] ?? c.contractType}
                      </Badge>
                      <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px] block w-fit ml-auto">
                        {contractStatusLabel[c.status] ?? c.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Son İlanlar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-green-600" /> Son İlanlar
              </span>
              <Link href={`${base}/academics/listings`}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Tümü <ArrowRight className="w-3 h-3" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {analytics.recentListings.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-black">İlan bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {analytics.recentListings.map((l) => (
                  <div key={l.id} className="flex items-start justify-between gap-2 px-4 py-3 hover:bg-gray-50">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black truncate">{l.title}</p>
                      <p className="text-xs text-black">{l.listingNo}</p>
                      <p className="text-xs font-medium text-black">
                        {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                      </p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <Badge variant="outline" className="text-[10px] text-black block w-fit ml-auto">
                        {listingTypeLabel[l.listingType] ?? l.listingType}
                      </Badge>
                      <Badge variant={listingStatusVariant[l.status] ?? "secondary"} className="text-[10px] block w-fit ml-auto">
                        {listingStatusLabel[l.status] ?? l.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Son Mülk Gezileri ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Son Mülk Gezileri
            </span>
            <Link href={`${base}/academics/visits`}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Tümü <ArrowRight className="w-3 h-3" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {analytics.recentVisits.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-black">Gezi bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {analytics.recentVisits.map((v) => {
                const statusColor: Record<string, string> = {
                  SCHEDULED: "bg-blue-50 text-blue-700",
                  COMPLETED: "bg-green-50 text-green-700",
                  CANCELLED: "bg-red-50 text-red-700",
                  NO_SHOW:   "bg-gray-50 text-gray-700",
                };
                const statusLbl: Record<string, string> = {
                  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
                  CANCELLED: "İptal",    NO_SHOW: "Gelmedi",
                };
                return (
                  <div key={v.id} className="px-4 py-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                      <CalendarCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black truncate">{v.clientName}</p>
                      <p className="text-xs text-black">Danışman: {v.agentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor[v.status] ?? "bg-gray-50 text-black"}`}>
                          {statusLbl[v.status] ?? v.status}
                        </span>
                        <span className="text-[10px] text-black">{fmtDate(v.scheduledAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
