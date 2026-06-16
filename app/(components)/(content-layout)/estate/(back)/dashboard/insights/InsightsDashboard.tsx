"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  TrendingUp, FileText, CalendarCheck, DollarSign, Receipt,
  Wallet, Wrench, MessageSquare, Percent, Landmark,
} from "lucide-react";
import type { AdvancedAnalytics } from "../../../actions/insights";

function money(v: number, cur = "TRY") {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(v || 0);
}

const COLORS = ["bg-blue-500", "bg-green-500", "bg-amber-500", "bg-purple-500", "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-gray-500"];

function StatCard({ icon: Icon, label, value, sub, color = "blue" }: {
  icon: any; label: string; value: string | number; sub?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600", green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600", amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600", teal: "bg-teal-50 text-teal-600",
  };
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${colorMap[color] ?? colorMap.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-black">{label}</p>
          <p className="text-lg font-bold text-black truncate">{value}</p>
          {sub && <p className="text-xs text-black">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function Breakdown({ title, data, labelMap }: { title: string; data: Record<string, number>; labelMap?: Record<string, string> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2"><CardTitle className="text-sm text-black">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {!entries.length ? (
          <p className="text-xs text-black">Veri yok.</p>
        ) : entries.map(([k, v], i) => (
          <div key={k}>
            <div className="flex justify-between text-xs text-black mb-0.5">
              <span>{labelMap?.[k] ?? k}</span><span className="font-semibold">{v}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${COLORS[i % COLORS.length]} rounded-full`} style={{ width: `${(v / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const expenseCatLabel: Record<string, string> = {
  RENT: "Ofis Kirası", SALARY: "Maaş", MARKETING: "Pazarlama", UTILITIES: "Faturalar",
  COMMISSION: "Komisyon", MAINTENANCE: "Bakım", TAX: "Vergi", OTHER: "Diğer",
};
const offerStatusLabel: Record<string, string> = {
  PENDING: "Beklemede", COUNTERED: "Karşı Teklif", ACCEPTED: "Kabul", REJECTED: "Red", WITHDRAWN: "Çekildi", EXPIRED: "Süresi Doldu",
};
const channelLabel: Record<string, string> = { CALL: "Telefon", EMAIL: "E-posta", SMS: "SMS", WHATSAPP: "WhatsApp", MEETING: "Görüşme", NOTE: "Not" };
const maintStatusLabel: Record<string, string> = { OPEN: "Açık", IN_PROGRESS: "İşlemde", RESOLVED: "Çözüldü", CANCELLED: "İptal" };

export default function InsightsDashboard({ data }: { data: AdvancedAnalytics }) {
  const netProfit = data.commissions.paid + data.invoices.collected - data.expenses.total - data.payroll.paid;

  return (
    <div className="space-y-6">
      {/* Üst KPI kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Percent}      label="Teklif Dönüşüm Oranı" value={`%${data.offers.conversionRate}`} sub={`${data.offers.accepted}/${data.offers.total} kabul`} color="blue" />
        <StatCard icon={CalendarCheck} label="Aktif Rezervasyon"     value={data.reservations.active} sub={`${money(data.reservations.depositTotal)} kapora`} color="purple" />
        <StatCard icon={DollarSign}   label="Tahsil Edilen Komisyon" value={money(data.commissions.paid)} sub={`${money(data.commissions.pending)} bekliyor`} color="green" />
        <StatCard icon={Wrench}       label="Açık Bakım Talebi"      value={data.maintenance.open} sub={`${data.maintenance.total} toplam`} color="amber" />
      </div>

      {/* Finansal özet */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Receipt}  label="Faturalanan"     value={money(data.invoices.billed)} sub={`${data.invoices.total} fatura`} color="teal" />
        <StatCard icon={Landmark} label="Tahsil Edilen"   value={money(data.invoices.collected)} color="green" />
        <StatCard icon={Wallet}   label="Toplam Gider"    value={money(data.expenses.total)} color="rose" />
        <StatCard icon={TrendingUp} label="Net (tahmini)" value={money(netProfit)} sub="komisyon+tahsilat − gider−maaş" color={netProfit >= 0 ? "green" : "rose"} />
      </div>

      {/* Dağılımlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Breakdown title="Teklifler — Durum"      data={data.offers.byStatus}        labelMap={offerStatusLabel} />
        <Breakdown title="Giderler — Kategori (₺)" data={data.expenses.byCategory}    labelMap={expenseCatLabel} />
        <Breakdown title="İletişim — Kanal"        data={data.communications.byChannel} labelMap={channelLabel} />
        <Breakdown title="Bakım — Durum"           data={data.maintenance.byStatus}   labelMap={maintStatusLabel} />
        <Breakdown title="Rezervasyon — Durum"     data={data.reservations.byStatus} />
        <Breakdown title="Komisyon — Durum"        data={data.commissions.byStatus} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={FileText}      label="Toplam Teklif"   value={data.offers.total} color="blue" />
        <StatCard icon={MessageSquare} label="İletişim Kaydı"  value={data.communications.total} color="purple" />
        <StatCard icon={Wallet}        label="Net Bordro"      value={money(data.payroll.netTotal)} sub={`${money(data.payroll.paid)} ödendi`} color="teal" />
        <StatCard icon={DollarSign}    label="Toplam Komisyon" value={money(data.commissions.total)} color="green" />
      </div>
    </div>
  );
}
