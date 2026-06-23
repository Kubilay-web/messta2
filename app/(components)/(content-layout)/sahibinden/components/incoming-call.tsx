"use client";

import { useEffect, useRef, useState } from "react";
import type { IncomingCall, CallSignalMsg } from "../lib/call-client";
import { getRealtimeSocket } from "../lib/realtime";
import VideoCall, { type CallSummary } from "./video-call";

// Uygulama genelinde gelen aramaları dinler (sahibinden layout'unda mount edilir).
// Sinyalleşme tamamen Socket.IO üzerinden olur: "call:ring" ile zil çalar,
// "call:signal" ile (cancel/end/reject) arayan vazgeçtiğinde açılır pencere kapanır.
export default function IncomingCallListener({
  enabled,
  selfId,
}: {
  enabled: boolean;
  selfId: string | null;
}) {
  const [incoming, setIncoming] = useState<IncomingCall | null>(null);
  const [accepted, setAccepted] = useState<IncomingCall | null>(null);
  const dismissed = useRef<Set<string>>(new Set());
  const ringStop = useRef<(() => void) | null>(null);
  // Eşzamanlı görüşme kontrolü için güncel "accepted" değerini ref'te tut.
  const acceptedRef = useRef<IncomingCall | null>(null);
  acceptedRef.current = accepted;

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let off: () => void = () => {};

    getRealtimeSocket().then((sock) => {
      if (!alive || !sock) return;

      // Gelen arama zili
      const onRing = (data: any) => {
        if (!data || !data.callId || !data.fromId) return;
        // Kendi kendine arama (aynı hesabın başka sekmesi) yankısını yok say.
        if (selfId && data.fromId === selfId) return;
        if (dismissed.current.has(data.callId)) return;
        // Zaten görüşmedeysek meşgul döndür.
        if (acceptedRef.current) {
          sock.emit("call:signal", {
            toId: data.fromId,
            callId: data.callId,
            type: "busy",
            video: !!data.video,
          });
          return;
        }
        setIncoming({
          callId: data.callId,
          listingId: data.listingId,
          fromId: data.fromId,
          fromName: data.fromName || "Üye",
          fromAvatar: data.fromAvatar ?? null,
          listingTitle: data.listingTitle || "İlan",
          video: !!data.video,
        });
      };

      // Arayan biz kabul etmeden vazgeçerse açılır pencereyi kapat.
      const onSignal = (data: CallSignalMsg) => {
        if (!data || !data.callId) return;
        if (data.type === "cancel" || data.type === "end" || data.type === "reject") {
          setIncoming((cur) => (cur && cur.callId === data.callId ? null : cur));
        }
      };

      sock.on("call:ring", onRing);
      sock.on("call:signal", onSignal);
      off = () => {
        sock.off("call:ring", onRing);
        sock.off("call:signal", onSignal);
      };
    });

    return () => {
      alive = false;
      off();
    };
  }, [enabled, selfId]);

  // Zil sesi (gelen arama beklerken)
  useEffect(() => {
    if (incoming && !accepted) {
      ringStop.current = startRingtone();
    }
    return () => {
      ringStop.current?.();
      ringStop.current = null;
    };
  }, [incoming, accepted]);

  function accept() {
    if (!incoming) return;
    ringStop.current?.();
    setAccepted(incoming);
    setIncoming(null);
  }

  function reject() {
    if (!incoming) return;
    dismissed.current.add(incoming.callId);
    getRealtimeSocket().then((sock) => {
      sock?.emit("call:signal", {
        toId: incoming.fromId,
        callId: incoming.callId,
        type: "reject",
        video: incoming.video,
      });
    });
    ringStop.current?.();
    setIncoming(null);
  }

  function handleClose(_summary: CallSummary | null) {
    if (accepted) dismissed.current.add(accepted.callId);
    setAccepted(null);
  }

  if (!enabled) return null;

  if (accepted) {
    return (
      <VideoCall
        callId={accepted.callId}
        listingId={accepted.listingId}
        otherId={accepted.fromId}
        otherName={accepted.fromName}
        otherAvatar={accepted.fromAvatar}
        video={accepted.video}
        mode="callee"
        listingTitle={accepted.listingTitle}
        onClose={handleClose}
      />
    );
  }

  if (!incoming) return null;

  return (
    <div className="fixed inset-x-0 top-4 z-[110] flex justify-center px-4">
      <div className="flex w-full max-w-sm animate-[pulse_2s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg font-bold text-gray-700">
          {incoming.fromAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={incoming.fromAvatar} alt="" className="h-full w-full object-cover" />
          ) : (
            incoming.fromName.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">{incoming.fromName}</p>
          <p className="truncate text-xs text-gray-500">
            {incoming.video ? "Görüntülü arıyor" : "Sesli arıyor"} · {incoming.listingTitle}
          </p>
        </div>
        <button
          onClick={reject}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
          aria-label="Reddet"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" transform="rotate(135 12 12)" />
          </svg>
        </button>
        <button
          onClick={accept}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
          aria-label="Kabul et"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Basit zil sesi: WebAudio ile aralıklı iki tonlu bip. Harici dosya gerektirmez.
function startRingtone(): () => void {
  let ctx: AudioContext | null = null;
  let stopped = false;
  let interval: ReturnType<typeof setInterval> | null = null;
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return () => {};
    ctx = new AC();
    const beep = () => {
      if (!ctx || stopped) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 480;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    };
    beep();
    interval = setInterval(beep, 2000);
  } catch {
    /* ses yoksa sessiz devam */
  }
  return () => {
    stopped = true;
    if (interval) clearInterval(interval);
    ctx?.close().catch(() => {});
  };
}
