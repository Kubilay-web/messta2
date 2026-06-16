"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Building2, CheckCircle2, LogIn, Globe, LayoutDashboard, Loader2,
  Pencil, Trash2, Plus, X,
} from "lucide-react";
import {
  switchAgency, createAgency, updateMyAgency, deleteMyAgency,
} from "../../../../actions/agencies";

type Agency = {
  id: string;
  name: string;
  logo?: string | null;
  city?: string | null;
  slug: string;
  siteEnabled: boolean;
  siteCompletion: number;
  primaryEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  taxNumber?: string | null;
  licenseNo?: string | null;
};

type AgencyForm = {
  name: string;
  logo: string;
  primaryEmail: string;
  phone: string;
  address: string;
  city: string;
  taxNumber: string;
  licenseNo: string;
};

const EMPTY_FORM: AgencyForm = {
  name: "", logo: "", primaryEmail: "", phone: "",
  address: "", city: "", taxNumber: "", licenseNo: "",
};

const toForm = (a: Agency): AgencyForm => ({
  name: a.name ?? "",
  logo: a.logo ?? "",
  primaryEmail: a.primaryEmail ?? "",
  phone: a.phone ?? "",
  address: a.address ?? "",
  city: a.city ?? "",
  taxNumber: a.taxNumber ?? "",
  licenseNo: a.licenseNo ?? "",
});

/* ---------------- Oluştur / Düzenle dialog ---------------- */
function AgencyDialog({
  mode,
  initial,
  onClose,
}: {
  mode: { type: "create" } | { type: "edit"; id: string };
  initial: AgencyForm;
  onClose: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState<AgencyForm>(initial);
  const [saving, setSaving] = useState(false);

  const set =
    (k: keyof AgencyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Ofis adı zorunludur.");
      return;
    }
    setSaving(true);
    try {
      if (mode.type === "create") {
        await createAgency(form);
        toast.success("Ofis oluşturuldu.");
      } else {
        await updateMyAgency(mode.id, form);
        toast.success("Ofis güncellendi.");
      }
      router.refresh();
      onClose();
    } catch (err: any) {
      toast.error(err?.message ?? "İşlem başarısız.");
      setSaving(false);
    }
  };

  const field =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
  const label = "mb-1 block text-xs font-semibold text-slate-600";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">
            {mode.type === "create" ? "Yeni Ofis" : "Ofisi Düzenle"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Ofis Adı *</label>
            <input className={field} value={form.name} onChange={set("name")} placeholder="Örn. Akel Gayrimenkul" />
          </div>
          <div>
            <label className={label}>Şehir</label>
            <input className={field} value={form.city} onChange={set("city")} />
          </div>
          <div>
            <label className={label}>E-posta</label>
            <input className={field} type="email" value={form.primaryEmail} onChange={set("primaryEmail")} />
          </div>
          <div>
            <label className={label}>Telefon</label>
            <input className={field} value={form.phone} onChange={set("phone")} />
          </div>
          <div>
            <label className={label}>Vergi No</label>
            <input className={field} value={form.taxNumber} onChange={set("taxNumber")} />
          </div>
          <div>
            <label className={label}>Ruhsat No</label>
            <input className={field} value={form.licenseNo} onChange={set("licenseNo")} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Logo URL</label>
            <input className={field} value={form.logo} onChange={set("logo")} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Adres</label>
            <textarea
              className="min-h-[72px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              value={form.address}
              onChange={set("address")}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode.type === "create" ? "Oluştur" : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Grid ---------------- */
export default function MyAgenciesGrid({
  agencies,
  activeId,
}: {
  agencies: Agency[];
  activeId: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dialog, setDialog] = useState<
    { type: "create"; initial: AgencyForm } | { type: "edit"; id: string; initial: AgencyForm } | null
  >(null);

  const handleSwitch = async (id: string) => {
    setBusy(id);
    try {
      await switchAgency(id);
      toast.success("Ofis değiştirildi.");
      router.push("/estate/dashboard");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Geçiş başarısız.");
      setBusy(null);
    }
  };

  const handleDelete = async (a: Agency) => {
    if (
      !window.confirm(
        `"${a.name}" ofisini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`
      )
    )
      return;
    setDeleting(a.id);
    try {
      await deleteMyAgency(a.id);
      toast.success("Ofis silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Silme başarısız.");
      setDeleting(null);
    }
  };

  return (
    <>
      {/* Araç çubuğu */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setDialog({ type: "create", initial: EMPTY_FORM })}
          className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
        >
          <Plus className="h-4 w-4" /> Yeni Ofis
        </button>
      </div>

      {agencies.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="font-semibold text-slate-700">Henüz ofisiniz yok</p>
          <button
            onClick={() => setDialog({ type: "create", initial: EMPTY_FORM })}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
          >
            <Plus className="h-4 w-4" /> Ofis Oluştur
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agencies.map((a) => {
            const active = a.id === activeId;
            return (
              <div
                key={a.id}
                className={`relative rounded-3xl border bg-white p-5 shadow-sm transition ${
                  active ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200 hover:shadow-md"
                }`}
              >
                {active && (
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Aktif
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border bg-slate-50">
                    {a.logo ? (
                      <Image src={a.logo} alt={a.name} width={48} height={48} className="h-full w-full object-cover" />
                    ) : (
                      <Building2 className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-400">{a.city ?? "—"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  {active ? (
                    <Link
                      href="/estate/dashboard"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-700"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Panele Git
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSwitch(a.id)}
                      disabled={busy === a.id}
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 disabled:opacity-60"
                    >
                      {busy === a.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                      Bu Ofise Geç
                    </button>
                  )}

                  <div className="mt-2 flex gap-2">
                    <Link
                      href={`/crm/agency/${a.id}`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      CRM
                    </Link>
                    <Link
                      href={`/estate/agency/${a.id}`}
                      target="_blank"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Globe className="h-3.5 w-3.5" /> Site
                    </Link>
                  </div>

                  {/* Düzenle / Sil */}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setDialog({ type: "edit", id: a.id, initial: toForm(a) })}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(a)}
                      disabled={deleting === a.id}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deleting === a.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {dialog && (
        <AgencyDialog
          mode={dialog.type === "create" ? { type: "create" } : { type: "edit", id: dialog.id }}
          initial={dialog.initial}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
}
