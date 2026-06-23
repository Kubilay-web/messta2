// WebRTC istemci yardımcıları: sinyal gönder/al ve ICE sunucu yapılandırması.
// Sinyaller /sahibinden/api/messages/call üzerinden DB + polling ile taşınır.

const CALL_API = "/sahibinden/api/messages/call";

export type SignalType =
  | "ring"
  | "offer"
  | "answer"
  | "ice"
  | "accept"
  | "reject"
  | "end"
  | "busy"
  | "cancel";

export interface IncomingCall {
  callId: string;
  listingId: string;
  fromId: string;
  fromName: string;
  fromAvatar: string | null;
  listingTitle: string;
  video: boolean;
}

export interface CallSignal {
  type: SignalType;
  from: string;
  video: boolean;
  payload: unknown;
}

export async function postSignal(opts: {
  type: SignalType;
  callId: string;
  listingId: string;
  toId: string;
  payload?: unknown;
  video?: boolean;
}): Promise<void> {
  try {
    await fetch(CALL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
      cache: "no-store",
      keepalive: true, // sayfa kapanırken "end" sinyalinin gitmesi için
    });
  } catch {
    /* sinyal hatası akışı bozmasın */
  }
}

export async function pollSignals(callId: string): Promise<CallSignal[]> {
  try {
    const res = await fetch(`${CALL_API}?callId=${encodeURIComponent(callId)}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.signals) ? data.signals : [];
  } catch {
    return [];
  }
}

export async function pollIncoming(): Promise<IncomingCall | null> {
  try {
    const res = await fetch(`${CALL_API}?incoming=1`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.incoming ?? null;
  } catch {
    return null;
  }
}

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
