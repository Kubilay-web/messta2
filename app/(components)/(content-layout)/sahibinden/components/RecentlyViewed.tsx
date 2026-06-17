"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import ListingCard, { type CardListing } from "./ListingCard";
import { getRecentIds } from "./compare-store";
import { getListingsByIds } from "../actions/listings";

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [items, setItems] = useState<CardListing[]>([]);

  useEffect(() => {
    const ids = getRecentIds().filter((id) => id !== excludeId);
    if (!ids.length) return;
    getListingsByIds(ids).then((rows) => setItems(rows as CardListing[]));
  }, [excludeId]);

  if (!items.length) return null;

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">
        <Clock className="h-5 w-5 text-amber-500" /> Son Gezdiğiniz İlanlar
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, 4).map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </section>
  );
}
