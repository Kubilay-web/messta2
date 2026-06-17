// Sahibinden — ilan şikayet nedenleri (sabit liste).
// NOT: "use server" dosyası yalnızca async fonksiyon export edebildiği için
// bu sabit liste ayrı (server-action olmayan) bir modülde tutulur.

export const REPORT_REASONS: { value: string; label: string }[] = [
  { value: "FRAUD", label: "Dolandırıcılık / şüpheli ilan" },
  { value: "WRONG_INFO", label: "Yanlış / yanıltıcı bilgi" },
  { value: "SOLD", label: "Satılmış / kiralanmış (hâlâ yayında)" },
  { value: "DUPLICATE", label: "Mükerrer ilan" },
  { value: "SPAM", label: "Spam / alakasız" },
  { value: "OFFENSIVE", label: "Uygunsuz içerik" },
  { value: "OTHER", label: "Diğer" },
];

export const REPORT_REASON_VALUES = new Set(REPORT_REASONS.map((r) => r.value));
