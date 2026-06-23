"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MapView, { type MapMarker, type MapBounds } from "./map-view";

export default function ResultsMap({ markers }: { markers: MapMarker[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const bboxParam = sp.get("bbox");
  const drawnBounds = parseBbox(bboxParam);
  const [open, setOpen] = useState(!!drawnBounds);

  // Harita ne zaman gösterilebilir: ilan(lar) varsa ya da alan filtresi aktifse
  if (markers.length === 0 && !drawnBounds) return null;

  function searchArea(b: MapBounds) {
    const params = new URLSearchParams(sp.toString());
    params.set("bbox", `${b.south.toFixed(6)},${b.west.toFixed(6)},${b.north.toFixed(6)},${b.east.toFixed(6)}`);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearArea() {
    const params = new URLSearchParams(sp.toString());
    params.delete("bbox");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          🗺️ {open ? "Haritayı Gizle" : `Haritada Ara${markers.length ? ` (${markers.length})` : ""}`}
        </button>
        {drawnBounds && (
          <button
            onClick={clearArea}
            className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
          >
            📍 Alan filtresi aktif · Temizle ✕
          </button>
        )}
      </div>
      {open && (
        <div className="mt-2">
          <p className="mb-1 text-xs text-gray-500">
            Haritayı kaydırıp yakınlaştırın, ardından <strong>“Bu alanda ara”</strong> ile o bölgedeki ilanları listeleyin.
          </p>
          <MapView markers={markers} height={380} onSearchArea={searchArea} drawnBounds={drawnBounds} />
        </div>
      )}
    </div>
  );
}

function parseBbox(v: string | null): MapBounds | null {
  if (!v) return null;
  const p = v.split(",").map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n))) return null;
  return { south: p[0], west: p[1], north: p[2], east: p[3] };
}
