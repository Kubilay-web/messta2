"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { setAppointmentStatus } from "../actions";
import { formatDate } from "../lib/format";

const STATUS: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Bekliyor", cls: "bg-yellow-50 text-yellow-700" },
  CONFIRMED: { label: "Onaylandı", cls: "bg-green-50 text-green-700" },
  REJECTED: { label: "Reddedildi", cls: "bg-red-50 text-red-700" },
  CANCELLED: { label: "İptal", cls: "bg-gray-100 text-gray-600" },
  COMPLETED: { label: "Tamamlandı", cls: "bg-blue-50 text-blue-700" },
};

export default function AppointmentRow({
  appt,
  role,
}: {
  appt: any;
  role: "owner" | "requester";
}) {
  const [status, setStatus] = useState(appt.status);
  const [pending, start] = useTransition();
  const other = role === "owner" ? appt.requester : appt.owner;

  function act(next: string) {
    start(async () => {
      const res = await setAppointmentStatus(appt.id, next);
      if (res.ok) setStatus(next);
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
      <Link href={`/sahibinden/ilan/${appt.listing?.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {appt.listing?.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={appt.listing.images[0]} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-800">{appt.listing?.title}</p>
          <p className="text-xs text-gray-500">
            📅 {formatDate(appt.scheduledAt)} · {new Date(appt.scheduledAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-xs text-gray-600">
            {role === "owner" ? "Talep eden: " : "İlan sahibi: "}
            {other?.displayName || other?.username || "Üye"}
            {appt.phone ? ` · ${appt.phone}` : ""}
          </p>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded px-2 py-1 text-xs font-semibold ${STATUS[status]?.cls}`}>{STATUS[status]?.label}</span>
        {role === "owner" && status === "PENDING" && (
          <>
            <button onClick={() => act("CONFIRMED")} disabled={pending} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100">
              Onayla
            </button>
            <button onClick={() => act("REJECTED")} disabled={pending} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">
              Reddet
            </button>
          </>
        )}
        {status !== "CANCELLED" && status !== "COMPLETED" && status !== "REJECTED" && (
          <button onClick={() => act(role === "owner" ? "COMPLETED" : "CANCELLED")} disabled={pending} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
            {role === "owner" ? "Tamamlandı" : "İptal Et"}
          </button>
        )}
      </div>
    </div>
  );
}
