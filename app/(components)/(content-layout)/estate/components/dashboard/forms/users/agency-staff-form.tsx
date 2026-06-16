"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import SubmitButton from "../../../FormInputs/SubmitButton";
import { Button }   from "../../../ui/button";
import { Badge }    from "../../../ui/badge";
import { Label }    from "../../../ui/label";

import { assignRoleToUser } from "../../../../actions/agency-users";

const roleOptions = [
  { value: "ADMIN",      label: "Yönetici",   desc: "Tüm panele tam erişim." },
  { value: "SECRETARY",  label: "Sekreter",   desc: "İletişim ve takvim yönetimi." },
  { value: "ACCOUNTANT", label: "Muhasebeci", desc: "Finans ve ödeme raporları." },
  { value: "AGENT",      label: "Danışman",   desc: "İlan ve mülk işlemleri." },
  { value: "CLIENT",     label: "Müşteri",    desc: "Sözleşme ve ziyaret takibi." },
] as const;

type Role = typeof roleOptions[number]["value"];

const roleBg: Record<string, string> = {
  ADMIN:      "bg-blue-50 border-blue-300 text-blue-700",
  SECRETARY:  "bg-amber-50 border-amber-300 text-amber-700",
  ACCOUNTANT: "bg-teal-50 border-teal-300 text-teal-700",
  AGENT:      "bg-green-50 border-green-300 text-green-700",
  CLIENT:     "bg-gray-50 border-gray-300 text-gray-700",
};

type AvailableUser = {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?:  string | null;
  email?: string | null;
  phone?: string | null;
};

type Props = {
  agencyId:       string;
  agencyName:     string;
  availableUsers: AvailableUser[];
};

function displayName(u: AvailableUser) {
  return (
    u.name ||
    `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
    u.email ||
    u.id
  );
}

export default function AgencyStaffForm({ agencyId, agencyName, availableUsers }: Props) {
  const router = useRouter();
  const [loading,      setLoading]      = useState(false);
  const [selectedId,   setSelectedId]   = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("ADMIN");

  const selectedUser = availableUsers.find((u) => u.id === selectedId) ?? null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId) { toast.error("Lütfen bir kullanıcı seçin."); return; }
    setLoading(true);
    try {
      await assignRoleToUser(selectedId, selectedRole, agencyId, agencyName);
      const rolLabel = roleOptions.find((r) => r.value === selectedRole)?.label ?? selectedRole;
      toast.success(`${displayName(selectedUser!)} → ${rolLabel} olarak atandı.`);
      router.push("/estate/dashboard/users");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Kullanıcıya Rol Ata
        </h2>
        <p className="text-sm text-black mt-1">
          Listeden kullanıcı seçin ve ajansa eklemek için rol belirleyin.
        </p>
      </div>

      {/* ── Kullanıcı Seçimi ── */}
      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">
          Kullanıcı ({availableUsers.length})
        </legend>

        <div className="space-y-1">
          <Label className="text-sm font-medium text-black">
            Kullanıcı Seç <span className="text-red-500">*</span>
          </Label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">— Kullanıcı seçin —</option>
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {displayName(u)}{u.email ? ` (${u.email})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Seçili kullanıcı bilgisi */}
        {selectedUser && (
          <div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 space-y-0.5">
            <p className="text-sm font-semibold text-black">{displayName(selectedUser)}</p>
            {selectedUser.email && <p className="text-xs text-black">{selectedUser.email}</p>}
            {selectedUser.phone && <p className="text-xs text-black">{selectedUser.phone}</p>}
          </div>
        )}
      </fieldset>

      {/* ── Rol Seçimi ── */}
      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Rol</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {roleOptions.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedRole(value)}
              className={`flex flex-col items-start gap-0.5 rounded-lg border p-3 text-left transition-all ${
                selectedRole === value
                  ? `${roleBg[value]} ring-1 ring-offset-1 ring-current`
                  : "border-gray-200 bg-white text-black hover:bg-gray-50"
              }`}
            >
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-[11px] opacity-70">{desc}</p>
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── Özet ── */}
      {selectedUser && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-black">
          <strong>{displayName(selectedUser)}</strong> →{" "}
          <Badge variant="secondary" className="text-xs">
            {roleOptions.find((r) => r.value === selectedRole)?.label}
          </Badge>{" "}
          rolüyle <strong>{agencyName}</strong> ajansına eklenecek.
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title="Rolü Ata"
          loading={loading}
          loadingTitle="Atanıyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
