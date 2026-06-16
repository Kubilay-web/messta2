"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deletePayroll } from "../../../../actions/payrolls";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const MONTHS = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const statusLabel: Record<string, string> = { PENDING: "Beklemede", PAID: "Ödendi", CANCELLED: "İptal" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { PENDING: "outline", PAID: "default", CANCELLED: "destructive" };

type Payroll = {
  id: string; periodMonth: number; periodYear: number;
  baseSalary: number; commission: number; bonus: number; deductions: number; netPay: number; currency: string;
  status: string; agent?: { firstName: string; lastName: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function PayrollActions({ p }: { p: Payroll }) {
  async function handleDelete() {
    try { await deletePayroll(p.id); toast.success("Bordro silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/finance/payroll/edit/${p.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Bordro silinsin mi?</AlertDialogTitle>
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

export default function PayrollTable({ payrolls }: { payrolls: Payroll[] }) {
  if (!payrolls.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz bordro kaydı bulunmuyor.</div>;
  }

  return (
    <>
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Danışman", "Dönem", "Baz Maaş", "Komisyon", "Prim", "Kesinti", "Net", "Durum", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payrolls.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{p.agent ? `${p.agent.firstName} ${p.agent.lastName}` : "—"}</td>
                <td className="px-4 py-3 text-sm text-black">{MONTHS[p.periodMonth]} {p.periodYear}</td>
                <td className="px-4 py-3 text-sm text-black">{money(p.baseSalary, p.currency)}</td>
                <td className="px-4 py-3 text-sm text-black">{money(p.commission, p.currency)}</td>
                <td className="px-4 py-3 text-sm text-black">{money(p.bonus, p.currency)}</td>
                <td className="px-4 py-3 text-sm text-red-600">-{money(p.deductions, p.currency)}</td>
                <td className="px-4 py-3 font-bold text-black">{money(p.netPay, p.currency)}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs">{statusLabel[p.status] ?? p.status}</Badge></td>
                <td className="px-4 py-3"><PayrollActions p={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {payrolls.map((p) => (
          <div key={p.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-black">{p.agent ? `${p.agent.firstName} ${p.agent.lastName}` : "—"}</p>
                <p className="text-xs text-black">{MONTHS[p.periodMonth]} {p.periodYear}</p>
              </div>
              <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-[10px]">{statusLabel[p.status] ?? p.status}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Baz Maaş", value: money(p.baseSalary, p.currency) },
                { label: "Komisyon", value: money(p.commission, p.currency) },
                { label: "Prim", value: money(p.bonus, p.currency) },
                { label: "Kesinti", value: `-${money(p.deductions, p.currency)}` },
                { label: "Net Ödeme", value: money(p.netPay, p.currency) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><PayrollActions p={p} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
