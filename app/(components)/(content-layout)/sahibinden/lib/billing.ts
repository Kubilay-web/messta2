// Saf faturalama yardımcıları (sunucu + istemci güvenli — server-only YOK).

export type BillingInterval = "DAY" | "WEEK" | "MONTH" | "YEAR";

const MS_DAY = 86_400_000;

/** Bir tarihe interval × count ekler. */
export function addInterval(from: Date, interval: BillingInterval, count = 1): Date {
  const d = new Date(from);
  switch (interval) {
    case "DAY":
      d.setDate(d.getDate() + count);
      break;
    case "WEEK":
      d.setDate(d.getDate() + 7 * count);
      break;
    case "MONTH":
      d.setMonth(d.getMonth() + count);
      break;
    case "YEAR":
      d.setFullYear(d.getFullYear() + count);
      break;
  }
  return d;
}

/** Bir periyodun yaklaşık gün sayısı (oranlama / cron için). */
export function intervalDays(interval: BillingInterval, count = 1): number {
  switch (interval) {
    case "DAY":
      return count;
    case "WEEK":
      return 7 * count;
    case "MONTH":
      return 30 * count;
    case "YEAR":
      return 365 * count;
  }
}

const INTERVAL_TR: Record<BillingInterval, string> = {
  DAY: "gün",
  WEEK: "hafta",
  MONTH: "ay",
  YEAR: "yıl",
};

/** "haftalık" / "2 günde bir" gibi Türkçe etiket. */
export function intervalLabel(interval: BillingInterval, count = 1): string {
  const unit = INTERVAL_TR[interval];
  if (count === 1) {
    return { DAY: "günlük", WEEK: "haftalık", MONTH: "aylık", YEAR: "yıllık" }[interval];
  }
  return `${count} ${unit}da bir`;
}

/** "/hafta" gibi fiyat soneki. */
export function perIntervalSuffix(interval: BillingInterval, count = 1): string {
  return count === 1 ? `/${INTERVAL_TR[interval]}` : `/${count} ${INTERVAL_TR[interval]}`;
}

export const PROVIDER_LABEL: Record<string, string> = {
  stripe: "Kredi/Banka Kartı",
  paypal: "PayPal",
  wallet: "Cüzdan Bakiyesi",
};

/** Stripe recurring.interval eşlemesi (YEAR → year vb.). */
export function toStripeInterval(interval: BillingInterval): "day" | "week" | "month" | "year" {
  return interval.toLowerCase() as "day" | "week" | "month" | "year";
}

/** Kalan süreyi "3 gün 4 saat" gibi yazar. */
export function remainingLabel(until: Date | string | null | undefined): string {
  if (!until) return "";
  const ms = new Date(until).getTime() - Date.now();
  if (ms <= 0) return "süresi doldu";
  const days = Math.floor(ms / MS_DAY);
  const hours = Math.floor((ms % MS_DAY) / 3_600_000);
  if (days > 0) return `${days} gün ${hours} saat`;
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  return hours > 0 ? `${hours} saat ${mins} dk` : `${mins} dk`;
}
