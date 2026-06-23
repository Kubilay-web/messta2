"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  confirmBookingAction,
  rejectBookingAction,
  cancelBookingAction,
  completeBookingAction,
} from "../booking-actions";

export interface BookingVM {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string | null;
  otherName: string;
  startDate: string;
  endDate: string;
  nights: number;
  guests: number;
  totalAmount: number;
  deposit: number;
  currency: string;
  status: string;
  note: string | null;
  contactPhone: string | null;
}

const STATUS: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Ödeme bekliyor", cls: "bg-yellow-100 text-yellow-700" },
  AWAITING_APPROVAL: { label: "Onay bekliyor", cls: "bg-orange-100 text-orange-700" },
  CONFIRMED: { label: "Onaylandı", cls: "bg-green-100 text-green-700" },
  REJECTED: { label: "Reddedildi", cls: "bg-red-100 text-red-700" },
  CANCELLED: { label: "İptal edildi", cls: "bg-gray-100 text-gray-600" },
  COMPLETED: { label: "Tamamlandı", cls: "bg-blue-100 text-blue-700" },
  EXPIRED: { label: "Süresi doldu", cls: "bg-gray-100 text-gray-500" },
};

function fmt(n: number, c: string) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
}
function dateRange(s: string, e: string) {
  const f = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  return `${f.format(new Date(s))} – ${f.format(new Date(e))}`;
}

export default function BookingsClient({
  asRenter,
  asOwner,
}: {
  asRenter: BookingVM[];
  asOwner: BookingVM[];
}) {
  const [tab, setTab] = useState<"renter" | "owner">(asOwner.length > 0 ? "owner" : "renter");
  const list = tab === "renter" ? asRenter : asOwner;

  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setTab("renter")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            tab === "renter" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          Rezervasyonlarım ({asRenter.length})
        </button>
        <button
          onClick={() => setTab("owner")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            tab === "owner" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          Gelen Talepler ({asOwner.length})
        </button>
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          {tab === "renter" ? "Henüz rezervasyonunuz yok." : "Henüz gelen talep yok."}
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((b) => (
            <BookingRow key={b.id} b={b} owner={tab === "owner"} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingRow({ b, owner }: { b: BookingVM; owner: boolean }) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState("");
  const router = useRouter();
  const st = STATUS[b.status] ?? { label: b.status, cls: "bg-gray-100 text-gray-600" };

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setErr("");
    start(async () => {
      const res = await fn();
      if (res.ok) router.refresh();
      else setErr(res.error ?? "Hata");
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex gap-3">
        <Link href={`/sahibinden/ilan/${b.listingId}`} className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {b.listingImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.listingImage} alt="" className="h-full w-full object-cover" />
          ) : null}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/sahibinden/ilan/${b.listingId}`} className="truncate text-sm font-semibold text-gray-800 hover:text-yellow-600">
              {b.listingTitle}
            </Link>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>{st.label}</span>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {dateRange(b.startDate, b.endDate)} · {b.nights} gece · {b.guests} misafir
          </p>
          <p className="mt-0.5 text-xs text-gray-600">
            {owner ? "Kiracı" : "Ev sahibi"}: <span className="font-medium">{b.otherName}</span> ·{" "}
            <span className="font-semibold text-gray-800">{fmt(b.totalAmount, b.currency)}</span>
            {b.deposit > 0 && <span className="text-gray-400"> (depozito {fmt(b.deposit, b.currency)})</span>}
          </p>
          {b.note && <p className="mt-1 rounded bg-gray-50 px-2 py-1 text-xs text-gray-600">“{b.note}”</p>}
          {owner && b.contactPhone && <p className="mt-1 text-xs text-gray-500">📞 {b.contactPhone}</p>}
        </div>
      </div>

      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}

      <div className="mt-3 flex flex-wrap justify-end gap-2">
        {owner && b.status === "AWAITING_APPROVAL" && (
          <>
            <button
              disabled={pending}
              onClick={() => run(() => confirmBookingAction(b.id))}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Onayla
            </button>
            <button
              disabled={pending}
              onClick={() => run(() => rejectBookingAction(b.id))}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Reddet (iade)
            </button>
          </>
        )}
        {owner && b.status === "CONFIRMED" && (
          <button
            disabled={pending}
            onClick={() => run(() => completeBookingAction(b.id))}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Konaklamayı Tamamla
          </button>
        )}
        {!owner && ["AWAITING_APPROVAL", "CONFIRMED", "PENDING"].includes(b.status) && (
          <button
            disabled={pending}
            onClick={() => {
              if (confirm("Rezervasyonu iptal etmek istiyor musunuz? Ücret cüzdanınıza iade edilir.")) run(() => cancelBookingAction(b.id));
            }}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            İptal et
          </button>
        )}
      </div>
    </div>
  );
}
