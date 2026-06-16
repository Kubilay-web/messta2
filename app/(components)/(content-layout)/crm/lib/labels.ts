// Enum etiketleri + biçimlendirme yardımcıları (TR)

export const leadSourceLabel: Record<string, string> = {
  WEBSITE: "Web Sitesi",
  PORTAL: "Emlak Portalı",
  PHONE: "Telefon",
  WALK_IN: "Ofise Gelen",
  REFERRAL: "Tavsiye",
  SOCIAL_MEDIA: "Sosyal Medya",
  ADVERTISEMENT: "Reklam",
  EMAIL_CAMPAIGN: "E-posta Kampanyası",
  PARTNER: "İş Ortağı",
  OTHER: "Diğer",
};

export const leadStatusLabel: Record<string, string> = {
  OPEN: "Açık",
  WON: "Kazanıldı",
  LOST: "Kaybedildi",
};

export const temperatureLabel: Record<string, string> = {
  HOT: "Sıcak",
  WARM: "Ilık",
  COLD: "Soğuk",
};

export const temperatureColor: Record<string, string> = {
  HOT: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  WARM: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  COLD: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
};

export const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık",
  RENT: "Kiralık",
  SHORT_RENT: "Kısa Dönem",
};

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

export const taskStatusLabel: Record<string, string> = {
  TODO: "Yapılacak",
  IN_PROGRESS: "Devam Ediyor",
  DONE: "Tamamlandı",
  CANCELLED: "İptal",
};

export const taskPriorityLabel: Record<string, string> = {
  LOW: "Düşük",
  MEDIUM: "Orta",
  HIGH: "Yüksek",
  URGENT: "Acil",
};

export const taskPriorityColor: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300",
  MEDIUM: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  HIGH: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  URGENT: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export const activityTypeLabel: Record<string, string> = {
  NOTE: "Not",
  CALL: "Telefon",
  EMAIL: "E-posta",
  WHATSAPP: "WhatsApp",
  MEETING: "Toplantı",
  VISIT: "Mülk Gezisi",
  SMS: "SMS",
  STAGE_CHANGE: "Aşama Değişimi",
  TASK: "Görev",
  WON: "Kazanıldı",
  LOST: "Kaybedildi",
  CREATED: "Oluşturuldu",
  FILE: "Dosya",
};

export function formatCurrency(value?: number | null, currency = "TRY"): string {
  if (value === null || value === undefined) return "—";
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString("tr-TR")} ${currency}`;
  }
}

export function formatCompact(value?: number | null, currency = "TRY"): string {
  if (value === null || value === undefined) return "—";
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}

export function formatDate(date?: Date | string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date?: Date | string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(date?: Date | string | null): string {
  if (!date) return "—";
  const d = new Date(date).getTime();
  const diff = Date.now() - d;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "az önce";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} gün önce`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon} ay önce`;
  return `${Math.floor(mon / 12)} yıl önce`;
}

export function initials(name?: string | null): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}
