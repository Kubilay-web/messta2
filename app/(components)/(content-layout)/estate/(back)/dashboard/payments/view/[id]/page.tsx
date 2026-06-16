import { validateRequest } from "@/app/auth";
import { getContractPaymentById, updatePaymentStatus } from "../../../../../actions/contract-payments";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, DollarSign, CalendarDays, FileText,
  CheckCircle, User, CreditCard, ClipboardList,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ödeme Detayı - EstatePro" };

const statusLabel: Record<string, string> = {
  PENDING:  "Bekliyor",
  PAID:     "Ödendi",
  PARTIAL:  "Kısmi Ödeme",
  FAILED:   "Başarısız",
  REFUNDED: "İade Edildi",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING:  "outline",
  PAID:     "default",
  PARTIAL:  "secondary",
  FAILED:   "destructive",
  REFUNDED: "secondary",
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR");
}
function fmtMoney(v: number, cur = "TRY") {
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}

export default async function PaymentViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const payment = await getContractPaymentById(params.id);
  if (!payment) notFound();

  const contract = (payment as any).contract;
  const isOverdue = payment.status === "PENDING" && new Date(payment.dueDate) < new Date();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/payments">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/payments/edit/${payment.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* Başlık Kartı */}
      <Card className={`border-t-4 ${isOverdue ? "border-red-500" : "border-blue-600"}`}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-black">{payment.title}</h1>
              {contract && (
                <p className="text-black mt-1">
                  Sözleşme: <span className="font-semibold">{contract.contractNo}</span> — {contract.clientName}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={statusVariant[payment.status] ?? "secondary"}>
                  {statusLabel[payment.status] ?? payment.status}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">Gecikmiş</Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-blue-600">
                {fmtMoney(payment.amount, contract?.currency)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { icon: FileText,      label: "Sözleşme No",   value: contract?.contractNo  ?? "—" },
          { icon: User,          label: "Müşteri",        value: contract?.clientName  ?? "—" },
          { icon: User,          label: "Danışman",       value: contract?.agentName   ?? "—" },
          { icon: DollarSign,    label: "Tutar",          value: fmtMoney(payment.amount, contract?.currency) },
          { icon: CalendarDays,  label: "Vade Tarihi",    value: fmtDate(payment.dueDate) },
          { icon: CheckCircle,   label: "Ödeme Tarihi",   value: fmtDate(payment.paidDate) },
          { icon: CreditCard,    label: "Ödeme Yöntemi",  value: payment.paymentMethod ?? "—" },
          { icon: ClipboardList, label: "Makbuz No",      value: payment.receiptNo     ?? "—" },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-5 h-5 mb-1.5 text-blue-600" />
              <p className="text-[10px] font-semibold text-black uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notlar */}
      {payment.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Notlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-black whitespace-pre-wrap">{payment.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
