"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ImagePlus, Loader2, Video, Box } from "lucide-react";
import { createMyListing, updateMyListing, type MyListingInput } from "../../../../actions/my-listings";
import { propertyTypeLabel, listingTypeLabel } from "../../../_components/market/labels";

const featureList: { key: keyof MyListingInput; label: string }[] = [
  { key: "hasElevator", label: "Asansör" },
  { key: "hasParking", label: "Otopark" },
  { key: "isFurnished", label: "Eşyalı" },
  { key: "hasGarden", label: "Bahçe" },
  { key: "hasPool", label: "Havuz" },
  { key: "hasBalcony", label: "Balkon" },
];

type Initial = Partial<MyListingInput> & { images?: string[] };

export default function ListingForm({
  mode,
  listingId,
  initial,
  myAgency,
}: {
  mode: "create" | "edit";
  listingId?: string;
  initial?: Initial;
  myAgency?: { id: string; name: string } | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  // Ofisi olan kullanıcı için yayın sahibi seçimi (yalnızca yeni ilan)
  const [publishAs, setPublishAs] = useState<"individual" | "agency">(
    myAgency ? "agency" : "individual"
  );
  const [error, setError] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: fd }
        );
        const data = await res.json();
        if (data.secure_url) urls.push(data.secure_url);
      } catch {
        /* atla */
      }
    }
    if (urls.length) setImages((p) => [...p, ...urls]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const [f, setF] = useState<MyListingInput>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    listingType: initial?.listingType ?? "SALE",
    propertyType: initial?.propertyType ?? "APARTMENT",
    askingPrice: initial?.askingPrice ?? 0,
    monthlyRent: initial?.monthlyRent ?? null,
    deposit: initial?.deposit ?? null,
    currency: initial?.currency ?? "TRY",
    isNegotiable: initial?.isNegotiable ?? true,
    city: initial?.city ?? "",
    district: initial?.district ?? "",
    neighborhood: initial?.neighborhood ?? "",
    address: initial?.address ?? "",
    roomCount: initial?.roomCount ?? "",
    bathroomCount: initial?.bathroomCount ?? null,
    grossArea: initial?.grossArea ?? null,
    netArea: initial?.netArea ?? null,
    floorNo: initial?.floorNo ?? null,
    totalFloors: initial?.totalFloors ?? null,
    buildingAge: initial?.buildingAge ?? null,
    heatingType: initial?.heatingType ?? "",
    videoUrl: initial?.videoUrl ?? "",
    virtualTourUrl: initial?.virtualTourUrl ?? "",
    hasElevator: initial?.hasElevator ?? false,
    hasParking: initial?.hasParking ?? false,
    isFurnished: initial?.isFurnished ?? false,
    hasGarden: initial?.hasGarden ?? false,
    hasPool: initial?.hasPool ?? false,
    hasBalcony: initial?.hasBalcony ?? false,
    ownerName: initial?.ownerName ?? "",
    ownerPhone: initial?.ownerPhone ?? "",
  });
  const [images, setImages] = useState<string[]>(initial?.images ?? []);

  const set = <K extends keyof MyListingInput>(k: K, v: MyListingInput[K]) =>
    setF((p) => ({ ...p, [k]: v }));
  const num = (v: string) => (v === "" ? null : Number(v));

  const addImage = () => {
    const u = imgUrl.trim();
    if (u && !images.includes(u)) setImages((p) => [...p, u]);
    setImgUrl("");
  };

  const submit = async () => {
    setError(null);
    if (!f.title.trim() || !f.city.trim() || !f.address.trim()) {
      setError("Başlık, şehir ve adres zorunludur.");
      return;
    }
    if (!(f.askingPrice > 0)) {
      setError("Geçerli bir fiyat giriniz.");
      return;
    }
    setSaving(true);
    const payload = { ...f, images, publishAs };
    const res =
      mode === "edit" && listingId
        ? await updateMyListing(listingId, payload)
        : await createMyListing(payload);
    setSaving(false);
    if (res?.error) setError(res.error);
    else {
      router.push("/realestate/user/properties");
      router.refresh();
    }
  };

  const input =
    "h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none";
  const label = "text-xs font-medium text-gray-600";
  const isRent = f.listingType === "RENT" || f.listingType === "SHORT_RENT";

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-10">
      {/* Yayın sahibi (yalnızca ofisi olan kullanıcı + yeni ilan) */}
      {mode === "create" && myAgency && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-1 font-bold">Yayın Sahibi</h3>
          <p className="mb-3 text-xs text-gray-400">
            İlan kimin adına yayınlansın? Ofis adına yayınlananlar anında yayına alınır ve gelen
            talepler ofisinizin CRM hattına düşer.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPublishAs("agency")}
              className={`rounded-2xl border p-4 text-left transition ${
                publishAs === "agency"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">Ofisim adına</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{myAgency.name}</p>
              <p className="mt-1 text-[11px] font-medium text-emerald-600">Anında yayında</p>
            </button>
            <button
              type="button"
              onClick={() => setPublishAs("individual")}
              className={`rounded-2xl border p-4 text-left transition ${
                publishAs === "individual"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">Bireysel (sahibinden)</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">Bireysel İlanlar</p>
              <p className="mt-1 text-[11px] font-medium text-amber-600">Admin onayından sonra</p>
            </button>
          </div>
        </section>
      )}

      {/* Temel */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">Temel Bilgiler</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className={label}>İlan Başlığı *</label>
            <input className={input} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Örn. Kadıköy'de deniz manzaralı 3+1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className={label}>İlan Türü *</label>
              <select className={input} value={f.listingType} onChange={(e) => set("listingType", e.target.value)}>
                {Object.entries(listingTypeLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={label}>Mülk Türü *</label>
              <select className={input} value={f.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
                {Object.entries(propertyTypeLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className={label}>Oda Sayısı</label>
              <input className={input} value={f.roomCount ?? ""} onChange={(e) => set("roomCount", e.target.value)} placeholder="3+1" />
            </div>
          </div>
          <div className="space-y-1">
            <label className={label}>Açıklama</label>
            <textarea className={`${input} h-auto min-h-[90px] py-2`} value={f.description ?? ""} onChange={(e) => set("description", e.target.value)} placeholder="Mülkün öne çıkan özellikleri…" />
          </div>
        </div>
      </section>

      {/* Fiyat */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">Fiyat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className={label}>{isRent ? "Fiyat / Kira *" : "Fiyat *"}</label>
            <input type="number" className={input} value={f.askingPrice || ""} onChange={(e) => set("askingPrice", Number(e.target.value))} />
          </div>
          {isRent && (
            <div className="space-y-1">
              <label className={label}>Aylık Kira</label>
              <input type="number" className={input} value={f.monthlyRent ?? ""} onChange={(e) => set("monthlyRent", num(e.target.value))} />
            </div>
          )}
          <div className="space-y-1">
            <label className={label}>Depozito</label>
            <input type="number" className={input} value={f.deposit ?? ""} onChange={(e) => set("deposit", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Para Birimi</label>
            <select className={input} value={f.currency} onChange={(e) => set("currency", e.target.value)}>
              <option value="TRY">₺ TRY</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>
          <label className="flex items-center gap-2 sm:col-span-2 text-sm">
            <input type="checkbox" checked={!!f.isNegotiable} onChange={(e) => set("isNegotiable", e.target.checked)} />
            Pazarlık payı var
          </label>
        </div>
      </section>

      {/* Konum */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">Konum</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className={label}>Şehir *</label>
            <input className={input} value={f.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={label}>İlçe</label>
            <input className={input} value={f.district ?? ""} onChange={(e) => set("district", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={label}>Mahalle</label>
            <input className={input} value={f.neighborhood ?? ""} onChange={(e) => set("neighborhood", e.target.value)} />
          </div>
          <div className="space-y-1 sm:col-span-3">
            <label className={label}>Açık Adres *</label>
            <input className={input} value={f.address} onChange={(e) => set("address", e.target.value)} />
          </div>
        </div>
      </section>

      {/* Detay */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">Detaylar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className={label}>Brüt m²</label>
            <input type="number" className={input} value={f.grossArea ?? ""} onChange={(e) => set("grossArea", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Net m²</label>
            <input type="number" className={input} value={f.netArea ?? ""} onChange={(e) => set("netArea", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Banyo</label>
            <input type="number" className={input} value={f.bathroomCount ?? ""} onChange={(e) => set("bathroomCount", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Bulunduğu Kat</label>
            <input type="number" className={input} value={f.floorNo ?? ""} onChange={(e) => set("floorNo", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Toplam Kat</label>
            <input type="number" className={input} value={f.totalFloors ?? ""} onChange={(e) => set("totalFloors", num(e.target.value))} />
          </div>
          <div className="space-y-1">
            <label className={label}>Bina Yaşı</label>
            <input type="number" className={input} value={f.buildingAge ?? ""} onChange={(e) => set("buildingAge", num(e.target.value))} />
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-3">
            <label className={label}>Isıtma</label>
            <input className={input} value={f.heatingType ?? ""} onChange={(e) => set("heatingType", e.target.value)} placeholder="Doğalgaz / Kombi…" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {featureList.map((ft) => (
            <label key={ft.key as string} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!f[ft.key]}
                onChange={(e) => set(ft.key, e.target.checked as any)}
              />
              {ft.label}
            </label>
          ))}
        </div>
      </section>

      {/* Görseller */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-bold">Görseller</h3>
        <p className="mb-3 text-xs text-gray-400">Bilgisayardan yükleyin veya URL ekleyin. İlk görsel kapak olur.</p>

        {/* Cloudinary yükleme alanı */}
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 py-7 transition hover:border-blue-400"
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin text-blue-500" /> : <ImagePlus className="h-7 w-7 text-gray-400" />}
          <p className="text-sm text-gray-600">{uploading ? "Yükleniyor…" : "Tıkla, birden fazla fotoğraf seç"}</p>
          <p className="text-xs text-gray-400">JPG / PNG / WEBP</p>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => uploadFiles(e.target.files)} />
        </div>

        <div className="mt-2 flex gap-2">
          <input
            className={input}
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
            placeholder="…veya görsel URL'si yapıştır"
          />
          <button onClick={addImage} type="button" className="flex h-10 shrink-0 items-center gap-1 rounded-lg bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800">
            <Plus className="h-4 w-4" /> Ekle
          </button>
        </div>
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {images.map((url, i) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-1 top-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">Kapak</span>}
                <button onClick={() => setImages((p) => p.filter((x) => x !== url))} type="button" className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        {images.length === 0 && (
          <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-sm text-gray-400">
            <ImagePlus className="h-5 w-5" /> Henüz görsel yok
          </div>
        )}
      </section>

      {/* Video & 360° */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">Video & Sanal Tur</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className={`${label} flex items-center gap-1.5`}><Video className="h-3.5 w-3.5" /> Video URL (YouTube/MP4)</label>
            <input className={input} value={f.videoUrl ?? ""} onChange={(e) => set("videoUrl", e.target.value)} placeholder="https://youtube.com/…" />
          </div>
          <div className="space-y-1">
            <label className={`${label} flex items-center gap-1.5`}><Box className="h-3.5 w-3.5" /> 360° Sanal Tur URL</label>
            <input className={input} value={f.virtualTourUrl ?? ""} onChange={(e) => set("virtualTourUrl", e.target.value)} placeholder="https://…/tur" />
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold">İletişim Bilgileri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={label}>Ad Soyad</label>
            <input className={input} value={f.ownerName ?? ""} onChange={(e) => set("ownerName", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={label}>Telefon</label>
            <input className={input} value={f.ownerPhone ?? ""} onChange={(e) => set("ownerPhone", e.target.value)} />
          </div>
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button onClick={() => router.back()} type="button" className="h-11 rounded-lg border px-5 text-sm font-medium hover:bg-gray-50">
          Vazgeç
        </button>
        <button onClick={submit} disabled={saving} className="flex h-11 items-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02] disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "edit" ? "Güncelle" : "İlanı Yayınla"}
        </button>
      </div>
    </div>
  );
}
