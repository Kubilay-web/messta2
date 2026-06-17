import Link from "next/link";
import { MessageCircle, Building2, ChevronRight, LogIn } from "lucide-react";
import type { Metadata } from "next";
import AutoRefresh from "../components/AutoRefresh";
import { getMyThreads } from "../actions/messages";
import { getMarketUser } from "../lib/auth";
import { timeAgo } from "../lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mesajlarım — sahibinden" };

export default async function MessagesPage() {
  const user = await getMarketUser();
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <MessageCircle className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h1 className="text-xl font-bold text-slate-800">Mesajlarım</h1>
        <p className="mt-1 text-sm text-slate-500">Mesajlarınızı görmek için giriş yapın.</p>
        <Link href="/estate/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
          <LogIn className="h-4 w-4" /> Giriş Yap
        </Link>
      </div>
    );
  }

  const threads = await getMyThreads();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <AutoRefresh seconds={15} />
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <MessageCircle className="h-6 w-6 text-amber-500" /> Mesajlarım
      </h1>
      <p className="mt-0.5 text-sm text-slate-500">{threads.length} konuşma</p>

      {threads.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <MessageCircle className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Henüz mesajınız yok</p>
          <p className="mt-1 text-sm text-slate-500">İlan detayında "Mesaj gönder" ile ilan sahibiyle iletişime geçebilirsiniz.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          {threads.map((t: any) => (
            <Link
              key={t.id}
              href={`/sahibinden/mesajlar/${t.id}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-amber-300"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {t.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.cover} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-slate-300"><Building2 className="h-6 w-6" /></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="line-clamp-1 font-bold text-slate-900">{t.listingTitle}</p>
                  <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(t.lastMessageAt)}</span>
                </div>
                <p className="text-xs text-slate-500">{t.role === "BUYER" ? "İlan sahibi ile" : t.counterpart}</p>
                <p className="line-clamp-1 text-sm text-slate-600">{t.lastMessage}</p>
              </div>
              {t.unread > 0 ? (
                <span className="grid h-6 min-w-6 shrink-0 place-items-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold text-white">{t.unread}</span>
              ) : (
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
