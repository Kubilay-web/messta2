"use client";

import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import {
  setAppointmentStatus,
  markAppointmentCall,
  proposeReschedule,
  respondReschedule,
  submitAppointmentReview,
} from "../actions";
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
  const [schedAt, setSchedAt] = useState<string>(appt.scheduledAt);
  const [proposedAt, setProposedAt] = useState<string | null>(appt.proposedAt ?? null);
  const [proposedById, setProposedById] = useState<string | null>(appt.proposedById ?? null);
  const [reschedOpen, setReschedOpen] = useState(false);
  const [newWhen, setNewWhen] = useState("");
  const altSlots: string[] = Array.isArray(appt.alternativeSlots) ? appt.alternativeSlots : [];
  const [chosenSlot, setChosenSlot] = useState<string>(new Date(appt.scheduledAt).toISOString());
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const alreadyRated = role === "owner" ? appt.ratingByOwner != null : appt.ratingByRequester != null;
  const other = role === "owner" ? appt.requester : appt.owner;
  const isVideo = appt.mode === "VIDEO";

  const myId = role === "owner" ? appt.ownerId : appt.requesterId;
  const iProposed = !!proposedAt && proposedById === myId;
  const theyProposed = !!proposedAt && !iProposed;
  const isActive = status !== "CANCELLED" && status !== "COMPLETED" && status !== "REJECTED";

  function propose() {
    if (!newWhen) return;
    const iso = new Date(newWhen).toISOString();
    start(async () => {
      const res = await proposeReschedule(appt.id, iso);
      if (res.ok) {
        setProposedAt(iso);
        setProposedById(myId);
        setReschedOpen(false);
        setNewWhen("");
      } else alert(res.error);
    });
  }
  function respond(accept: boolean) {
    const target = proposedAt;
    start(async () => {
      const res = await respondReschedule(appt.id, accept);
      if (res.ok) {
        if (accept && target) {
          setSchedAt(target);
          setStatus("CONFIRMED");
        }
        setProposedAt(null);
        setProposedById(null);
      } else alert(res.error);
    });
  }

  // Görüşme saati yaklaşınca "Katıl" butonunun belirmesi için hafif tik
  useEffect(() => {
    if (!isVideo) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [isVideo]);

  const scheduled = new Date(schedAt).getTime();
  const duration = (appt.durationMin ?? 30) * 60_000;
  const openFrom = scheduled - 10 * 60_000; // 10 dk önce
  const openUntil = scheduled + duration + 60 * 60_000; // bitiş + 1 saat tampon
  const inWindow = now >= openFrom && now <= openUntil;
  // Görüntülü görüşme için ev sahibi onayı zorunlu: yalnızca CONFIRMED ise katılınabilir.
  const canJoin = isVideo && status === "CONFIRMED" && inWindow;

  function act(next: string, slotIso?: string) {
    start(async () => {
      const res = await setAppointmentStatus(appt.id, next, slotIso);
      if (res.ok) {
        setStatus(next);
        if (next === "CONFIRMED" && slotIso) setSchedAt(slotIso);
      } else alert(res.error);
    });
  }

  function sendReview() {
    start(async () => {
      const res = await submitAppointmentReview(appt.id, rating, comment);
      if (res.ok) setReviewOpen(false);
      else alert(res.error);
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
            📅 {formatDate(schedAt)} ·{" "}
            {new Date(schedAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
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
        {isVideo && status === "CONFIRMED" && !inWindow && now < openFrom && (
          <span className="text-[11px] text-black">Görüşme saatinde aktifleşir</span>
        )}
        {isVideo && status === "PENDING" && role === "requester" && (
          <span className="text-[11px] text-black">Onaylanınca görüşme linki açılır</span>
        )}

        {role === "owner" && status === "PENDING" && (
          <>
            {altSlots.length > 0 && (
              <select
                value={chosenSlot}
                onChange={(e) => setChosenSlot(e.target.value)}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-400"
                title="Onaylanacak saat"
              >
                {[new Date(appt.scheduledAt).toISOString(), ...altSlots].map((iso, i) => (
                  <option key={iso} value={iso}>
                    {i === 0 ? "Asıl: " : "Alt: "}
                    {new Date(iso).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}
                  </option>
                ))}
              </select>
            )}
            <button onClick={() => act("CONFIRMED", chosenSlot)} disabled={pending} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100">
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

        {/* Yeniden planlama: saat değiştir öner */}
        {isActive && !proposedAt && !reschedOpen && (
          <button
            onClick={() => setReschedOpen(true)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            🕑 Saati değiştir
          </button>
        )}
        {isActive && !proposedAt && reschedOpen && (
          <div className="flex w-full flex-wrap items-center gap-2">
            <input
              type="datetime-local"
              value={newWhen}
              onChange={(e) => setNewWhen(e.target.value)}
              className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-400"
            />
            <button
              onClick={propose}
              disabled={pending || !newWhen}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Öner
            </button>
            <button
              onClick={() => setReschedOpen(false)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Vazgeç
            </button>
          </div>
        )}

        {/* Karşı taraf yeni saat önerdi → kabul/ret */}
        {theyProposed && proposedAt && (
          <div className="flex w-full flex-wrap items-center gap-2 rounded-lg bg-amber-50 px-2 py-1.5">
            <span className="text-xs font-medium text-amber-700">
              Yeni saat önerildi:{" "}
              {new Date(proposedAt).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}
            </span>
            <button
              onClick={() => respond(true)}
              disabled={pending}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Kabul
            </button>
            <button
              onClick={() => respond(false)}
              disabled={pending}
              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              Reddet
            </button>
          </div>
        )}
        {iProposed && proposedAt && (
          <span className="w-full text-xs text-amber-600">
            ⏳ Önerdiğiniz yeni saat (
            {new Date(proposedAt).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}) onay
            bekliyor
          </span>
        )}

        {/* Tamamlanan randevu sonrası değerlendirme */}
        {status === "COMPLETED" && !alreadyRated && !reviewOpen && (
          <button
            onClick={() => setReviewOpen(true)}
            className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
          >
            ★ Değerlendir
          </button>
        )}
        {status === "COMPLETED" && reviewOpen && (
          <div className="flex w-full flex-col gap-1 rounded-lg bg-gray-50 p-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} className={`text-lg ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              placeholder="Görüşmeyle ilgili yorum (opsiyonel)"
              className="w-full rounded border border-gray-200 px-2 py-1 text-xs"
            />
            <div className="flex gap-2">
              <button onClick={sendReview} disabled={pending} className="rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-yellow-500 disabled:opacity-50">
                Gönder
              </button>
              <button onClick={() => setReviewOpen(false)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white">
                Vazgeç
              </button>
            </div>
          </div>
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
