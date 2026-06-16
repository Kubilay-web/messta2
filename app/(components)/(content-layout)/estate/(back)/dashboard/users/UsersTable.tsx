"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, UserCog } from "lucide-react";
import { deleteAgencyUser, updateAgencyUserRole } from "../../../actions/agency-users";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { useState } from "react";

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: "Süper Admin", ADMIN:      "Yönetici",
  AGENT:       "Danışman",    CLIENT:     "Müşteri",
  SECRETARY:   "Sekreter",    ACCOUNTANT: "Muhasebeci",
};
const roleVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SUPER_ADMIN: "default", ADMIN: "default",
  AGENT:       "secondary", CLIENT: "outline",
  SECRETARY:   "secondary", ACCOUNTANT: "secondary",
};
const roleBg: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700", ADMIN: "bg-blue-50 text-blue-700",
  AGENT:       "bg-green-50 text-green-700",   CLIENT: "bg-gray-50 text-gray-700",
  SECRETARY:   "bg-amber-50 text-amber-700",   ACCOUNTANT: "bg-teal-50 text-teal-700",
};

type User = {
  id: string; name?: string | null; firstName?: string | null; lastName?: string | null;
  email?: string | null; phone?: string | null; isActive?: boolean;
  roleGayrimenkul?: string | null; createdAt: Date | string;
};

const assignableRoles = [
  { value: "ADMIN",      label: "Yönetici"   },
  { value: "SECRETARY",  label: "Sekreter"   },
  { value: "ACCOUNTANT", label: "Muhasebeci" },
  { value: "AGENT",      label: "Danışman"   },
  { value: "CLIENT",     label: "Müşteri"    },
] as const;

function UserActions({
  user, onDelete, onRoleChange,
}: {
  user: User;
  onDelete: (id: string) => void;
  onRoleChange: (id: string, role: string) => void;
}) {
  const [roleOpen,   setRoleOpen]   = useState(false);
  const [newRole,    setNewRole]    = useState(user.roleGayrimenkul ?? "ADMIN");
  const [roleSaving, setRoleSaving] = useState(false);

  async function handleDelete() {
    try {
      await deleteAgencyUser(user.id);
      onDelete(user.id);
      toast.success("Kullanıcı silindi.");
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  async function handleRoleSave() {
    setRoleSaving(true);
    try {
      await updateAgencyUserRole(user.id, newRole as any);
      onRoleChange(user.id, newRole);
      toast.success("Rol güncellendi.");
      setRoleOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Güncellenemedi.");
    } finally {
      setRoleSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Rol Değiştir */}
      <AlertDialog open={roleOpen} onOpenChange={setRoleOpen}>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="outline" className="h-8 w-8" title="Rol Değiştir">
            <UserCog className="w-3.5 h-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-sm bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Rol Değiştir</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{user.name ?? user.email}</strong> için yeni rol seçin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {assignableRoles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleRoleSave}
              disabled={roleSaving}
            >
              {roleSaving ? "Kaydediliyor…" : "Kaydet"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sil */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>"{user.name ?? user.email}" silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>
              Kullanıcı kalıcı olarak silinecek. Danışman veya müşteri bağlantıları da etkilenebilir.
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

export default function UsersTable({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial);

  function handleDelete(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function handleRoleChange(id: string, role: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, roleGayrimenkul: role } : u));
  }

  if (!users.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
        Henüz kullanıcı kaydı bulunmuyor.
      </div>
    );
  }

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  const displayName = (u: User) =>
    u.name || `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email || "—";

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Kullanıcı", "E-posta", "Telefon", "Rol", "Durum", "Kayıt Tarihi", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${roleBg[u.roleGayrimenkul ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                      {displayName(u).slice(0, 2).toUpperCase()}
                    </div>
                    <p className="font-semibold text-black">{displayName(u)}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-black">{u.email ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-black">{u.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={roleVariant[u.roleGayrimenkul ?? ""] ?? "secondary"} className="text-xs">
                    {roleLabel[u.roleGayrimenkul ?? ""] ?? u.roleGayrimenkul ?? "—"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    u.isActive !== false ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.isActive !== false ? "bg-green-500" : "bg-red-400"}`} />
                    {u.isActive !== false ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(u.createdAt)}</td>
                <td className="px-4 py-3">
                  <UserActions user={u} onDelete={handleDelete} onRoleChange={handleRoleChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {users.map((u) => (
          <div key={u.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${roleBg[u.roleGayrimenkul ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                  {displayName(u).slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-black truncate">{displayName(u)}</p>
                  <Badge variant={roleVariant[u.roleGayrimenkul ?? ""] ?? "secondary"} className="text-[10px]">
                    {roleLabel[u.roleGayrimenkul ?? ""] ?? "—"}
                  </Badge>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                u.isActive !== false ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}>
                {u.isActive !== false ? "Aktif" : "Pasif"}
              </span>
            </div>
            <div className="px-4 py-2 space-y-1">
              {[
                { label: "E-posta",  value: u.email  ?? "—" },
                { label: "Telefon",  value: u.phone  ?? "—" },
                { label: "Kayıt",    value: fmtDate(u.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <span className="text-black font-medium shrink-0">{label}</span>
                  <span className="text-black truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
              <UserActions user={u} onDelete={handleDelete} onRoleChange={handleRoleChange} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
