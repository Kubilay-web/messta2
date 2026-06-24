"use client";

import { useMemo, useState } from "react";

export interface CalAppt {
  id: string;
  date: string; // ISO
  title: string;
  mode: "FACE_TO_FACE" | "VIDEO";
  status: string;
  role: "owner" | "requester";
  otherName: string;
}

const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-yellow-400",
  CONFIRMED: "bg-green-500",
  REJECTED: "bg-red-400",
  CANCELLED: "bg-gray-300",
  COMPLETED: "bg-blue-400",
};

function dayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AppointmentCalendar({ appts }: { appts: CalAppt[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<string | null>(dayKey(today));

  const byDay = useMemo(() => {
    const map = new Map<string, CalAppt[]>();
    for (const a of appts) {
      const k = dayKey(new Date(a.date));
      const arr = map.get(k) ?? [];
      arr.push(a);
      map.set(k, arr);
    }
    return map;
  }, [appts]);

  const firstDay = new Date(cursor.y, cursor.m, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Pazartesi = 0
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const todayKey = dayKey(today);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.y, cursor.m, d));

  function move(delta: number) {
    const m = cursor.m + delta;
    setCursor({ y: cursor.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 });
  }

  const selectedAppts = selected ? byDay.get(selected) ?? [] : [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {/* Başlık */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-gray-800">
          {MONTHS[cursor.m]} {cursor.y}
        </h2>
        <div className="flex items-center gap-1">
          <button onClick={() => move(-1)} className="rounded-lg px-2.5 py-1 text-gray-500 hover:bg-gray-100" aria-label="Önceki ay">
            ‹
          </button>
          <button
            onClick={() => {
              setCursor({ y: today.getFullYear(), m: today.getMonth() });
              setSelected(todayKey);
            }}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
          >
            Bugün
          </button>
          <button onClick={() => move(1)} className="rounded-lg px-2.5 py-1 text-gray-500 hover:bg-gray-100" aria-label="Sonraki ay">
            ›
          </button>
        </div>
      </div>

      {/* Hafta günleri */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-black">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Günler */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />;
          const k = dayKey(d);
          const dayAppts = byDay.get(k) ?? [];
          const isToday = k === todayKey;
          const isSelected = k === selected;
          return (
            <button
              key={k}
              onClick={() => setSelected(k)}
              className={`flex aspect-square flex-col items-center justify-start rounded-lg border p-1 text-xs transition ${
                isSelected
                  ? "border-yellow-400 bg-yellow-50"
                  : isToday
                    ? "border-indigo-300 bg-indigo-50/40"
                    : "border-transparent hover:bg-gray-50"
              }`}
            >
              <span className={`font-semibold ${isToday ? "text-indigo-600" : "text-gray-700"}`}>
                {d.getDate()}
              </span>
              {dayAppts.length > 0 && (
                <span className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                  {dayAppts.slice(0, 3).map((a) => (
                    <span key={a.id} className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status] ?? "bg-gray-400"}`} />
                  ))}
                  {dayAppts.length > 3 && <span className="text-[8px] text-black">+{dayAppts.length - 3}</span>}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seçili gün listesi */}
      <div className="mt-3 border-t border-gray-100 pt-3">
        {selectedAppts.length === 0 ? (
          <p className="py-2 text-center text-sm text-black">Bu günde randevu yok.</p>
        ) : (
          <div className="space-y-1.5">
            {selectedAppts
              .slice()
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((a) => (
                <div key={a.id} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm">
                  <span className="font-semibold text-gray-700">
                    {new Date(a.date).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span>{a.mode === "VIDEO" ? "📹" : "🤝"}</span>
                  <span className="min-w-0 flex-1 truncate text-gray-600">{a.title}</span>
                  <span className="shrink-0 text-xs text-black">
                    {a.role === "owner" ? "Gelen" : "Aldığım"} · {a.otherName}
                  </span>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[a.status] ?? "bg-gray-400"}`} />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Açıklama */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-black">
        <Legend cls="bg-yellow-400" label="Bekliyor" />
        <Legend cls="bg-green-500" label="Onaylı" />
        <Legend cls="bg-blue-400" label="Tamamlandı" />
        <Legend cls="bg-red-400" label="Reddedildi" />
      </div>
    </div>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${cls}`} /> {label}
    </span>
  );
}
