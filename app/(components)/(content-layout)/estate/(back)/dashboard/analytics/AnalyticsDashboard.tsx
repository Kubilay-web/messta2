"use client";

import { AgencyAnalytics } from "../../../actions/analytics";
import { Badge } from "../../../components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "../../../components/ui/card";
import {
  Building2, FileText, Users, User, CalendarCheck,
  TrendingUp, DollarSign, Clock, CheckCircle, BarChart3,
} from "lucide-react";

/* ── Label maps ─────────────────────────────────────────────────────────── */
const listingStatusLabel: Record<string, string> = {
  ACTIVE: "Aktif", PENDING: "Beklemede", RESERVED: "Rezerve",
  SOLD: "Satıldı", RENTED: "Kiralandı", WITHDRAWN: "Geri Çekildi",
};
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};
const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", NO_SHOW: "Gelmedi",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", COMPLETED: "default",
  SCHEDULED: "outline", PENDING: "secondary",
  DRAFT: "outline", CANCELLED: "destructive",
  EXPIRED: "destructive", NO_SHOW: "destructive",
};

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR");
}

/* ── Stat Kartı ─────────────────────────────────────────────────────────── */
function StatCard({
  icon: Icon, label, value, sub, color = "blue",
}: {
  icon: any; label: string; value: string | number; sub?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue:   "bg-blue-50 text-blue-600",
    green:  "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber:  "bg-amber-50 text-amber-600",
    rose:   "bg-rose-50 text-rose-600",
    teal:   "bg-teal-50 text-teal-600",
  };
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${colorMap[color] ?? colorMap.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-black font-medium truncate">{label}</p>
          <p className="text-2xl font-extrabold text-black leading-tight">{value}</p>
          {sub && <p className="text-xs text-black mt-0.5">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Mini Bar Chart ─────────────────────────────────────────────────────── */
function MiniBar({
  items, labelMap, colorClass = "bg-blue-500",
}: {
  items: { key: string; count: number }[];
  labelMap: Record<string, string>;
  colorClass?: string;
}) {
  if (!items.length) return <p className="text-sm text-black">Veri yok</p>;
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div className="space-y-2">
      {items.map(({ key, count }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-xs text-black w-28 shrink-0 truncate">
            {labelMap[key] ?? key}
          </span>
          <div className="flex-1 bg-gray-100 rounded-full h-2">
            <div
              className={`${colorClass} h-2 rounded-full transition-all`}
              style={{ width: `${max ? (count / max) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-black w-5 text-right shrink-0">{count}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Ana Bileşen ─────────────────────────────────────────────────────────── */
export default function AnalyticsDashboard({ data }: { data: AgencyAnalytics }) {
  const {
    counts, revenue,
    listingsByStatus, listingsByType,
    contractsByType, contractsByStatus,
    propertiesByType, visitsByStatus,
    recentContracts, recentListings, recentVisits,
  } = data;

  return (
    <div className="space-y-6">

      {/* ── KPI Kartları ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <StatCard icon={Building2}    label="Mülk"              value={counts.properties}      color="blue"   />
        <StatCard icon={FileText}     label="Aktif İlan"        value={counts.activeListings}  sub={`Toplam: ${counts.totalListings}`}   color="green"  />
        <StatCard icon={CheckCircle}  label="Aktif Sözleşme"   value={counts.activeContracts} sub={`Toplam: ${counts.totalContracts}`}  color="purple" />
        <StatCard icon={User}         label="Danışman"          value={counts.agents}          sub={`Departman: ${counts.departments}`} color="teal"   />
        <StatCard icon={Users}        label="Müşteri"           value={counts.clients}         color="amber"  />
        <StatCard icon={CalendarCheck}label="Planl. Ziyaret"   value={counts.scheduledVisits} sub={`Toplam: ${counts.totalVisits}`}     color="rose"   />
        <StatCard icon={DollarSign}   label="Satış Cirosu"      value={fmt(revenue.totalSaleValue)}   color="green"  />
        <StatCard icon={TrendingUp}   label="Kira Cirosu"       value={fmt(revenue.totalRentalValue)} color="blue"   />
        <StatCard icon={TrendingUp}   label="Toplam Komisyon"  value={fmt(revenue.totalCommission)}  color="purple" />
        <StatCard icon={Clock}        label="Bekl. Ödeme"      value={fmt(revenue.pendingPayments)}  color="amber"  />
        <StatCard icon={BarChart3}    label="Tahsil Edilen"    value={fmt(revenue.paidPayments)}     color="teal"   />
      </div>

      {/* ── Dağılım Grafikleri ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">İlan Durumları</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={listingsByStatus.map((s) => ({ key: s.status, count: s.count }))}
              labelMap={listingStatusLabel}
              colorClass="bg-blue-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">İlan Tipleri</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={listingsByType.map((t) => ({ key: t.type, count: t.count }))}
              labelMap={listingTypeLabel}
              colorClass="bg-sky-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Sözleşme Tipleri</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={contractsByType.map((t) => ({ key: t.type, count: t.count }))}
              labelMap={contractTypeLabel}
              colorClass="bg-purple-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Sözleşme Durumları</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={contractsByStatus.map((s) => ({ key: s.status, count: s.count }))}
              labelMap={contractStatusLabel}
              colorClass="bg-violet-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Mülk Tipleri</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={propertiesByType.map((t) => ({ key: t.type, count: t.count }))}
              labelMap={propertyTypeLabel}
              colorClass="bg-teal-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Ziyaret Durumları</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBar
              items={visitsByStatus.map((s) => ({ key: s.status, count: s.count }))}
              labelMap={visitStatusLabel}
              colorClass="bg-amber-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* ── Son Aktiviteler ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Son Sözleşmeler */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Son Sözleşmeler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentContracts.length === 0 && (
              <p className="text-xs text-black">Kayıt yok</p>
            )}
            {recentContracts.map((c) => (
              <div key={c.id} className="flex items-start justify-between gap-2 py-1.5 border-b last:border-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black truncate">{c.contractNo}</p>
                  <p className="text-xs text-black truncate">{c.clientName}</p>
                  <p className="text-[10px] text-black">{fmtDate(c.createdAt)}</p>
                </div>
                <div className="shrink-0 space-y-1 text-right">
                  <Badge variant="outline" className="text-[10px] text-black block">
                    {contractTypeLabel[c.contractType] ?? c.contractType}
                  </Badge>
                  <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px] block">
                    {contractStatusLabel[c.status] ?? c.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Son İlanlar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <Building2 className="w-4 h-4 text-green-600" /> Son İlanlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentListings.length === 0 && (
              <p className="text-xs text-black">Kayıt yok</p>
            )}
            {recentListings.map((l) => (
              <div key={l.id} className="flex items-start justify-between gap-2 py-1.5 border-b last:border-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black truncate">{l.title}</p>
                  <p className="text-xs text-black">{l.listingNo}</p>
                  <p className="text-xs font-medium text-black">
                    {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                  </p>
                </div>
                <div className="shrink-0 space-y-1 text-right">
                  <Badge variant="outline" className="text-[10px] text-black block">
                    {listingTypeLabel[l.listingType] ?? l.listingType}
                  </Badge>
                  <Badge variant={statusVariant[l.status] ?? "secondary"} className="text-[10px] block">
                    {listingStatusLabel[l.status] ?? l.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Son Ziyaretler */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Son Ziyaretler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentVisits.length === 0 && (
              <p className="text-xs text-black">Kayıt yok</p>
            )}
            {recentVisits.map((v) => (
              <div key={v.id} className="flex items-start justify-between gap-2 py-1.5 border-b last:border-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black truncate">{v.clientName}</p>
                  <p className="text-xs text-black truncate">Danışman: {v.agentName}</p>
                  <p className="text-[10px] text-black">{fmtDate(v.scheduledAt)}</p>
                </div>
                <Badge
                  variant={statusVariant[v.status] ?? "secondary"}
                  className="text-[10px] shrink-0"
                >
                  {visitStatusLabel[v.status] ?? v.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
