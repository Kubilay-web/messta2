"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents } from "react-leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TR_CENTER: [number, number] = [39.0, 35.0];

function ClickCapture({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price?: string;
  href?: string;
}

export interface MapBounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

export default function LeafletMap({
  lat,
  lng,
  onPick,
  height = 280,
  markers,
  onSearchArea,
  drawnBounds,
}: {
  lat?: number | null;
  lng?: number | null;
  onPick?: (lat: number, lng: number) => void;
  height?: number;
  markers?: MapMarker[];
  onSearchArea?: (bounds: MapBounds) => void;
  drawnBounds?: MapBounds | null;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const hasPoint = typeof lat === "number" && typeof lng === "number";
  const first = markers && markers.length > 0 ? markers[0] : null;
  const center: [number, number] = hasPoint
    ? [lat as number, lng as number]
    : first
    ? [first.lat, first.lng]
    : drawnBounds
    ? [(drawnBounds.south + drawnBounds.north) / 2, (drawnBounds.west + drawnBounds.east) / 2]
    : TR_CENTER;
  const zoom = hasPoint ? 14 : first ? 11 : drawnBounds ? 12 : 5;

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: "100%", borderRadius: 12 }}
        scrollWheelZoom={false}
        ref={(m) => {
          if (m) mapRef.current = m;
        }}
      >
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hasPoint && <Marker position={center} icon={markerIcon} />}
        {drawnBounds && (
          <Rectangle
            bounds={[
              [drawnBounds.south, drawnBounds.west],
              [drawnBounds.north, drawnBounds.east],
            ]}
            pathOptions={{ color: "#f59e0b", weight: 2, fillOpacity: 0.08 }}
          />
        )}
        {markers?.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={markerIcon}>
            <Popup>
              <a href={m.href} className="block font-semibold text-gray-800">{m.title}</a>
              {m.price && <span className="text-yellow-600">{m.price}</span>}
            </Popup>
          </Marker>
        ))}
        {onPick && <ClickCapture onPick={onPick} />}
      </MapContainer>

      {onSearchArea && (
        <button
          type="button"
          onClick={() => {
            const b = mapRef.current?.getBounds();
            if (b) {
              onSearchArea({
                south: b.getSouth(),
                west: b.getWest(),
                north: b.getNorth(),
                east: b.getEast(),
              });
            }
          }}
          style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}
          className="rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-md hover:bg-yellow-300"
        >
          🔍 Bu alanda ara
        </button>
      )}
    </div>
  );
}
