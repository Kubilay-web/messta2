"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { blockDatesAction, unblockDatesAction, getIcalTokenAction } from "../booking-actions";

export interface RentListingVM {
  id: string;
  title: string;
}
export interface BlockVM {
  id: string;
  listingId: string;
  start: string; // YYYY-MM-DD
  end: string;
  reason: string | null;
}
export interface BookedVM {
  listingId: string;
  start: string;
  end: string;
  status: string;
}

function fmtDate(s: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(s));
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function AvailabilityManager({
  listings,
  blocks,
  booked,
}: {
  listings: RentListingVM[];
  blocks: BlockVM[];
  booked: BookedVM[];
}) {
  const [listingId, setListingId] = useState(listings[0]?.id ?? "");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");
  const [icalUrl, setIcalUrl] = useState("");
  const [pending, startT] = useTransition();
  const router = useRouter();

  function exportIcal() {
    setErr("");
    setIcalUrl("");
    startT(async () => {
      const res = await getIcalTokenAction(listingId);
      if (res.ok && res.token) {
        const base = typeof window !== "undefined" ? window.location.origin : "";
        setIcalUrl(`${base}/sahibinden/api/rental/ical/${listingId}?token=${res.token}`);
      } else setErr(res.error ?? "Bağlantı oluşturulamadı");
    });
  }

  if (listings.length === 0) return null;

  const listBlocks = blocks.filter((b) => b.listingId === listingId);
  const listBooked = booked.filter((b) => b.listingId === listingId);

  function add() {
    setErr("");
    if (!start || !end) return setErr("Tarih aralığı seçin.");
    if (new Date(end) <= new Date(start)) return setErr("Bitiş, başlangıçtan sonra olmalı.");
    startT(async () => {
      const res = await blockDatesAction(listingId, start, end, reason || undefined);
      if (res.ok) {
        setStart("");
        setEnd("");
        setReason("");
        router.refresh();
      } else setErr(res.error ?? "Hata");
    });
  }

  function remove(id: string) {
    startT(async () => {
      await unblockDatesAction(id);
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h2 className="font-bold text-gray-800">Müsaitlik / Takvim Blokları</h2>
      <p className="mt-0.5 text-xs text-gray-500">
        Kiralama ilanlarınızda kapalı tutmak istediğiniz tarihleri işaretleyin; bu aralıklara rezervasyon alınmaz.
      </p>

      {listings.length > 1 && (
        <select
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
        >
          {listings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>
      )}

      {/* Blok ekleme */}
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_1.4fr_auto]">
        <input
          type="date"
          min={todayStr()}
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <input
          type="date"
          min={start || todayStr()}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Sebep (opsiyonel)"
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <button
          onClick={add}
          disabled={pending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Kapat
        </button>
      </div>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}

      {/* Mevcut bloklar */}
      {listBlocks.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-xs font-semibold text-gray-500">Kapalı tarihler</p>
          <div className="space-y-1.5">
            {listBlocks.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                <span className="text-gray-700">
                  {fmtDate(b.start)} – {fmtDate(b.end)}
                  {b.reason && <span className="ml-2 text-xs text-black">({b.reason})</span>}
                </span>
                <button
                  onClick={() => remove(b.id)}
                  disabled={pending}
                  className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-white disabled:opacity-50"
                >
                  Kaldır
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* iCal dışa aktarma */}
      <div className="mt-4 border-t border-gray-100 pt-3">
        <button
          onClick={exportIcal}
          disabled={pending}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          📅 Takvimi dışa aktar (iCal)
        </button>
        {icalUrl && (
          <div className="mt-2">
            <p className="text-[11px] text-gray-500">
              Bu bağlantıyı Google Takvim / Airbnb / Booking takviminize ekleyerek dolu tarihleri senkronlayın:
            </p>
            <input
              readOnly
              value={icalUrl}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-600"
            />
          </div>
        )}
      </div>

      {/* Rezervasyonlu (otomatik dolu) tarihler — bilgi amaçlı */}
      {listBooked.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-xs font-semibold text-gray-500">Rezervasyonlu tarihler (otomatik dolu)</p>
          <div className="flex flex-wrap gap-1.5">
            {listBooked.map((b, i) => (
              <span key={i} className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700">
                {fmtDate(b.start)} – {fmtDate(b.end)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
