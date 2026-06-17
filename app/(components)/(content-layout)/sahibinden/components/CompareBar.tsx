"use client";

import Link from "next/link";
import { GitCompareArrows, X } from "lucide-react";
import { useCompare } from "./compare-store";

// Karşılaştırma seçimi varsa ekranın altında beliren yapışkan çubuk.
export default function CompareBar() {
  const { ids, clear } = useCompare();
  if (!ids.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <GitCompareArrows className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-slate-800">
            {ids.length} ilan seçildi
            <span className="ml-1 font-normal text-slate-500">(en fazla 4)</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clear}
            className="flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            <X className="h-4 w-4" /> Temizle
          </button>
          <Link
            href={`/sahibinden/karsilastir?ids=${ids.join(",")}`}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 px-4 text-sm font-bold text-white shadow"
          >
            Karşılaştır
          </Link>
        </div>
      </div>
    </div>
  );
}
