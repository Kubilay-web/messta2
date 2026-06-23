"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Socket } from "socket.io-client";
import {
  iceServers,
  formatCallDuration,
  type SignalType,
  type CallSignalMsg,
} from "../lib/call-client";
import { getRealtimeSocket } from "../lib/realtime";

export interface CallSummary {
  outcome: "answered" | "missed" | "rejected" | "cancelled";
  duration: number;
  video: boolean;
}

// getUserMedia hatalarını kullanıcının anlayacağı Türkçe mesaja çevirir.
function mediaErrorMessage(e: any): string {
  const name = e?.name as string | undefined;
  if (e?.message === "insecure" || name === "SecurityError") {
    return "Kamera/mikrofon için güvenli bağlantı (HTTPS) gerekiyor.";
  }
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Kamera/mikrofon izni reddedildi. Tarayıcı ayarlarından izin verin.";
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return "Kamera veya mikrofon bulunamadı.";
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return "Kamera/mikrofon başka bir uygulama tarafından kullanılıyor.";
  }
  return "Kamera/mikrofona erişilemedi.";
}

// Medyayı al. Görüntülü istenip kamera yoksa/erişilemezse sesli olarak devam et.
async function acquireMedia(wantVideo: boolean): Promise<MediaStream> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw Object.assign(new Error("insecure"), { name: "SecurityError" });
  }
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: wantVideo ? { facingMode: "user" } : false,
    });
  } catch (e: any) {
    // Kamera sorunluysa sesli aramaya düş (mikrofon iznini tekrar dener).
    if (
      wantVideo &&
      ["NotFoundError", "NotReadableError", "OverconstrainedError", "TrackStartError"].includes(
        e?.name,
      )
    ) {
      return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }
    throw e;
  }
}

export default function VideoCall({
  callId,
  listingId,
  otherId,
  otherName,
  otherAvatar,
  video,
  mode,
  listingTitle,
  onClose,
}: {
  callId: string;
  listingId: string;
  otherId: string;
  otherName: string;
  otherAvatar?: string | null;
  video: boolean;
  mode: "caller" | "callee";
  listingTitle?: string;
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
  // Karşı taraftan gerçekten görüntü (video track) geldi mi.
  const [remoteHasVideo, setRemoteHasVideo] = useState(false);
  // Yerel videoda gerçekten görüntü track'i var mı (önizlemeyi göstermek için).
  const [hasLocalVideo, setHasLocalVideo] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const sockRef = useRef<Socket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  // Uzak akış HEM sesli HEM görüntülü aramada bu <video> elemanına bağlanır.
  // (Sesli aramada eleman gizlidir ama sesi çalmaya devam eder.)
  const remoteMediaRef = useRef<HTMLVideoElement>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const connectedAtRef = useRef<number | null>(null);
  const endedRef = useRef(false);
  const negotiatedRef = useRef(false); // caller: offer yalnız bir kez üretilsin

  // Socket üzerinden sinyal gönder.
  const send = useCallback(
    (type: SignalType, payload?: unknown) => {
      sockRef.current?.emit("call:signal", { toId: otherId, callId, type, payload, video });
    },
    [otherId, callId, video],
  );

  const cleanup = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    try {
      pcRef.current?.close();
    } catch {
      /* yoksay */
    }
    pcRef.current = null;
  }, []);

  const finish = useCallback(
    (outcome: CallSummary["outcome"]) => {
      if (endedRef.current) return;
      endedRef.current = true;
      setStatus("ended");
      const duration = connectedAtRef.current
        ? Math.round((Date.now() - connectedAtRef.current) / 1000)
        : 0;
      // Bağlandıysak her zaman "answered" sayılır.
      const finalOutcome = connectedAtRef.current ? "answered" : outcome;
      cleanup();
      onClose({ outcome: finalOutcome, duration, video });
    },
    [onClose, video, cleanup],
  );

  // Karşı taraf bağlanınca süreyi başlat.
  const markConnected = useCallback(() => {
    if (connectedAtRef.current) return;
    connectedAtRef.current = Date.now();
    setStatus("connected");
  }, []);

  // Yerel akış geldiğinde önizleme <video>'suna bağla (eleman mount olduktan SONRA).
  useEffect(() => {
    if (hasLocalVideo && localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
      localVideoRef.current.play().catch(() => {});
    }
  }, [hasLocalVideo]);

  useEffect(() => {
    let alive = true;
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

    async function handleSignal(sig: CallSignalMsg) {
      const pc = pcRef.current;
      if (!pc) return;
      switch (sig.type) {
        case "accept": {
          // Sadece arayan: aranan kabul etti -> teklifi şimdi üret/gönder.
          if (mode !== "caller" || negotiatedRef.current) return;
          negotiatedRef.current = true;
          if (ringTimer) clearTimeout(ringTimer);
          setStatus((s) => (s === "ringing" ? "connecting" : s));
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            send("offer", offer);
          } catch {
            /* yoksay */
          }
          break;
        }
        case "offer": {
          // Sadece aranan: teklifi al, cevabı üret/gönder.
          await pc.setRemoteDescription(sig.payload as RTCSessionDescriptionInit);
          await drainCandidates();
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          send("answer", answer);
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
      // 1) Kamera/mikrofon
      let stream: MediaStream;
      try {
        stream = await acquireMedia(video);
      } catch (err) {
        if (!alive) return;
        setError(mediaErrorMessage(err));
        setStatus("ended");
        return;
      }
      if (!alive) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      localStreamRef.current = stream;
      // Görüntü track'i varsa yerel önizlemeyi göster (yoksa sesli devam).
      const localVideoTracks = stream.getVideoTracks().length > 0;
      setHasLocalVideo(localVideoTracks);
      if (video && !localVideoTracks) setCamOn(false);

      // 2) Peer connection
      const pc = new RTCPeerConnection({ iceServers: iceServers() });
      pcRef.current = pc;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));

      pc.onicecandidate = (e) => {
        if (e.candidate) send("ice", e.candidate.toJSON());
      };
      // Uzak akışı (ses + görüntü) media elemanına bağla ve çal.
      pc.ontrack = (e) => {
        const el = remoteMediaRef.current;
        if (el && e.streams[0]) {
          el.srcObject = e.streams[0];
          el.play().catch(() => {});
          setRemoteReady(true);
          // Yalnız görüntü track'i geldiyse uzak videoyu göster; aksi halde avatar kalır.
          if (e.track.kind === "video") setRemoteHasVideo(true);
        }
      };
      // Bazı tarayıcılarda connectionState "connected"a hiç geçmez; iceConnectionState
      // de izlenir ki arama gerçekten kurulunca "Bağlanıyor…" ekranında takılmasın.
      const onStateChange = () => {
        const cs = pc.connectionState;
        const ice = pc.iceConnectionState;
        if (cs === "connected" || ice === "connected" || ice === "completed") markConnected();
        else if (cs === "failed" || ice === "failed") finish("answered");
      };
      pc.onconnectionstatechange = onStateChange;
      pc.oniceconnectionstatechange = onStateChange;

      // 3) Socket (sinyal kanalı)
      const sock = await getRealtimeSocket();
      if (!alive) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      if (!sock) {
        setError("Gerçek zamanlı bağlantı kurulamadı.");
        setStatus("ended");
        cleanup();
        return;
      }
      sockRef.current = sock;
      const onSig = (data: CallSignalMsg) => {
        if (data && data.callId === callId) handleSignal(data);
      };
      sock.on("call:signal", onSig);
      offSignal = () => sock.off("call:signal", onSig);

      // 4) El sıkışmayı başlat
      if (mode === "caller") {
        setStatus("ringing");
        // Aranan kişiyi çaldır (gelen-arama dinleyicisi bunu yakalar).
        sock.emit("call:ring", {
          toId: otherId,
          callId,
          listingId,
          listingTitle: listingTitle ?? "İlan",
          video,
        });
        // 45 sn içinde cevap yoksa iptal et.
        ringTimer = setTimeout(() => {
          if (!connectedAtRef.current) {
            send("cancel");
            finish("missed");
          }
        }, 45_000);
      } else {
        // Aranan: kabul ettiğimizi bildiririz; teklif bundan sonra gelir.
        setStatus("connecting");
        send("accept");
      }

      // Süre sayacı
      durTimer = setInterval(() => {
        if (connectedAtRef.current) {
          setElapsed(Math.round((Date.now() - connectedAtRef.current) / 1000));
        }
      }, 1000);
    }

    setup();

    return () => {
      alive = false;
      if (ringTimer) clearTimeout(ringTimer);
      if (durTimer) clearInterval(durTimer);
      offSignal?.();
      // Bileşen kapanırken karşıya "bitti" sinyali gönder.
      if (!endedRef.current) {
        endedRef.current = true;
        sockRef.current?.emit("call:signal", {
          toId: otherId,
          callId,
          type: "end",
          video,
        });
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

  // Uzak görüntü gösterilsin mi (görüntülü arama + karşıdan video track'i geldi).
  const showRemoteVideo = video && remoteReady && remoteHasVideo;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gray-950 text-white">
      {/* Üst bar: durum / süre */}
      <header className="flex shrink-0 items-center justify-center px-4 py-3 sm:py-4">
        <span className="max-w-full truncate rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur sm:text-sm">
          {error || statusLabel}
        </span>
      </header>

      {/* Video alanı: mobilde dikey (uzak üstte, yerel altta), masaüstünde yan yana */}
      <main className="flex min-h-0 flex-1 flex-col gap-2 px-2 pb-2 sm:flex-row sm:gap-3 sm:px-3 sm:pb-3">
        {/* Uzak taraf */}
        <section className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black">
          {/* Uzak <video> HER ZAMAN DOM'da: sesli aramada gizli ama sesi çalar. */}
          <video
            ref={remoteMediaRef}
            autoPlay
            playsInline
            className={showRemoteVideo ? "h-full w-full object-contain" : "hidden"}
          />
          {/* Görüntü yokken (sesli arama / uzak henüz gelmedi) avatar + isim */}
          {!showRemoteVideo && (
            <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-700 text-3xl font-bold sm:h-28 sm:w-28 sm:text-4xl">
                {otherAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={otherAvatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  otherName.charAt(0).toUpperCase()
                )}
              </div>
              <p className="max-w-[80vw] truncate text-lg font-semibold sm:text-xl">{otherName}</p>
            </div>
          )}
        </section>

        {/* Yerel taraf (yalnız yerel görüntü track'i varsa) */}
        {hasLocalVideo && (
          <section className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black sm:h-auto sm:w-44 md:w-56 lg:w-72">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={camOn ? "h-full w-full object-cover" : "hidden"}
            />
            {!camOn && (
              <span className="px-2 text-center text-xs text-white/70">Kamera kapalı</span>
            )}
          </section>
        )}
      </main>

      {/* Kontroller */}
      <footer className="flex shrink-0 items-center justify-center gap-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:gap-6 sm:py-5">
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

        {hasLocalVideo && (
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
      </footer>
    </div>
  );
}
