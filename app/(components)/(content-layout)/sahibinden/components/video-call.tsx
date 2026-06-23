"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  postSignal,
  pollSignals,
  iceServers,
  formatCallDuration,
  type CallSignal,
} from "../lib/call-client";
import { getRealtimeSocket, emitRealtime } from "../lib/realtime";

export interface CallSummary {
  outcome: "answered" | "missed" | "rejected" | "cancelled";
  duration: number;
  video: boolean;
}

export default function VideoCall({
  callId,
  listingId,
  otherId,
  otherName,
  otherAvatar,
  video,
  mode,
  onClose,
}: {
  callId: string;
  listingId: string;
  otherId: string;
  otherName: string;
  otherAvatar?: string | null;
  video: boolean;
  mode: "caller" | "callee";
  onClose: (summary: CallSummary | null) => void;
}) {
  const [status, setStatus] = useState<"init" | "ringing" | "connecting" | "connected" | "ended">(
    "init",
  );
  const [error, setError] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(video);
  const [elapsed, setElapsed] = useState(0);
  const [remoteReady, setRemoteReady] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const connectedAtRef = useRef<number | null>(null);
  const endedRef = useRef(false);

  const send = useCallback(
    async (type: Parameters<typeof postSignal>[0]["type"], payload?: unknown) => {
      // Önce DB'ye yaz (kalıcı/sıralı transport), sonra socket ile karşıyı anında uyandır.
      await postSignal({ type, callId, listingId, toId: otherId, payload, video });
      emitRealtime("call:signal", { toId: otherId, callId });
    },
    [callId, listingId, otherId, video],
  );

  const finish = useCallback(
    (outcome: CallSummary["outcome"]) => {
      if (endedRef.current) return;
      endedRef.current = true;
      setStatus("ended");
      const duration = connectedAtRef.current
        ? Math.round((Date.now() - connectedAtRef.current) / 1000)
        : 0;
      // Bağlandıysak her zaman "answered" sayılır
      const finalOutcome = connectedAtRef.current ? "answered" : outcome;
      cleanup();
      onClose({ outcome: finalOutcome, duration, video });
    },
    [onClose, video],
  );

  function cleanup() {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    try {
      pcRef.current?.close();
    } catch {
      /* yoksay */
    }
    pcRef.current = null;
  }

  // Karşı taraf bağlanınca süreyi başlat
  const markConnected = useCallback(() => {
    if (connectedAtRef.current) return;
    connectedAtRef.current = Date.now();
    setStatus("connected");
  }, []);

  useEffect(() => {
    let alive = true;
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let ringTimer: ReturnType<typeof setTimeout> | null = null;
    let durTimer: ReturnType<typeof setInterval> | null = null;
    let offSignal: (() => void) | null = null;

    async function addCandidate(c: RTCIceCandidateInit) {
      const pc = pcRef.current;
      if (!pc) return;
      if (pc.remoteDescription && pc.remoteDescription.type) {
        await pc.addIceCandidate(c).catch(() => {});
      } else {
        pendingCandidates.current.push(c);
      }
    }

    async function drainCandidates() {
      const pc = pcRef.current;
      if (!pc) return;
      const list = pendingCandidates.current;
      pendingCandidates.current = [];
      for (const c of list) await pc.addIceCandidate(c).catch(() => {});
    }

    async function handleSignal(sig: CallSignal) {
      const pc = pcRef.current;
      if (!pc) return;
      switch (sig.type) {
        case "offer": {
          await pc.setRemoteDescription(sig.payload as RTCSessionDescriptionInit);
          await drainCandidates();
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await send("answer", answer);
          break;
        }
        case "answer": {
          if (!pc.currentRemoteDescription) {
            await pc.setRemoteDescription(sig.payload as RTCSessionDescriptionInit);
            await drainCandidates();
          }
          break;
        }
        case "ice": {
          if (sig.payload) await addCandidate(sig.payload as RTCIceCandidateInit);
          break;
        }
        case "accept": {
          if (ringTimer) clearTimeout(ringTimer);
          setStatus((s) => (s === "ringing" ? "connecting" : s));
          break;
        }
        case "reject":
        case "busy":
          finish("rejected");
          break;
        case "end":
        case "cancel":
          finish("answered"); // bağlanmamışsa finish içinde cancelled'a düşer
          break;
      }
    }

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: video ? { facingMode: "user" } : false,
        });
        if (!alive) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection({ iceServers: iceServers() });
        pcRef.current = pc;
        stream.getTracks().forEach((t) => pc.addTrack(t, stream));

        pc.onicecandidate = (e) => {
          if (e.candidate) send("ice", e.candidate.toJSON());
        };
        pc.ontrack = (e) => {
          if (remoteVideoRef.current && e.streams[0]) {
            remoteVideoRef.current.srcObject = e.streams[0];
            setRemoteReady(true);
          }
        };
        pc.onconnectionstatechange = () => {
          const st = pc.connectionState;
          if (st === "connected") markConnected();
          else if (st === "failed") finish("answered");
        };

        if (mode === "caller") {
          setStatus("ringing");
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await send("offer", offer);
          await send("ring");
          // Gelen-arama dinleyicisini anında uyandır (socket).
          emitRealtime("call:ring", { toId: otherId, callId, listingId, video });
          // 45 sn cevap yoksa iptal
          ringTimer = setTimeout(() => {
            if (!connectedAtRef.current) {
              send("cancel");
              finish("missed");
            }
          }, 45_000);
        } else {
          // callee: kabul ettiğimizi haber ver, teklif polling ile gelecek
          setStatus("connecting");
          await send("accept");
        }

        // Sinyalleri DB'den çek + işle (tek doğruluk kaynağı DB; consumed guard var).
        async function pumpSignals() {
          const signals = await pollSignals(callId);
          for (const s of signals) await handleSignal(s);
        }

        // Socket varsa: "call:signal" gelince anında çek; arka plan döngüsünü seyrekleştir.
        let intervalMs = 1200; // socket yoksa hızlı polling
        getRealtimeSocket().then((sock) => {
          if (!alive || !sock) return;
          intervalMs = 4000; // güvenlik ağı (socket asıl tetikleyici)
          const onSig = (data: any) => {
            if (!data || !data.callId || data.callId === callId) pumpSignals();
          };
          sock.on("call:signal", onSig);
          offSignal = () => sock.off("call:signal", onSig);
          if (pollTimer) {
            clearInterval(pollTimer);
            pollTimer = setInterval(pumpSignals, intervalMs);
          }
        });

        pollTimer = setInterval(pumpSignals, intervalMs);

        // süre sayacı
        durTimer = setInterval(() => {
          if (connectedAtRef.current) {
            setElapsed(Math.round((Date.now() - connectedAtRef.current) / 1000));
          }
        }, 1000);
      } catch (err: any) {
        setError(
          err?.name === "NotAllowedError"
            ? "Kamera/mikrofon erişimi reddedildi."
            : "Kamera/mikrofona erişilemedi.",
        );
        setStatus("ended");
      }
    }

    setup();

    return () => {
      alive = false;
      if (pollTimer) clearInterval(pollTimer);
      if (ringTimer) clearTimeout(ringTimer);
      if (durTimer) clearInterval(durTimer);
      offSignal?.();
      // bileşen kapanırken karşıya bitti sinyali gönder
      if (!endedRef.current) {
        endedRef.current = true;
        postSignal({ type: "end", callId, listingId, toId: otherId, video });
        emitRealtime("call:signal", { toId: otherId, callId }); // anında uyandır
        cleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callId]);

  function hangup() {
    send("end");
    finish("answered");
  }

  function toggleMic() {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    }
  }

  function toggleCam() {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setCamOn(track.enabled);
    }
  }

  const statusLabel =
    status === "ringing"
      ? "Çalıyor…"
      : status === "connecting"
        ? "Bağlanıyor…"
        : status === "connected"
          ? formatCallDuration(elapsed)
          : status === "ended"
            ? "Görüşme sonlandı"
            : "Hazırlanıyor…";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gray-900">
      {/* Uzaktaki video / avatar */}
      <div className="relative flex-1 overflow-hidden">
        {video ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`h-full w-full object-cover ${remoteReady ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}

        {(!video || !remoteReady) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-gray-800 to-gray-900 px-4 text-center sm:gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-700 text-3xl font-bold text-white sm:h-28 sm:w-28 sm:text-4xl">
              {otherAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={otherAvatar} alt="" className="h-full w-full object-cover" />
              ) : (
                otherName.charAt(0).toUpperCase()
              )}
            </div>
            <p className="max-w-[80vw] truncate text-lg font-semibold text-white sm:text-xl">{otherName}</p>
          </div>
        )}

        {/* Durum bilgisi */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur sm:top-6 sm:px-4 sm:py-1.5 sm:text-sm">
          {error || statusLabel}
        </div>

        {/* Yerel önizleme */}
        {video && (
          <div className="absolute bottom-24 right-3 h-32 w-24 overflow-hidden rounded-xl border-2 border-white/30 bg-black shadow-lg sm:bottom-6 sm:right-4 sm:h-44 sm:w-32 md:h-52 md:w-40 lg:h-60 lg:w-44">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`h-full w-full object-cover ${camOn ? "" : "hidden"}`}
            />
            {!camOn && (
              <div className="flex h-full w-full items-center justify-center px-1 text-center text-[11px] text-white/70 sm:text-xs">
                Kamera kapalı
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kontroller */}
      <div className="flex items-center justify-center gap-4 bg-black/30 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:gap-6 sm:py-6 sm:pb-6">
        <button
          onClick={toggleMic}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
            micOn ? "bg-white/15 text-white hover:bg-white/25" : "bg-white text-gray-900"
          }`}
          aria-label={micOn ? "Mikrofonu kapat" : "Mikrofonu aç"}
        >
          {micOn ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v4" />
            </svg>
          )}
        </button>

        <button
          onClick={hangup}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700 sm:h-16 sm:w-16"
          aria-label="Görüşmeyi bitir"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" transform="rotate(135 12 12)" />
          </svg>
        </button>

        {video && (
          <button
            onClick={toggleCam}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
              camOn ? "bg-white/15 text-white hover:bg-white/25" : "bg-white text-gray-900"
            }`}
            aria-label={camOn ? "Kamerayı kapat" : "Kamerayı aç"}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              {!camOn && <line x1="1" y1="1" x2="23" y2="23" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
