"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Bell, MessageCircle, CheckCircle2, XCircle, Search, Inbox, Info, Loader2,
} from "lucide-react";
import {
  getUnreadNotificationCount, getMyNotifications, markAllNotificationsRead,
} from "../actions/notifications";

const ICONS: Record<string, any> = {
  MESSAGE: MessageCircle,
  LISTING_APPROVED: CheckCircle2,
  LISTING_REJECTED: XCircle,
  SAVED_SEARCH: Search,
  INQUIRY: Inbox,
  SYSTEM: Info,
};
const COLORS: Record<string, string> = {
  MESSAGE: "text-sky-500 bg-sky-50",
  LISTING_APPROVED: "text-emerald-500 bg-emerald-50",
  LISTING_REJECTED: "text-rose-500 bg-rose-50",
  SAVED_SEARCH: "text-amber-500 bg-amber-50",
  INQUIRY: "text-violet-500 bg-violet-50",
  SYSTEM: "text-slate-500 bg-slate-100",
};

function ago(d: string | Date) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "az önce";
  if (s < 3600) return `${Math.floor(s / 60)} dk`;
  if (s < 86400) return `${Math.floor(s / 3600)} sa`;
  return `${Math.floor(s / 86400)} g`;
}

export default function NotificationBell({ initialUnread = 0 }: { initialUnread?: number }) {
  const [unread, setUnread] = useState(initialUnread);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 20 sn'de bir okunmamış sayısını yokla (near-realtime)
  useEffect(() => {
    let alive = true;
    const poll = async () => {
      const n = await getUnreadNotificationCount();
      if (alive) setUnread(n);
    };
    const t = setInterval(poll, 20000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const openPanel = useCallback(async () => {
    setOpen((v) => !v);
    if (open) return;
    setLoading(true);
    const rows = await getMyNotifications(20);
    setItems(rows);
    setLoading(false);
    if (unread > 0) {
      await markAllNotificationsRead();
      setUnread(0);
    }
  }, [open, unread]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={openPanel}
        aria-label="Bildirimler"
        className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-800">Bildirimler</p>
            <Link href="/sahibinden/bildirimler" onClick={() => setOpen(false)} className="text-xs font-semibold text-amber-600 hover:underline">
              Tümü
            </Link>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10 text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
            ) : items.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400">Bildiriminiz yok.</p>
            ) : (
              items.map((n) => {
                const Icon = ICONS[n.type] ?? Info;
                const cls = COLORS[n.type] ?? COLORS.SYSTEM;
                const inner = (
                  <div className={`flex gap-2.5 px-4 py-3 transition hover:bg-slate-50 ${!n.readAt ? "bg-amber-50/40" : ""}`}>
                    <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${cls}`}><Icon className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                      {n.body && <p className="line-clamp-2 text-xs text-slate-500">{n.body}</p>}
                      <p className="mt-0.5 text-[10px] text-slate-400">{ago(n.createdAt)}</p>
                    </div>
                  </div>
                );
                return n.link ? (
                  <Link key={n.id} href={n.link} onClick={() => setOpen(false)} className="block border-b border-slate-50 last:border-0">{inner}</Link>
                ) : (
                  <div key={n.id} className="border-b border-slate-50 last:border-0">{inner}</div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
