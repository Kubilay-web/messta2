import Link from "next/link";
import {
  Bell, MessageCircle, CheckCircle2, XCircle, Search, Inbox, Info, LogIn,
} from "lucide-react";
import type { Metadata } from "next";
import MarkAllReadButton from "../components/MarkAllReadButton";
import AutoRefresh from "../components/AutoRefresh";
import { getMyNotifications } from "../actions/notifications";
import { getMarketUser } from "../lib/auth";
import { timeAgo } from "../lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Bildirimler — sahibinden" };

const ICONS: Record<string, any> = {
  MESSAGE: MessageCircle, LISTING_APPROVED: CheckCircle2, LISTING_REJECTED: XCircle,
  SAVED_SEARCH: Search, INQUIRY: Inbox, SYSTEM: Info,
};
const COLORS: Record<string, string> = {
  MESSAGE: "text-sky-500 bg-sky-50", LISTING_APPROVED: "text-emerald-500 bg-emerald-50",
  LISTING_REJECTED: "text-rose-500 bg-rose-50", SAVED_SEARCH: "text-amber-500 bg-amber-50",
  INQUIRY: "text-violet-500 bg-violet-50", SYSTEM: "text-slate-500 bg-slate-100",
};

export default async function NotificationsPage() {
  const user = await getMarketUser();
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <Bell className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h1 className="text-xl font-bold text-slate-800">Bildirimler</h1>
        <p className="mt-1 text-sm text-slate-500">Bildirimlerinizi görmek için giriş yapın.</p>
        <Link href="/estate/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
          <LogIn className="h-4 w-4" /> Giriş Yap
        </Link>
      </div>
    );
  }

  const items = await getMyNotifications(60);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <AutoRefresh seconds={25} />
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <Bell className="h-6 w-6 text-amber-500" /> Bildirimler
        </h1>
        {items.some((n: any) => !n.readAt) && <MarkAllReadButton />}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Bell className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Henüz bildiriminiz yok</p>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          {items.map((n: any) => {
            const Icon = ICONS[n.type] ?? Info;
            const cls = COLORS[n.type] ?? COLORS.SYSTEM;
            const inner = (
              <div className={`flex gap-3 rounded-2xl border bg-white p-3.5 shadow-sm transition hover:border-amber-300 ${!n.readAt ? "border-amber-200 bg-amber-50/40" : "border-slate-200"}`}>
                <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${cls}`}><Icon className="h-4.5 w-4.5" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(n.createdAt)}</span>
                  </div>
                  {n.body && <p className="text-sm text-slate-500">{n.body}</p>}
                </div>
                {!n.readAt && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />}
              </div>
            );
            return n.link ? <Link key={n.id} href={n.link}>{inner}</Link> : <div key={n.id}>{inner}</div>;
          })}
        </div>
      )}
    </div>
  );
}
