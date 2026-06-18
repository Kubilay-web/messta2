"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { moderateListing } from "../actions";
import { formatPrice, timeAgo } from "../lib/format";
import { STATUS_LABELS } from "../lib/categories";

export default function AdminListingRow({ listing }: { listing: any }) {
  const [status, setStatus] = useState(listing.status);
  const [pending, start] = useTransition();

  function act(action: "approve" | "reject" | "passivate" | "activate") {
    start(async () => {
      const res = await moderateListing(listing.id, action);
      if (res.ok) {
        setStatus(action === "reject" ? "REJECTED" : action === "passivate" ? "PASSIVE" : "ACTIVE");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
      <Link href={`/sahibinden/ilan/${listing.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {listing.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.images[0]} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-800">{listing.title}</p>
          <p className="text-sm font-bold text-yellow-600">{formatPrice(listing.price, listing.currency)}</p>
          <p className="text-xs text-gray-600">
            {listing.user?.displayName || listing.user?.username} · {timeAgo(listing.createdAt)} ·{" "}
            <span className="font-semibold">{STATUS_LABELS[status]}</span>
          </p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => act("approve")} disabled={pending} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100">
          Onayla
        </button>
        <button onClick={() => act("reject")} disabled={pending} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">
          Reddet
        </button>
        <button onClick={() => act("passivate")} disabled={pending} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          Pasifleştir
        </button>
      </div>
    </div>
  );
}
