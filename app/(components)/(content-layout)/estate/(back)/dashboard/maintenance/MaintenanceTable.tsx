"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMaintenance } from "../../../actions/maintenance";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const priorityLabel: Record<string, string> = { LOW: "Düşük", MEDIUM: "Orta", HIGH: "Yüksek", URGENT: "Acil" };
const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { LOW: "outline", MEDIUM: "secondary", HIGH: "default", URGENT: "destructive" };
const statusLabel: Record<string, string> = { OPEN: "Açık", IN_PROGRESS: "İşlemde", RESOLVED: "Çözüldü", CANCELLED: "İptal" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { OPEN: "outline", IN_PROGRESS: "secondary", RESOLVED: "default", CANCELLED: "destructive" };

type Req = {
  id: string; requestNo: string; title: string; priority: string; status: string;
  cost?: number | null; currency: string; vendor?: string | null; createdAt: Date | string;
  property?: { title: string; city: string } | null;
  agent?: { firstName: string; lastName: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function ReqActions({ req }: { req: Req }) {
  async function handleDelete() {
    try { await deleteMaintenance(req.id); toast.success("Talep silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/maintenance/edit/${req.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Talep silinsin mi?</AlertDialogTitle>
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

export default function MaintenanceTable({ requests }: { requests: Req[] }) {
  if (!requests.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz bakım talebi bulunmuyor.</div>;
  }
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");

  return (
    <>
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Talep No", "Başlık", "Mülk", "Öncelik", "Durum", "Maliyet", "Danışman", "Tarih", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{r.requestNo}</td>
                <td className="px-4 py-3 text-sm text-black truncate max-w-[160px]">{r.title}</td>
                <td className="px-4 py-3 text-sm text-black">{r.property?.title ?? "—"}</td>
                <td className="px-4 py-3"><Badge variant={priorityVariant[r.priority] ?? "secondary"} className="text-xs">{priorityLabel[r.priority] ?? r.priority}</Badge></td>
                <td className="px-4 py-3"><Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs">{statusLabel[r.status] ?? r.status}</Badge></td>
                <td className="px-4 py-3 text-sm text-black">{money(r.cost, r.currency)}</td>
                <td className="px-4 py-3 text-sm text-black">{r.agent ? `${r.agent.firstName} ${r.agent.lastName}` : "—"}</td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(r.createdAt)}</td>
                <td className="px-4 py-3"><ReqActions req={r} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-2">
              <p className="font-semibold text-black truncate">{r.requestNo}</p>
              <div className="flex gap-1 shrink-0">
                <Badge variant={priorityVariant[r.priority] ?? "secondary"} className="text-[10px]">{priorityLabel[r.priority] ?? r.priority}</Badge>
                <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-[10px]">{statusLabel[r.status] ?? r.status}</Badge>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Başlık", value: r.title },
                { label: "Mülk", value: r.property?.title ?? "—" },
                { label: "Maliyet", value: money(r.cost, r.currency) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><ReqActions req={r} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
