"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteSavedSearch } from "../actions";

export default function SavedSearchRow({ search }: { search: any }) {
  const [deleted, setDeleted] = useState(false);
  const [pending, start] = useTransition();
  if (deleted) return null;

  const q = (search.query ?? {}) as Record<string, string>;
  const base = q.categorySlug ? `/sahibinden/kategori/${q.categorySlug}` : "/sahibinden/ara";
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (k !== "categorySlug" && v != null && v !== "") params.set(k, String(v));
  }
  const href = params.toString() ? `${base}?${params}` : base;

  const summary = Object.entries(q)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <Link href={href} className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-800">🔔 {search.name}</p>
        <p className="truncate text-xs text-gray-600">{summary || "Tüm ilanlar"}</p>
      </Link>
      <div className="flex shrink-0 items-center gap-2">
        <Link href={href} className="rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-gray-900">
          Çalıştır
        </Link>
        <button
          onClick={() => start(async () => { const r = await deleteSavedSearch(search.id); if (r.ok) setDeleted(true); })}
          disabled={pending}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
