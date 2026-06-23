// WebRTC istemci yardımcıları.
//
// Sinyalleşme TAMAMEN Socket.IO üzerinden yapılır (DB/polling YOK):
//   - "call:ring"   : arayan -> aranan (gelen arama zili)
//   - "call:signal" : iki taraf arası WebRTC sinyalleri (offer/answer/ice/...)
// Render'daki realtime sunucusu bu olayları ilgili kullanıcının odasına iletir.

export type SignalType =
  | "offer"
  | "answer"
  | "ice"
  | "accept"
  | "reject"
  | "end"
  | "busy"
  | "cancel";

// Gelen arama bilgisi (call:ring ile gelir; sunucu fromId/fromName/fromAvatar ekler).
export interface IncomingCall {
  callId: string;
  listingId: string;
  fromId: string;
  fromName: string;
  fromAvatar: string | null;
  listingTitle: string;
  video: boolean;
}

// Socket üzerinden taşınan WebRTC sinyali (sunucu fromId ekler).
export interface CallSignalMsg {
  callId: string;
  fromId: string;
  type: SignalType;
  video: boolean;
  payload?: unknown;
}

// ICE sunucuları. Kendi TURN'ünüz varsa NEXT_PUBLIC_TURN_URL ile verin; yoksa
// farklı NAT arkasındaki iki kullanıcının bağlanabilmesi için ücretsiz topluluk
// TURN sunucusu (OpenRelay) yedek olarak kullanılır. Yalnız STUN ile çoğu mobil/
// kurumsal ağda medya yolu kurulamaz ve arama "Bağlanıyor…" ekranında takılır.
export function iceServers(): RTCIceServer[] {
  const servers: RTCIceServer[] = [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
  ];

  const turnUrl = process.env.NEXT_PUBLIC_TURN_URL;
  if (turnUrl) {
    servers.push({
      urls: turnUrl,
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    });
  } else {
    servers.push(
      {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
      {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
      },
    );
  }
  return servers;
}

export function newCallId(): string {
  return `call_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatCallDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
