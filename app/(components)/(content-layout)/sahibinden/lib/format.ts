// Sahibinden Pazar Yeri — ortak etiket + biçimlendirme yardımcıları (TR)

export const PROPERTY_TYPE_LABEL: Record<string, string> = {
  APARTMENT: "Daire",
  HOUSE: "Müstakil Ev",
  VILLA: "Villa",
  OFFICE: "Ofis",
  SHOP: "Dükkan / Mağaza",
  LAND: "Arsa",
  WAREHOUSE: "Depo / Antrepo",
  BUILDING: "Komple Bina",
};

export const LISTING_TYPE_LABEL: Record<string, string> = {
  SALE: "Satılık",
  RENT: "Kiralık",
  SHORT_RENT: "Günlük / Kısa Dönem",
};

export const LISTING_TYPE_BADGE: Record<string, string> = {
  SALE: "bg-emerald-600",
  RENT: "bg-sky-600",
  SHORT_RENT: "bg-violet-600",
};

export const HEATING_LABEL: Record<string, string> = {
  NATURAL_GAS: "Doğalgaz (Kombi)",
  CENTRAL: "Merkezi",
  CENTRAL_SHARE: "Merkezi (Pay Ölçer)",
  FLOOR_HEATING: "Yerden Isıtma",
  AC: "Klima",
  STOVE: "Soba",
  NONE: "Yok",
};

export const AMENITY_DEFS: { key: string; label: string }[] = [
  { key: "hasElevator", label: "Asansör" },
  { key: "hasParking", label: "Otopark" },
  { key: "isFurnished", label: "Eşyalı" },
  { key: "hasBalcony", label: "Balkon" },
  { key: "hasGarden", label: "Bahçe" },
  { key: "hasPool", label: "Havuz" },
];

// --- Gelişmiş emlak alanları için etiketler ---
export const FACING_LABEL: Record<string, string> = {
  NORTH: "Kuzey", SOUTH: "Güney", EAST: "Doğu", WEST: "Batı",
};
export const FACING_OPTIONS = Object.entries(FACING_LABEL).map(([value, label]) => ({ value, label }));

export const DEED_STATUS_LABEL: Record<string, string> = {
  KAT_MULKIYETI: "Kat Mülkiyetli",
  KAT_IRTIFAKI: "Kat İrtifaklı",
  HISSELI: "Hisseli Tapu",
  MUSTAKIL_TAPULU: "Müstakil Tapulu",
  ARSA_TAPULU: "Arsa Tapulu",
  KOOPERATIF: "Kooperatif Hisseli Tapu",
  YOK: "Bilinmiyor",
};
export const BUILD_STATUS_LABEL: Record<string, string> = {
  ZERO: "Sıfır",
  SECOND_HAND: "İkinci El",
  UNDER_CONSTRUCTION: "Yapım Aşamasında",
};
export const STRUCTURE_TYPE_LABEL: Record<string, string> = {
  BETONARME: "Betonarme",
  CELIK: "Çelik",
  AHSAP: "Ahşap",
  KAGIR: "Kagir / Yığma",
  PREFABRIK: "Prefabrik",
  CELIK_KARKAS: "Çelik Karkas",
};
export const USAGE_STATUS_LABEL: Record<string, string> = {
  EMPTY: "Boş",
  TENANT: "Kiracılı",
  OWNER: "Mülk Sahibi Oturuyor",
};
export const FURNISH_STATUS_LABEL: Record<string, string> = {
  FURNISHED: "Eşyalı",
  UNFURNISHED: "Eşyasız",
};
export const ZONING_STATUS_LABEL: Record<string, string> = {
  KONUT: "Konut İmarlı",
  TICARI: "Ticari İmarlı",
  KONUT_TICARI: "Konut + Ticari",
  SANAYI: "Sanayi İmarlı",
  TURIZM: "Turizm İmarlı",
  TARLA: "Tarla",
  BAG_BAHCE: "Bağ & Bahçe",
  ZEYTINLIK: "Zeytinlik",
  VILLA: "Villa İmarlı",
  TOPLU_KONUT: "Toplu Konut İmarlı",
  IMARSIZ: "İmarsız",
};
export const SUBTYPE_LABEL: Record<string, string> = {
  RESIDENCE: "Residence",
  MUSTAKIL: "Müstakil Ev",
  IKIZ: "İkiz Villa",
  TRIPLEX: "Triplex",
  DUBLEX: "Dublex",
  YAZLIK: "Yazlık",
  CIFTLIK_EVI: "Çiftlik Evi",
  KOSK: "Köşk / Konak",
  YALI: "Yalı / Yalı Dairesi",
  KOOP: "Kooperatif",
  PREFABRIK: "Prefabrik Ev",
  DEVREMULK: "Devremülk",
};

function labelFrom(map: Record<string, string>, v?: string | null) {
  return (v && map[v]) || v || null;
}
export const facingLabel = (v?: string | null) => labelFrom(FACING_LABEL, v);
export const deedStatusLabel = (v?: string | null) => labelFrom(DEED_STATUS_LABEL, v);
export const buildStatusLabel = (v?: string | null) => labelFrom(BUILD_STATUS_LABEL, v);
export const structureTypeLabel = (v?: string | null) => labelFrom(STRUCTURE_TYPE_LABEL, v);
export const usageStatusLabel = (v?: string | null) => labelFrom(USAGE_STATUS_LABEL, v);
export const zoningStatusLabel = (v?: string | null) => labelFrom(ZONING_STATUS_LABEL, v);
export const subTypeLabel = (v?: string | null) => labelFrom(SUBTYPE_LABEL, v);

const CURRENCY_SYMBOL: Record<string, string> = { TRY: "₺", USD: "$", EUR: "€", GBP: "£" };

export function currencySymbol(currency = "TRY") {
  return CURRENCY_SYMBOL[currency] ?? "₺";
}

export function formatPrice(value?: number | null, currency = "TRY") {
  if (value == null) return "Belirtilmemiş";
  return `${currencySymbol(currency)}${Number(value).toLocaleString("tr-TR")}`;
}

/** Listeleme tipine göre asıl gösterilecek fiyat (kiralıkta aylık kira). */
export function listingPrice(l: {
  listingType: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
}) {
  const cur = l.currency ?? "TRY";
  if ((l.listingType === "RENT" || l.listingType === "SHORT_RENT") && l.monthlyRent) {
    return `${formatPrice(l.monthlyRent, cur)}${l.listingType === "SHORT_RENT" ? " / gün" : " / ay"}`;
  }
  return formatPrice(l.askingPrice, cur);
}

export function locationText(p?: { neighborhood?: string | null; district?: string | null; city?: string | null } | null) {
  if (!p) return "";
  return [p.neighborhood, p.district, p.city].filter(Boolean).join(", ");
}

export function propertyTypeLabel(t?: string | null) {
  return (t && PROPERTY_TYPE_LABEL[t]) || t || "—";
}

export function listingTypeLabel(t?: string | null) {
  return (t && LISTING_TYPE_LABEL[t]) || t || "—";
}

/** "3 gün önce" gibi göreli zaman. */
export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return "az önce";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} dakika önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} gün önce`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo} ay önce`;
  return `${Math.floor(mo / 12)} yıl önce`;
}

export function formatDate(date?: Date | string | null) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}
