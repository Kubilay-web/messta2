"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Clock, AlertTriangle, CheckCircle, Search, Link, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";

const statusLabel: Record<string, string> = {
  PAID: "Ödendi", PENDING: "Bekliyor", PARTIAL: "Kısmi", FAILED: "Başarısız", REFUNDED: "İade",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PAID: "default", PENDING: "outline", PARTIAL: "secondary", FAILED: "destructive", REFUNDED: "secondary",
};
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};

type Payment = {
  id: string; contractId: string; title: string; amount: number;
  dueDate: Date | string; paidDate?: Date | string | null;
  status: string; paymentMethod?: string | null; receiptNo?: string | null;
  contract?: { contractNo: string; clientName: string; agentName: string; currency: string; contractType: string } | null;
};
type Monthly = { month: number; label: string; amount: number; count: number };
type Kpi = {
  totalAll: number; totalPaid: number; totalPending: number; totalOverdue: number;
  countAll: number; countPaid: number; countPending: number; countOverdue: number;
  countPartial: number; currency: string;
};
type Props = { data: { payments: Payment[]; kpi: Kpi; monthly: Monthly[] }; year: number; minYear: number; maxYear: number };

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

function MonthlyChart({ monthly, currency }: { monthly: Monthly[]; currency: string }) {
  const max = Math.max(...monthly.map((m) => m.amount), 1);
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-32">
        {monthly.map((m) => {
          const h = Math.round((m.amount / max) * 100);
          return (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5 group relative">
              {m.amount > 0 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {fmt(m.amount, currency)}
                </div>
              )}
              <div
                className={`w-full rounded-t transition-all ${m.amount > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-100"}`}
                style={{ height: `${Math.max(h, m.amount > 0 ? 4 : 2)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5">
        {monthly.map((m) => (
          <div key={m.month} className="flex-1 text-center text-[9px] text-black">{m.label}</div>
        ))}
      </div>
    </div>
  );
}

export default function RevenueUI({ data, year, minYear, maxYear }: Props) {
  const { payments, kpi, monthly } = data;
  const router = useRouter();
  const [search,     setSearch]     = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const PER = 15;

  function goYear(y: number) {
    router.push(`?year=${y}`);
  }

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = !q || (
        p.title.toLowerCase().includes(q) ||
        (p.contract?.contractNo ?? "").toLowerCase().includes(q) ||
        (p.contract?.clientName ?? "").toLowerCase().includes(q) ||
        (p.contract?.agentName  ?? "").toLowerCase().includes(q)
      );
      const matchStatus = filterStatus === "ALL" || p.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [payments, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PER);
  const pageItems  = filtered.slice((page - 1) * PER, page * PER);

  const isOverdue = (p: Payment) => p.status === "PENDING" && new Date(p.dueDate) < new Date();

  return (
    <div className="space-y-6">

      {/* ── Yıl Seçici ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goYear(year - 1)}
          disabled={year <= minYear}
          className="p-1.5 rounded border border-gray-300 text-black disabled:opacity-30 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-black min-w-[3.5rem] text-center">{year}</span>
        <button
          onClick={() => goYear(year + 1)}
          disabled={year >= maxYear}
          className="p-1.5 rounded border border-gray-300 text-black disabled:opacity-30 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((y) => (
            <button
              key={y}
              onClick={() => goYear(y)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                y === year
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-black hover:bg-gray-100"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Kartları ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { icon: TrendingUp,    label: "Toplam Beklenen", value: fmt(kpi.totalAll,     kpi.currency), color: "bg-blue-50 text-blue-600",   sub: `${kpi.countAll} kayıt`         },
          { icon: CheckCircle,   label: "Tahsil Edilen",   value: fmt(kpi.totalPaid,    kpi.currency), color: "bg-green-50 text-green-600", sub: `${kpi.countPaid} ödeme`        },
          { icon: Clock,         label: "Bekliyor",        value: fmt(kpi.totalPending, kpi.currency), color: "bg-amber-50 text-amber-600", sub: `${kpi.countPending} kayıt`     },
          { icon: AlertTriangle, label: "Gecikmiş",        value: fmt(kpi.totalOverdue, kpi.currency), color: "bg-red-50 text-red-600",     sub: `${kpi.countOverdue} kayıt`     },
          { icon: DollarSign,    label: "Kısmi Ödeme",     value: String(kpi.countPartial),            color: "bg-purple-50 text-purple-600",sub: "kayıt"                         },
        ].map(({ icon: Icon, label, value, color, sub }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-black font-medium truncate">{label}</p>
                <p className="text-base font-extrabold text-black leading-tight">{value}</p>
                <p className="text-[10px] text-black">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Aylık Gelir Grafiği ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black">{year} Aylık Tahsilat (Ödendi)</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyChart monthly={monthly} currency={kpi.currency} />
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-black border-t pt-2">
            <span>En yüksek: <strong>{fmt(Math.max(...monthly.map((m) => m.amount)), kpi.currency)}</strong></span>
            <span>Toplam: <strong>{fmt(monthly.reduce((s, m) => s + m.amount, 0), kpi.currency)}</strong></span>
          </div>
        </CardContent>
      </Card>

      {/* ── Ödeme Defteri ── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-sm text-black">
              Ödeme Defteri
              <Badge variant="secondary" className="ml-2 text-xs text-black">{filtered.length}</Badge>
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Durum Filtresi */}
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ALL">Tüm Durumlar</option>
                {["PAID","PENDING","PARTIAL","FAILED","REFUNDED"].map((s) => (
                  <option key={s} value={s}>{statusLabel[s]}</option>
                ))}
              </select>
              {/* Arama */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black" />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Sözleşme, müşteri, danışman…"
                  className="pl-8 pr-3 py-1.5 rounded-md border border-gray-300 text-xs text-black focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-56"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  {["Başlık", "Sözleşme / Tip", "Müşteri / Danışman", "Tutar", "Vade", "Ödeme", "Durum"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageItems.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-black">Sonuç bulunamadı.</td></tr>
                ) : pageItems.map((p) => (
                  <tr key={p.id} className={`transition-colors ${isOverdue(p) ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"}`}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-black text-sm">{p.title}</p>
                      {p.receiptNo && <p className="text-xs text-black">{p.receiptNo}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black font-medium">{p.contract?.contractNo ?? "—"}</p>
                      <p className="text-xs text-black">{contractTypeLabel[p.contract?.contractType ?? ""] ?? p.contract?.contractType ?? ""}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{p.contract?.clientName ?? "—"}</p>
                      <p className="text-xs text-black">{p.contract?.agentName ?? ""}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                      {fmt(p.amount, p.contract?.currency)}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">
                      <span className={isOverdue(p) ? "text-red-600 font-semibold" : "text-black"}>
                        {fmtDate(p.dueDate)}
                      </span>
                      {isOverdue(p) && <p className="text-[10px] text-red-500">Gecikmiş</p>}
                    </td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(p.paidDate)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs">
                        {statusLabel[p.status] ?? p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {pageItems.length === 0 ? (
              <p className="p-6 text-center text-sm text-black">Sonuç bulunamadı.</p>
            ) : pageItems.map((p) => (
              <div key={p.id} className={`p-4 space-y-2 ${isOverdue(p) ? "bg-red-50" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-black truncate">{p.title}</p>
                    <p className="text-xs text-black">{p.contract?.contractNo ?? "—"} · {p.contract?.clientName ?? ""}</p>
                  </div>
                  <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-[10px] shrink-0">
                    {statusLabel[p.status] ?? p.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-black">
                  <span className="font-bold">{fmt(p.amount, p.contract?.currency)}</span>
                  <span className={isOverdue(p) ? "text-red-600 font-semibold" : ""}>
                    Vade: {fmtDate(p.dueDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sayfalama */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-xs text-black">{filtered.length} kayıt · Sayfa {page}/{totalPages}</p>
              <div className="flex gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1 text-xs rounded border border-gray-300 text-black disabled:opacity-40 hover:bg-gray-50">
                  ‹ Önceki
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1 text-xs rounded border border-gray-300 text-black disabled:opacity-40 hover:bg-gray-50">
                  Sonraki ›
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
