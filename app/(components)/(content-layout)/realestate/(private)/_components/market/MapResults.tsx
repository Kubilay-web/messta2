"use client";

import dynamic from "next/dynamic";
import { MapPinOff } from "lucide-react";

// Leaflet yalnızca tarayıcıda çalışır → SSR kapalı dinamik yükleme.
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[540px] items-center justify-center rounded-2xl border bg-gray-50 text-sm text-gray-400">
      Harita yükleniyor…
    </div>
  ),
});

export default function MapResults({ listings }: { listings: any[] }) {
  const withGeo = listings.filter((l) => l.property?.latitude != null && l.property?.longitude != null);

  if (withGeo.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center gap-2 rounded-2xl border bg-white text-center text-gray-500">
        <MapPinOff className="h-8 w-8 opacity-40" />
        <p>Bu sonuçlarda harita konumu bulunan ilan yok.</p>
        <p className="text-xs text-gray-400">İlan sahipleri konum ekledikçe burada görünür.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-xs text-gray-400">{withGeo.length} ilan haritada gösteriliyor.</p>
      <LeafletMap listings={listings} />
    </div>
  );
}
