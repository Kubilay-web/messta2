"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, Users } from "lucide-react";
import { AgencyDepartment } from "../../../../types/types";
import { deleteAgencyDepartment } from "../../../../actions/agencyDepartments";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

function DeptActions({ dept }: { dept: AgencyDepartment }) {
  async function handleDelete() {
    try {
      await deleteAgencyDepartment(dept.id);
      toast.success("Departman silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/users/departments/edit/${dept.id}`}>
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
            <AlertDialogTitle>"{dept.name}" departmanı silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu departmana bağlı danışmanlar varsa silme işlemi engellenir.
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

export default function DepartmentTable({ departments }: { departments: AgencyDepartment[] }) {
  if (!departments.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz departman kaydı bulunmuyor.
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
              {["Departman", "Yönetici", "Danışman Sayısı", "Bütçe", "Oluşturulma", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((d) => {
              const agentCount = (d as any)._count?.agents ?? 0;
              return (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-black">{d.name}</p>
                    <p className="text-xs text-black">{d.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {d.managerName ? (
                      <div>
                        <p className="text-sm text-black font-medium">{d.managerName}</p>
                        {d.managerStartDate && (
                          <p className="text-xs text-black">
                            {new Date(d.managerStartDate).toLocaleDateString("tr-TR")}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-black">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-blue-600" />
                      <Badge variant="secondary" className="text-xs text-black">
                        {agentCount} danışman
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {d.budget ? (
                      <div>
                        <p className="text-sm text-black font-medium">
                          ₺{d.budget.toLocaleString("tr-TR")}
                        </p>
                        {d.budgetYear && <p className="text-xs text-black">{d.budgetYear}</p>}
                      </div>
                    ) : (
                      <span className="text-xs text-black">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                    {new Date(d.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-4 py-3">
                    <DeptActions dept={d} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {departments.map((d) => {
          const agentCount = (d as any)._count?.agents ?? 0;
          return (
            <div key={d.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-black">{d.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Users className="h-3.5 w-3.5 text-blue-600" />
                  <Badge variant="secondary" className="text-[10px] text-black">{agentCount} danışman</Badge>
                </div>
              </div>
              <div className="px-4 py-2 space-y-1">
                {[
                  { label: "Yönetici",  value: d.managerName  ?? "—" },
                  { label: "Bütçe",     value: d.budget ? `₺${d.budget.toLocaleString("tr-TR")} (${d.budgetYear ?? ""})` : "—" },
                  { label: "Oluşturma", value: new Date(d.createdAt).toLocaleDateString("tr-TR") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 text-xs">
                    <span className="text-black font-medium shrink-0">{label}</span>
                    <span className="text-black truncate max-w-[200px]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                <DeptActions dept={d} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
