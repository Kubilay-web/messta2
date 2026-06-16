"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Search, Check, UserCheck, ChevronRight, Shield } from "lucide-react";
import { Input }        from "../../../ui/input";
import { Badge }        from "../../../ui/badge";
import { Button }       from "../../../ui/button";
import { ScrollArea }   from "../../../ui/scroll-area";
import { assignRoleToUser } from "../../../../actions/agency-users";

type AvailableUser = {
  id:        string;
  name:      string | null;
  firstName: string | null;
  lastName:  string | null;
  email:     string | null;
  phone:     string | null;
  image:     string | null;
};

type Props = {
  users:      AvailableUser[];
  agencyId:   string;
  agencyName: string;
};

function displayName(u: AvailableUser) {
  const full = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
  return u.name || full || "—";
}

const ROLES = [
  { value: "ADMIN",      label: "Yönetici (Admin)",   color: "bg-red-100 text-red-700"    },
  { value: "SECRETARY",  label: "Sekreter",            color: "bg-blue-100 text-blue-700"  },
  { value: "ACCOUNTANT", label: "Muhasebeci",          color: "bg-green-100 text-green-700"},
  { value: "AGENT",      label: "Danışman",            color: "bg-purple-100 text-purple-700"},
] as const;

type Role = typeof ROLES[number]["value"];

export default function AssignAgencyAdminForm({ users, agencyId, agencyName }: Props) {
  const router = useRouter();
  const [query,        setQuery]        = useState("");
  const [selectedUser, setSelectedUser] = useState<AvailableUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("ADMIN");
  const [loading,      setLoading]      = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      displayName(u).toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q)
    );
  }, [query, users]);

  async function handleAssign() {
    if (!selectedUser) { toast.error("Lütfen bir kullanıcı seçin."); return; }
    setLoading(true);
    try {
      await assignRoleToUser(selectedUser.id, selectedRole, agencyId, agencyName);
      toast.success(`${displayName(selectedUser)} — ${ROLES.find(r => r.value === selectedRole)?.label} rolü atandı!`);
      router.push("/estate/dashboard");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Başlık */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" /> Rol Ata
        </h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{agencyName}</span> — mevcut kullanıcıya rol atayın.
        </p>
      </div>

      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          className="pl-9"
          placeholder="Ad, e-posta veya telefon ara…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Kullanıcı Listesi */}
      <ScrollArea className="h-[320px] rounded-xl border bg-white">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">Kullanıcı bulunamadı.</p>
        ) : (
          <ul className="divide-y">
            {filtered.map((u) => {
              const isSelected = selectedUser?.id === u.id;
              const name = displayName(u);
              return (
                <li
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4
                    ${isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50 border-transparent"}`}
                >
                  <div className="relative shrink-0">
                    <Image
                      src={u.image || "/management/images/realestate-logo.svg"}
                      alt={name} width={40} height={40}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email ?? "—"}</p>
                    {u.phone && <p className="text-xs text-muted-foreground">{u.phone}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </ScrollArea>

      {/* Rol Seçimi */}
      <div className="space-y-2">
        <p className="text-sm font-semibold">Atanacak Rol</p>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setSelectedRole(r.value)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all
                ${selectedRole === r.value
                  ? "border-blue-500 ring-1 ring-blue-500 " + r.color
                  : "border-gray-200 hover:bg-gray-50"}`}
            >
              {selectedRole === r.value && <Check className="w-3.5 h-3.5 shrink-0" />}
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alt Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">
        {selectedUser ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <p className="text-sm font-medium truncate">{displayName(selectedUser)}</p>
            <Badge variant="secondary" className="text-xs shrink-0">seçildi</Badge>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground flex-1">Henüz kullanıcı seçilmedi.</p>
        )}
        <Button
          onClick={handleAssign}
          disabled={!selectedUser || loading}
          className="w-full sm:w-auto shrink-0"
        >
          {loading ? "Atanıyor…" : "Rolü Ata"}
          {!loading && <ChevronRight className="ml-1 w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
