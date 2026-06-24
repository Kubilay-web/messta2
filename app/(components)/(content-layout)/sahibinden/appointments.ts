import prisma from "@/app/lib/prisma";

// Randevu müsaitliği + Calendly tarzı boş slot üretimi.
// Zaman dilimi ev sahibinin ShAvailability.timezone değerinden alınır (DST dahil
// Intl ile doğru hesaplanır). Varsayılan Europe/Istanbul (UTC+3).

const DAY_MS = 86_400_000;

/** Verilen anda bir IANA zaman diliminin UTC'ye göre ofseti (ms). DST'yi dikkate alır. */
function tzOffsetMs(timeZone: string, date: Date): number {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const map: Record<string, number> = {};
    for (const p of dtf.formatToParts(date)) {
      if (p.type !== "literal") map[p.type] = Number(p.value);
    }
    const asUTC = Date.UTC(map.year, map.month - 1, map.day, map.hour === 24 ? 0 : map.hour, map.minute, map.second);
    return asUTC - date.getTime();
  } catch {
    return 3 * 3_600_000; // geçersiz tz → UTC+3
  }
}

/** Bir zaman dilimindeki duvar-saatini (y,mo,da,hh,mm) UTC instant'a çevirir. */
function zonedToUtc(timeZone: string, y: number, mo: number, da: number, hh: number, mm: number): number {
  const guess = Date.UTC(y, mo, da, hh, mm);
  const off = tzOffsetMs(timeZone, new Date(guess));
  return guess - off;
}
const DOW_TR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const MONTH_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export interface AvailabilityRule {
  day: number; // 0=Pazar ... 6=Cumartesi
  start: string; // "10:00"
  end: string; // "18:00"
}

export interface DaySlots {
  date: string; // "YYYY-MM-DD" (İstanbul)
  label: string; // "24 Haziran Salı"
  slots: { time: string; iso: string }[];
}

export interface SlotsResult {
  configured: boolean;
  slotMinutes: number;
  days: DaySlots[];
}

function hhmmToMin(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec((s ?? "").trim());
  if (!m) return null;
  const h = Number(m[1]);
  const mm = Number(m[2]);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export async function getAvailability(userId: string) {
  return prisma.shAvailability.findUnique({ where: { userId } });
}

/** Bir anın, verilen zaman dilimindeki gün başlangıcı ve bitişinin UTC karşılığı. */
export function localDayBoundsUtc(timeZone: string, date: Date): { start: Date; end: Date } {
  const off = tzOffsetMs(timeZone, date);
  const local = new Date(date.getTime() + off);
  const startUtc = zonedToUtc(timeZone, local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 0, 0);
  return { start: new Date(startUtc), end: new Date(startUtc + DAY_MS) };
}

/** İlan sahibinin tanımladığı kurallara göre önümüzdeki günlerin boş randevu slotları. */
export async function getAvailableSlots(ownerId: string, maxDays?: number): Promise<SlotsResult> {
  const av = await prisma.shAvailability.findUnique({ where: { userId: ownerId } });
  const rules: AvailabilityRule[] = Array.isArray(av?.rules) ? (av!.rules as any) : [];
  const slotMinutes = av?.slotMinutes ?? 30;
  if (!av || rules.length === 0) return { configured: false, slotMinutes, days: [] };

  const tz = av.timezone || "Europe/Istanbul";
  const blocked = new Set<string>(Array.isArray(av.blockedDates) ? (av.blockedDates as any) : []);
  const leadMs = (av.leadHours ?? 2) * 3_600_000;
  const horizon = Math.min(maxDays ?? av.maxDaysAhead ?? 30, av.maxDaysAhead ?? 30, 60);
  const maxPerDay = av.maxPerDay ?? 0; // 0 = sınırsız
  const now = Date.now();

  // Çakışma + günlük kota için ilan sahibinin mevcut (bekleyen/onaylı) randevuları.
  const existing = await prisma.shViewingAppointment.findMany({
    where: {
      ownerId,
      status: { in: ["PENDING", "CONFIRMED"] },
      scheduledAt: { gte: new Date(now - DAY_MS) },
    },
    select: { scheduledAt: true, durationMin: true },
  });
  const busy = existing.map((e) => {
    const s = e.scheduledAt.getTime();
    return [s, s + (e.durationMin ?? 30) * 60_000] as const;
  });
  // Gün bazında mevcut randevu sayısı (kota için) — ev sahibinin yerel tarihine göre.
  const perDayCount = new Map<string, number>();
  for (const e of existing) {
    const off = tzOffsetMs(tz, e.scheduledAt);
    const local = new Date(e.scheduledAt.getTime() + off);
    const key = `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}`;
    perDayCount.set(key, (perDayCount.get(key) ?? 0) + 1);
  }

  // Ev sahibinin zaman dilimine göre "bugün" gece yarısının UTC karşılığı.
  const offNow = tzOffsetMs(tz, new Date(now));
  const localNow = new Date(now + offNow);
  let baseMidnightUtc = zonedToUtc(tz, localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate(), 0, 0);

  const days: DaySlots[] = [];
  for (let d = 0; d <= horizon; d++) {
    // Her gün için duvar-saati tarihini tz'den yeniden türet (DST kaymalarına dayanıklı).
    const localDay = new Date(baseMidnightUtc + d * DAY_MS + offNow);
    const y = localDay.getUTCFullYear();
    const mo = localDay.getUTCMonth();
    const da = localDay.getUTCDate();
    const dow = localDay.getUTCDay();
    const dateStr = `${y}-${pad(mo + 1)}-${pad(da)}`;
    if (blocked.has(dateStr)) continue;
    // Günlük kota dolduysa bu günü atla.
    if (maxPerDay > 0 && (perDayCount.get(dateStr) ?? 0) >= maxPerDay) continue;
    const dayRules = rules.filter((r) => Number(r.day) === dow);
    if (dayRules.length === 0) continue;

    const remainingQuota = maxPerDay > 0 ? maxPerDay - (perDayCount.get(dateStr) ?? 0) : Infinity;
    const slots: { time: string; iso: string }[] = [];
    for (const r of dayRules) {
      const startMin = hhmmToMin(r.start);
      const endMin = hhmmToMin(r.end);
      if (startMin == null || endMin == null || endMin <= startMin) continue;
      for (let t = startMin; t + slotMinutes <= endMin; t += slotMinutes) {
        if (slots.length >= remainingQuota) break;
        const hh = Math.floor(t / 60);
        const mm = t % 60;
        const slotUtc = zonedToUtc(tz, y, mo, da, hh, mm);
        if (slotUtc < now + leadMs) continue;
        const slotEnd = slotUtc + slotMinutes * 60_000;
        if (busy.some(([bs, be]) => slotUtc < be && bs < slotEnd)) continue;
        slots.push({ time: `${pad(hh)}:${pad(mm)}`, iso: new Date(slotUtc).toISOString() });
      }
    }
    if (slots.length > 0) {
      days.push({ date: dateStr, label: `${da} ${MONTH_TR[mo]} ${DOW_TR[dow]}`, slots });
    }
  }

  return { configured: true, slotMinutes, days };
}
