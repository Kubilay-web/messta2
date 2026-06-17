import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import MessageComposer from "../../components/MessageComposer";
import AutoRefresh from "../../components/AutoRefresh";
import { getThread } from "../../actions/messages";
import { requireMarketUser } from "../../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Konuşma — sahibinden" };

function fmtTime(d: Date | string) {
  return new Date(d).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function ThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  await requireMarketUser();
  const { threadId } = await params;
  const thread = await getThread(threadId);
  if (!thread) notFound();

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-2xl flex-col px-0 sm:px-4 sm:py-4">
      <AutoRefresh seconds={8} />
      {/* Başlık */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:rounded-t-2xl">
        <Link href="/sahibinden/mesajlar" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={`/sahibinden/ilan/${thread.listingId}`} className="line-clamp-1 font-bold text-slate-900 hover:text-amber-600">
            {thread.listingTitle}
          </Link>
          <p className="text-xs text-slate-500">{thread.counterpart} ile konuşma</p>
        </div>
        <Link href={`/sahibinden/ilan/${thread.listingId}`} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" title="İlanı aç">
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 space-y-2 overflow-y-auto bg-slate-50 p-4">
        {thread.messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">Henüz mesaj yok.</p>
        ) : (
          thread.messages.map((m: any) => (
            <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                m.mine ? "rounded-br-sm bg-amber-500 text-white" : "rounded-bl-sm bg-white text-slate-800"
              }`}>
                <p className="whitespace-pre-line">{m.body}</p>
                <p className={`mt-1 text-[10px] ${m.mine ? "text-amber-100" : "text-slate-400"}`}>{fmtTime(m.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <MessageComposer threadId={thread.id} />
    </div>
  );
}
