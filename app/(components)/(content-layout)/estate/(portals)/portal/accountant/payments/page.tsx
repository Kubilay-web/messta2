import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import db from "@/app/lib/db";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { CheckCircle, Clock, AlertTriangle, DollarSign } from "lucide-react";

export const metadata: Metadata = { title: "Ödeme Planları - Muhasebe Portalı" };

const statusLabel: Record<string, string> = {
  PAID: "Ödendi", PENDING: "Bekliyor", PARTIAL: "Kısmi",
  FAILED: "Başarısız", REFUNDED: "İade",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PAID: "default", PENDING: "outline", PARTIAL: "secondary",
  FAILED: "destructive", REFUNDED: "secondary",
};
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};

function fmt(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AccountantPaymentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const payments = await db.contractPayment.findMany({
    where:   { contract: { agencyId: agency.id } },
    orderBy: { dueDate: "asc" },
    take:    200,
    select: {
      id: true, title: true, amount: true, dueDate: true, paidDate: true,
      status: true, paymentMethod: true, receiptNo: true,
      contract: { select: { contractNo: true, clientName: true, agentName: true, currency: true, contractType: true } },
    },
  });

  const now = new Date();
  const totalAll     = payments.reduce((s, p) => s + p.amount, 0);
  const totalPaid    = payments.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "PENDING").reduce((s, p) => s + p.amount, 0);
  const overdue      = payments.filter((p) => p.status === "PENDING" && new Date(p.dueDate) < now);
  const totalOverdue = overdue.reduce((s, p) => s + p.amount, 0);
  const currency     = payments[0]?.contract?.currency ?? "TRY";

  const kpis = [
    { label: "Toplam",     value: fmt(totalAll,     currency), icon: DollarSign,    color: "bg-blue-50 text-blue-600"   },
    { label: "Tahsil",     value: fmt(totalPaid,    currency), icon: CheckCircle,   color: "bg-green-50 text-green-600" },
    { label: "Bekleyen",   value: fmt(totalPending, currency), icon: Clock,         color: "bg-amber-50 text-amber-600" },
    { label: "Gecikmiş",   value: fmt(totalOverdue, currency), icon: AlertTriangle, color: "bg-red-50 text-red-600"     },
  ];

  return (
    <div className="w-full p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Ödeme Planları</h1>
        <p className="text-sm text-black mt-1">Tüm sözleşme ödeme kayıtları.</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-black font-medium">{label}</p>
                <p className="text-base font-extrabold text-black leading-tight">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tablo */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black">
            Ödeme Defteri
            <Badge variant="secondary" className="ml-2 text-xs">{payments.length}</Badge>
          </CardTitle>
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
                {payments.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-black">Kayıt bulunmuyor.</td></tr>
                ) : payments.map((p) => {
                  const isOverdue = p.status === "PENDING" && new Date(p.dueDate) < now;
                  return (
                    <tr key={p.id} className={isOverdue ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-black text-sm">{p.title}</p>
                        {p.receiptNo && <p className="text-xs text-black">{p.receiptNo}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-black font-medium">{p.contract?.contractNo ?? "—"}</p>
                        <p className="text-xs text-black">{contractTypeLabel[p.contract?.contractType ?? ""] ?? ""}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-black">{p.contract?.clientName ?? "—"}</p>
                        <p className="text-xs text-black">{p.contract?.agentName ?? ""}</p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                        {fmt(p.amount, p.contract?.currency)}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        <span className={isOverdue ? "text-red-600 font-semibold" : "text-black"}>
                          {fmtDate(p.dueDate)}
                        </span>
                        {isOverdue && <p className="text-[10px] text-red-500">Gecikmiş</p>}
                      </td>
                      <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(p.paidDate)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs">
                          {statusLabel[p.status] ?? p.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {payments.map((p) => {
              const isOverdue = p.status === "PENDING" && new Date(p.dueDate) < now;
              return (
                <div key={p.id} className={`p-4 space-y-2 ${isOverdue ? "bg-red-50" : ""}`}>
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
                    <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                      Vade: {fmtDate(p.dueDate)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
