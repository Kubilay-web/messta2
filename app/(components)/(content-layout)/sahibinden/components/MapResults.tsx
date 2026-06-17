"use client";

import dynamic from "next/dynamic";

// react-leaflet yalnızca istemcide çalışır → SSR kapalı dinamik import.
const ListingsMap = dynamic(() => import("./ListingsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-400">
      Harita yükleniyor…
    </div>
  ),
});

export default function MapResults({ listings }: { listings: any[] }) {
  return <ListingsMap listings={listings} />;
}
