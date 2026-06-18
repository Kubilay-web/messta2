// Biçimlendirme yardımcıları

const CURRENCY_SYMBOL: Record<string, string> = {
  TRY: "TL",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function formatPrice(price: number, currency = "TRY"): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? currency;
  const formatted = new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
  }).format(price ?? 0);
  return currency === "TRY" ? `${formatted} ${symbol}` : `${symbol}${formatted}`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "yıl"],
    [2592000, "ay"],
    [86400, "gün"],
    [3600, "saat"],
    [60, "dakika"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label} önce`;
  }
  return "az önce";
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return text
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function genListingNo(): number {
  // 9 haneli ilan numarası
  return Math.floor(100000000 + Math.random() * 899999999);
}
