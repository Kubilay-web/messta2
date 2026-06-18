"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertStore, type StoreInput } from "../actions";
import { TR_CITIES } from "../lib/categories";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const STORE_TYPES = [
  { value: "CORPORATE", label: "Kurumsal Mağaza" },
  { value: "CAR_GALLERY", label: "Oto Galeri" },
  { value: "REAL_ESTATE_OFFICE", label: "Emlak Ofisi" },
  { value: "AUTHORIZED_DEALER", label: "Yetkili Bayi" },
  { value: "INDIVIDUAL", label: "Bireysel" },
];

export default function StoreForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [f, setF] = useState<StoreInput>({
    name: initial?.name ?? "",
    type: initial?.type ?? "CORPORATE",
    about: initial?.about ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    website: initial?.website ?? "",
    address: initial?.address ?? "",
    city: initial?.city ?? "",
    taxOffice: initial?.taxOffice ?? "",
    taxNumber: initial?.taxNumber ?? "",
    logo: initial?.logo ?? "",
    banner: initial?.banner ?? "",
  });
  const [uploading, setUploading] = useState<"" | "logo" | "banner">("");

  function set<K extends keyof StoreInput>(k: K, v: StoreInput[K]) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  async function upload(kind: "logo" | "banner", file?: File) {
    if (!file || !CLOUD || !PRESET) return;
    setUploading(kind);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (json.secure_url) set(kind, json.secure_url);
    } finally {
      setUploading("");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!f.name.trim()) return setError("Mağaza adı zorunludur.");
    start(async () => {
      const res = await upsertStore(f);
      if (res.ok && res.data) router.push(`/sahibinden/magaza/${res.data.slug}`);
      else setError(res.error ?? "Hata oluştu.");
    });
  }

  const input = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400";

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Banner + logo */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <label className="relative block h-32 cursor-pointer bg-gradient-to-r from-gray-100 to-gray-200 sm:h-40">
          {f.banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.banner} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-sm text-gray-600">
              {uploading === "banner" ? "Yükleniyor..." : "Kapak görseli yükle"}
            </span>
          )}
          <input type="file" accept="image/*" hidden onChange={(e) => upload("banner", e.target.files?.[0])} />
        </label>
        <div className="flex items-center gap-3 p-3">
          <label className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {f.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.logo} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-gray-600">
                {uploading === "logo" ? "..." : "Logo"}
              </span>
            )}
            <input type="file" accept="image/*" hidden onChange={(e) => upload("logo", e.target.files?.[0])} />
          </label>
          <p className="text-xs text-gray-600">Logo ve kapak görselini yüklemek için tıkla.</p>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
        <L label="Mağaza Adı">
          <input value={f.name} onChange={(e) => set("name", e.target.value)} className={input} />
        </L>
        <L label="Mağaza Tipi">
          <select value={f.type} onChange={(e) => set("type", e.target.value)} className={input}>
            {STORE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </L>
        <L label="Telefon">
          <input value={f.phone} onChange={(e) => set("phone", e.target.value)} className={input} />
        </L>
        <L label="E-posta">
          <input value={f.email} onChange={(e) => set("email", e.target.value)} className={input} />
        </L>
        <L label="Web Sitesi">
          <input value={f.website} onChange={(e) => set("website", e.target.value)} className={input} />
        </L>
        <L label="Şehir">
          <select value={f.city} onChange={(e) => set("city", e.target.value)} className={input}>
            <option value="">Seçiniz</option>
            {TR_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </L>
        <L label="Adres">
          <input value={f.address} onChange={(e) => set("address", e.target.value)} className={input} />
        </L>
        <L label="Vergi Dairesi">
          <input value={f.taxOffice} onChange={(e) => set("taxOffice", e.target.value)} className={input} />
        </L>
        <L label="Vergi No">
          <input value={f.taxNumber} onChange={(e) => set("taxNumber", e.target.value)} className={input} />
        </L>
        <div className="sm:col-span-2">
          <L label="Hakkında">
            <textarea value={f.about} onChange={(e) => set("about", e.target.value)} rows={4} className={`${input} resize-y`} />
          </L>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending || !!uploading}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor..." : initial ? "Mağazayı Güncelle" : "Mağaza Oluştur"}
      </button>
    </form>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}
