"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { listingPrice, listingTypeLabel, locationText, propertyTypeLabel } from "./labels";

type Pt = {
  id: string;
  title: string;
  listingType: string;
  askingPrice?: number | null;
  monthlyRent?: number | null;
  currency?: string | null;
  property?: {
    city?: string | null;
    district?: string | null;
    propertyType?: string | null;
    roomCount?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    images?: { url: string }[];
  } | null;
};

function priceIcon(text: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:#2563eb;color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:9999px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.3);transform:translate(-50%,-100%)">${text}</div>`,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
  });
}

export default function LeafletMap({ listings }: { listings: Pt[] }) {
  const pts = listings.filter(
    (l) => l.property?.latitude != null && l.property?.longitude != null,
  );

  const center: [number, number] = pts.length
    ? [pts[0].property!.latitude as number, pts[0].property!.longitude as number]
    : [39.0, 35.2]; // Türkiye merkezi

  return (
    <MapContainer
      center={center as any}
      zoom={pts.length ? 11 : 6}
      scrollWheelZoom
      style={{ height: 540, width: "100%" }}
      className="z-0 overflow-hidden rounded-2xl border"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {pts.map((l) => (
        <Marker
          key={l.id}
          position={[l.property!.latitude as number, l.property!.longitude as number] as any}
          icon={priceIcon(listingPrice(l))}
        >
          <Popup>
            <Link href={`/realestate/property/${l.id}`} className="block w-48">
              {l.property?.images?.[0]?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.property.images[0].url} alt="" className="mb-1 h-24 w-full rounded object-cover" />
              )}
              <p className="text-sm font-bold text-blue-700">{listingPrice(l)}</p>
              <p className="text-xs font-medium">{l.title}</p>
              <p className="text-[11px] text-gray-500">
                {l.property?.propertyType ? `${propertyTypeLabel[l.property.propertyType]} · ` : ""}
                {locationText(l.property)}
              </p>
              <span className="mt-1 inline-block text-[11px] text-blue-600 underline">İlanı gör →</span>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
