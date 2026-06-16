"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Trash2, ChevronRight } from "lucide-react";
import { Badge } from "../ui";
import { activityTypeLabel, formatDateTime } from "../../lib/labels";
import { completeActivity, deleteActivity } from "../../actions/activities";

export function AgendaItem({
  agencyId,
  item,
  overdue,
}: {
  agencyId: string;
  item: any;
  overdue?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const complete = async () => {
    setBusy(true);
    try {
      await completeActivity(item.id);
      toast.success("Tamamlandı olarak işaretlendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Bu aktivite silinsin mi?")) return;
    setBusy(true);
    try {
      await deleteActivity(item.id);
      toast.success("Silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 hover:bg-muted/40 transition-colors">
      <span className={`size-2 rounded-full shrink-0 ${overdue ? "bg-red-500" : "bg-primary"}`} />
      <Link href={`/crm/agency/${agencyId}/leads/${item.leadId}`} className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{item.title}</p>
        <p className="text-xs text-muted-foreground truncate">
          {item.lead?.title} · {item.lead?.contactName}
        </p>
      </Link>
      <Badge variant="outline" className="text-[10px] shrink-0 hidden sm:inline-flex">
        {activityTypeLabel[item.type] ?? item.type}
      </Badge>
      <span
        className={`text-xs shrink-0 hidden xs:block ${
          overdue ? "text-red-500 font-medium" : "text-muted-foreground"
        }`}
      >
        {formatDateTime(item.dueAt)}
      </span>
      <button
        onClick={complete}
        disabled={busy}
        className="shrink-0 rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 disabled:opacity-50"
        aria-label="Tamamlandı"
        title="Tamamlandı olarak işaretle"
      >
        <Check className="size-4" />
      </button>
      <button
        onClick={remove}
        disabled={busy}
        className="shrink-0 rounded-md p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50"
        aria-label="Sil"
      >
        <Trash2 className="size-4" />
      </button>
      <Link href={`/crm/agency/${agencyId}/leads/${item.leadId}`} className="shrink-0">
        <ChevronRight className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}
