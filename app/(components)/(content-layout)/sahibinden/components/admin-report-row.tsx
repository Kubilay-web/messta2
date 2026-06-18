"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { resolveReport, moderateListing } from "../actions";
import { timeAgo } from "../lib/format";

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Açık",
  REVIEWING: "İnceleniyor",
  RESOLVED: "Çözüldü",
  DISMISSED: "Reddedildi",
};

export default function AdminReportRow({ report }: { report: any }) {
  const [status, setStatus] = useState(report.status);
  const [pending, start] = useTransition();

  function resolve(next: "REVIEWING" | "RESOLVED" | "DISMISSED") {
    start(async () => {
      const res = await resolveReport(report.id, next);
      if (res.ok) setStatus(next);
    });
  }

  function removeListing() {
    start(async () => {
      await moderateListing(report.listing.id, "passivate");
      await resolveReport(report.id, "RESOLVED");
      setStatus("RESOLVED");
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex items-start gap-3">
        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {report.listing?.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={report.listing.images[0]} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/sahibinden/ilan/${report.listing?.id}`} className="truncate text-sm font-semibold text-gray-800 hover:text-yellow-600">
            {report.listing?.title ?? "İlan silinmiş"}
          </Link>
          <p className="text-sm text-red-600">
            <strong>{report.reason}</strong>
            {report.description ? ` — ${report.description}` : ""}
          </p>
          <p className="text-xs text-gray-600">
            {report.user?.displayName || report.user?.username} · {timeAgo(report.createdAt)} ·{" "}
            <span className="font-semibold">{STATUS_LABELS[status]}</span>
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={() => resolve("REVIEWING")} disabled={pending} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          İncele
        </button>
        <button onClick={removeListing} disabled={pending} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">
          İlanı Kaldır
        </button>
        <button onClick={() => resolve("DISMISSED")} disabled={pending} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          Reddet
        </button>
        <button onClick={() => resolve("RESOLVED")} disabled={pending} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100">
          Çözüldü
        </button>
      </div>
    </div>
  );
}
