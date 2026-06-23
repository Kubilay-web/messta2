"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createListing, updateListing } from "../actions";
import {
  CATEGORY_ATTRIBUTES,
  TR_CITIES,
  LISTING_TYPE_LABELS,
  type AttrField,
} from "../lib/categories";
import { DISTRICTS_BY_PROVINCE } from "../lib/tr-locations";
import type { EmlakFeatures } from "../lib/emlak-features";
import MapView from "./map-view";
import EmlakFeaturesPicker from "./emlak-features-picker";
import SortableImages from "./sortable-images";
import type { CategoryNode } from "../data";
import type { ListingFormInput } from "../lib/types";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function ListingForm({
  categories,
  defaultContact,
  userStore,
  storeAgents = [],
  initial,
}: {
  categories: CategoryNode[];
  defaultContact: { name: string; phone: string };
  userStore?: { id: string; name: string } | null;
  storeAgents?: { id: string; name: string }[];
  initial?: any;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  // kategori seçimi
  const initialChain = useMemo(() => findChain(categories, initial?.categoryId), [categories, initial]);
  const [topId, setTopId] = useState(initialChain[0]?.id ?? "");
  const [subId, setSubId] = useState(initialChain[1]?.id ?? "");
  const [leafId, setLeafId] = useState(initialChain[2]?.id ?? "");

  const top = categories.find((c) => c.id === topId);
  const subs = top?.children ?? [];
  const sub = subs.find((c) => c.id === subId);
  const leaves = sub?.children ?? [];

  const categoryId = leafId || subId || topId;
  const topSlug = top?.slug;
  const attrFields: AttrField[] = (topSlug && CATEGORY_ATTRIBUTES[topSlug]) || [];

  // form alanları
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [currency, setCurrency] = useState(initial?.currency ?? "TRY");
  const [type, setType] = useState(initial?.type ?? "SALE");
  const [city, setCity] = useState(initial?.city ?? "");
  const [district, setDistrict] = useState(initial?.district ?? "");
  const [neighborhood, setNeighborhood] = useState(initial?.neighborhood ?? "");
  const [lat, setLat] = useState<number | null>(initial?.latitude ?? null);
  const [lng, setLng] = useState<number | null>(initial?.longitude ?? null);
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [floorPlans, setFloorPlans] = useState<string[]>(initial?.floorPlans ?? []);
  const [videoUrl, setVideoUrl] = useState<string>(initial?.videoUrl ?? "");
  const [tourImageUrl, setTourImageUrl] = useState<string>(initial?.tourImageUrl ?? "");
  const [uploadingExtra, setUploadingExtra] = useState<"" | "floor" | "tour">("");
  const [attributes, setAttributes] = useState<Record<string, unknown>>(initial?.attributes ?? {});
  const [features, setFeatures] = useState<EmlakFeatures>(
    (initial?.attributes?.features as EmlakFeatures) ?? {},
  );
  const [contactName, setContactName] = useState(initial?.contactName ?? defaultContact.name);
  const [contactPhone, setContactPhone] = useState(initial?.contactPhone ?? defaultContact.phone);
  const [showPhone, setShowPhone] = useState(initial?.showPhone ?? true);
  const [isUrgent, setIsUrgent] = useState(initial?.isUrgent ?? false);
  const [storeId, setStoreId] = useState<string>(initial?.storeId ?? "");
  const [agentId, setAgentId] = useState<string>(initial?.agentId ?? "");
  const [isNegotiable, setIsNegotiable] = useState(initial?.isNegotiable ?? false);
  const [acceptsSwap, setAcceptsSwap] = useState(initial?.acceptsSwap ?? false);
  const [securePayment, setSecurePayment] = useState(initial?.securePayment ?? false);

  // Kısa dönem kiralama (günlük/haftalık rezervasyon)
  const [rentable, setRentable] = useState(initial?.rentable ?? false);
  const [dailyPrice, setDailyPrice] = useState(initial?.dailyPrice ? String(initial.dailyPrice) : "");
  const [weeklyPrice, setWeeklyPrice] = useState(initial?.weeklyPrice ? String(initial.weeklyPrice) : "");
  const [monthlyPrice, setMonthlyPrice] = useState(initial?.monthlyPrice ? String(initial.monthlyPrice) : "");
  const [cleaningFee, setCleaningFee] = useState(initial?.cleaningFee ? String(initial.cleaningFee) : "");
  const [rentDeposit, setRentDeposit] = useState(initial?.rentDeposit ? String(initial.rentDeposit) : "");
  const [minNights, setMinNights] = useState(initial?.minNights ? String(initial.minNights) : "");
  const [maxNights, setMaxNights] = useState(initial?.maxNights ? String(initial.maxNights) : "");
  const [maxGuests, setMaxGuests] = useState(initial?.maxGuests ? String(initial.maxGuests) : "");
  const [instantBook, setInstantBook] = useState(initial?.instantBook ?? false);

  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    if (!CLOUD || !PRESET) {
      setError("Cloudinary yapılandırması eksik. (NEXT_PUBLIC_CLOUDINARY_*)");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
          method: "POST",
          body: fd,
        });
        const json = await res.json();
        if (json.secure_url) uploaded.push(json.secure_url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch {
      setError("Görsel yüklenemedi.");
    } finally {
      setUploading(false);
    }
  }

  async function uploadCloud(files: FileList | null): Promise<string[]> {
    if (!files || !files.length || !CLOUD || !PRESET) return [];
    const out: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (json.secure_url) out.push(json.secure_url);
    }
    return out;
  }

  async function handleFloorPlans(files: FileList | null) {
    setUploadingExtra("floor");
    try {
      const urls = await uploadCloud(files);
      setFloorPlans((prev) => [...prev, ...urls]);
    } finally {
      setUploadingExtra("");
    }
  }

  async function handleTour(files: FileList | null) {
    setUploadingExtra("tour");
    try {
      const urls = await uploadCloud(files);
      if (urls[0]) setTourImageUrl(urls[0]);
    } finally {
      setUploadingExtra("");
    }
  }

  function setAttr(key: string, value: unknown) {
    setAttributes((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!categoryId) return setError("Lütfen kategori seçiniz.");
    if (!title.trim()) return setError("Başlık zorunludur.");
    if (!price || Number(price) < 0) return setError("Geçerli bir fiyat giriniz.");

    const payload: ListingFormInput = {
      id: initial?.id,
      title,
      description,
      price: Number(price),
      currency,
      type,
      categoryId,
      storeId: storeId || null,
      agentId: storeId && agentId ? agentId : null,
      city,
      district,
      neighborhood,
      latitude: lat,
      longitude: lng,
      images,
      floorPlans,
      videoUrl: videoUrl || null,
      tourImageUrl: tourImageUrl || null,
      attributes: topSlug === "emlak" ? { ...attributes, features } : attributes,
      contactName,
      contactPhone,
      showPhone,
      isUrgent,
      isNegotiable,
      acceptsSwap,
      securePayment,
      rentable,
      dailyPrice: dailyPrice ? Number(dailyPrice) : null,
      weeklyPrice: weeklyPrice ? Number(weeklyPrice) : null,
      monthlyPrice: monthlyPrice ? Number(monthlyPrice) : null,
      cleaningFee: cleaningFee ? Number(cleaningFee) : null,
      rentDeposit: rentDeposit ? Number(rentDeposit) : null,
      minNights: minNights ? Number(minNights) : null,
      maxNights: maxNights ? Number(maxNights) : null,
      maxGuests: maxGuests ? Number(maxGuests) : null,
      instantBook,
    };

    start(async () => {
      const res = initial?.id ? await updateListing(payload) : await createListing(payload);
      if (res.ok && res.data) router.push(`/sahibinden/ilan/${res.data.id}`);
      else setError(res.error ?? "Bir hata oluştu.");
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Kategori */}
      <Card title="Kategori Seçimi">
        <div className="grid gap-3 sm:grid-cols-3">
          <Select label="Ana Kategori" value={topId} onChange={(v) => { setTopId(v); setSubId(""); setLeafId(""); }}>
            <option value="">Seçiniz</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </Select>
          {subs.length > 0 && (
            <Select label="Alt Kategori" value={subId} onChange={(v) => { setSubId(v); setLeafId(""); }}>
              <option value="">Seçiniz</option>
              {subs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          )}
          {leaves.length > 0 && (
            <Select label="Tür" value={leafId} onChange={setLeafId}>
              <option value="">Seçiniz</option>
              {leaves.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          )}
        </div>
        {userStore && (
          <div className="mt-3 space-y-3">
            <Checkbox
              checked={storeId === userStore.id}
              onChange={(v) => { setStoreId(v ? userStore.id : ""); if (!v) setAgentId(""); }}
              label={`Bu ilanı "${userStore.name}" mağazamda yayınla`}
            />
            {storeId === userStore.id && storeAgents.length > 0 && (
              <Field label="Danışman ata (opsiyonel)">
                <select value={agentId} onChange={(e) => setAgentId(e.target.value)} className={inputCls}>
                  <option value="">Danışman seçilmedi</option>
                  {storeAgents.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        )}
      </Card>

      {/* Temel bilgiler */}
      <Card title="İlan Detayları">
        <Field label="İlan Başlığı">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Örn: Sahibinden temiz 2017 model otomobil"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Fiyat">
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={0} className={inputCls} />
          </Field>
          <Field label="Para Birimi">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputCls}>
              {["TRY", "USD", "EUR", "GBP"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="İlan Tipi">
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
              {Object.entries(LISTING_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Açıklama">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="İlanınızı detaylı anlatın..."
            className={`${inputCls} resize-y`}
          />
        </Field>
      </Card>

      {/* Özellikler */}
      {attrFields.length > 0 && (
        <Card title="Özellikler">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {attrFields.map((f) => (
              <Field key={f.key} label={f.unit ? `${f.label} (${f.unit})` : f.label}>
                {f.type === "select" && f.options ? (
                  <select
                    value={(attributes[f.key] as string) ?? ""}
                    onChange={(e) => setAttr(f.key, e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Seçiniz</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "boolean" ? (
                  <select
                    value={attributes[f.key] === true ? "true" : attributes[f.key] === false ? "false" : ""}
                    onChange={(e) => setAttr(f.key, e.target.value === "" ? undefined : e.target.value === "true")}
                    className={inputCls}
                  >
                    <option value="">Seçiniz</option>
                    <option value="true">Evet</option>
                    <option value="false">Hayır</option>
                  </select>
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    value={(attributes[f.key] as string) ?? ""}
                    onChange={(e) => setAttr(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                    className={inputCls}
                  />
                )}
              </Field>
            ))}
          </div>
        </Card>
      )}

      {/* Görseller */}
      <Card title="Fotoğraflar">
        <SortableImages
          images={images}
          onReorder={setImages}
          onRemove={(i) => setImages((prev) => prev.filter((_, idx) => idx !== i))}
        >
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-yellow-400">
            <span className="text-2xl">+</span>
            <span className="text-[10px]">{uploading ? "Yükleniyor..." : "Fotoğraf"}</span>
            <input type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </SortableImages>
        <p className="mt-2 text-xs text-gray-600">
          İlk fotoğraf vitrin görseli olur. Sürükleyerek sıralayabilirsiniz.
        </p>
      </Card>

      {/* Emlak medya: kat planı + video + 360° */}
      {topSlug === "emlak" && (
        <Card title="Emlak Medya (Kat Planı · Video · 360° Tur)">
          <Field label="Kat Planları">
            <div className="flex flex-wrap gap-3">
              {floorPlans.map((img, i) => (
                <div key={img} className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFloorPlans((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-yellow-400">
                <span className="text-2xl">+</span>
                <span className="text-[10px]">{uploadingExtra === "floor" ? "..." : "Kat Planı"}</span>
                <input type="file" accept="image/*" multiple hidden onChange={(e) => handleFloorPlans(e.target.files)} />
              </label>
            </div>
          </Field>

          <Field label="Video Tur (YouTube / Vimeo bağlantısı)">
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputCls}
            />
          </Field>

          <Field label="360° Sanal Tur (panorama görseli)">
            <div className="flex items-center gap-3">
              {tourImageUrl ? (
                <div className="relative h-20 w-36 overflow-hidden rounded-lg border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tourImageUrl} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setTourImageUrl("")}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex h-20 w-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-yellow-400">
                  <span className="text-xl">🌐</span>
                  <span className="text-[10px]">{uploadingExtra === "tour" ? "..." : "360° Görsel"}</span>
                  <input type="file" accept="image/*" hidden onChange={(e) => handleTour(e.target.files)} />
                </label>
              )}
              <p className="text-xs text-gray-600">Eşküçdörtgen (equirectangular) panorama görseli yükleyin.</p>
            </div>
          </Field>
        </Card>
      )}

      {/* Emlak detaylı özellik matrisi */}
      {topSlug === "emlak" && (
        <Card title="Özellikler (İç / Dış / Muhit / Ulaşım / Manzara)">
          <EmlakFeaturesPicker value={features} onChange={setFeatures} />
        </Card>
      )}

      {/* Konum + iletişim */}
      <Card title="Konum & İletişim">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Şehir">
            <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
              <option value="">Seçiniz</option>
              {TR_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="İlçe">
            {DISTRICTS_BY_PROVINCE[city] ? (
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className={inputCls}>
                <option value="">Seçiniz</option>
                {DISTRICTS_BY_PROVINCE[city].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            ) : (
              <input value={district} onChange={(e) => setDistrict(e.target.value)} className={inputCls} />
            )}
          </Field>
          <Field label="Mahalle">
            <input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Harita Konumu</span>
            <span className="text-xs text-gray-600">
              {lat && lng ? `📍 ${lat.toFixed(5)}, ${lng.toFixed(5)}` : "Haritaya tıklayarak konum seçin"}
            </span>
          </div>
          <MapView lat={lat} lng={lng} onPick={(la, ln) => { setLat(la); setLng(ln); }} height={260} />
          {lat && lng && (
            <button
              type="button"
              onClick={() => { setLat(null); setLng(null); }}
              className="mt-1 text-xs text-red-500 hover:underline"
            >
              Konumu temizle
            </button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="İletişim Adı">
            <input value={contactName} onChange={(e) => setContactName(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Telefon">
            <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="05XX XXX XX XX" className={inputCls} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <Checkbox checked={showPhone} onChange={setShowPhone} label="Telefon numaram ilanda görünsün" />
          <Checkbox checked={isUrgent} onChange={setIsUrgent} label="Acil olarak işaretle" />
          <Checkbox checked={isNegotiable} onChange={setIsNegotiable} label="Pazarlık payı var" />
          <Checkbox checked={acceptsSwap} onChange={setAcceptsSwap} label="Takasa açık" />
          <Checkbox checked={securePayment} onChange={setSecurePayment} label="Güvenli ödeme kabul ediyorum" />
        </div>
      </Card>

      <Card title="Kısa Dönem Kiralama (Günlük / Haftalık)">
        <Checkbox
          checked={rentable}
          onChange={setRentable}
          label="Bu ilanı günlük/haftalık rezervasyona aç"
        />
        {rentable && (
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Günlük Fiyat *">
                <input
                  type="number"
                  min={0}
                  value={dailyPrice}
                  onChange={(e) => setDailyPrice(e.target.value)}
                  placeholder="örn. 1500"
                  className={inputCls}
                />
              </Field>
              <Field label="Haftalık Fiyat">
                <input
                  type="number"
                  min={0}
                  value={weeklyPrice}
                  onChange={(e) => setWeeklyPrice(e.target.value)}
                  placeholder="indirimli olabilir"
                  className={inputCls}
                />
              </Field>
              <Field label="Aylık Fiyat">
                <input
                  type="number"
                  min={0}
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Temizlik Ücreti (tek seferlik)">
                <input
                  type="number"
                  min={0}
                  value={cleaningFee}
                  onChange={(e) => setCleaningFee(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Güvenlik Depozitosu (iade edilebilir)">
                <input
                  type="number"
                  min={0}
                  value={rentDeposit}
                  onChange={(e) => setRentDeposit(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="En Az Gece">
                <input
                  type="number"
                  min={1}
                  value={minNights}
                  onChange={(e) => setMinNights(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="En Çok Gece">
                <input
                  type="number"
                  min={1}
                  value={maxNights}
                  onChange={(e) => setMaxNights(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Maks. Misafir">
                <input
                  type="number"
                  min={1}
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
            <Checkbox
              checked={instantBook}
              onChange={setInstantBook}
              label="Anında rezervasyon (onaysız — ödeme sonrası otomatik onaylanır)"
            />
          </div>
        )}
      </Card>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Kaydediliyor..." : initial?.id ? "İlanı Güncelle" : "İlanı Yayınla"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-yellow-400";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 border-b border-gray-100 pb-2 text-base font-bold text-gray-800">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {children}
      </select>
    </Field>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-yellow-500" />
      {label}
    </label>
  );
}

// categoryId'den top/sub/leaf zincirini bul
function findChain(tree: CategoryNode[], categoryId?: string): CategoryNode[] {
  if (!categoryId) return [];
  for (const top of tree) {
    if (top.id === categoryId) return [top];
    for (const sub of top.children) {
      if (sub.id === categoryId) return [top, sub];
      for (const leaf of sub.children) {
        if (leaf.id === categoryId) return [top, sub, leaf];
      }
    }
  }
  return [];
}
