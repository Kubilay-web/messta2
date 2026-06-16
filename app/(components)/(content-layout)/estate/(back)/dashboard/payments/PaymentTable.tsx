"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2, CheckCircle } from "lucide-react";
import { deleteContractPayment, updatePaymentStatus } from "../../../actions/contract-payments";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

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

type Payment = {
  id:             string;
  title:          string;
  amount:         number;
  dueDate:        Date | string;
  paidDate?:      Date | string | null;
  status:         string;
  paymentMethod?: string | null;
  receiptNo?:     string | null;
  contract?:      { contractNo: string; clientName: string; agentName: string; currency: string } | null;
};

function PaymentActions({ payment }: { payment: Payment }) {
  async function handleDelete() {
    try {
      await deleteContractPayment(payment.id);
      toast.success("Ödeme silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  async function handleMarkPaid() {
    try {
      await updatePaymentStatus(payment.id, "PAID", new Date().toISOString().split("T")[0]);
      toast.success("Ödeme olarak işaretlendi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Güncellenemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      {payment.status === "PENDING" && (
        <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 border-green-200 hover:bg-green-50"
          title="Ödendi olarak işaretle" onClick={handleMarkPaid}>
          <CheckCircle className="w-3.5 h-3.5" />
        </Button>
      )}
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/payments/view/${payment.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/payments/edit/${payment.id}`}>
          <Pencil className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>"{payment.title}" silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function PaymentTable({ payments }: { payments: Payment[] }) {
  if (!payments.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz ödeme planı kaydı bulunmuyor.
      </div>
    );
  }

  const fmtDate = (d: Date | string | null | undefined) =>
    d ? new Date(d).toLocaleDateString("tr-TR") : "—";
  const fmtMoney = (v: number, cur = "TRY") =>
    `${v.toLocaleString("tr-TR")} ${cur}`;

  const isOverdue = (p: Payment) =>
    p.status === "PENDING" && new Date(p.dueDate) < new Date();

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Başlık", "Sözleşme / Müşteri", "Tutar", "Vade", "Ödeme Tarihi", "Durum", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((p) => (
              <tr key={p.id} className={`transition-colors ${isOverdue(p) ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"}`}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-black">{p.title}</p>
                  {p.paymentMethod && <p className="text-xs text-black">{p.paymentMethod}</p>}
                  {p.receiptNo     && <p className="text-xs text-black">Mkb: {p.receiptNo}</p>}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black font-medium">{p.contract?.contractNo ?? "—"}</p>
                  <p className="text-xs text-black">{p.contract?.clientName ?? ""}</p>
                  {p.contract?.agentName && (
                    <p className="text-xs text-black">Danışman: {p.contract.agentName}</p>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                  {fmtMoney(p.amount, p.contract?.currency)}
                </td>
                <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                  <span className={isOverdue(p) ? "text-red-600 font-semibold" : ""}>
                    {fmtDate(p.dueDate)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                  {fmtDate(p.paidDate)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs">
                    {statusLabel[p.status] ?? p.status}
                  </Badge>
                  {isOverdue(p) && (
                    <p className="text-[10px] text-red-600 font-medium mt-0.5">Gecikmiş</p>
                  )}
                </td>
                <td className="px-4 py-3"><PaymentActions payment={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {payments.map((p) => (
          <div key={p.id} className={`rounded-xl border bg-white shadow-sm overflow-hidden ${isOverdue(p) ? "border-red-300" : "border-gray-200"}`}>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-black truncate">{p.title}</p>
                <p className="text-xs text-black">{p.contract?.contractNo ?? "—"}</p>
              </div>
              <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-[10px] shrink-0">
                {statusLabel[p.status] ?? p.status}
              </Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Tutar",      value: fmtMoney(p.amount, p.contract?.currency) },
                { label: "Müşteri",   value: p.contract?.clientName ?? "—" },
                { label: "Danışman",  value: p.contract?.agentName  ?? "—" },
                { label: "Vade",      value: fmtDate(p.dueDate) },
                { label: "Ödendi",    value: fmtDate(p.paidDate) },
                ...(p.receiptNo ? [{ label: "Makbuz No", value: p.receiptNo }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <PaymentActions payment={p} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
