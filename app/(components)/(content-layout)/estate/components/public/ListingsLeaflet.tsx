"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowSize:  [41, 41],
});

export type MapPoint = {
  id: string;
  title: string;
  price?: string;
  lat: number;
  lng: number;
  href?: string;
};

function FitBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export default function ListingsLeaflet({
  points,
  height = 480,
}: {
  points: MapPoint[];
  height?: number;
}) {
  // Türkiye merkez fallback
  const center: [number, number] = points.length
    ? [points[0].lat, points[0].lng]
    : [39.0, 35.0];

  return (
    <MapContainer
      center={center}
      zoom={points.length ? 12 : 6}
      style={{ height, width: "100%" }}
      scrollWheelZoom
      className="rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap katkıda bulunanlar'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />
      {points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
          <Popup>
            <div style={{ minWidth: 150 }}>
              <strong>{p.title}</strong>
              {p.price && <div style={{ marginTop: 2 }}>{p.price}</div>}
              {p.href && (
                <Link href={p.href} style={{ color: "#2563eb", display: "inline-block", marginTop: 4 }}>
                  Detayı gör →
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
