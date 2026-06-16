"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, CheckCircle, Clock, AlertTriangle, FileText, CreditCard } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import PaymentModal from "./PaymentModal";

const statusLabel: Record<string, string> = {
  PENDING:  "Bekliyor",
  PAID:     "Ödendi",
  PARTIAL:  "Kısmi",
  FAILED:   "Başarısız",
  REFUNDED: "İade",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING:  "outline",
  PAID:     "default",
  PARTIAL:  "secondary",
  FAILED:   "destructive",
  REFUNDED: "secondary",
};
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};

type Payment = {
  id: string; contractId: string; title: string; amount: number;
  dueDate: Date | string; paidDate?: Date | string | null;
  status: string; paymentMethod?: string | null; receiptNo?: string | null;
  notes?: string | null;
  contract?: { contractNo: string; currency: string; contractType: string } | null;
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
function fmtMoney(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}

function SummaryCard({
  icon: Icon, label, value, color,
}: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xl font-extrabold text-black leading-tight">{value}</p>
          <p className="text-[10px] font-medium text-black">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientPaymentsUI({ payments: initial }: { payments: Payment[] }) {
  const router = useRouter();
  const [payments, setPayments]         = useState(initial);
  const [modalPayment, setModalPayment] = useState<Payment | null>(null);

  function handlePaymentSuccess() {
    // Optimistik güncelleme
    if (modalPayment) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === modalPayment.id
            ? { ...p, status: "PAID", paidDate: new Date() }
            : p
        )
      );
    }
    setModalPayment(null);
    // Server cache'i yenile
    router.refresh();
  }

  const summary = useMemo(() => {
    const paid     = payments.filter((p) => p.status === "PAID");
    const pending  = payments.filter((p) => p.status === "PENDING");
    const overdue  = pending.filter((p) => new Date(p.dueDate) < new Date());
    const cur      = payments[0]?.contract?.currency ?? "TRY";
    return {
      totalPaid:    paid.reduce((s, p) => s + p.amount, 0),
      totalPending: pending.reduce((s, p) => s + p.amount, 0),
      totalOverdue: overdue.reduce((s, p) => s + p.amount, 0),
      countPaid:    paid.length,
      countPending: pending.length,
      countOverdue: overdue.length,
      currency:     cur,
    };
  }, [payments]);

  // Sözleşmelere göre grupla
  const grouped = useMemo(() => {
    const map: Record<string, Payment[]> = {};
    payments.forEach((p) => {
      const key = p.contractId;
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });
    return Object.entries(map);
  }, [payments]);

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-blue-500" />
          </div>
          <p className="text-sm text-black font-medium">Ödeme planı bulunmuyor.</p>
          <p className="text-xs text-black">Sözleşmelerinize ait ödemeler burada listelenecek.</p>
        </CardContent>
      </Card>
    );
  }

  const isOverdue = (p: Payment) =>
    p.status === "PENDING" && new Date(p.dueDate) < new Date();

  return (
    <>
    <div className="space-y-6">

      {/* ── Özet KPI ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard icon={FileText}     label="Toplam Kayıt"    value={payments.length}                        color="bg-blue-50 text-blue-600"   />
        <SummaryCard icon={CheckCircle}  label="Ödenen Toplam"   value={fmtMoney(summary.totalPaid, summary.currency)}    color="bg-green-50 text-green-600" />
        <SummaryCard icon={Clock}        label="Bekleyen Toplam" value={fmtMoney(summary.totalPending, summary.currency)} color="bg-amber-50 text-amber-600" />
        <SummaryCard icon={AlertTriangle}label="Gecikmiş"        value={fmtMoney(summary.totalOverdue, summary.currency)} color="bg-red-50 text-red-600"     />
      </div>

      {/* ── Gecikmiş Uyarısı ── */}
      {summary.countOverdue > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-black">
                {summary.countOverdue} gecikmiş ödemeniz var
              </p>
              <p className="text-xs text-black mt-0.5">
                Toplam {fmtMoney(summary.totalOverdue, summary.currency)} tutarında vadesi geçmiş ödeme bulunuyor.
                Lütfen danışmanınızla iletişime geçin.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Sözleşme Bazlı Gruplar ── */}
      {grouped.map(([contractId, items]) => {
        const contract    = items[0]?.contract;
        const paidItems   = items.filter((p) => p.status === "PAID");
        const totalAmount = items.reduce((s, p) => s + p.amount, 0);
        const paidAmount  = paidItems.reduce((s, p) => s + p.amount, 0);
        const progress    = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

        return (
          <Card key={contractId} className="border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-black flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  {contract?.contractNo ?? "—"}
                  <Badge variant="outline" className="text-[10px] text-black">
                    {contractTypeLabel[contract?.contractType ?? ""] ?? contract?.contractType ?? ""}
                  </Badge>
                </span>
                <span className="text-xs font-normal text-black">
                  {paidItems.length}/{items.length} ödeme tamamlandı
                </span>
              </CardTitle>
              {/* İlerleme çubuğu */}
              <div className="mt-2 space-y-1">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-black">
                  <span>Ödenen: {fmtMoney(paidAmount, contract?.currency)}</span>
                  <span>Toplam: {fmtMoney(totalAmount, contract?.currency)}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-y border-gray-100">
                    <tr>
                      {["Başlık", "Tutar", "Vade", "Ödeme Tarihi", "Yöntem", "Durum", ""].map((h) => (
                        <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((p) => (
                      <tr key={p.id} className={`transition-colors ${isOverdue(p) ? "bg-red-50" : "hover:bg-gray-50"}`}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-black">{p.title}</p>
                          {p.receiptNo && <p className="text-xs text-black">{p.receiptNo}</p>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                          {fmtMoney(p.amount, contract?.currency)}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className={isOverdue(p) ? "text-red-600 font-semibold" : "text-black"}>
                            {fmtDate(p.dueDate)}
                          </span>
                          {isOverdue(p) && <p className="text-[10px] text-red-500">Gecikmiş</p>}
                        </td>
                        <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                          {fmtDate(p.paidDate)}
                        </td>
                        <td className="px-4 py-3 text-xs text-black">
                          {p.paymentMethod ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs">
                            {statusLabel[p.status] ?? p.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {(p.status === "PENDING" || p.status === "FAILED") && (
                            <Button size="sm" className="h-7 text-xs"
                              onClick={() => setModalPayment({ ...p, contract: contract ?? null })}>
                              <CreditCard className="mr-1 w-3 h-3" /> Öde
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="sm:hidden divide-y divide-gray-100">
                {items.map((p) => (
                  <div key={p.id} className={`px-4 py-3 space-y-1.5 ${isOverdue(p) ? "bg-red-50" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-black">{p.title}</p>
                      <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-[10px] shrink-0">
                        {statusLabel[p.status] ?? p.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-black">{fmtMoney(p.amount, contract?.currency)}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-black">
                      <span className={isOverdue(p) ? "text-red-600 font-semibold" : ""}>
                        Vade: {fmtDate(p.dueDate)}
                      </span>
                      {p.paidDate && <span>Ödendi: {fmtDate(p.paidDate)}</span>}
                      {p.paymentMethod && <span>{p.paymentMethod}</span>}
                    </div>
                    {(p.status === "PENDING" || p.status === "FAILED") && (
                      <Button size="sm" className="h-7 text-xs w-full mt-1"
                        onClick={() => setModalPayment({ ...p, contract: contract ?? null })}>
                        <CreditCard className="mr-1 w-3 h-3" /> Ödeme Yap
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* Ödeme Modalı */}
    <PaymentModal
      payment={modalPayment}
      open={!!modalPayment}
      onClose={() => setModalPayment(null)}
      onSuccess={handlePaymentSuccess}
    />
    </>
  );
}
