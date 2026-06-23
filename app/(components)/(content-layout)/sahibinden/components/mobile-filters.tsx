"use client";

import { useState } from "react";
import Filters from "./filters";

export default function MobileFilters(props: {
  topSlug?: string;
  subCategories?: { name: string; slug: string }[];
  neighborhoods?: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        Filtrele & Sırala
      </button>

      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-gray-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold text-gray-800">Filtreler</span>
              <button onClick={() => setOpen(false)} aria-label="Kapat" className="text-gray-500">
                ✕
              </button>
            </div>
            <Filters {...props} />
            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-lg bg-yellow-400 py-2.5 font-semibold text-gray-900"
            >
              Sonuçları Göster
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
