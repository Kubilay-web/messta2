"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "./ListingsLeaflet";

const ListingsLeaflet = dynamic(() => import("./ListingsLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] grid place-items-center rounded-2xl border bg-gray-50 text-sm text-gray-500">
      Harita yükleniyor…
    </div>
  ),
});

export default function ListingMiniMap({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  const point: MapPoint = { id: "this", title, lat, lng };
  return <ListingsLeaflet points={[point]} height={320} />;
}
