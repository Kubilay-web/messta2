"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deleteAgencyInvoice } from "../../../../actions/invoices2";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const typeLabel: Record<string, string> = { COMMISSION: "Komisyon", RENT: "Kira", SERVICE: "Hizmet", OTHER: "Diğer" };
const statusLabel: Record<string, string> = {
  DRAFT: "Taslak", SENT: "Gönderildi", PAID: "Ödendi", PARTIAL: "Kısmi", OVERDUE: "Gecikmiş", CANCELLED: "İptal",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline", SENT: "secondary", PAID: "default", PARTIAL: "secondary", OVERDUE: "destructive", CANCELLED: "destructive",
};

type Invoice = {
  id: string; invoiceNo: string; type: string; status: string;
  billToName: string; total: number; currency: string;
  issueDate: Date | string; dueDate?: Date | string | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function InvoiceActions({ inv }: { inv: Invoice }) {
  async function handleDelete() {
    try { await deleteAgencyInvoice(inv.id); toast.success("Fatura silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/finance/invoices/edit/${inv.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Fatura silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  if (!invoices.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz fatura bulunmuyor.</div>;
  }
  const fmtDate = (d?: Date | string | null) => (d ? new Date(d).toLocaleDateString("tr-TR") : "—");

  return (
    <>
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Fatura No", "Tür", "Fatura Edilen", "Tutar", "Düzenleme", "Vade", "Durum", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{inv.invoiceNo}</td>
                <td className="px-4 py-3 text-sm text-black">{typeLabel[inv.type] ?? inv.type}</td>
                <td className="px-4 py-3 text-sm text-black truncate max-w-[160px]">{inv.billToName}</td>
                <td className="px-4 py-3 font-semibold text-black">{money(inv.total, inv.currency)}</td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(inv.issueDate)}</td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(inv.dueDate)}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[inv.status] ?? "secondary"} className="text-xs">{statusLabel[inv.status] ?? inv.status}</Badge></td>
                <td className="px-4 py-3"><InvoiceActions inv={inv} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {invoices.map((inv) => (
          <div key={inv.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-black">{inv.invoiceNo}</p>
              <Badge variant={statusVariant[inv.status] ?? "secondary"} className="text-[10px]">{statusLabel[inv.status] ?? inv.status}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Tür", value: typeLabel[inv.type] ?? inv.type },
                { label: "Fatura Edilen", value: inv.billToName },
                { label: "Tutar", value: money(inv.total, inv.currency) },
                { label: "Vade", value: fmtDate(inv.dueDate) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><InvoiceActions inv={inv} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
