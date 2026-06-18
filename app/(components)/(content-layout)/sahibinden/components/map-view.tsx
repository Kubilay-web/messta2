"use client";

import dynamic from "next/dynamic";

// Leaflet yalnızca tarayıcıda çalışır → SSR kapalı.
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-600" style={{ height: 280 }}>
      Harita yükleniyor...
    </div>
  ),
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price?: string;
  href?: string;
}

export default function MapView(props: {
  lat?: number | null;
  lng?: number | null;
  onPick?: (lat: number, lng: number) => void;
  height?: number;
  markers?: MapMarker[];
}) {
  return <LeafletMap {...props} />;
}
