"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestViewing } from "../actions";

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
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  if (isOwner) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setError("");
    start(async () => {
      const res = await requestViewing({ listingId, scheduledAt: when, note, phone, mode });
      if (res.ok) setDone(true);
      else setError(res.error ?? "Hata.");
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        📅 Randevu Al
      </button>

      {open && !done && (
        <form onSubmit={submit} className="mt-3 space-y-2">
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
          <p className="text-[11px] text-gray-400">
            {mode === "VIDEO"
              ? "Belirlenen saatte karşılıklı kameradan görüşürsünüz."
              : "İlan sahibi onayladıktan sonra yüz yüze gezersiniz."}
          </p>

          <input
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
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
      {done && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Randevu talebiniz iletildi.</p>}
    </div>
  );
}
