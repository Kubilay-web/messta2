"use client";

import { useState } from "react";
import MapView, { type MapMarker } from "./map-view";

export default function ResultsMap({ markers }: { markers: MapMarker[] }) {
  const [open, setOpen] = useState(false);
  if (markers.length === 0) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        🗺️ {open ? "Haritayı Gizle" : `Haritada Göster (${markers.length})`}
      </button>
      {open && (
        <div className="mt-2">
          <MapView markers={markers} height={360} />
        </div>
      )}
    </div>
  );
}
