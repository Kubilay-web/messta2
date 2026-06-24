"use client";

import { useState, useTransition } from "react";
import { saveAvailability } from "../actions";

const DAYS = [
  { day: 1, label: "Pazartesi" },
  { day: 2, label: "Salı" },
  { day: 3, label: "Çarşamba" },
  { day: 4, label: "Perşembe" },
  { day: 5, label: "Cuma" },
  { day: 6, label: "Cumartesi" },
  { day: 0, label: "Pazar" },
];

interface DayState {
  enabled: boolean;
  start: string;
  end: string;
}

export default function AvailabilityEditor({
  initial,
}: {
  initial: {
    slotMinutes?: number;
    leadHours?: number;
    maxDaysAhead?: number;
    rules?: { day: number; start: string; end: string }[];
    blockedDates?: string[];
    timezone?: string;
    autoConfirmVideo?: boolean;
    autoConfirmFaceToFace?: boolean;
    maxPerDay?: number;
  } | null;
}) {
  const initRules: Record<number, { start: string; end: string }> = {};
  (initial?.rules ?? []).forEach((r) => {
    initRules[r.day] = { start: r.start, end: r.end };
  });

  const [days, setDays] = useState<Record<number, DayState>>(() => {
    const o: Record<number, DayState> = {};
    DAYS.forEach(({ day }) => {
      const r = initRules[day];
      o[day] = { enabled: !!r, start: r?.start ?? "10:00", end: r?.end ?? "18:00" };
    });
    return o;
  });
  const [slotMinutes, setSlotMinutes] = useState(initial?.slotMinutes ?? 30);
  const [leadHours, setLeadHours] = useState(initial?.leadHours ?? 2);
  const [maxDaysAhead, setMaxDaysAhead] = useState(initial?.maxDaysAhead ?? 30);
  const [timezone, setTimezone] = useState(initial?.timezone ?? "Europe/Istanbul");
  const [autoConfirmVideo, setAutoConfirmVideo] = useState(initial?.autoConfirmVideo ?? false);
  const [autoConfirmFaceToFace, setAutoConfirmFaceToFace] = useState(initial?.autoConfirmFaceToFace ?? false);
  const [maxPerDay, setMaxPerDay] = useState(initial?.maxPerDay ?? 0);
  const [blocked, setBlocked] = useState<string[]>(initial?.blockedDates ?? []);
  const [newBlock, setNewBlock] = useState("");
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  const configured = DAYS.some((d) => days[d.day].enabled);

  function setDay(day: number, patch: Partial<DayState>) {
    setDays((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }
  function addBlock() {
    if (/^\d{4}-\d{2}-\d{2}$/.test(newBlock) && !blocked.includes(newBlock)) {
      setBlocked((b) => [...b, newBlock].sort());
      setNewBlock("");
    }
  }
  function save() {
    const rules = DAYS.filter((d) => days[d.day].enabled).map((d) => ({
      day: d.day,
      start: days[d.day].start,
      end: days[d.day].end,
    }));
    start(async () => {
      const res = await saveAvailability({
        slotMinutes,
        leadHours,
        maxDaysAhead,
        rules,
        blockedDates: blocked,
        timezone,
        autoConfirmVideo,
        autoConfirmFaceToFace,
        maxPerDay,
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          🗓️ Randevu Müsaitliğim
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              configured ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
            }`}
          >
            {configured ? "Tanımlı" : "Tanımsız"}
          </span>
        </span>
        <span className={`text-black transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-gray-100 p-4">
          <p className="text-xs text-gray-500">
            Müsait gün ve saatlerini belirle; kiracı adayları yalnızca boş slotları görüp seçebilsin.
            Tanımlamazsan eski yöntemle (serbest saat) randevu alınır.
          </p>

          {/* Günlük saatler */}
          <div className="space-y-2">
            {DAYS.map(({ day, label }) => {
              const st = days[day];
              return (
                <div
                  key={day}
                  className="flex flex-col gap-2 rounded-lg border border-gray-100 p-2 sm:flex-row sm:items-center"
                >
                  <label className="flex w-full items-center gap-2 sm:w-40">
                    <input
                      type="checkbox"
                      checked={st.enabled}
                      onChange={(e) => setDay(day, { enabled: e.target.checked })}
                      className="h-4 w-4 accent-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                  <div
                    className={`flex items-center gap-2 ${st.enabled ? "" : "pointer-events-none opacity-40"}`}
                  >
                    <input
                      type="time"
                      value={st.start}
                      onChange={(e) => setDay(day, { start: e.target.value })}
                      className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-indigo-400"
                    />
                    <span className="text-black">–</span>
                    <input
                      type="time"
                      value={st.end}
                      onChange={(e) => setDay(day, { end: e.target.value })}
                      className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ayarlar */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-gray-500">Randevu süresi</span>
              <select
                value={slotMinutes}
                onChange={(e) => setSlotMinutes(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-indigo-400"
              >
                {[15, 20, 30, 45, 60, 90, 120].map((m) => (
                  <option key={m} value={m}>
                    {m} dk
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-gray-500">En erken (saat önce)</span>
              <input
                type="number"
                min={0}
                max={168}
                value={leadHours}
                onChange={(e) => setLeadHours(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-indigo-400"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-gray-500">Kaç gün ileri</span>
              <input
                type="number"
                min={1}
                max={60}
                value={maxDaysAhead}
                onChange={(e) => setMaxDaysAhead(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-indigo-400"
              />
            </label>
          </div>

          {/* Zaman dilimi + günlük kota */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-gray-500">Zaman dilimi</span>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-indigo-400"
              >
                {[
                  "Europe/Istanbul",
                  "Europe/London",
                  "Europe/Berlin",
                  "Europe/Moscow",
                  "America/New_York",
                  "America/Los_Angeles",
                  "Asia/Dubai",
                ].map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-xs font-medium text-gray-500">Günlük randevu kotası (0 = sınırsız)</span>
              <input
                type="number"
                min={0}
                max={50}
                value={maxPerDay}
                onChange={(e) => setMaxPerDay(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-indigo-400"
              />
            </label>
          </div>

          {/* Otomatik onay */}
          <div className="space-y-2 rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-600">Otomatik onay (onay beklemeden randevu kesinleşir)</p>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={autoConfirmVideo}
                onChange={(e) => setAutoConfirmVideo(e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              📹 Görüntülü görüşmeleri otomatik onayla
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={autoConfirmFaceToFace}
                onChange={(e) => setAutoConfirmFaceToFace(e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              🤝 Yüz yüze randevuları otomatik onayla
            </label>
          </div>

          {/* Kapalı günler */}
          <div>
            <span className="mb-1 block text-xs font-medium text-gray-500">Kapalı günler (tatil vb.)</span>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={newBlock}
                onChange={(e) => setNewBlock(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={addBlock}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Ekle
              </button>
            </div>
            {blocked.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {blocked.map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700"
                  >
                    {d}
                    <button
                      type="button"
                      onClick={() => setBlocked((b) => b.filter((x) => x !== d))}
                      className="text-red-400 hover:text-red-600"
                      aria-label="Kaldır"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={pending}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {pending ? "Kaydediliyor..." : "Kaydet"}
            </button>
            {saved && <span className="text-sm font-medium text-green-600">✓ Kaydedildi</span>}
          </div>
        </div>
      )}
    </div>
  );
}
