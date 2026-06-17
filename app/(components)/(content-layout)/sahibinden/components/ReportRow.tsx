"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Check, X, Eye, Loader2 } from "lucide-react";
import { updateReportStatus } from "../actions/reports";
import { REPORT_REASONS } from "../actions/reports";
import { timeAgo } from "../lib/format";

const reasonLabel = (v: string) => REPORT_REASONS.find((r) => r.value === v)?.label ?? v;

const statusBadge: Record<string, [string, string]> = {
  OPEN: ["Açık", "bg-amber-50 text-amber-600"],
  REVIEWED: ["İncelendi", "bg-emerald-50 text-emerald-600"],
  DISMISSED: ["Reddedildi", "bg-slate-100 text-slate-500"],
};

export default function ReportRow({ r }: { r: any }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const set = async (status: "OPEN" | "REVIEWED" | "DISMISSED") => {
    setBusy(true);
    await updateReportStatus(r.id, status);
    setBusy(false);
    router.refresh();
  };

  const [label, cls] = statusBadge[r.status] ?? statusBadge.OPEN;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-600">{reasonLabel(r.reason)}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${cls}`}>{label}</span>
            <span className="text-[11px] text-slate-400">{timeAgo(r.createdAt)}</span>
          </div>
          {r.listing ? (
            <Link href={`/sahibinden/ilan/${r.listingId}`} className="mt-1.5 flex items-center gap-1 font-bold text-slate-900 hover:text-amber-600">
              {r.listing.title} <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <p className="mt-1.5 font-bold text-slate-400">İlan silinmiş</p>
          )}
          {r.details && <p className="mt-1 text-sm text-slate-600">{r.details}</p>}
          <p className="mt-1 text-[11px] text-slate-400">Şikayet eden: {r.reporterName ?? "Anonim"}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          ) : (
            <>
              {r.status !== "REVIEWED" && (
                <button onClick={() => set("REVIEWED")} title="İncelendi" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-emerald-600 hover:bg-emerald-50">
                  <Check className="h-4 w-4" />
                </button>
              )}
              {r.status !== "DISMISSED" && (
                <button onClick={() => set("DISMISSED")} title="Reddet" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              )}
              {r.status !== "OPEN" && (
                <button onClick={() => set("OPEN")} title="Tekrar aç" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-amber-600 hover:bg-amber-50">
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
