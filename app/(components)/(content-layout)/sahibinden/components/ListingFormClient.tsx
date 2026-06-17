"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Home, MapPin, Ruler, Phone, FileText, CheckCircle2, ImagePlus, ListChecks, Landmark, SlidersHorizontal,
} from "lucide-react";
import { createMyListing, updateMyListing, type MyListingInput } from "../actions/my-listings";
import { PROPERTY_TYPE_LABEL, LISTING_TYPE_LABEL, AMENITY_DEFS } from "../lib/format";
import {
  FACING_OPTIONS, DEED_STATUS_LABEL, BUILD_STATUS_LABEL, STRUCTURE_TYPE_LABEL,
  USAGE_STATUS_LABEL, FURNISH_STATUS_LABEL, ZONING_STATUS_LABEL, SUBTYPE_LABEL,
} from "../lib/format";
import { ROOM_OPTIONS, HEATING_OPTIONS } from "../lib/categories";
import { FEATURE_GROUPS } from "../lib/features";
import { TR_CITY_NAMES, districtsOf } from "../lib/locations";
import ImageUploader from "./ImageUploader";

type Initial = Partial<MyListingInput> & { images?: string[] };

const label = "block text-xs font-semibold text-slate-600 mb-1";
const inp =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

const LAND_TYPES = ["LAND", "BUILDING"]; // arsa/bina ek alanları gösterilecek tipler

function Section({ title, icon: Icon, children, hint }: { title: string; icon: any; children: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-800">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-600"><Icon className="h-4 w-4" /></span>
        {title}
      </h3>
      {hint && <p className="mb-4 ml-9 text-xs text-slate-400">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function ListingFormClient({
  mode,
  listingId,
  initial = {},
}: {
  mode: "create" | "edit";
  listingId?: string;
  initial?: Initial;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(initial.images ?? []);

  const [propertyType, setPropertyType] = useState(initial.propertyType ?? "APARTMENT");
  const [city, setCity] = useState(initial.city ?? "");
  const [facing, setFacing] = useState<string[]>(initial.facing ?? []);
  const [features, setFeatures] = useState<string[]>(initial.features ?? []);
  const [flags, setFlags] = useState<Record<string, boolean>>({
    inSite: !!initial.inSite,
    creditEligible: !!initial.creditEligible,
    swappable: !!initial.swappable,
    accessible: !!initial.accessible,
    isNegotiable: initial.isNegotiable ?? true,
  });
  const [amen, setAmen] = useState<Record<string, boolean>>({
    hasElevator: !!initial.hasElevator,
    hasParking: !!initial.hasParking,
    isFurnished: !!initial.isFurnished,
    hasBalcony: !!initial.hasBalcony,
    hasGarden: !!initial.hasGarden,
    hasPool: !!initial.hasPool,
  });

  const toggleFlag = (k: string) => setFlags((s) => ({ ...s, [k]: !s[k] }));
  const toggleArr = (set: (fn: (s: string[]) => string[]) => void, v: string) =>
    set((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const isLand = LAND_TYPES.includes(propertyType);
  const districts = districtsOf(city);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const num = (k: string) => (fd.get(k) ? Number(fd.get(k)) : null);
    const str = (k: string) => String(fd.get(k) || "") || undefined;

    const payload: MyListingInput = {
      title: String(fd.get("title") || ""),
      description: str("description"),
      listingType: String(fd.get("listingType") || "SALE"),
      propertyType,
      askingPrice: Number(fd.get("askingPrice") || 0),
      monthlyRent: num("monthlyRent"),
      deposit: num("deposit"),
      dues: num("dues"),
      currency: String(fd.get("currency") || "TRY"),
      isNegotiable: flags.isNegotiable,
      city,
      district: String(fd.get("district") || ""),
      neighborhood: str("neighborhood"),
      address: String(fd.get("address") || ""),
      roomCount: str("roomCount"),
      bathroomCount: num("bathroomCount"),
      grossArea: num("grossArea"),
      netArea: num("netArea"),
      floorNo: num("floorNo"),
      totalFloors: num("totalFloors"),
      buildingAge: num("buildingAge"),
      heatingType: str("heatingType"),
      ...amen,
      // gelişmiş detaylar
      subType: str("subType"),
      facing,
      deedStatus: str("deedStatus"),
      buildStatus: str("buildStatus"),
      structureType: str("structureType"),
      usageStatus: str("usageStatus"),
      furnishStatus: str("furnishStatus"),
      siteName: str("siteName"),
      inSite: flags.inSite,
      creditEligible: flags.creditEligible,
      swappable: flags.swappable,
      accessible: flags.accessible,
      features,
      // arsa
      zoningStatus: str("zoningStatus"),
      blockNo: str("blockNo"),
      parcelNo: str("parcelNo"),
      kaks: str("kaks"),
      gabari: str("gabari"),
      facadeCount: num("facadeCount"),
      // medya & iletişim
      images,
      videoUrl: str("videoUrl"),
      virtualTourUrl: str("virtualTourUrl"),
      ownerName: str("ownerName"),
      ownerPhone: str("ownerPhone"),
    };

    setBusy(true);
    setErr(null);
    const res = mode === "create" ? await createMyListing(payload) : await updateMyListing(listingId!, payload);
    setBusy(false);
    if ((res as any)?.error) {
      setErr((res as any).error);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/sahibinden/hesabim");
    router.refresh();
  };

  const p = initial;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {err && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">{err}</div>
      )}
      {mode === "create" && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          Bireysel ilanlar yayınlanmadan önce moderasyon onayından geçer. Onaylanınca vitrinde görünür.
        </div>
      )}

      <Section title="İlan Bilgileri" icon={FileText}>
        <div className="space-y-3">
          <div>
            <label className={label}>İlan Başlığı *</label>
            <input name="title" required defaultValue={p.title} placeholder="Örn: Deniz manzaralı 3+1 satılık daire" className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <label className={label}>İlan Tipi *</label>
              <select name="listingType" defaultValue={p.listingType ?? "SALE"} className={inp}>
                {Object.entries(LISTING_TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Emlak Tipi *</label>
              <select name="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={inp}>
                {Object.entries(PROPERTY_TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Alt Tip</label>
              <select name="subType" defaultValue={p.subType ?? ""} className={inp}>
                <option value="">—</option>
                {Object.entries(SUBTYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <label className={label}>Para Birimi</label>
              <select name="currency" defaultValue={p.currency ?? "TRY"} className={inp}>
                <option value="TRY">₺ TL</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className={label}>Açıklama</label>
            <textarea name="description" rows={4} defaultValue={p.description} placeholder="İlan detaylarını yazın…" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
          </div>
        </div>
      </Section>

      <Section title="Fiyat" icon={Home}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className={label}>Fiyat *</label>
            <input name="askingPrice" type="number" required defaultValue={p.askingPrice} placeholder="0" className={inp} />
          </div>
          <div>
            <label className={label}>Aylık Kira (kiralık)</label>
            <input name="monthlyRent" type="number" defaultValue={p.monthlyRent ?? ""} placeholder="0" className={inp} />
          </div>
          <div>
            <label className={label}>Depozito</label>
            <input name="deposit" type="number" defaultValue={p.deposit ?? ""} placeholder="0" className={inp} />
          </div>
          <div>
            <label className={label}>Aidat (₺/ay)</label>
            <input name="dues" type="number" defaultValue={p.dues ?? ""} placeholder="0" className={inp} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={flags.isNegotiable} onClick={() => toggleFlag("isNegotiable")}>Pazarlık payı var</Chip>
          <Chip active={flags.creditEligible} onClick={() => toggleFlag("creditEligible")}>Krediye uygun</Chip>
          <Chip active={flags.swappable} onClick={() => toggleFlag("swappable")}>Takaslı</Chip>
        </div>
      </Section>

      <Section title="Konum" icon={MapPin}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <label className={label}>İl *</label>
            <select name="city" required value={city} onChange={(e) => setCity(e.target.value)} className={inp}>
              <option value="">Seçiniz</option>
              {TR_CITY_NAMES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>İlçe *</label>
            {districts.length ? (
              <select name="district" required defaultValue={p.district} key={city} className={inp}>
                <option value="">Seçiniz</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            ) : (
              <input name="district" required defaultValue={p.district} placeholder="İlçe" className={inp} />
            )}
          </div>
          <div><label className={label}>Mahalle</label><input name="neighborhood" defaultValue={p.neighborhood} className={inp} /></div>
        </div>
        <div className="mt-3">
          <label className={label}>Açık Adres *</label>
          <input name="address" required defaultValue={p.address} placeholder="Sokak, no, bina vb." className={inp} />
        </div>
      </Section>

      <Section title="Temel Özellikler" icon={Ruler}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className={label}>Oda Sayısı</label>
            <select name="roomCount" defaultValue={p.roomCount ?? ""} className={inp}>
              <option value="">—</option>
              {ROOM_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div><label className={label}>Brüt m²</label><input name="grossArea" type="number" defaultValue={p.grossArea ?? ""} className={inp} /></div>
          <div><label className={label}>Net m²</label><input name="netArea" type="number" defaultValue={p.netArea ?? ""} className={inp} /></div>
          <div><label className={label}>Banyo</label><input name="bathroomCount" type="number" defaultValue={p.bathroomCount ?? ""} className={inp} /></div>
          <div><label className={label}>Bulunduğu Kat</label><input name="floorNo" type="number" defaultValue={p.floorNo ?? ""} className={inp} /></div>
          <div><label className={label}>Toplam Kat</label><input name="totalFloors" type="number" defaultValue={p.totalFloors ?? ""} className={inp} /></div>
          <div><label className={label}>Bina Yaşı</label><input name="buildingAge" type="number" defaultValue={p.buildingAge ?? ""} className={inp} /></div>
          <div>
            <label className={label}>Isıtma</label>
            <select name="heatingType" defaultValue={p.heatingType ?? ""} className={inp}>
              <option value="">—</option>
              {HEATING_OPTIONS.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {AMENITY_DEFS.map((a) => (
            <Chip key={a.key} active={!!amen[a.key]} onClick={() => setAmen((s) => ({ ...s, [a.key]: !s[a.key] }))}>{a.label}</Chip>
          ))}
        </div>
      </Section>

      <Section title="Tapu & Yapı Detayları" icon={SlidersHorizontal} hint="Sahibinden tarzı detaylı bilgiler ilan kalitenizi artırır.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <label className={label}>Tapu Durumu</label>
            <select name="deedStatus" defaultValue={p.deedStatus ?? ""} className={inp}>
              <option value="">—</option>
              {Object.entries(DEED_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Yapı Durumu</label>
            <select name="buildStatus" defaultValue={p.buildStatus ?? ""} className={inp}>
              <option value="">—</option>
              {Object.entries(BUILD_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Yapı Tipi</label>
            <select name="structureType" defaultValue={p.structureType ?? ""} className={inp}>
              <option value="">—</option>
              {Object.entries(STRUCTURE_TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Kullanım Durumu</label>
            <select name="usageStatus" defaultValue={p.usageStatus ?? ""} className={inp}>
              <option value="">—</option>
              {Object.entries(USAGE_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Eşya Durumu</label>
            <select name="furnishStatus" defaultValue={p.furnishStatus ?? ""} className={inp}>
              <option value="">—</option>
              {Object.entries(FURNISH_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div><label className={label}>Site Adı</label><input name="siteName" defaultValue={p.siteName} className={inp} /></div>
        </div>
        <div className="mt-3">
          <label className={label}>Cephe / Yön</label>
          <div className="flex flex-wrap gap-2">
            {FACING_OPTIONS.map((f) => (
              <Chip key={f.value} active={facing.includes(f.value)} onClick={() => toggleArr(setFacing, f.value)}>{f.label}</Chip>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={flags.inSite} onClick={() => toggleFlag("inSite")}>Site içerisinde</Chip>
          <Chip active={flags.accessible} onClick={() => toggleFlag("accessible")}>Engelliye uygun</Chip>
        </div>
      </Section>

      {isLand && (
        <Section title="Arsa / İmar Bilgileri" icon={Landmark}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <label className={label}>İmar Durumu</label>
              <select name="zoningStatus" defaultValue={p.zoningStatus ?? ""} className={inp}>
                <option value="">—</option>
                {Object.entries(ZONING_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div><label className={label}>Ada No</label><input name="blockNo" defaultValue={p.blockNo} className={inp} /></div>
            <div><label className={label}>Parsel No</label><input name="parcelNo" defaultValue={p.parcelNo} className={inp} /></div>
            <div><label className={label}>KAKS / Emsal</label><input name="kaks" defaultValue={p.kaks} className={inp} /></div>
            <div><label className={label}>Gabari</label><input name="gabari" defaultValue={p.gabari} className={inp} /></div>
            <div><label className={label}>Cephe Sayısı</label><input name="facadeCount" type="number" defaultValue={p.facadeCount ?? ""} className={inp} /></div>
          </div>
        </Section>
      )}

      <Section title="Özellikler & İmkanlar" icon={ListChecks} hint="İç/dış özellikler, muhit, ulaşım ve manzarayı işaretleyin.">
        <div className="space-y-4">
          {FEATURE_GROUPS.map((g) => (
            <div key={g.key}>
              <p className="mb-1.5 text-xs font-bold text-slate-500">{g.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <Chip key={it.key} active={features.includes(it.key)} onClick={() => toggleArr(setFeatures, it.key)}>{it.label}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Görseller & Medya" icon={ImagePlus}>
        <ImageUploader value={images} onChange={setImages} />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div><label className={label}>Tanıtım Videosu (URL)</label><input name="videoUrl" defaultValue={p.videoUrl} placeholder="YouTube/MP4 linki" className={inp} /></div>
          <div><label className={label}>360° Sanal Tur (URL)</label><input name="virtualTourUrl" defaultValue={p.virtualTourUrl} className={inp} /></div>
        </div>
      </Section>

      <Section title="İletişim Bilgileri" icon={Phone}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div><label className={label}>Ad Soyad</label><input name="ownerName" defaultValue={p.ownerName} className={inp} /></div>
          <div><label className={label}>Telefon</label><input name="ownerPhone" defaultValue={p.ownerPhone} className={inp} /></div>
        </div>
      </Section>

      <div className="sticky bottom-3 z-10">
        <button
          type="submit"
          disabled={busy}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-base font-bold text-white shadow-xl shadow-amber-500/30 transition hover:opacity-95 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
          {busy ? "Kaydediliyor…" : mode === "create" ? "İlanı Yayınla" : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </form>
  );
}
