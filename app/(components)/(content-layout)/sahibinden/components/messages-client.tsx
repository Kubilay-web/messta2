"use client";

import Link from "next/link";
import { useState, useTransition, useEffect, useRef } from "react";
import { replyMessage, markConversationRead } from "../actions";
import { formatPrice, timeAgo } from "../lib/format";

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
  messages: { id: string; content: string; mine: boolean; createdAt: string; isRead: boolean }[];
}

export default function MessagesClient({
  conversations,
  currentUserId,
}: {
  conversations: ConvDTO[];
  currentUserId: string;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(conversations[0]?.key ?? null);
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
        {conversations.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveKey(c.key)}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
              c.key === activeKey ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:bg-gray-50"
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
              <p className="truncate text-xs text-gray-600">
                {c.messages[c.messages.length - 1]?.content}
              </p>
            </div>
            {c.unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {c.unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Thread */}
      <div className={active ? "block" : "hidden md:block"}>
        {active ? (
          <Thread conv={active} onBack={() => setActiveKey(null)} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-gray-600">
            Bir konuşma seçin
          </div>
        )}
      </div>
    </div>
  );
}

function Thread({ conv, onBack }: { conv: ConvDTO; onBack: () => void }) {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(conv.messages);
  const [pending, start] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  // Sunucudan gelen mesajları (gerçek id'li) ekle; geçici (tmp-) olanları aynı içerikle değiştir.
  function mergeServer(server: ConvDTO["messages"]) {
    setMsgs((prev) => {
      const tempMine = prev.filter((m) => m.id.startsWith("tmp-"));
      const serverContents = new Set(server.filter((s) => s.mine).map((s) => s.content));
      const stillPending = tempMine.filter((t) => !serverContents.has(t.content));
      return [...server, ...stillPending];
    });
  }

  // Konuşma değişince ilk yükleme
  useEffect(() => {
    setMsgs(conv.messages);
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Canlı yenileme: 4 saniyede bir yeni mesajları çek + okundu işaretle
  useEffect(() => {
    let alive = true;
    async function poll() {
      try {
        const res = await fetch(
          `/sahibinden/api/messages?listingId=${conv.listingId}&otherId=${conv.otherId}`,
          { cache: "no-store" },
        );
        if (!res.ok) return;
        const data = await res.json();
        if (alive && Array.isArray(data.messages)) mergeServer(data.messages);
      } catch {
        /* sessizce geç */
      }
    }
    poll();
    const id = setInterval(poll, 4000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (conv.unread > 0) markConversationRead(conv.listingId, conv.otherId);
  }, [conv.key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const content = text.trim();
    setText("");
    setMsgs((prev) => [
      ...prev,
      { id: `tmp-${Date.now()}`, content, mine: true, createdAt: new Date().toISOString(), isRead: false },
    ]);
    start(async () => {
      await replyMessage(conv.listingId, conv.otherId, content);
    });
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-xl border border-gray-200 bg-white">
      {/* başlık */}
      <div className="flex items-center gap-3 border-b border-gray-100 p-3">
        <button onClick={onBack} className="md:hidden" aria-label="Geri">
          ‹
        </button>
        <div className="h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {conv.listingImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={conv.listingImage} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/sahibinden/ilan/${conv.listingId}`} className="block truncate text-sm font-semibold text-gray-800 hover:text-yellow-600">
            {conv.listingTitle}
          </Link>
          <p className="text-xs text-yellow-600">{formatPrice(conv.listingPrice, conv.listingCurrency)}</p>
        </div>
        <span className="text-xs text-gray-500">{conv.otherName}</span>
      </div>

      {/* mesajlar */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                m.mine ? "bg-yellow-400 text-gray-900" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              <p className={`mt-0.5 text-[10px] ${m.mine ? "text-gray-700" : "text-gray-600"}`}>
                {timeAgo(m.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* gönder */}
      <form onSubmit={send} className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mesaj yaz..."
          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
