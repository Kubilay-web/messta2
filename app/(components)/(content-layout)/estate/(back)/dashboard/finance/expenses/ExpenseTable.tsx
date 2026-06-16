"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deleteExpense } from "../../../../actions/expenses";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const categoryLabel: Record<string, string> = {
  RENT: "Ofis Kirası", SALARY: "Maaş", MARKETING: "Pazarlama", UTILITIES: "Faturalar",
  COMMISSION: "Komisyon", MAINTENANCE: "Bakım", TAX: "Vergi", OTHER: "Diğer",
};

type Expense = {
  id: string; category: string; title: string; amount: number; currency: string;
  date: Date | string; vendor?: string | null; paymentMethod?: string | null;
  agent?: { firstName: string; lastName: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function ExpenseActions({ exp }: { exp: Expense }) {
  async function handleDelete() {
    try { await deleteExpense(exp.id); toast.success("Gider silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/finance/expenses/edit/${exp.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Gider silinsin mi?</AlertDialogTitle>
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

export default function ExpenseTable({ expenses }: { expenses: Expense[] }) {
  if (!expenses.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz gider kaydı bulunmuyor.</div>;
  }
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");
  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const cur = expenses[0]?.currency ?? "TRY";

  return (
    <>
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-2 text-sm text-black">
        Toplam gider: <span className="font-bold">{money(total, cur)}</span> ({expenses.length} kayıt)
      </div>

      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Başlık", "Kategori", "Tutar", "Tarih", "Tedarikçi", "Danışman", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black truncate max-w-[180px]">{e.title}</td>
                <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{categoryLabel[e.category] ?? e.category}</Badge></td>
                <td className="px-4 py-3 font-semibold text-black">{money(e.amount, e.currency)}</td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(e.date)}</td>
                <td className="px-4 py-3 text-sm text-black">{e.vendor ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-black">{e.agent ? `${e.agent.firstName} ${e.agent.lastName}` : "—"}</td>
                <td className="px-4 py-3"><ExpenseActions exp={e} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {expenses.map((e) => (
          <div key={e.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-black truncate max-w-[200px]">{e.title}</p>
              <Badge variant="secondary" className="text-[10px]">{categoryLabel[e.category] ?? e.category}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Tutar", value: money(e.amount, e.currency) },
                { label: "Tarih", value: fmtDate(e.date) },
                { label: "Tedarikçi", value: e.vendor ?? "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><ExpenseActions exp={e} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
