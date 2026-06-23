"use client";

import Link from "next/link";
import { useState, useTransition, useEffect, useRef, useCallback } from "react";
import {
  replyMessage,
  replyImageMessage,
  markConversationRead,
  deleteMessage,
  logCallRecord,
  toggleReaction,
} from "../actions";
import { formatPrice } from "../lib/format";
import { newCallId, formatCallDuration } from "../lib/call-client";
import { getRealtimeSocket, emitRealtime } from "../lib/realtime";
import VideoCall, { type CallSummary } from "./video-call";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const EMOJIS = ["👍", "🙏", "😊", "😂", "❤️", "🔥", "👌", "🤝", "✅", "❓", "💰", "📍"];

export interface ReplyPreview {
  id: string;
  mine: boolean;
  kind?: string;
  content: string;
  imageUrl?: string | null;
  deleted?: boolean;
}

export interface MsgDTO {
  id: string;
  content: string;
  mine: boolean;
  createdAt: string;
  isRead: boolean;
  kind?: "TEXT" | "IMAGE" | "CALL";
  imageUrl?: string | null;
  callOutcome?: string | null;
  callDuration?: number | null;
  callVideo?: boolean;
  deleted?: boolean;
  editedAt?: string | null;
  reactions?: { userId: string; emoji: string }[];
  replyTo?: ReplyPreview | null;
}

export interface ConvDTO {
  key: string;
  listingId: string;
  listingTitle: string;
  listingImage: string | null;
  listingPrice: number;
  listingCurrency: string;
  otherId: string;
  otherName: string;
  otherAvatar: string | null;
  unread: number;
  messages: MsgDTO[];
}

export default function MessagesClient({
  conversations,
  currentUserId,
}: {
  conversations: ConvDTO[];
  currentUserId: string;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(conversations[0]?.key ?? null);
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.otherName.toLowerCase().includes(q) ||
      c.listingTitle.toLowerCase().includes(q) ||
      c.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  const active = conversations.find((c) => c.key === activeKey) ?? null;

  if (conversations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
        Henüz mesajınız yok.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[320px_1fr]">
      {/* Liste */}
      <div className={`space-y-2 ${active ? "hidden md:block" : "block"}`}>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Konuşmalarda ara..."
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 pl-9 text-sm outline-none focus:border-yellow-400"
          />
          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {filtered.map((c) => (
          <ConversationItem
            key={c.key}
            conv={c}
            active={c.key === activeKey}
            onSelect={() => setActiveKey(c.key)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-gray-400">Sonuç bulunamadı.</p>
        )}
      </div>

      {/* Thread */}
      <div className={active ? "block" : "hidden md:block"}>
        {active ? (
          <Thread key={active.key} conv={active} currentUserId={currentUserId} onBack={() => setActiveKey(null)} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-gray-600">
            Bir konuşma seçin
          </div>
        )}
      </div>
    </div>
  );
}

function previewText(m?: MsgDTO): string {
  if (!m) return "";
  if (m.deleted) return "Bu mesaj silindi";
  if (m.kind === "IMAGE") return "📷 Fotoğraf";
  if (m.kind === "CALL") return m.callVideo === false ? "📞 Sesli arama" : "📹 Görüntülü arama";
  return m.content;
}

function ConversationItem({
  conv: c,
  active,
  onSelect,
}: {
  conv: ConvDTO;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
        active ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {c.listingImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.listingImage} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-800">{c.otherName}</p>
        <p className="truncate text-xs text-gray-500">{c.listingTitle}</p>
        <p className="truncate text-xs text-gray-600">{previewText(c.messages[c.messages.length - 1])}</p>
      </div>
      {c.unread > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {c.unread}
        </span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
//  Konuşma penceresi
// ---------------------------------------------------------------------------

interface Presence {
  online: boolean;
  lastSeen: string | null;
  typing: boolean;
}

function Thread({ conv, currentUserId, onBack }: { conv: ConvDTO; currentUserId: string; onBack: () => void }) {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<MsgDTO[]>(conv.messages);
  const [presence, setPresence] = useState<Presence>({ online: false, lastSeen: null, typing: false });
  const [uploading, setUploading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [replyTo, setReplyTo] = useState<MsgDTO | null>(null);
  const [call, setCall] = useState<{ callId: string; video: boolean } | null>(null);
  const [pending, start] = useTransition();

  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const lastTypingSent = useRef(0);

  // Sunucu mesajlarını (gerçek id'li) birleştir; geçici (tmp-) olanları içerikle eşleştir.
  const mergeServer = useCallback((server: MsgDTO[]) => {
    setMsgs((prev) => {
      // Sunucu yanıtını id'ye göre tekilleştir — yinelenen satır gelse bile tek balon.
      const seenIds = new Set<string>();
      const uniqServer = server.filter((s) => (seenIds.has(s.id) ? false : (seenIds.add(s.id), true)));
      const tempMine = prev.filter((m) => m.id.startsWith("tmp-"));
      const serverKeys = new Set(
        uniqServer.filter((s) => s.mine).map((s) => `${s.kind ?? "TEXT"}:${s.content}:${s.imageUrl ?? ""}`),
      );
      const stillPending = tempMine.filter(
        (t) => !serverKeys.has(`${t.kind ?? "TEXT"}:${t.content}:${t.imageUrl ?? ""}`),
      );
      return [...uniqServer, ...stillPending];
    });
  }, []);

  // Konuşma değişince ilk yükleme
  useEffect(() => {
    setMsgs(conv.messages);
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Canlı yenileme + okundu + çevrimiçi/yazıyor + benim çevrimiçi pingim.
  // Socket varsa: mesaj/yazıyor/presence anında gelir, arka plan polling'i seyrekleşir.
  useEffect(() => {
    let alive = true;
    const roomId = conv.key; // her iki tarafta da aynı (kanonik conversationId)
    let socketRef: any = null;
    const offFns: Array<() => void> = [];
    let typingClear: ReturnType<typeof setTimeout> | null = null;
    let pollMs = 3500;
    let pingMs = 15000;

    async function poll() {
      try {
        const res = await fetch(
          `/sahibinden/api/messages?listingId=${conv.listingId}&otherId=${conv.otherId}`,
          { cache: "no-store" },
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        if (Array.isArray(data.messages)) mergeServer(data.messages);
        // Socket varken presence/typing'i socket olayları yönetir; poll override etmesin.
        if (!socketRef) {
          setPresence({
            online: !!data.otherOnline,
            lastSeen: data.otherLastSeenAt ?? null,
            typing: !!data.otherTyping,
          });
        }
      } catch {
        /* sessiz */
      }
    }
    function ping() {
      fetch("/sahibinden/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        cache: "no-store",
      }).catch(() => {});
    }
    let pollId: ReturnType<typeof setInterval> | null = null;
    let pingId: ReturnType<typeof setInterval> | null = null;
    function start() {
      if (pollId) return;
      poll();
      ping();
      pollId = setInterval(poll, pollMs);
      pingId = setInterval(ping, pingMs);
    }
    function stop() {
      if (pollId) clearInterval(pollId);
      if (pingId) clearInterval(pingId);
      pollId = pingId = null;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    // Socket entegrasyonu
    getRealtimeSocket().then((s) => {
      if (!alive || !s) return;
      socketRef = s;
      pollMs = 20000; // güvenlik ağı (socket asıl tetikleyici)
      pingMs = 25000;
      s.emit("conv:join", roomId);
      s.emit("presence:watch", conv.otherId);
      offFns.push(() => {
        s.emit("conv:leave", roomId);
        s.emit("presence:unwatch", conv.otherId);
      });

      const onMsg = (d: any) => {
        if (!d || d.convId === roomId) poll();
      };
      s.on("message:new", onMsg);
      offFns.push(() => s.off("message:new", onMsg));

      const onReadEvt = (d: any) => {
        if (!d || d.convId === roomId) poll();
      };
      s.on("message:read", onReadEvt);
      offFns.push(() => s.off("message:read", onReadEvt));

      const onTyping = (d: any) => {
        if (d && d.convId === roomId && d.fromId === conv.otherId) {
          setPresence((p) => ({ ...p, typing: !!d.typing }));
          if (typingClear) clearTimeout(typingClear);
          if (d.typing) typingClear = setTimeout(() => setPresence((p) => ({ ...p, typing: false })), 4000);
        }
      };
      s.on("typing", onTyping);
      offFns.push(() => s.off("typing", onTyping));

      const onPresence = (d: any) => {
        if (d && d.userId === conv.otherId) {
          setPresence((p) => ({ ...p, online: !!d.online, lastSeen: d.lastSeen ?? p.lastSeen }));
        }
      };
      s.on("presence", onPresence);
      offFns.push(() => s.off("presence", onPresence));

      // interval'leri yeni (seyrek) süreyle yeniden kur
      if (pollId) {
        clearInterval(pollId);
        pollId = setInterval(poll, pollMs);
      }
      if (pingId) {
        clearInterval(pingId);
        pingId = setInterval(ping, pingMs);
      }
    });

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      alive = false;
      stop();
      if (typingClear) clearTimeout(typingClear);
      offFns.forEach((f) => f());
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (conv.unread > 0) {
      markConversationRead(conv.listingId, conv.otherId);
      emitRealtime("message:read", { convId: conv.key }); // karşıya "okundu" bilgisini ilet
    }
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs.length, presence.typing]);

  function pingTyping() {
    const now = Date.now();
    if (now - lastTypingSent.current < 2500) return;
    lastTypingSent.current = now;
    emitRealtime("typing", { convId: conv.key, typing: true }); // anında "yazıyor…" (socket)
    fetch("/sahibinden/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId: conv.listingId, otherId: conv.otherId, typing: true }),
      cache: "no-store",
    }).catch(() => {});
  }

  function previewOf(m: MsgDTO): ReplyPreview {
    return { id: m.id, mine: m.mine, kind: m.kind, content: m.content, imageUrl: m.imageUrl, deleted: m.deleted };
  }

  function sendText(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return; // gönderim sürerken ikinci gönderimi engelle (çift mesajı önler)
    if (!text.trim()) return;
    const content = text.trim();
    const parent = replyTo;
    setText("");
    setShowEmoji(false);
    setReplyTo(null);
    setMsgs((prev) => [
      ...prev,
      {
        id: `tmp-${Date.now()}`,
        content,
        mine: true,
        createdAt: new Date().toISOString(),
        isRead: false,
        kind: "TEXT",
        replyTo: parent ? previewOf(parent) : null,
      },
    ]);
    start(async () => {
      await replyMessage(conv.listingId, conv.otherId, content, parent?.id);
      emitRealtime("message:new", { convId: conv.key }); // karşıyı anında uyandır
    });
  }

  function react(messageId: string, emoji: string) {
    // Optimistik güncelleme (kullanıcı başına tek reaksiyon; aynı emoji → kaldır)
    setMsgs((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const list = m.reactions ?? [];
        const has = list.some((r) => r.userId === currentUserId && r.emoji === emoji);
        const next = has
          ? list.filter((r) => !(r.userId === currentUserId && r.emoji === emoji))
          : [...list.filter((r) => r.userId !== currentUserId), { userId: currentUserId, emoji }];
        return { ...m, reactions: next };
      }),
    );
    toggleReaction(messageId, emoji).catch(() => {});
  }

  async function sendImage(file: File) {
    if (!CLOUD || !PRESET) {
      alert("Görsel yükleme yapılandırması eksik.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      const url: string | undefined = json.secure_url;
      if (!url) throw new Error("upload");
      const parent = replyTo;
      setReplyTo(null);
      setMsgs((prev) => [
        ...prev,
        {
          id: `tmp-${Date.now()}`,
          content: "",
          mine: true,
          createdAt: new Date().toISOString(),
          isRead: false,
          kind: "IMAGE",
          imageUrl: url,
          replyTo: parent ? previewOf(parent) : null,
        },
      ]);
      await replyImageMessage(conv.listingId, conv.otherId, url, undefined, parent?.id);
      emitRealtime("message:new", { convId: conv.key }); // karşıyı anında uyandır
    } catch {
      alert("Görsel gönderilemedi.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeMessage(id: string) {
    setMsgs((prev) => prev.map((m) => (m.id === id ? { ...m, deleted: true, content: "", imageUrl: null } : m)));
    start(async () => {
      await deleteMessage(id);
    });
  }

  function startCall(video: boolean) {
    setCall({ callId: newCallId(), video });
  }

  function handleCallClose(summary: CallSummary | null) {
    const c = call;
    setCall(null);
    if (c && summary) {
      logCallRecord({
        listingId: conv.listingId,
        otherId: conv.otherId,
        outcome: summary.outcome,
        duration: summary.duration,
        video: summary.video,
      }).catch(() => {});
    }
  }

  const presenceLabel = presence.typing
    ? "yazıyor…"
    : presence.online
      ? "çevrimiçi"
      : presence.lastSeen
        ? `son görülme ${shortTime(presence.lastSeen)}`
        : "";

  return (
    <div className="flex h-[72vh] flex-col rounded-xl border border-gray-200 bg-white">
      {/* başlık */}
      <div className="flex items-center gap-3 border-b border-gray-100 p-3">
        <button onClick={onBack} className="text-2xl leading-none text-gray-500 md:hidden" aria-label="Geri">
          ‹
        </button>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
          {conv.otherAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={conv.otherAvatar} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-bold text-gray-500">
              {conv.otherName.charAt(0).toUpperCase()}
            </span>
          )}
          {presence.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-800">{conv.otherName}</p>
          <p className={`truncate text-xs ${presence.typing ? "text-green-600" : "text-gray-400"}`}>
            {presenceLabel || conv.listingTitle}
          </p>
        </div>

        {/* arama butonları */}
        <button
          onClick={() => startCall(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-green-600"
          aria-label="Sesli ara"
          title="Sesli ara"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
        <button
          onClick={() => startCall(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
          aria-label="Görüntülü ara"
          title="Görüntülü ara"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>

      {/* ilan şeridi */}
      <Link
        href={`/sahibinden/ilan/${conv.listingId}`}
        className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100"
      >
        <div className="h-8 w-10 shrink-0 overflow-hidden rounded bg-gray-200">
          {conv.listingImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={conv.listingImage} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <span className="truncate text-xs font-medium text-gray-700">{conv.listingTitle}</span>
        <span className="ml-auto shrink-0 text-xs font-semibold text-yellow-600">
          {formatPrice(conv.listingPrice, conv.listingCurrency)}
        </span>
      </Link>

      {/* mesajlar */}
      <div className="flex-1 space-y-1 overflow-y-auto bg-gray-50/50 p-3">
        {msgs.map((m, i) => (
          <MessageBubble
            key={m.id}
            m={m}
            prev={msgs[i - 1]}
            currentUserId={currentUserId}
            onDelete={() => removeMessage(m.id)}
            onReply={() => setReplyTo(m)}
            onReact={(emoji) => react(m.id, emoji)}
          />
        ))}
        {presence.typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-gray-100 px-4 py-3">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* emoji çubuğu */}
      {showEmoji && (
        <div className="flex flex-wrap gap-1 border-t border-gray-100 p-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setText((t) => t + e)}
              className="rounded-lg px-2 py-1 text-xl hover:bg-gray-100"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* yanıt önizleme */}
      {replyTo && (
        <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50 px-3 py-2">
          <div className="h-8 w-1 shrink-0 rounded bg-yellow-400" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700">
              {replyTo.mine ? "Kendine" : conv.otherName} yanıt veriliyor
            </p>
            <p className="truncate text-xs text-gray-500">{previewText(replyTo)}</p>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="shrink-0 rounded-full px-2 py-1 text-gray-400 hover:bg-gray-200"
            aria-label="Yanıtı iptal et"
          >
            ✕
          </button>
        </div>
      )}

      {/* gönder */}
      <form onSubmit={sendText} className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) sendImage(f);
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Fotoğraf ekle"
          title="Fotoğraf ekle"
        >
          {uploading ? (
            <span className="text-[10px]">…</span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowEmoji((s) => !s)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          aria-label="Emoji"
          title="Emoji"
        >
          😊
        </button>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            pingTyping();
          }}
          placeholder="Mesaj yaz..."
          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <button
          type="submit"
          disabled={pending || !text.trim()}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          Gönder
        </button>
      </form>

      {call && (
        <VideoCall
          callId={call.callId}
          listingId={conv.listingId}
          otherId={conv.otherId}
          otherName={conv.otherName}
          otherAvatar={conv.otherAvatar}
          video={call.video}
          mode="caller"
          onClose={handleCallClose}
        />
      )}
    </div>
  );
}

const QUICK_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

function replyText(r: ReplyPreview): string {
  if (r.deleted) return "Silinen mesaj";
  if (r.kind === "IMAGE") return "📷 Fotoğraf";
  return r.content || "Mesaj";
}

function MessageBubble({
  m,
  prev,
  currentUserId,
  onDelete,
  onReply,
  onReact,
}: {
  m: MsgDTO;
  prev?: MsgDTO;
  currentUserId: string;
  onDelete: () => void;
  onReply: () => void;
  onReact: (emoji: string) => void;
}) {
  const showDay = !prev || dayKey(prev.createdAt) !== dayKey(m.createdAt);
  const [picker, setPicker] = useState(false);

  if (m.kind === "CALL") {
    return (
      <>
        {showDay && <DayDivider date={m.createdAt} />}
        <div className="flex justify-center py-1">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            <span>{m.callVideo === false ? "📞" : "📹"}</span>
            <span>{callLabel(m)}</span>
            <span className="text-gray-400">{clockTime(m.createdAt)}</span>
          </div>
        </div>
      </>
    );
  }

  // Reaksiyonları emoji bazında grupla
  const grouped = new Map<string, { count: number; mine: boolean }>();
  for (const r of m.reactions ?? []) {
    const g = grouped.get(r.emoji) ?? { count: 0, mine: false };
    g.count++;
    if (r.userId === currentUserId) g.mine = true;
    grouped.set(r.emoji, g);
  }

  return (
    <>
      {showDay && <DayDivider date={m.createdAt} />}
      <div className={`group flex items-center gap-1 ${m.mine ? "justify-end" : "justify-start"}`}>
        {/* Aksiyonlar (hover) — kendi mesajım sağda görünür diye sıralama */}
        {!m.deleted && m.mine && <BubbleActions onReply={onReply} onReact={onReact} onDelete={onDelete} mine picker={picker} setPicker={setPicker} />}

        <div className="flex flex-col">
          <div
            className={`max-w-[75%] self-start overflow-hidden rounded-2xl text-sm ${m.mine ? "ml-auto" : ""} ${
              m.deleted
                ? "bg-gray-100 italic text-gray-400"
                : m.mine
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-white text-gray-800 ring-1 ring-gray-100"
            } ${m.kind === "IMAGE" && !m.deleted ? "p-1" : "px-3 py-2"}`}
          >
            {/* Yanıt alıntısı */}
            {m.replyTo && !m.deleted && (
              <div className={`mb-1 rounded-lg border-l-2 px-2 py-1 text-xs ${m.mine ? "border-gray-700/40 bg-black/5" : "border-yellow-400 bg-gray-50"}`}>
                <p className="font-semibold opacity-70">{m.replyTo.mine ? "Siz" : "Karşı taraf"}</p>
                <p className="truncate opacity-80">{replyText(m.replyTo)}</p>
              </div>
            )}

            {m.deleted ? (
              <p className="px-2 py-1">Bu mesaj silindi</p>
            ) : m.kind === "IMAGE" && m.imageUrl ? (
              <a href={m.imageUrl} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.imageUrl} alt="" className="max-h-64 rounded-xl object-cover" />
                {m.content && <p className="px-2 py-1">{m.content}</p>}
              </a>
            ) : (
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
            )}
            <div className={`flex items-center justify-end gap-1 px-1 pb-0.5 ${m.kind === "IMAGE" ? "pt-1" : ""}`}>
              {m.editedAt && !m.deleted && <span className="text-[10px] opacity-50">düzenlendi</span>}
              <span className={`text-[10px] ${m.mine ? "text-gray-700/70" : "text-gray-400"}`}>{clockTime(m.createdAt)}</span>
              {m.mine && !m.deleted && <ReadTicks read={m.isRead} />}
            </div>
          </div>

          {/* Reaksiyon rozetleri */}
          {grouped.size > 0 && (
            <div className={`mt-0.5 flex flex-wrap gap-1 ${m.mine ? "justify-end" : "justify-start"}`}>
              {[...grouped.entries()].map(([emoji, g]) => (
                <button
                  key={emoji}
                  onClick={() => onReact(emoji)}
                  className={`flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-xs transition ${
                    g.mine ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <span>{emoji}</span>
                  {g.count > 1 && <span className="text-[10px] text-gray-500">{g.count}</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {!m.deleted && !m.mine && <BubbleActions onReply={onReply} onReact={onReact} picker={picker} setPicker={setPicker} />}
      </div>
    </>
  );
}

function BubbleActions({
  onReply,
  onReact,
  onDelete,
  mine,
  picker,
  setPicker,
}: {
  onReply: () => void;
  onReact: (emoji: string) => void;
  onDelete?: () => void;
  mine?: boolean;
  picker: boolean;
  setPicker: (v: boolean) => void;
}) {
  return (
    <div className="relative flex shrink-0 items-center gap-0.5 self-center opacity-0 transition group-hover:opacity-100">
      <button
        onClick={() => setPicker(!picker)}
        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        aria-label="Tepki ver"
        title="Tepki ver"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      </button>
      <button
        onClick={onReply}
        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        aria-label="Yanıtla"
        title="Yanıtla"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 17 4 12 9 7" />
          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
      </button>
      {mine && onDelete && (
        <button
          onClick={onDelete}
          className="rounded-full p-1 text-gray-300 hover:bg-gray-100 hover:text-red-500"
          aria-label="Sil"
          title="Sil"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      )}
      {picker && (
        <div
          className={`absolute bottom-8 z-10 flex gap-0.5 rounded-full border border-gray-200 bg-white px-1.5 py-1 shadow-lg ${mine ? "right-0" : "left-0"}`}
        >
          {QUICK_REACTIONS.map((e) => (
            <button
              key={e}
              onClick={() => {
                onReact(e);
                setPicker(false);
              }}
              className="rounded-full px-1 text-lg transition hover:scale-125"
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ReadTicks({ read }: { read: boolean }) {
  return (
    <span className={read ? "text-blue-600" : "text-gray-500/70"} title={read ? "Okundu" : "İletildi"}>
      <svg width="16" height="11" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 6l3.5 3.5L11 3" />
        {read && <path d="M7 9.5L13.5 3" />}
      </svg>
    </span>
  );
}

function DayDivider({ date }: { date: string }) {
  return (
    <div className="flex justify-center py-2">
      <span className="rounded-full bg-gray-200/70 px-3 py-0.5 text-[11px] font-medium text-gray-500">
        {dayLabel(date)}
      </span>
    </div>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400"
      style={{ animationDelay: delay }}
    />
  );
}

// ---------------------------------------------------------------------------
//  Tarih/saat yardımcıları
// ---------------------------------------------------------------------------

function dayKey(iso: string): string {
  return new Date(iso).toDateString();
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yest = new Date();
  yest.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Bugün";
  if (d.toDateString() === yest.toDateString()) return "Dün";
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function clockTime(iso: string): string {
  return new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function shortTime(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return clockTime(iso);
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(d);
}

function callLabel(m: MsgDTO): string {
  const kind = m.callVideo === false ? "Sesli arama" : "Görüntülü arama";
  if (m.callOutcome === "answered" && m.callDuration) return `${kind} · ${formatCallDuration(m.callDuration)}`;
  if (m.callOutcome === "missed") return `Cevapsız ${kind.toLowerCase()}`;
  if (m.callOutcome === "rejected") return `Reddedilen ${kind.toLowerCase()}`;
  if (m.callOutcome === "cancelled") return `İptal edilen ${kind.toLowerCase()}`;
  return kind;
}
