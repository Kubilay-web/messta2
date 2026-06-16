"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteContract } from "../../../actions/contracts";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const typeLabel: Record<string, string> = {
  SALE: "Satış",
  RENTAL: "Kiralama",
  PRE_SALE: "Ön Satış",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline",
  ACTIVE: "default",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
  EXPIRED: "destructive",
};

const statusLabel: Record<string, string> = {
  DRAFT: "Taslak",
  ACTIVE: "Aktif",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  EXPIRED: "Süresi Doldu",
};

type Contract = {
  id: string;
  contractNo: string;
  contractType: string;
  status: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  salePrice?: number | null;
  rentalPrice?: number | null;
  currency: string;
  agentName: string;
  clientName: string;
  createdAt: Date | string;
  property?: { title: string; city: string } | null;
  _count?: { payments: number; documents: number };
};

function ContractActions({ contract }: { contract: Contract }) {
  async function handleDelete() {
    try {
      await deleteContract(contract.id);
      toast.success("Sözleşme silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/contracts/view/${contract.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/contracts/edit/${contract.id}`}>
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
            <AlertDialogTitle>"{contract.contractNo}" silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bağlı ödemeler ve belgeler de kalıcı olarak silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ContractTable({ contracts }: { contracts: Contract[] }) {
  if (!contracts.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz sözleşme kaydı bulunmuyor.
      </div>
    );
  }

  const fmt = (v: number, cur: string) =>
    `${v.toLocaleString("tr-TR")} ${cur}`;
  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR");

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Sözleşme No",
                "Tür / Durum",
                "Tutar",
                "Mülk",
                "Danışman / Müşteri",
                "Başlangıç",
                "Ödemeler",
                "İşlemler",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-black uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-black">{c.contractNo}</p>
                </td>
                <td className="px-4 py-3 space-y-1">
                  <Badge variant="outline" className="text-xs text-black block w-fit">
                    {typeLabel[c.contractType] ?? c.contractType}
                  </Badge>
                  <Badge
                    variant={statusVariant[c.status] ?? "secondary"}
                    className="text-xs block w-fit"
                  >
                    {statusLabel[c.status] ?? c.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {c.salePrice ? (
                    <p className="font-semibold text-black">{fmt(c.salePrice, c.currency)}</p>
                  ) : c.rentalPrice ? (
                    <p className="font-semibold text-black">
                      {fmt(c.rentalPrice, c.currency)}
                      <span className="text-xs font-normal">/ay</span>
                    </p>
                  ) : (
                    <p className="text-black">—</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black truncate max-w-[140px]">
                    {c.property?.title ?? "—"}
                  </p>
                  <p className="text-xs text-black">{c.property?.city ?? ""}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-black">{c.agentName}</p>
                  <p className="text-xs text-black">{c.clientName}</p>
                </td>
                <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                  {fmtDate(c.startDate)}
                </td>
                <td className="px-4 py-3 text-xs text-black">
                  <p>{c._count?.payments  ?? 0} ödeme</p>
                  <p>{c._count?.documents ?? 0} belge</p>
                </td>
                <td className="px-4 py-3">
                  <ContractActions contract={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {contracts.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-black">{c.contractNo}</p>
              <div className="flex gap-1.5 mt-1">
                <Badge variant="outline" className="text-[10px] text-black">
                  {typeLabel[c.contractType] ?? c.contractType}
                </Badge>
                <Badge
                  variant={statusVariant[c.status] ?? "secondary"}
                  className="text-[10px]"
                >
                  {statusLabel[c.status] ?? c.status}
                </Badge>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                {
                  label: "Tutar",
                  value: c.salePrice
                    ? fmt(c.salePrice, c.currency)
                    : c.rentalPrice
                    ? `${fmt(c.rentalPrice, c.currency)}/ay`
                    : "—",
                },
                { label: "Mülk",     value: c.property?.title ?? "—" },
                { label: "Danışman", value: c.agentName },
                { label: "Müşteri",  value: c.clientName },
                { label: "Başlangıç", value: fmtDate(c.startDate) },
                { label: "Ödemeler", value: `${c._count?.payments ?? 0} ödeme · ${c._count?.documents ?? 0} belge` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <ContractActions contract={c} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
