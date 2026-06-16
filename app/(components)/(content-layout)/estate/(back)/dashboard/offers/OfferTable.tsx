"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, CalendarPlus } from "lucide-react";
import { deleteOffer, convertOfferToReservation } from "../../../actions/offers";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const statusLabel: Record<string, string> = {
  PENDING: "Beklemede", COUNTERED: "Karşı Teklif", ACCEPTED: "Kabul",
  REJECTED: "Reddedildi", WITHDRAWN: "Geri Çekildi", EXPIRED: "Süresi Doldu",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline", COUNTERED: "secondary", ACCEPTED: "default",
  REJECTED: "destructive", WITHDRAWN: "destructive", EXPIRED: "secondary",
};
const typeLabel: Record<string, string> = { SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem" };

type Offer = {
  id: string; offerNo: string; offerType: string; status: string;
  amount: number; counterAmount?: number | null; currency: string;
  clientName: string; agentName?: string | null; createdAt: Date | string;
  listing?: { title: string; listingNo: string } | null;
  property?: { title: string; city: string } | null;
};

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

function OfferActions({ offer }: { offer: Offer }) {
  async function handleDelete() {
    try { await deleteOffer(offer.id); toast.success("Teklif silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  async function handleConvert() {
    try { await convertOfferToReservation(offer.id); toast.success("Rezervasyon oluşturuldu."); window.location.href = "/estate/dashboard/reservations"; }
    catch (e: any) { toast.error(e?.message ?? "Dönüştürülemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="outline" className="h-8 w-8 text-green-600" title="Rezervasyona çevir"><CalendarPlus className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Rezervasyona dönüştürülsün mü?</AlertDialogTitle>
            <AlertDialogDescription>Teklif "Kabul" olarak işaretlenir ve kapora ile aktif bir rezervasyon oluşturulur. Detayları sonra düzenleyebilirsin.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 hover:bg-green-700 text-white" onClick={handleConvert}>Dönüştür</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/offers/edit/${offer.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Teklif silinsin mi?</AlertDialogTitle>
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

export default function OfferTable({ offers }: { offers: Offer[] }) {
  if (!offers.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz teklif bulunmuyor.</div>;
  }
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Teklif No", "İlan", "Müşteri", "Tür", "Tutar", "Karşı Teklif", "Durum", "Tarih", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {offers.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-black">{o.offerNo}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black truncate max-w-[160px]">{o.listing?.title ?? o.property?.title ?? "—"}</p>
                  <p className="text-xs text-black">{o.property?.city ?? ""}</p>
                </td>
                <td className="px-4 py-3 text-sm text-black">{o.clientName}</td>
                <td className="px-4 py-3 text-sm text-black">{typeLabel[o.offerType] ?? o.offerType}</td>
                <td className="px-4 py-3 font-semibold text-black">{money(o.amount, o.currency)}</td>
                <td className="px-4 py-3 text-sm text-black">{money(o.counterAmount, o.currency)}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[o.status] ?? "secondary"} className="text-xs">{statusLabel[o.status] ?? o.status}</Badge></td>
                <td className="px-4 py-3 text-xs text-black">{fmtDate(o.createdAt)}</td>
                <td className="px-4 py-3"><OfferActions offer={o} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {offers.map((o) => (
          <div key={o.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold text-black">{o.offerNo}</p>
              <Badge variant={statusVariant[o.status] ?? "secondary"} className="text-[10px]">{statusLabel[o.status] ?? o.status}</Badge>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "İlan", value: o.listing?.title ?? o.property?.title ?? "—" },
                { label: "Müşteri", value: o.clientName },
                { label: "Tür", value: typeLabel[o.offerType] ?? o.offerType },
                { label: "Tutar", value: money(o.amount, o.currency) },
                { label: "Karşı Teklif", value: money(o.counterAmount, o.currency) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><OfferActions offer={o} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
