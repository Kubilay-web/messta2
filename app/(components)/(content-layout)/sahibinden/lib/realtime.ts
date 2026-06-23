"use client";

// Uygulama genelinde TEK bir Socket.IO bağlantısı (singleton).
// Render'daki realtime sunucusuna bağlanır; NEXT_PUBLIC_REALTIME_URL boşsa
// hiçbir şey yapmaz (bileşenler eski polling'e güvenli şekilde düşer).
//
// Tasarım: socket bir "anında tetikleyici"dir. Mesaj/sinyal kalıcılığı yine
// sunucu action'larında + DB'de yapılır; socket sadece karşı tarafı anında
// uyarır, böylece sürekli (3.5sn/1.2sn/5sn) polling'e gerek kalmaz.

import { io, type Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_REALTIME_URL;

let socket: Socket | null = null;
let connectPromise: Promise<Socket | null> | null = null;

async function fetchToken(): Promise<{ token: string; url: string } | null> {
  try {
    const res = await fetch("/sahibinden/api/realtime/token", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.token || !data?.url) return null;
    return { token: data.token, url: data.url };
  } catch {
    return null;
  }
}

export function isRealtimeConfigured(): boolean {
  return !!URL;
}

/** Singleton socket'i döndürür (gerekirse bağlanır). URL yoksa null. */
export async function getRealtimeSocket(): Promise<Socket | null> {
  if (!URL) return null;
  if (socket) return socket;
  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    const t = await fetchToken();
    if (!t) {
      connectPromise = null;
      return null;
    }
    const s = io(t.url, {
      auth: { token: t.token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 8000,
      timeout: 8000,
    });
    // Token kısa ömürlü; yeniden bağlanırken tazele.
    s.io.on("reconnect_attempt", async () => {
      const fresh = await fetchToken();
      if (fresh) (s.auth as any) = { token: fresh.token };
    });
    socket = s;
    connectPromise = null;
    return s;
  })();

  return connectPromise;
}

/** Olay yayınla (socket yoksa sessiz). */
export async function emitRealtime(event: string, payload?: unknown): Promise<void> {
  const s = await getRealtimeSocket();
  s?.emit(event, payload);
}

/** Olay dinle; temizleyici döndürür. Socket yoksa no-op temizleyici. */
export async function onRealtime(
  event: string,
  handler: (...args: any[]) => void,
): Promise<() => void> {
  const s = await getRealtimeSocket();
  if (!s) return () => {};
  s.on(event, handler);
  return () => s.off(event, handler);
}
