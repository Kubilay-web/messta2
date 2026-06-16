"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2, Building2 } from "lucide-react";
import { PropertyRealEstate } from "../../../types/types";
import { deleteProperty } from "../../../actions/properties";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const typeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa", OFFICE: "Ofis",
  SHOP: "Dükkan", LAND: "Arsa", WAREHOUSE: "Depo", BUILDING: "Bina",
};
const statusLabel: Record<string, string> = {
  AVAILABLE: "Müsait", SOLD: "Satıldı", RENTED: "Kiralandı",
  UNDER_CONTRACT: "Sözleşmede", UNDER_MAINTENANCE: "Bakımda",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: "default", SOLD: "secondary", RENTED: "secondary",
  UNDER_CONTRACT: "outline", UNDER_MAINTENANCE: "destructive",
};

function PropActions({ prop }: { prop: PropertyRealEstate }) {
  async function handleDelete() {
    try {
      await deleteProperty(prop.id);
      toast.success("Mülk silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/properties/view/${prop.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/properties/edit/${prop.id}`}>
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
            <AlertDialogTitle>"{prop.title}" silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bağlı ilanlar, belgeler ve mülk gezileri de silinecek.
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

export default function PropertyTable({ properties }: { properties: PropertyRealEstate[] }) {
  if (!properties.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz mülk kaydı bulunmuyor.
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
              {["Mülk", "Konum", "Tip / Durum", "Alan", "Fiyat", "İlan", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((p) => {
              const count = (p as any)._count ?? {};
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-black truncate max-w-[160px]">{p.title}</p>
                        {p.roomCount && <p className="text-xs text-black">{p.roomCount}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-black font-medium">{p.city}</p>
                    <p className="text-xs text-black">{p.district}</p>
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    <Badge variant="outline" className="text-xs text-black block w-fit">
                      {typeLabel[p.propertyType] ?? p.propertyType}
                    </Badge>
                    <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-xs block w-fit">
                      {statusLabel[p.status] ?? p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                    {p.grossArea ? `${p.grossArea} m²` : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {p.price ? (
                      <p className="font-semibold text-black">
                        {p.price.toLocaleString("tr-TR")} {p.currency}
                      </p>
                    ) : <span className="text-black">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-black">
                    <p>{count.listings  ?? 0} ilan</p>
                    <p>{count.contracts ?? 0} sözleşme</p>
                    <p>{count.visits    ?? 0} ziyaret</p>
                  </td>
                  <td className="px-4 py-3"><PropActions prop={p} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {properties.map((p) => {
          const count = (p as any)._count ?? {};
          return (
            <div key={p.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <Building2 className="h-9 w-9 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-black truncate">{p.title}</p>
                  <div className="flex gap-1.5 mt-0.5">
                    <Badge variant="outline" className="text-[10px] text-black">{typeLabel[p.propertyType]}</Badge>
                    <Badge variant={statusVariant[p.status] ?? "secondary"} className="text-[10px]">
                      {statusLabel[p.status]}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 space-y-1">
                {[
                  { label: "Konum",  value: `${p.city}, ${p.district}` },
                  { label: "Alan",   value: p.grossArea ? `${p.grossArea} m²` : "—" },
                  { label: "Fiyat",  value: p.price ? `${p.price.toLocaleString("tr-TR")} ${p.currency}` : "—" },
                  { label: "İlan",      value: `${count.listings  ?? 0}` },
                  { label: "Sözleşme", value: `${count.contracts ?? 0}` },
                  { label: "Ziyaret",  value: `${count.visits    ?? 0}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 text-xs">
                    <span className="text-black font-medium shrink-0">{label}</span>
                    <span className="text-black truncate">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                <PropActions prop={p} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
