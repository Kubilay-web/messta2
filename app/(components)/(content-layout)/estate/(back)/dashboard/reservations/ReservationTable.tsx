"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, FileSignature } from "lucide-react";
import { deleteReservation, convertReservationToContract } from "../../../actions/reservations";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const statusLabel: Record<string, string> = {
  ACTIVE: "Aktif", CONVERTED: "Dönüştü", CANCELLED: "İptal", EXPIRED: "Süresi Doldu", REFUNDED: "İade",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", CONVERTED: "secondary", CANCELLED: "destructive", EXPIRED: "secondary", REFUNDED: "outline",
};

type Reservation = {
  id: string; reservationNo: string; status: string; depositAmount: number; currency: string;
  reservedUntil: Date | string; clientName: string;
  listing?: { title: string; listingNo: string } | null;
  property?: { title: string; city: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function ResActions({ res }: { res: Reservation }) {
  async function handleDelete() {
    try { await deleteReservation(res.id); toast.success("Rezervasyon silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  async function handleConvert() {
    try { await convertReservationToContract(res.id); toast.success("Sözleşme taslağı oluşturuldu."); window.location.href = "/estate/dashboard/contracts"; }
    catch (e: any) { toast.error(e?.message ?? "Dönüştürülemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      {res.status === "ACTIVE" && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="outline" className="h-8 w-8 text-blue-600" title="Sözleşmeye çevir"><FileSignature className="w-3.5 h-3.5" /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
            <AlertDialogHeader>
              <AlertDialogTitle>Sözleşmeye dönüştürülsün mü?</AlertDialogTitle>
              <AlertDialogDescription>Rezervasyon bilgilerinden taslak bir sözleşme oluşturulur ve rezervasyon "Dönüştü" olarak işaretlenir. (Danışman atanmış olmalı.)</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Vazgeç</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleConvert}>Dönüştür</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/reservations/edit/${res.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Rezervasyon silinsin mi?</AlertDialogTitle>
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

export default function ReservationTable({ reservations }: { reservations: Reservation[] }) {
  if (!reservations.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz rezervasyon bulunmuyor.</div>;
  }
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");

  return (
    <>
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Rez. No", "İlan", "Müşteri", "Kapora", "Bitiş", "Durum", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{r.reservationNo}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black truncate max-w-[160px]">{r.listing?.title ?? r.property?.title ?? "—"}</p>
                  <p className="text-xs text-black">{r.property?.city ?? ""}</p>
                </td>
                <td className="px-4 py-3 text-sm text-black">{r.clientName}</td>
                <td className="px-4 py-3 font-semibold text-black">{money(r.depositAmount, r.currency)}</td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(r.reservedUntil)}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs">{statusLabel[r.status] ?? r.status}</Badge></td>
                <td className="px-4 py-3"><ResActions res={r} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {reservations.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-black">{r.reservationNo}</p>
              <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-[10px]">{statusLabel[r.status] ?? r.status}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "İlan", value: r.listing?.title ?? r.property?.title ?? "—" },
                { label: "Müşteri", value: r.clientName },
                { label: "Kapora", value: money(r.depositAmount, r.currency) },
                { label: "Bitiş", value: fmtDate(r.reservedUntil) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><ResActions res={r} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
