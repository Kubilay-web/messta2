"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Agent } from "../../../types/types";
import { deleteAgent } from "../../../actions/agents";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

function AgentActions({ agent }: { agent: Agent }) {
  async function handleDelete() {
    try {
      await deleteAgent(agent.id);
      toast.success("Danışman silindi.");
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/agents/view/${agent.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/agents/edit/${agent.id}`}>
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
            <AlertDialogTitle>{agent.firstName} {agent.lastName} silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem danışmanı ve bağlı kullanıcı hesabını kalıcı olarak siler.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Kalıcı Olarak Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AgentTable({ agents }: { agents: Agent[] }) {
  if (!agents.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz danışman kaydı bulunmuyor.
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
              {["Danışman", "İletişim", "Pozisyon / Dept.", "Komisyon", "Durum", "Tarih", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={a.imageUrl || "/management/images/realestate-logo.svg"}
                      alt={a.firstName} width={36} height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold capitalize truncate max-w-[140px] text-black">
                        {a.title} {a.firstName} {a.lastName}
                      </p>
                      <p className="text-xs text-black">{a.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="truncate max-w-[160px] text-black">{a.email}</p>
                  <p className="text-xs text-black">{a.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-black">{a.designation}</p>
                  <p className="text-xs text-black">{a.departmentName}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="text-xs text-black">%{a.commissionRate ?? 2.5}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={a.isActive ? "default" : "secondary"} className="text-xs">
                    {a.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                  {new Date(a.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3">
                  <AgentActions agent={a} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {agents.map((a) => (
          <div key={a.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Image
                src={a.imageUrl || "/management/images/realestate-logo.svg"}
                alt={a.firstName} width={40} height={40}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold capitalize truncate text-black">
                  {a.title} {a.firstName} {a.lastName}
                </p>
                <div className="flex gap-1 mt-0.5">
                  <Badge variant={a.isActive ? "default" : "secondary"} className="text-[10px] px-1">
                    {a.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1 text-black">%{a.commissionRate ?? 2.5}</Badge>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "E-posta",   value: a.email },
                { label: "Telefon",   value: a.phone },
                { label: "Pozisyon",  value: a.designation },
                { label: "Dept.",     value: a.departmentName },
                { label: "Çalışan No",value: a.employeeId },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <AgentActions agent={a} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
