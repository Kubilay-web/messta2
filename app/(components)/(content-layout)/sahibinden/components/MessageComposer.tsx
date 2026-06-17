"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import { sendMessage } from "../actions/messages";

export default function MessageComposer({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const body = String(new FormData(e.currentTarget).get("body") || "");
    if (!body.trim()) return;
    setBusy(true);
    const res = await sendMessage(threadId, body);
    setBusy(false);
    if ((res as any)?.error) {
      alert((res as any).error);
      return;
    }
    formRef.current?.reset();
    router.refresh();
  };

  return (
    <form ref={formRef} onSubmit={onSend} className="flex items-end gap-2 border-t border-slate-200 bg-white p-3">
      <textarea
        name="body"
        rows={1}
        required
        placeholder="Mesajınızı yazın…"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }
        }}
        className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
      />
      <button type="submit" disabled={busy} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 disabled:opacity-60">
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
      </button>
    </form>
  );
}
