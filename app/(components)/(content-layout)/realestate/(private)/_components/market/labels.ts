// Pazar yeri ortak etiket + format yardımcıları

export const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire",
  HOUSE: "Müstakil Ev",
  VILLA: "Villa",
  OFFICE: "Ofis",
  SHOP: "Dükkan",
  LAND: "Arsa",
  WAREHOUSE: "Depo",
  BUILDING: "Bina",
};

export const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık",
  RENT: "Kiralık",
  SHORT_RENT: "Kısa Dönem",
};

export const listingTypeBadge: Record<string, string> = {
  SALE: "bg-emerald-600",
  RENT: "bg-blue-600",
  SHORT_RENT: "bg-violet-600",
};

export function formatPrice(value?: number | null, currency = "TRY") {
  if (value == null) return "Belirtilmemiş";
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";
  return `${sym}${Number(value).toLocaleString("tr-TR")}`;
}

export function listingPrice(l: {
  listingType: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
}) {
  const cur = l.currency ?? "TRY";
  if ((l.listingType === "RENT" || l.listingType === "SHORT_RENT") && l.monthlyRent) {
    return `${formatPrice(l.monthlyRent, cur)} / ay`;
  }
  return formatPrice(l.askingPrice, cur);
}

export function locationText(p?: { district?: string | null; city?: string | null } | null) {
  if (!p) return "";
  return [p.district, p.city].filter(Boolean).join(", ");
}
