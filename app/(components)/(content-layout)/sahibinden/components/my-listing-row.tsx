"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteListing, setListingStatus, renewListing } from "../actions";
import { formatPrice, formatDate, timeAgo } from "../lib/format";
import { STATUS_LABELS } from "../lib/categories";
import DopingDialog, { type DopingPackage } from "./doping-dialog";
import ListingSubscribeDialog, { type ListingPlanVM } from "./listing-subscribe-dialog";

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  PASSIVE: "bg-gray-100 text-gray-600",
  SOLD: "bg-blue-50 text-blue-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  REJECTED: "bg-red-50 text-red-700",
  EXPIRED: "bg-orange-50 text-orange-700",
  DRAFT: "bg-gray-100 text-gray-500",
};

export default function MyListingRow({
  listing,
  dopingPackages = [],
  subscriptionPlans = [],
  walletBalance = 0,
  paypalEnabled = false,
}: {
  listing: any;
  dopingPackages?: DopingPackage[];
  subscriptionPlans?: ListingPlanVM[];
  walletBalance?: number;
  paypalEnabled?: boolean;
}) {
  const [status, setStatus] = useState(listing.status);
  const [deleted, setDeleted] = useState(false);
  const [pending, start] = useTransition();
  const [confirm, setConfirm] = useState(false);

  if (deleted) return null;

  const [expiresAt, setExpiresAt] = useState<string | null>(listing.expiresAt ?? null);
  const isExpired = status === "EXPIRED" || (expiresAt && new Date(expiresAt) < new Date());
  const daysLeft = expiresAt ? Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000) : null;

  function changeStatus(next: string) {
    start(async () => {
      const res = await setListingStatus(listing.id, next);
      if (res.ok) setStatus(next);
    });
  }

  function renew() {
    start(async () => {
      const res = await renewListing(listing.id);
      if (res.ok) {
        setStatus("ACTIVE");
        setExpiresAt(new Date(Date.now() + 30 * 86400000).toISOString());
      }
    });
  }

  function remove() {
    start(async () => {
      const res = await deleteListing(listing.id);
      if (res.ok) setDeleted(true);
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
      <Link href={`/sahibinden/ilan/${listing.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {listing.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.images[0]} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-800">{listing.title}</p>
          <p className="text-sm font-bold text-yellow-600">{formatPrice(listing.price, listing.currency)}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className={`rounded px-1.5 py-0.5 font-semibold ${STATUS_COLORS[status]}`}>
              {STATUS_LABELS[status]}
            </span>
            <span>{listing.viewCount ?? 0} görüntülenme</span>
            <span>•</span>
            <span>{timeAgo(listing.createdAt)}</span>
            {expiresAt && !isExpired && daysLeft !== null && daysLeft <= 7 && (
              <span className="font-semibold text-orange-600">• {daysLeft} gün kaldı</span>
            )}
            {isExpired && <span className="font-semibold text-red-500">• Süresi doldu</span>}
          </div>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        {(isExpired || status === "PASSIVE") && (
          <button
            onClick={renew}
            disabled={pending}
            className="rounded-lg border border-green-300 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100"
          >
            🔄 Yenile
          </button>
        )}
        {dopingPackages.length > 0 && status === "ACTIVE" && (
          <DopingDialog listingId={listing.id} packages={dopingPackages} />
        )}
        {subscriptionPlans.length > 0 && status === "ACTIVE" && (
          <ListingSubscribeDialog
            listingId={listing.id}
            plans={subscriptionPlans}
            walletBalance={walletBalance}
            paypalEnabled={paypalEnabled}
          />
        )}
        <Link
          href={`/sahibinden/ilan/${listing.id}/duzenle`}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Düzenle
        </Link>
        {status === "ACTIVE" ? (
          <button
            onClick={() => changeStatus("PASSIVE")}
            disabled={pending}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Yayından Kaldır
          </button>
        ) : (
          <button
            onClick={() => changeStatus("ACTIVE")}
            disabled={pending}
            className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
          >
            Yayınla
          </button>
        )}
        {status !== "SOLD" && (
          <button
            onClick={() => changeStatus("SOLD")}
            disabled={pending}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
          >
            Satıldı
          </button>
        )}
        {confirm ? (
          <span className="flex items-center gap-1">
            <button onClick={remove} disabled={pending} className="rounded-lg bg-red-500 px-2 py-1.5 text-xs font-semibold text-white">
              Sil?
            </button>
            <button onClick={() => setConfirm(false)} className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs">
              İptal
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
}
