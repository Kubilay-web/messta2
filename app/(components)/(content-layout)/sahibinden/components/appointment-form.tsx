"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requestViewing } from "../actions";

interface DaySlots {
  date: string;
  label: string;
  slots: { time: string; iso: string }[];
}

export default function AppointmentForm({
  listingId,
  isOwner,
  isLoggedIn,
}: {
  listingId: string;
  isOwner: boolean;
  isLoggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"FACE_TO_FACE" | "VIDEO">("FACE_TO_FACE");
  const [when, setWhen] = useState(""); // ISO veya datetime-local değeri (asıl saat)
  const [altSlots, setAltSlots] = useState<string[]>([]); // yedek/alternatif saatler
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  // Müsaitlik / slotlar
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [slotMinutes, setSlotMinutes] = useState(30);
  const [days, setDays] = useState<DaySlots[]>([]);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    if (!open || isOwner) return;
    let alive = true;
    setLoadingSlots(true);
    fetch(`/sahibinden/api/appointments/slots?listingId=${encodeURIComponent(listingId)}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setConfigured(!!d.configured && Array.isArray(d.days) && d.days.length > 0);
        setSlotMinutes(d.slotMinutes ?? 30);
        setDays(Array.isArray(d.days) ? d.days : []);
        setActiveDay(0);
      })
      .catch(() => {})
      .finally(() => alive && setLoadingSlots(false));
    return () => {
      alive = false;
    };
  }, [open, isOwner, listingId]);

  if (isOwner) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!when) {
      setError("Lütfen bir saat seçin.");
      return;
    }
    setError("");
    const scheduledAt = new Date(when).toISOString();
    start(async () => {
      const res = await requestViewing({
        listingId,
        scheduledAt,
        note,
        phone,
        mode,
        durationMin: configured ? slotMinutes : 30,
        alternativeSlots: altSlots,
      });
      if (res.ok) setDone(true);
      else setError(res.error ?? "Hata.");
    });
  }

  const dayObj = days[activeDay];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        📅 Randevu Al
      </button>

      {open && !done && (
        <form onSubmit={submit} className="mt-3 space-y-3">
          {/* Randevu türü */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("FACE_TO_FACE")}
              className={`flex flex-col items-center gap-0.5 rounded-lg border-2 px-2 py-2 text-xs font-semibold transition ${
                mode === "FACE_TO_FACE"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="text-lg">🤝</span>
              Yüz Yüze
            </button>
            <button
              type="button"
              onClick={() => setMode("VIDEO")}
              className={`flex flex-col items-center gap-0.5 rounded-lg border-2 px-2 py-2 text-xs font-semibold transition ${
                mode === "VIDEO"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="text-lg">📹</span>
              Görüntülü
            </button>
          </div>
          <p className="text-[11px] text-black">
            {mode === "VIDEO"
              ? "Belirlenen saatte karşılıklı kameradan görüşürsünüz."
              : "İlan sahibi onayladıktan sonra yüz yüze gezersiniz."}
          </p>

          {/* Saat seçimi */}
          {loadingSlots ? (
            <p className="py-3 text-center text-xs text-black">Müsait saatler yükleniyor…</p>
          ) : configured ? (
            <div className="space-y-2">
              <span className="block text-xs font-medium text-gray-500">Müsait gün</span>
              {/* Gün seçici (yatay kaydırılabilir) */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {days.map((d, i) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => {
                      setActiveDay(i);
                    }}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      i === activeDay
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {/* Saat slotları — ilk seçim asıl saat, sonrakiler yedek (en çok 3) */}
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                {dayObj?.slots.map((s) => {
                  const isPrimary = when === s.iso;
                  const isAlt = altSlots.includes(s.iso);
                  return (
                    <button
                      key={s.iso}
                      type="button"
                      onClick={() => {
                        if (isPrimary) {
                          setWhen(altSlots[0] ?? "");
                          setAltSlots((a) => a.slice(1));
                        } else if (isAlt) {
                          setAltSlots((a) => a.filter((x) => x !== s.iso));
                        } else if (!when) {
                          setWhen(s.iso);
                        } else {
                          setAltSlots((a) => (a.length < 3 ? [...a, s.iso] : a));
                        }
                      }}
                      className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                        isPrimary
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : isAlt
                            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 text-gray-700 hover:border-indigo-300"
                      }`}
                    >
                      {s.time}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-black">
                İlk seçtiğiniz saat <b>asıl</b> saattir. İsterseniz 3 adede kadar <b>yedek</b> saat ekleyin; ev sahibi
                uygun olanı onaylar.
              </p>
            </div>
          ) : (
            <input
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
            />
          )}

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefonunuz"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Not (opsiyonel)"
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {pending ? "Gönderiliyor..." : "Randevu Talep Et"}
          </button>
        </form>
      )}
      {done && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Randevu talebiniz iletildi.
        </p>
      )}
    </div>
  );
}
