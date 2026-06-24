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

type Quality = "good" | "medium" | "poor";

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
async function acquireMedia(wantVideo: boolean, deviceIds?: { mic?: string; cam?: string }): Promise<MediaStream> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw Object.assign(new Error("insecure"), { name: "SecurityError" });
  }
  const audio: MediaTrackConstraints = deviceIds?.mic ? { deviceId: { exact: deviceIds.mic } } : {};
  const video: MediaTrackConstraints = deviceIds?.cam
    ? { deviceId: { exact: deviceIds.cam } }
    : { facingMode: "user" };
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio,
      video: wantVideo ? video : false,
    });
  } catch (e: any) {
    if (
      wantVideo &&
      ["NotFoundError", "NotReadableError", "OverconstrainedError", "TrackStartError"].includes(e?.name)
    ) {
      return navigator.mediaDevices.getUserMedia({ audio, video: false });
    }
    throw e;
  }
}

// Bir akışın anlık ses seviyesini izleyip "konuşuyor" durumunu bildirir.
// Temizleyici fonksiyon döndürür.
function createSpeakingMeter(
  ctx: AudioContext,
  stream: MediaStream,
  onChange: (speaking: boolean) => void,
): () => void {
  if (stream.getAudioTracks().length === 0) return () => {};
  let raf = 0;
  let speaking = false;
  let source: MediaStreamAudioSourceNode | null = null;
  let analyser: AnalyserNode | null = null;
  try {
    source = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
  } catch {
    return () => {};
  }
  const data = new Uint8Array(analyser.frequencyBinCount);
  let lastFlip = 0;
  const tick = () => {
    if (!analyser) return;
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    const now = performance.now();
    const next = rms > 0.045;
    // Titremeyi azaltmak için küçük histerezis + min süre.
    if (next !== speaking && now - lastFlip > 180) {
      speaking = next;
      lastFlip = now;
      onChange(speaking);
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    try {
      source?.disconnect();
      analyser?.disconnect();
    } catch {
      /* yoksay */
    }
  };
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
  const [status, setStatus] = useState<"init" | "ringing" | "connecting" | "connected" | "ended">("init");
  const [error, setError] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(video);
  const [elapsed, setElapsed] = useState(0);
  const [remoteReady, setRemoteReady] = useState(false);
  const [remoteHasVideo, setRemoteHasVideo] = useState(false);
  const [hasLocalVideo, setHasLocalVideo] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [quality, setQuality] = useState<Quality | null>(null);
  const [remoteSpeaking, setRemoteSpeaking] = useState(false);
  const [localSpeaking, setLocalSpeaking] = useState(false);

  // Cihaz seçimi
  const [showSettings, setShowSettings] = useState(false);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [cams, setCams] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [curMic, setCurMic] = useState("");
  const [curCam, setCurCam] = useState("");
  const [curSpeaker, setCurSpeaker] = useState("");

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const sockRef = useRef<Socket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteMediaRef = useRef<HTMLVideoElement>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const connectedAtRef = useRef<number | null>(null);
  const endedRef = useRef(false);
  const negotiatedRef = useRef(false);

  // Gönderici/track referansları (ekran paylaşımı + cihaz değişimi için)
  const audioSenderRef = useRef<RTCRtpSender | null>(null);
  const videoSenderRef = useRef<RTCRtpSender | null>(null);
  const cameraTrackRef = useRef<MediaStreamTrack | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Yeniden bağlanma + istatistik + ses ölçer temizleyicileri
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastStatsRef = useRef<{ lost: number; recv: number }>({ lost: 0, recv: 0 });
  const audioCtxRef = useRef<AudioContext | null>(null);
  const meterStopsRef = useRef<Array<() => void>>([]);

  const send = useCallback(
    (type: SignalType, payload?: unknown) => {
      sockRef.current?.emit("call:signal", { toId: otherId, callId, type, payload, video });
    },
    [otherId, callId, video],
  );

  const cleanup = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
    meterStopsRef.current.forEach((f) => f());
    meterStopsRef.current = [];
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    if (statsTimerRef.current) clearInterval(statsTimerRef.current);
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
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
      const duration = connectedAtRef.current ? Math.round((Date.now() - connectedAtRef.current) / 1000) : 0;
      const finalOutcome = connectedAtRef.current ? "answered" : outcome;
      cleanup();
      onClose({ outcome: finalOutcome, duration, video });
    },
    [onClose, video, cleanup],
  );

  const markConnected = useCallback(() => {
    setReconnecting(false);
    reconnectAttemptsRef.current = 0;
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (connectedAtRef.current) return;
    connectedAtRef.current = Date.now();
    setStatus("connected");
  }, []);

  // Yerel akış geldiğinde önizleme <video>'suna bağla.
  useEffect(() => {
    if (hasLocalVideo && localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
      localVideoRef.current.play().catch(() => {});
    }
  }, [hasLocalVideo, screenSharing]);

  // Cihaz listesini yükle (izin verildikten sonra etiketler dolu gelir).
  const refreshDevices = useCallback(async () => {
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      setMics(list.filter((d) => d.kind === "audioinput"));
      setCams(list.filter((d) => d.kind === "videoinput"));
      setSpeakers(list.filter((d) => d.kind === "audiooutput"));
    } catch {
      /* yoksay */
    }
  }, []);

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

    // ICE yeniden başlatma — ağ kopunca bağlantıyı tazeler (yalnız arayan yürütür).
    function restartIce() {
      const pc = pcRef.current;
      if (!pc || endedRef.current || mode !== "caller") return;
      pc.createOffer({ iceRestart: true })
        .then(async (offer) => {
          await pc.setLocalDescription(offer);
          send("offer", offer);
        })
        .catch(() => {});
    }

    function handleDisconnect() {
      if (endedRef.current || !connectedAtRef.current) return;
      setReconnecting(true);
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        const pc = pcRef.current;
        if (!pc || endedRef.current) return;
        const st = pc.iceConnectionState;
        if (st === "connected" || st === "completed") {
          setReconnecting(false);
          return;
        }
        reconnectAttemptsRef.current += 1;
        if (reconnectAttemptsRef.current > 6) {
          finish("answered"); // makul süre sonra hâlâ kopuksa bitir
          return;
        }
        restartIce();
        handleDisconnect(); // tekrar dene
      }, 2500);
    }

    async function handleSignal(sig: CallSignalMsg) {
      const pc = pcRef.current;
      if (!pc) return;
      switch (sig.type) {
        case "accept": {
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
          await pc.setRemoteDescription(sig.payload as RTCSessionDescriptionInit);
          await drainCandidates();
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          send("answer", answer);
          break;
        }
        case "answer": {
          // İlk anlaşma VE ICE-restart cevaplarını kapsar.
          if (pc.signalingState === "have-local-offer") {
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
          finish("answered");
          break;
      }
    }

    // Bağlantı kalitesi: getStats ile RTT + paket kaybı.
    async function sampleStats() {
      const pc = pcRef.current;
      if (!pc) return;
      try {
        const stats = await pc.getStats();
        let rtt: number | null = null;
        let lost = 0;
        let recv = 0;
        stats.forEach((r: any) => {
          if (r.type === "candidate-pair" && r.nominated && r.state === "succeeded") {
            if (typeof r.currentRoundTripTime === "number") rtt = r.currentRoundTripTime;
          }
          if (r.type === "inbound-rtp" && !r.isRemote) {
            lost += r.packetsLost || 0;
            recv += r.packetsReceived || 0;
          }
        });
        const prev = lastStatsRef.current;
        const dLost = Math.max(0, lost - prev.lost);
        const dRecv = Math.max(0, recv - prev.recv);
        lastStatsRef.current = { lost, recv };
        const lossRate = dRecv + dLost > 0 ? dLost / (dRecv + dLost) : 0;
        const rttMs = rtt != null ? rtt * 1000 : null;
        let q: Quality = "good";
        if ((rttMs != null && rttMs > 400) || lossRate > 0.08) q = "poor";
        else if ((rttMs != null && rttMs > 200) || lossRate > 0.02) q = "medium";
        setQuality(q);
      } catch {
        /* yoksay */
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
      const localVideoTracks = stream.getVideoTracks().length > 0;
      cameraTrackRef.current = stream.getVideoTracks()[0] ?? null;
      setHasLocalVideo(localVideoTracks);
      if (video && !localVideoTracks) setCamOn(false);
      refreshDevices();
      setCurMic(stream.getAudioTracks()[0]?.getSettings().deviceId ?? "");
      setCurCam(stream.getVideoTracks()[0]?.getSettings().deviceId ?? "");

      // Konuşan göstergesi için ses ölçerler.
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (AC) {
          const ctx: AudioContext = new AC();
          audioCtxRef.current = ctx;
          meterStopsRef.current.push(createSpeakingMeter(ctx, stream, setLocalSpeaking));
        }
      } catch {
        /* yoksay */
      }

      // 2) Peer connection
      const pc = new RTCPeerConnection({ iceServers: iceServers() });
      pcRef.current = pc;
      stream.getTracks().forEach((t) => {
        const sender = pc.addTrack(t, stream);
        if (t.kind === "audio") audioSenderRef.current = sender;
        if (t.kind === "video") videoSenderRef.current = sender;
      });
      // Görüntü gönderici yoksa (sesli arama) bir video transceiver ekle.
      // Böylece sonradan EKRAN PAYLAŞIMI yeniden anlaşma gerekmeden çalışır.
      if (!videoSenderRef.current) {
        const tr = pc.addTransceiver("video", { direction: "sendrecv" });
        videoSenderRef.current = tr.sender;
      }

      pc.onicecandidate = (e) => {
        if (e.candidate) send("ice", e.candidate.toJSON());
      };
      pc.ontrack = (e) => {
        const el = remoteMediaRef.current;
        if (el && e.streams[0]) {
          el.srcObject = e.streams[0];
          el.play().catch(() => {});
          setRemoteReady(true);
          if (e.track.kind === "video") {
            const vt = e.track;
            const update = () => setRemoteHasVideo(!vt.muted);
            vt.onunmute = update;
            vt.onmute = update;
            update();
          }
          if (e.track.kind === "audio" && audioCtxRef.current) {
            meterStopsRef.current.push(
              createSpeakingMeter(audioCtxRef.current, e.streams[0], setRemoteSpeaking),
            );
          }
        }
      };
      const onIce = () => {
        const st = pc.iceConnectionState;
        if (st === "connected" || st === "completed") markConnected();
        else if (st === "disconnected") handleDisconnect();
        else if (st === "failed") {
          setReconnecting(true);
          restartIce();
          handleDisconnect();
        }
      };
      pc.oniceconnectionstatechange = onIce;
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") markConnected();
      };

      // 3) Socket
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

      // 4) El sıkışma
      if (mode === "caller") {
        setStatus("ringing");
        sock.emit("call:ring", {
          toId: otherId,
          callId,
          listingId,
          listingTitle: listingTitle ?? "İlan",
          video,
        });
        ringTimer = setTimeout(() => {
          if (!connectedAtRef.current) {
            send("cancel");
            finish("missed");
          }
        }, 45_000);
      } else {
        setStatus("connecting");
        send("accept");
      }

      durTimer = setInterval(() => {
        if (connectedAtRef.current) setElapsed(Math.round((Date.now() - connectedAtRef.current) / 1000));
      }, 1000);
      statsTimerRef.current = setInterval(sampleStats, 3000);
    }

    setup();

    return () => {
      alive = false;
      if (ringTimer) clearTimeout(ringTimer);
      if (durTimer) clearInterval(durTimer);
      offSignal?.();
      if (!endedRef.current) {
        endedRef.current = true;
        sockRef.current?.emit("call:signal", { toId: otherId, callId, type: "end", video });
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
    const track = cameraTrackRef.current;
    if (track && !screenSharing) {
      track.enabled = !track.enabled;
      setCamOn(track.enabled);
    }
  }

  // --- Ekran paylaşımı (replaceTrack — yeniden anlaşma gerektirmez) ---------
  async function toggleScreenShare() {
    const sender = videoSenderRef.current;
    if (!sender) return;
    if (screenSharing) {
      // Kameraya geri dön (yoksa göndermeyi durdur).
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      await sender.replaceTrack(cameraTrackRef.current ?? null).catch(() => {});
      if (localVideoRef.current && localStreamRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      setScreenSharing(false);
      return;
    }
    try {
      const ds = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: false });
      const screenTrack: MediaStreamTrack = ds.getVideoTracks()[0];
      if (!screenTrack) return;
      screenStreamRef.current = ds;
      await sender.replaceTrack(screenTrack);
      // Yerel önizlemede paylaşılan ekranı göster.
      setHasLocalVideo(true);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = ds;
        localVideoRef.current.play().catch(() => {});
      }
      setScreenSharing(true);
      // Tarayıcının "paylaşımı durdur" çubuğuyla bitirilirse geri dön.
      screenTrack.onended = () => {
        const s = videoSenderRef.current;
        s?.replaceTrack(cameraTrackRef.current ?? null).catch(() => {});
        screenStreamRef.current = null;
        if (localVideoRef.current && localStreamRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
        setScreenSharing(false);
      };
    } catch {
      /* kullanıcı iptal etti ya da izin yok */
    }
  }

  // --- Cihaz değişimi ------------------------------------------------------
  async function switchMic(deviceId: string) {
    setCurMic(deviceId);
    try {
      const ns = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: deviceId } } });
      const newTrack = ns.getAudioTracks()[0];
      await audioSenderRef.current?.replaceTrack(newTrack);
      const old = localStreamRef.current?.getAudioTracks()[0];
      if (old) {
        old.stop();
        localStreamRef.current?.removeTrack(old);
      }
      localStreamRef.current?.addTrack(newTrack);
      newTrack.enabled = micOn;
    } catch {
      /* yoksay */
    }
  }

  async function switchCam(deviceId: string) {
    setCurCam(deviceId);
    try {
      const ns = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } });
      const newTrack = ns.getVideoTracks()[0];
      cameraTrackRef.current = newTrack;
      newTrack.enabled = camOn;
      const old = localStreamRef.current?.getVideoTracks()[0];
      if (old) {
        old.stop();
        localStreamRef.current?.removeTrack(old);
      }
      localStreamRef.current?.addTrack(newTrack);
      setHasLocalVideo(true);
      // Ekran paylaşımı yoksa canlı gönderiyi de değiştir.
      if (!screenSharing) {
        await videoSenderRef.current?.replaceTrack(newTrack);
        if (localVideoRef.current && localStreamRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
          localVideoRef.current.play().catch(() => {});
        }
      }
    } catch {
      /* yoksay */
    }
  }

  async function switchSpeaker(deviceId: string) {
    setCurSpeaker(deviceId);
    const el = remoteMediaRef.current as any;
    if (el && typeof el.setSinkId === "function") {
      try {
        await el.setSinkId(deviceId);
      } catch {
        /* yoksay */
      }
    }
  }

  const statusLabel = reconnecting
    ? "Yeniden bağlanıyor…"
    : status === "ringing"
      ? "Çalıyor…"
      : status === "connecting"
        ? "Bağlanıyor…"
        : status === "connected"
          ? formatCallDuration(elapsed)
          : status === "ended"
            ? "Görüşme sonlandı"
            : "Hazırlanıyor…";

  const showRemoteVideo = video && remoteReady && remoteHasVideo;
  const qualityColor =
    quality === "good" ? "bg-green-400" : quality === "medium" ? "bg-yellow-400" : "bg-red-400";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gray-950 text-white">
      {/* Üst bar */}
      <header className="flex shrink-0 items-center justify-center gap-2 px-4 py-3 sm:py-4">
        {status === "connected" && quality && (
          <span className={`h-2.5 w-2.5 rounded-full ${qualityColor}`} title={`Bağlantı: ${quality}`} />
        )}
        <span className="max-w-[70vw] truncate rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur sm:text-sm">
          {error || statusLabel}
        </span>
      </header>

      {/* Video alanı */}
      <main className="flex min-h-0 flex-1 flex-col gap-2 px-2 pb-2 sm:flex-row sm:gap-3 sm:px-3 sm:pb-3">
        {/* Uzak taraf */}
        <section
          className={`flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black ring-2 transition-colors ${
            remoteSpeaking ? "ring-green-400" : "ring-transparent"
          }`}
        >
          <video
            ref={remoteMediaRef}
            autoPlay
            playsInline
            className={showRemoteVideo ? "h-full w-full object-contain" : "hidden"}
          />
          {!showRemoteVideo && (
            <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4">
              <div
                className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-700 text-3xl font-bold ring-4 transition-colors sm:h-28 sm:w-28 sm:text-4xl ${
                  remoteSpeaking ? "ring-green-400" : "ring-transparent"
                }`}
              >
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

        {/* Yerel taraf */}
        {hasLocalVideo && (
          <section
            className={`flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black ring-2 transition-colors sm:h-auto sm:w-44 md:w-56 lg:w-72 ${
              localSpeaking ? "ring-green-400" : "ring-transparent"
            }`}
          >
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={camOn || screenSharing ? "h-full w-full object-cover" : "hidden"}
            />
            {!camOn && !screenSharing && (
              <span className="px-2 text-center text-xs text-white/70">Kamera kapalı</span>
            )}
          </section>
        )}
      </main>

      {/* Ayarlar paneli */}
      {showSettings && (
        <div className="mx-2 mb-2 space-y-2 rounded-2xl bg-white/10 p-3 text-sm backdrop-blur sm:mx-3">
          <DevicePicker label="Mikrofon" value={curMic} options={mics} onChange={switchMic} />
          {(cams.length > 0 || hasLocalVideo) && (
            <DevicePicker label="Kamera" value={curCam} options={cams} onChange={switchCam} />
          )}
          {speakers.length > 0 && (
            <DevicePicker label="Hoparlör" value={curSpeaker} options={speakers} onChange={switchSpeaker} />
          )}
        </div>
      )}

      {/* Kontroller */}
      <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:gap-4 sm:py-5">
        <CtrlButton onClick={toggleMic} active={micOn} label={micOn ? "Mikrofonu kapat" : "Mikrofonu aç"}>
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
        </CtrlButton>

        {hasLocalVideo && (
          <CtrlButton onClick={toggleCam} active={camOn} disabled={screenSharing} label={camOn ? "Kamerayı kapat" : "Kamerayı aç"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              {!camOn && <line x1="1" y1="1" x2="23" y2="23" />}
            </svg>
          </CtrlButton>
        )}

        {/* Ekran paylaşımı */}
        <CtrlButton onClick={toggleScreenShare} active={!screenSharing} highlight={screenSharing} label="Ekran paylaş">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </CtrlButton>

        {/* Bitir */}
        <button
          onClick={hangup}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700 sm:h-16 sm:w-16"
          aria-label="Görüşmeyi bitir"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" transform="rotate(135 12 12)" />
          </svg>
        </button>

        {/* Cihaz ayarları */}
        <CtrlButton onClick={() => setShowSettings((s) => !s)} active={!showSettings} highlight={showSettings} label="Cihaz ayarları">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </CtrlButton>
      </footer>
    </div>
  );
}

// --- Yardımcı bileşenler ---------------------------------------------------

function CtrlButton({
  onClick,
  active,
  highlight,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  highlight?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const base = "flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14";
  const style = highlight
    ? "bg-yellow-400 text-gray-900"
    : active
      ? "bg-white/15 text-white hover:bg-white/25"
      : "bg-white text-gray-900";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${style} ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function DevicePicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: MediaDeviceInfo[];
  onChange: (id: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-white/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded-lg bg-white/10 px-2 py-1.5 text-white outline-none [&>option]:text-gray-900"
      >
        {options.length === 0 && <option value="">Varsayılan</option>}
        {options.map((d) => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label || `${label} (${d.deviceId.slice(0, 6)})`}
          </option>
        ))}
      </select>
    </label>
  );
}
