"use client";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import { setAppointmentStatus, markAppointmentCall } from "../actions";
import { formatDate } from "../lib/format";
import { newCallId } from "../lib/call-client";
import VideoCall, { type CallSummary } from "./video-call";

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
  const [call, setCall] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const other = role === "owner" ? appt.requester : appt.owner;
  const isVideo = appt.mode === "VIDEO";

  // Görüşme saati yaklaşınca "Katıl" butonunun belirmesi için hafif tik
  useEffect(() => {
    if (!isVideo) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [isVideo]);

  const scheduled = new Date(appt.scheduledAt).getTime();
  const duration = (appt.durationMin ?? 30) * 60_000;
  const openFrom = scheduled - 10 * 60_000; // 10 dk önce
  const openUntil = scheduled + duration + 60 * 60_000; // bitiş + 1 saat tampon
  const inWindow = now >= openFrom && now <= openUntil;
  // Görüntülü randevuda onay zorunlu değil: reddedilmemiş/iptal edilmemişse saatinde katılınabilir
  const canJoin = isVideo && (status === "CONFIRMED" || status === "PENDING") && inWindow;

  function act(next: string) {
    start(async () => {
      const res = await setAppointmentStatus(appt.id, next);
      if (res.ok) setStatus(next);
    });
  }

  function joinCall() {
    setCall(true);
    markAppointmentCall(appt.id, "start").catch(() => {});
  }

  function endCall(_summary: CallSummary | null) {
    setCall(false);
    markAppointmentCall(appt.id, "end").catch(() => {});
    setStatus((s: string) => (s === "CONFIRMED" ? "COMPLETED" : s));
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
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-medium text-gray-800">{appt.listing?.title}</p>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                isVideo ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {isVideo ? "📹 Görüntülü" : "🤝 Yüz yüze"}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            📅 {formatDate(appt.scheduledAt)} ·{" "}
            {new Date(appt.scheduledAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
            {appt.durationMin ? ` · ${appt.durationMin} dk` : ""}
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

        {/* Görüntülü görüşmeye katıl */}
        {canJoin && (
          <button
            onClick={joinCall}
            className="flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700"
          >
            📹 Görüşmeye Katıl
          </button>
        )}
        {isVideo && (status === "CONFIRMED" || status === "PENDING") && !inWindow && now < openFrom && (
          <span className="text-[11px] text-gray-400">Görüşme saatinde aktifleşir</span>
        )}

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

      {call && other?.id && (
        <VideoCall
          callId={newCallId()}
          listingId={appt.listing?.id ?? ""}
          otherId={other.id}
          otherName={other.displayName || other.username || "Üye"}
          otherAvatar={other.avatarUrl ?? null}
          video
          mode="caller"
          onClose={endCall}
        />
      )}
    </div>
  );
}
