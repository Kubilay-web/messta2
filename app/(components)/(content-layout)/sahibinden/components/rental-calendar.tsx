"use client";

import { useEffect, useMemo, useState } from "react";

interface Range {
  start: string; // YYYY-MM-DD (dahil)
  end: string; // YYYY-MM-DD (çıkış — dahil değil)
}

const DAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parse(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Etkileşimli kiralama takvimi: dolu/kapalı günleri pasif gösterir, tıklayarak
 * giriş–çıkış aralığı seçtirir. Aralık seçilen dolu güne taşarsa engellenir.
 */
export default function RentalCalendar({
  listingId,
  start,
  end,
  onChange,
}: {
  listingId: string;
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}) {
  const [ranges, setRanges] = useState<Range[]>([]);
  const [cursor, setCursor] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });

  useEffect(() => {
    let alive = true;
    fetch(`/sahibinden/api/rental/availability?listingId=${listingId}`)
      .then((r) => r.json())
      .then((d) => {
        if (alive && Array.isArray(d.ranges)) setRanges(d.ranges);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [listingId]);

  // Hızlı dolu-gün kontrolü için günleri set'e aç (end hariç).
  const blockedSet = useMemo(() => {
    const s = new Set<string>();
    for (const r of ranges) {
      const a = parse(r.start);
      const b = parse(r.end);
      for (let d = new Date(a); d < b; d.setDate(d.getDate() + 1)) s.add(ymd(d));
    }
    return s;
  }, [ranges]);

  const today = useMemo(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);

  function rangeHasBlocked(a: string, b: string) {
    const da = parse(a);
    const db = parse(b);
    for (let d = new Date(da); d < db; d.setDate(d.getDate() + 1)) {
      if (blockedSet.has(ymd(d)) && ymd(d) !== a) return true; // giriş günü çıkış olabilir
    }
    return false;
  }

  function clickDay(s: string) {
    // Yeni seçim başlat veya bitir.
    if (!start || (start && end)) {
      onChange(s, "");
      return;
    }
    if (s <= start) {
      onChange(s, "");
      return;
    }
    if (rangeHasBlocked(start, s)) {
      // Aralıkta dolu gün var → yeni başlangıç olarak ata.
      onChange(s, "");
      return;
    }
    onChange(start, s);
  }

  function buildMonth(base: Date) {
    const year = base.getFullYear();
    const month = base.getMonth();
    const first = new Date(year, month, 1);
    const startDow = (first.getDay() + 6) % 7; // Pazartesi=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }

  function renderMonth(base: Date) {
    const cells = buildMonth(base);
    return (
      <div className="flex-1">
        <p className="mb-2 text-center text-sm font-semibold text-gray-700">
          {MONTHS[base.getMonth()]} {base.getFullYear()}
        </p>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-black">
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-0.5">
          {cells.map((d, i) => {
            if (!d) return <span key={i} />;
            const s = ymd(d);
            const past = d < today;
            const blocked = blockedSet.has(s);
            const disabled = past || blocked;
            const isStart = s === start;
            const isEnd = s === end;
            const inRange = start && end && s > start && s < end;
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => clickDay(s)}
                className={[
                  "aspect-square rounded text-xs transition",
                  disabled ? "cursor-not-allowed text-gray-300 line-through" : "hover:bg-yellow-100",
                  isStart || isEnd ? "bg-yellow-400 font-bold text-gray-900" : "",
                  inRange ? "bg-yellow-100 text-gray-800" : "",
                ].join(" ")}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const nextMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);

  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="mb-1 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          disabled={cursor <= new Date(today.getFullYear(), today.getMonth(), 1)}
          className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
        >
          ‹
        </button>
        <span className="text-[11px] text-black">Giriş–çıkış seçin</span>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
        >
          ›
        </button>
      </div>
      <div className="flex gap-4">
        {renderMonth(cursor)}
        <div className="hidden sm:block">{renderMonth(nextMonth)}</div>
      </div>
    </div>
  );
}
