"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Listing } from "../../../types/types";
import { deleteListing } from "../../../actions/listings";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const typeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", PENDING: "secondary", RESERVED: "outline",
  SOLD: "secondary", RENTED: "secondary", WITHDRAWN: "destructive",
};
const statusLabel: Record<string, string> = {
  ACTIVE: "Aktif", PENDING: "Beklemede", RESERVED: "Rezerve",
  SOLD: "Satıldı", RENTED: "Kiralandı", WITHDRAWN: "Geri Çekildi",
};

function ListingActions({ listing }: { listing: Listing }) {
  async function handleDelete() {
    try {
      await deleteListing(listing.id);
      toast.success("İlan silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/listings/view/${listing.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/listings/edit/${listing.id}`}>
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
            <AlertDialogTitle>"{listing.title}" silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bağlı müşteri ilgileri ve mülk gezileri de silinecek.
            </AlertDialogDescription>
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

export default function ListingTable({ listings }: { listings: Listing[] }) {
  if (!listings.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz ilan kaydı bulunmuyor.
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["İlan", "Tip / Durum", "Fiyat", "Mülk", "Danışman", "Aktivite", "Tarih", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-black truncate max-w-[180px]">{l.title}</p>
                  <p className="text-xs text-black">{l.listingNo}</p>
                </td>
                <td className="px-4 py-3 space-y-1">
                  <Badge variant="outline" className="text-xs text-black block w-fit">
                    {typeLabel[l.listingType] ?? l.listingType}
                  </Badge>
                  <Badge variant={statusVariant[l.status] ?? "secondary"} className="text-xs block w-fit">
                    {statusLabel[l.status] ?? l.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="font-semibold text-black">
                    {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                  </p>
                  {l.monthlyRent && (
                    <p className="text-xs text-black">Kira: {l.monthlyRent.toLocaleString("tr-TR")}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black truncate max-w-[140px]">
                    {(l as any).property?.title ?? "—"}
                  </p>
                  <p className="text-xs text-black">{(l as any).property?.city ?? ""}</p>
                </td>
                <td className="px-4 py-3 text-sm text-black">{l.agentName}</td>
                <td className="px-4 py-3 text-xs text-black">
                  <p>{(l as any)._count?.contracts ?? 0} sözleşme</p>
                  <p>{(l as any)._count?.visits    ?? 0} ziyaret</p>
                  <p>{(l as any)._count?.interests ?? 0} ilgi · {l.views} görüntülenme</p>
                </td>
                <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                  {new Date(l.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3"><ListingActions listing={l} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {listings.map((l) => (
          <div key={l.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-black truncate">{l.title}</p>
              <div className="flex gap-1.5 mt-1">
                <Badge variant="outline" className="text-[10px] text-black">{typeLabel[l.listingType]}</Badge>
                <Badge variant={statusVariant[l.status] ?? "secondary"} className="text-[10px]">
                  {statusLabel[l.status]}
                </Badge>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "Fiyat",       value: `${l.askingPrice.toLocaleString("tr-TR")} ${l.currency}` },
                { label: "Mülk",        value: (l as any).property?.title ?? "—" },
                { label: "Danışman",    value: l.agentName },
                { label: "İlan No",     value: l.listingNo },
                { label: "Sözleşme",    value: `${(l as any)._count?.contracts ?? 0}` },
                { label: "Ziyaret",     value: `${(l as any)._count?.visits    ?? 0}` },
                { label: "Görüntülenme",value: `${l.views}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <ListingActions listing={l} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
