"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PropertyClient } from "../../../../types/types";
import { deletePropertyClient } from "../../../../actions/clients";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

function typeBadges(c: PropertyClient) {
  const list: string[] = [];
  if (c.isBuyer)    list.push("Alıcı");
  if (c.isSeller)   list.push("Satıcı");
  if (c.isTenant)   list.push("Kiracı");
  if (c.isLandlord) list.push("Kiraya Veren");
  return list;
}

function ClientActions({ client }: { client: PropertyClient }) {
  async function handleDelete() {
    try {
      await deletePropertyClient(client.id);
      toast.success("Müşteri silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/users/clients/view/${client.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/users/clients/edit/${client.id}`}>
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
            <AlertDialogTitle>
              {client.firstName} {client.lastName} silinsin mi?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem müşteriyi ve bağlı kullanıcı hesabını kalıcı olarak siler.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Kalıcı Olarak Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ClientTable({ clients }: { clients: PropertyClient[] }) {
  if (!clients.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
        Henüz müşteri kaydı bulunmuyor.
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
              {["Müşteri", "İletişim", "Tip", "Bütçe", "Tercih Şehirler", "Kayıt Tarihi", "İşlemler"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                {/* Ad */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={c.imageUrl || "/management/images/realestate-logo.svg"}
                      alt={c.firstName} width={36} height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium capitalize truncate max-w-[140px]">
                        {c.title} {c.firstName} {c.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{c.nationality}</p>
                    </div>
                  </div>
                </td>
                {/* İletişim */}
                <td className="px-4 py-3">
                  <p className="truncate max-w-[160px]">{c.email}</p>
                  <p className="text-xs text-gray-400">{c.phone}</p>
                </td>
                {/* Tip */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {typeBadges(c).map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </td>
                {/* Bütçe */}
                <td className="px-4 py-3 whitespace-nowrap">
                  {c.minBudget || c.maxBudget ? (
                    <span className="text-sm">
                      {c.minBudget?.toLocaleString("tr-TR")} –{" "}
                      {c.maxBudget?.toLocaleString("tr-TR")}{" "}
                      <span className="text-gray-400">{c.currency}</span>
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                {/* Şehirler */}
                <td className="px-4 py-3 max-w-[140px]">
                  <p className="truncate text-sm text-gray-600">
                    {c.preferredCities?.join(", ") || "—"}
                  </p>
                </td>
                {/* Tarih */}
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(c.createdAt).toLocaleDateString("tr-TR")}
                </td>
                {/* İşlemler */}
                <td className="px-4 py-3">
                  <ClientActions client={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {clients.map((c) => (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Image
                src={c.imageUrl || "/management/images/realestate-logo.svg"}
                alt={c.firstName} width={40} height={40}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold capitalize truncate">
                  {c.title} {c.firstName} {c.lastName}
                </p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {typeBadges(c).map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px] px-1">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "E-posta",  value: c.email },
                { label: "Telefon",  value: c.phone },
                { label: "Uyruk",    value: c.nationality },
                {
                  label: "Bütçe",
                  value: (c.minBudget || c.maxBudget)
                    ? `${c.minBudget?.toLocaleString("tr-TR")} – ${c.maxBudget?.toLocaleString("tr-TR")} ${c.currency}`
                    : "—",
                },
                { label: "Şehirler", value: c.preferredCities?.join(", ") || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <ClientActions client={c} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
