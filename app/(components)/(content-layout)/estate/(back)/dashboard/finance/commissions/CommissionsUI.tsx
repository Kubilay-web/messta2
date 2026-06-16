"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Clock, CheckCircle, FileText, ChevronDown, ChevronUp, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { updateCommission } from "../../../../actions/commissions";
import toast from "react-hot-toast";

const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const statusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", COMPLETED: "default", DRAFT: "outline",
  CANCELLED: "destructive", EXPIRED: "destructive",
};

type AgentSummary = {
  agentId: string; agentName: string; contracts: number; completed: number;
  totalCommission: number; earnedCommission: number; pendingCommission: number; currency: string;
};
type Contract = {
  id: string; contractNo: string; contractType: string; status: string;
  commission?: number | null; currency: string; agentId: string; agentName: string;
  clientName: string; createdAt: Date | string;
};
type Totals = {
  contracts: number; totalCommission: number;
  earnedCommission: number; pendingCommission: number; currency: string;
};
type Props = {
  data:        { contracts: Contract[]; agentSummary: AgentSummary[]; totals: Totals };
  currentYear: number;
  minYear:     number;
  maxYear:     number;
};

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

function CommissionCell({ contractId, initial, currency }: { contractId: string; initial: number | null | undefined; currency: string }) {
  const [editing, setEditing] = useState(false);
  const [value,   setValue]   = useState(String(initial ?? ""));
  const [saving,  setSaving]  = useState(false);

  async function save() {
    const n = parseFloat(value);
    if (isNaN(n) || n < 0) { toast.error("Geçersiz tutar."); return; }
    setSaving(true);
    try {
      await updateCommission(contractId, n);
      toast.success("Komisyon güncellendi.");
      setEditing(false);
    } catch {
      toast.error("Güncellenemedi.");
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          type="number" value={value} onChange={(e) => setValue(e.target.value)}
          className="w-24 rounded border border-gray-300 px-2 py-1 text-xs text-black focus:ring-1 focus:ring-blue-500 focus:outline-none"
          autoFocus
        />
        <button onClick={save} disabled={saving}
          className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-medium disabled:opacity-50">
          {saving ? "…" : "✓"}
        </button>
        <button onClick={() => setEditing(false)} className="px-2 py-1 rounded border text-[10px] text-black">✕</button>
      </div>
    );
  }

  return (
    <button onClick={() => setEditing(true)}
      className="text-sm font-semibold text-black hover:text-blue-600 transition-colors text-left">
      {initial ? fmt(initial, currency) : <span className="text-black text-xs">— Ekle</span>}
    </button>
  );
}

export default function CommissionsUI({ data, currentYear, minYear, maxYear }: Props) {
  const { contracts, agentSummary, totals } = data;
  const router = useRouter();
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  function goYear(y: number) {
    router.push(`?year=${y}`);
  }

  const agentContracts = (agentId: string) =>
    contracts.filter((c) => c.agentId === agentId);

  return (
    <div className="space-y-6">

      {/* ── Yıl Seçici ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goYear(currentYear - 1)}
          disabled={currentYear <= minYear}
          className="p-1.5 rounded border border-gray-300 text-black disabled:opacity-30 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-black min-w-[3.5rem] text-center">{currentYear}</span>
        <button
          onClick={() => goYear(currentYear + 1)}
          disabled={currentYear >= maxYear}
          className="p-1.5 rounded border border-gray-300 text-black disabled:opacity-30 hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((y) => (
            <button
              key={y}
              onClick={() => goYear(y)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                y === currentYear
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: FileText,    label: "Toplam Sözleşme", value: totals.contracts,                      color: "bg-blue-50 text-blue-600"   },
          { icon: TrendingUp,  label: "Toplam Komisyon",  value: fmt(totals.totalCommission, totals.currency),  color: "bg-purple-50 text-purple-600"},
          { icon: CheckCircle, label: "Tahsil Edilen",    value: fmt(totals.earnedCommission, totals.currency), color: "bg-green-50 text-green-600" },
          { icon: Clock,       label: "Beklenen",         value: fmt(totals.pendingCommission, totals.currency),color: "bg-amber-50 text-amber-600"  },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-black font-medium truncate">{label}</p>
                <p className="text-lg font-extrabold text-black leading-tight">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Danışman Bazlı Özet ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            Danışman Komisyon Özeti — {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {agentSummary.length === 0 ? (
            <p className="p-6 text-center text-sm text-black">Bu yıl için kayıt bulunmuyor.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {agentSummary.map((a) => {
                const isOpen = expandedAgent === a.agentId;
                const rows   = agentContracts(a.agentId);
                return (
                  <div key={a.agentId}>
                    {/* Danışman Satırı */}
                    <div
                      className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedAgent(isOpen ? null : a.agentId)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                          {a.agentName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-black truncate">{a.agentName}</p>
                          <p className="text-xs text-black">{a.contracts} sözleşme · {a.completed} tamamlandı</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:block text-right">
                          <p className="text-xs text-black">Toplam</p>
                          <p className="text-sm font-bold text-black">{fmt(a.totalCommission, a.currency)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-black">Tahsil</p>
                          <p className="text-sm font-bold text-green-600">{fmt(a.earnedCommission, a.currency)}</p>
                        </div>
                        <div className="hidden sm:block text-right">
                          <p className="text-xs text-black">Beklenen</p>
                          <p className="text-sm font-bold text-amber-600">{fmt(a.pendingCommission, a.currency)}</p>
                        </div>
                        {isOpen
                          ? <ChevronUp className="w-4 h-4 text-black" />
                          : <ChevronDown className="w-4 h-4 text-black" />
                        }
                      </div>
                    </div>

                    {/* Genişletilmiş Sözleşme Listesi */}
                    {isOpen && (
                      <div className="bg-gray-50 border-t border-gray-100">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="border-b border-gray-200">
                              <tr>
                                {["Sözleşme No", "Tip", "Durum", "Müşteri", "Komisyon", "Tarih"].map((h) => (
                                  <th key={h} className="px-4 py-2 text-left font-semibold text-black uppercase">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {rows.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-100">
                                  <td className="px-4 py-2 font-medium text-black">{c.contractNo}</td>
                                  <td className="px-4 py-2 text-black">{contractTypeLabel[c.contractType] ?? c.contractType}</td>
                                  <td className="px-4 py-2">
                                    <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px]">
                                      {statusLabel[c.status] ?? c.status}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-2 text-black truncate max-w-[120px]">{c.clientName}</td>
                                  <td className="px-4 py-2">
                                    <CommissionCell contractId={c.id} initial={c.commission} currency={c.currency} />
                                  </td>
                                  <td className="px-4 py-2 text-black whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Tüm Sözleşmeler ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black">{currentYear} Yılı Tüm Sözleşmeler</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {contracts.length === 0 ? (
            <p className="p-6 text-center text-sm text-black">Kayıt bulunmuyor.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    {["Sözleşme No", "Tip / Durum", "Danışman", "Müşteri", "Komisyon", "Tarih"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contracts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-black">{c.contractNo}</td>
                      <td className="px-4 py-3 space-y-0.5">
                        <Badge variant="outline" className="text-[10px] text-black block w-fit">
                          {contractTypeLabel[c.contractType] ?? c.contractType}
                        </Badge>
                        <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px] block w-fit">
                          {statusLabel[c.status] ?? c.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-black">{c.agentName}</td>
                      <td className="px-4 py-3 text-sm text-black">{c.clientName}</td>
                      <td className="px-4 py-3">
                        <CommissionCell contractId={c.id} initial={c.commission} currency={c.currency} />
                      </td>
                      <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
