// Lead skoru (0-100) — saf fonksiyon, hem server (yazarken) hem client (gösterirken) kullanılabilir.

export type ScorableLead = {
  temperature?: string | null;
  value?: number | null;
  budgetMax?: number | null;
  lastActivityAt?: Date | string | null;
  source?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  listingId?: string | null;
  clientId?: string | null;
};

export function computeLeadScore(lead: ScorableLead): number {
  let s = 0;

  // Sıcaklık (en belirleyici)
  if (lead.temperature === "HOT") s += 35;
  else if (lead.temperature === "WARM") s += 18;
  else s += 5;

  // Finansal bilgi mevcut
  if ((lead.value ?? 0) > 0 || (lead.budgetMax ?? 0) > 0) s += 15;

  // Aktivite tazeliği
  if (lead.lastActivityAt) {
    const days = (Date.now() - new Date(lead.lastActivityAt).getTime()) / 86400000;
    if (days <= 2) s += 25;
    else if (days <= 7) s += 15;
    else if (days <= 14) s += 8;
  }

  // Kaynak kalitesi
  if (lead.source === "REFERRAL" || lead.source === "PARTNER") s += 12;
  else if (lead.source === "WEBSITE" || lead.source === "PORTAL" || lead.source === "SOCIAL_MEDIA") s += 8;
  else s += 4;

  // İletişim eksiksizliği
  if (lead.contactPhone) s += 6;
  if (lead.contactEmail) s += 4;

  // Eşleşme / bağlantı
  if (lead.listingId) s += 4;
  if (lead.clientId) s += 4;

  return Math.max(0, Math.min(100, Math.round(s)));
}

export function scoreTier(score: number): { label: string; color: string } {
  if (score >= 70) return { label: "Sıcak", color: "#dc2626" };
  if (score >= 40) return { label: "Orta", color: "#d97706" };
  return { label: "Soğuk", color: "#2563eb" };
}
