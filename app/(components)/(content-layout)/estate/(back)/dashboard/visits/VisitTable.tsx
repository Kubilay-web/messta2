"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteVisit } from "../../../actions/visits";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const statusLabel: Record<string, string> = {
  SCHEDULED:  "Planlandı",
  COMPLETED:  "Tamamlandı",
  CANCELLED:  "İptal",
  NO_SHOW:    "Gelmedi",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SCHEDULED:  "outline",
  COMPLETED:  "default",
  CANCELLED:  "destructive",
  NO_SHOW:    "destructive",
};

type Visit = {
  id:          string;
  scheduledAt: Date | string;
  status:      string;
  rating?:     number | null;
  agent?:      { firstName: string; lastName: string } | null;
  client?:     { firstName: string; lastName: string } | null;
  property?:   { title: string; city: string } | null;
};

function Stars({ rating }: { rating?: number | null }) {
  if (!rating) return <span className="text-black text-xs">—</span>;
  return (
    <span className="text-xs text-black">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

function VisitActions({ visit }: { visit: Visit }) {
  async function handleDelete() {
    try {
      await deleteVisit(visit.id);
      toast.success("Gezi silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/visits/view/${visit.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/visits/edit/${visit.id}`}>
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
            <AlertDialogTitle>Gezi kaydı silinsin mi?</AlertDialogTitle>
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

export default function VisitTable({ visits }: { visits: Visit[] }) {
  if (!visits.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz gezi kaydı bulunmuyor.
      </div>
    );
  }

  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");
  const fmtTime = (d: Date | string) =>
    new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Tarih / Saat", "Durum", "Mülk", "Danışman", "Müşteri", "Puan", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visits.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-black">{fmtDate(v.scheduledAt)}</p>
                  <p className="text-xs text-black">{fmtTime(v.scheduledAt)}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[v.status] ?? "secondary"} className="text-xs">
                    {statusLabel[v.status] ?? v.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black truncate max-w-[140px]">{v.property?.title ?? "—"}</p>
                  <p className="text-xs text-black">{v.property?.city ?? ""}</p>
                </td>
                <td className="px-4 py-3 text-sm text-black">
                  {v.agent ? `${v.agent.firstName} ${v.agent.lastName}` : "—"}
                </td>
                <td className="px-4 py-3 text-sm text-black">
                  {v.client ? `${v.client.firstName} ${v.client.lastName}` : "—"}
                </td>
                <td className="px-4 py-3"><Stars rating={v.rating} /></td>
                <td className="px-4 py-3"><VisitActions visit={v} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {visits.map((v) => (
          <div key={v.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-black">{fmtDate(v.scheduledAt)} {fmtTime(v.scheduledAt)}</p>
              </div>
              <Badge variant={statusVariant[v.status] ?? "secondary"} className="text-[10px]">
                {statusLabel[v.status] ?? v.status}
              </Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Mülk",     value: v.property?.title ?? "—" },
                { label: "Danışman", value: v.agent  ? `${v.agent.firstName} ${v.agent.lastName}`   : "—" },
                { label: "Müşteri",  value: v.client ? `${v.client.firstName} ${v.client.lastName}` : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            {v.rating && (
              <div className="px-4 py-1.5 border-t border-gray-100">
                <span className="text-xs text-amber-500">{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</span>
              </div>
            )}
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <VisitActions visit={v} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
