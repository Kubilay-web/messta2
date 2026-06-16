// Proje Yönetimi enum etiketleri + biçimlendirme (TR)

export const projectTypeLabel: Record<string, string> = {
  RESIDENTIAL: "Konut",
  COMMERCIAL: "Ticari",
  MIXED_USE: "Karma",
  INDUSTRIAL: "Sanayi",
  LAND: "Arsa",
};

export const projectStatusLabel: Record<string, string> = {
  PLANNING: "Planlama",
  PRESALE: "Ön Satış",
  UNDER_CONSTRUCTION: "İnşaat Halinde",
  COMPLETED: "Tamamlandı",
  DELIVERED: "Teslim Edildi",
  ON_HOLD: "Beklemede",
  CANCELLED: "İptal",
};

export const projectStatusColor: Record<string, string> = {
  PLANNING: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  PRESALE: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  UNDER_CONSTRUCTION: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  DELIVERED: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  ON_HOLD: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export const unitStatusLabel: Record<string, string> = {
  AVAILABLE: "Müsait",
  RESERVED: "Rezerve",
  SOLD: "Satıldı",
  BLOCKED: "Bloke",
  DELIVERED: "Teslim",
};

// Stok tablosu hücre renkleri
export const unitStatusColor: Record<string, string> = {
  AVAILABLE: "bg-emerald-500 hover:bg-emerald-600 text-white",
  RESERVED: "bg-amber-500 hover:bg-amber-600 text-white",
  SOLD: "bg-red-500 hover:bg-red-600 text-white",
  BLOCKED: "bg-slate-400 hover:bg-slate-500 text-white",
  DELIVERED: "bg-sky-500 hover:bg-sky-600 text-white",
};

export const unitStatusSoft: Record<string, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  RESERVED: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  SOLD: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  BLOCKED: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300",
  DELIVERED: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
};

export const saleStatusLabel: Record<string, string> = {
  RESERVATION: "Rezervasyon",
  CONTRACT: "Sözleşme",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
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

export const phaseStatusLabel: Record<string, string> = {
  NOT_STARTED: "Başlamadı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED: "Tamamlandı",
  DELAYED: "Gecikti",
  ON_HOLD: "Durduruldu",
};

export const expenseCategoryLabel: Record<string, string> = {
  LAND: "Arsa",
  CONSTRUCTION: "İnşaat",
  LABOR: "İşçilik",
  MATERIAL: "Malzeme",
  PERMIT: "Ruhsat",
  MARKETING: "Pazarlama",
  LEGAL: "Hukuk",
  FINANCE: "Finansman",
  OTHER: "Diğer",
};

export const taskStatusLabel: Record<string, string> = {
  TODO: "Yapılacak",
  IN_PROGRESS: "Devam Ediyor",
  DONE: "Tamamlandı",
  BLOCKED: "Bloke",
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

export const milestoneStatusLabel: Record<string, string> = {
  PENDING: "Bekliyor",
  REACHED: "Ulaşıldı",
  MISSED: "Kaçırıldı",
};

export const expenseStatusLabel: Record<string, string> = {
  PLANNED: "Planlandı",
  COMMITTED: "Taahhüt",
  PAID: "Ödendi",
};

export const paymentStatusLabel: Record<string, string> = {
  PENDING: "Bekliyor",
  PAID: "Ödendi",
  PARTIAL: "Kısmi",
  FAILED: "Başarısız",
  REFUNDED: "İade",
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

export function formatNumber(value?: number | null): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("tr-TR");
}

export function formatDate(date?: Date | string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(date?: Date | string | null): string {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
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

export function formatArea(value?: number | null): string {
  if (value === null || value === undefined) return "—";
  return `${value.toLocaleString("tr-TR")} m²`;
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

export function slugify(text: string): string {
  const map: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i" };
  return text
    .trim()
    .toLowerCase()
    .replace(/[çğıöşüİ]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
