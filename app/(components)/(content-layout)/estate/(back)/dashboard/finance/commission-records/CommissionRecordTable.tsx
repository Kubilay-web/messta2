"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCommission } from "../../../../actions/commission-records";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const sideLabel: Record<string, string> = { BUYER: "Alıcı", SELLER: "Satıcı", TENANT: "Kiracı", LANDLORD: "Mülk Sahibi" };
const statusLabel: Record<string, string> = { PENDING: "Beklemede", INVOICED: "Faturalandı", PAID: "Ödendi", PARTIAL: "Kısmi", CANCELLED: "İptal" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { PENDING: "outline", INVOICED: "secondary", PAID: "default", PARTIAL: "secondary", CANCELLED: "destructive" };

type Comm = {
  id: string; side: string; baseAmount: number; percentage?: number | null; amount: number; currency: string;
  status: string; agentName: string; contract?: { contractNo: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function CommActions({ c }: { c: Comm }) {
  async function handleDelete() {
    try { await deleteCommission(c.id); toast.success("Komisyon silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/finance/commission-records/edit/${c.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Komisyon kaydı silinsin mi?</AlertDialogTitle>
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

export default function CommissionRecordTable({ commissions }: { commissions: Comm[] }) {
  if (!commissions.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz komisyon kaydı bulunmuyor.</div>;
  }
  const cur = commissions[0]?.currency ?? "TRY";
  const total = commissions.reduce((s, c) => s + (c.amount || 0), 0);
  const paid  = commissions.filter((c) => c.status === "PAID").reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-2 text-sm text-black">Toplam: <b>{money(total, cur)}</b></div>
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-sm text-black">Ödenen: <b>{money(paid, cur)}</b></div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-black">Bekleyen: <b>{money(total - paid, cur)}</b></div>
      </div>

      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Sözleşme", "Danışman", "Taraf", "Baz Tutar", "Oran", "Komisyon", "Durum", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {commissions.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{c.contract?.contractNo ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-black">{c.agentName}</td>
                <td className="px-4 py-3 text-sm text-black">{sideLabel[c.side] ?? c.side}</td>
                <td className="px-4 py-3 text-sm text-black">{money(c.baseAmount, c.currency)}</td>
                <td className="px-4 py-3 text-sm text-black">{c.percentage != null ? `%${c.percentage}` : "—"}</td>
                <td className="px-4 py-3 font-semibold text-black">{money(c.amount, c.currency)}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[c.status] ?? "secondary"} className="text-xs">{statusLabel[c.status] ?? c.status}</Badge></td>
                <td className="px-4 py-3"><CommActions c={c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {commissions.map((c) => (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-black">{c.contract?.contractNo ?? "—"}</p>
              <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px]">{statusLabel[c.status] ?? c.status}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Danışman", value: c.agentName },
                { label: "Taraf", value: sideLabel[c.side] ?? c.side },
                { label: "Komisyon", value: money(c.amount, c.currency) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><CommActions c={c} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
