"use client";

import { useMemo, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, LocateFixed, Loader2 } from "lucide-react";
import { listingPrice, locationText, PROPERTY_TYPE_LABEL, LISTING_TYPE_LABEL } from "../lib/format";

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
    neighborhood?: string | null;
    propertyType?: string | null;
    roomCount?: string | null;
    grossArea?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    images?: { url: string }[];
  } | null;
};

function priceIcon(text: string) {
  return L.divIcon({
    className: "",
    html: `<div style="background:#f59e0b;color:#fff;font-size:11px;font-weight:800;padding:4px 9px;border-radius:9999px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.35);transform:translate(-50%,-100%);border:1.5px solid #fff">${text}</div>`,
    iconSize: [1, 1],
    iconAnchor: [0, 0],
  });
}

function clusterIcon(count: number) {
  const size = count > 50 ? 52 : count > 10 ? 46 : 40;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:radial-gradient(circle at 30% 30%,#fb923c,#ea580c);color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:9999px;box-shadow:0 3px 10px rgba(234,88,12,.45);transform:translate(-50%,-50%);border:2px solid #fff">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [0, 0],
  });
}

function shortPrice(l: Pt) {
  const cur = l.currency ?? "TRY";
  const sym = cur === "USD" ? "$" : cur === "EUR" ? "€" : "₺";
  const val = (l.listingType === "RENT" || l.listingType === "SHORT_RENT") && l.monthlyRent ? l.monthlyRent : l.askingPrice;
  if (val == null) return "—";
  if (val >= 1_000_000) return `${sym}${(val / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (val >= 1_000) return `${sym}${Math.round(val / 1000)}B`;
  return `${sym}${val}`;
}

type Cluster = { lat: number; lng: number; items: Pt[] };

/** Konteyner-piksel ızgarasına göre kümeleme yapan ve haritayı kontrol eden katman. */
function ClusterLayer({ pts }: { pts: Pt[] }) {
  const map = useMap();
  const [tick, setTick] = useState(0);
  useMapEvents({
    moveend: () => setTick((t) => t + 1),
    zoomend: () => setTick((t) => t + 1),
  });

  const clusters = useMemo<Cluster[]>(() => {
    void tick; // her hareket/zoom'da yeniden hesapla
    const CELL = 70; // piksel
    const cells = new Map<string, Pt[]>();
    for (const p of pts) {
      const lat = p.property!.latitude as number;
      const lng = p.property!.longitude as number;
      let cp;
      try {
        cp = map.latLngToContainerPoint([lat, lng]);
      } catch {
        continue;
      }
      const key = `${Math.floor(cp.x / CELL)}:${Math.floor(cp.y / CELL)}`;
      const arr = cells.get(key);
      if (arr) arr.push(p);
      else cells.set(key, [p]);
    }
    return [...cells.values()].map((items) => {
      const lat = items.reduce((s, p) => s + (p.property!.latitude as number), 0) / items.length;
      const lng = items.reduce((s, p) => s + (p.property!.longitude as number), 0) / items.length;
      return { lat, lng, items };
    });
  }, [pts, tick, map]);

  return (
    <>
      {clusters.map((c, i) =>
        c.items.length === 1 ? (
          (() => {
            const l = c.items[0];
            return (
              <Marker key={l.id} position={[c.lat, c.lng] as any} icon={priceIcon(shortPrice(l))}>
                <Popup>
                  <Link href={`/sahibinden/ilan/${l.id}`} className="block w-48">
                    {l.property?.images?.[0]?.url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={l.property.images[0].url} alt={l.title} className="mb-1.5 h-24 w-full rounded-md object-cover" />
                    )}
                    <p className="line-clamp-1 text-[13px] font-bold text-slate-900">{l.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {LISTING_TYPE_LABEL[l.listingType] ?? l.listingType}
                      {l.property?.propertyType ? ` • ${PROPERTY_TYPE_LABEL[l.property.propertyType] ?? l.property.propertyType}` : ""}
                    </p>
                    <p className="text-[11px] text-slate-500">{locationText(l.property)}</p>
                    <p className="mt-0.5 text-sm font-extrabold text-amber-600">{listingPrice(l)}</p>
                  </Link>
                </Popup>
              </Marker>
            );
          })()
        ) : (
          <Marker
            key={`c-${i}`}
            position={[c.lat, c.lng] as any}
            icon={clusterIcon(c.items.length)}
            eventHandlers={{ click: () => map.flyTo([c.lat, c.lng], Math.min(map.getZoom() + 2, 18)) }}
          />
        ),
      )}
    </>
  );
}

/** "Bu alanda ara" — mevcut harita sınırlarını URL'ye yazar. */
function AreaSearchButton() {
  const map = useMap();
  const router = useRouter();
  const params = useSearchParams();

  const onClick = useCallback(() => {
    const b = map.getBounds();
    const p = new URLSearchParams(params.toString());
    p.set("minLat", b.getSouth().toFixed(5));
    p.set("maxLat", b.getNorth().toFixed(5));
    p.set("minLng", b.getWest().toFixed(5));
    p.set("maxLng", b.getEast().toFixed(5));
    p.set("view", "map");
    p.delete("page");
    router.push(`/sahibinden/ilanlar?${p.toString()}`);
  }, [map, router, params]);

  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 top-3 z-[500] flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-lg ring-1 ring-slate-200 transition hover:bg-amber-50 hover:text-amber-700"
    >
      <Search className="h-4 w-4 text-amber-500" /> Bu alanda ara
    </button>
  );
}

/** "Yakınımdakiler" — tarayıcı konumundan bbox üretir. */
function NearMeButton() {
  const router = useRouter();
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);

  const onClick = () => {
    if (!navigator.geolocation) { alert("Tarayıcınız konum desteklemiyor."); return; }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const dLat = 0.05, dLng = 0.07; // ~5-6 km
        const p = new URLSearchParams(params.toString());
        p.set("minLat", (latitude - dLat).toFixed(5));
        p.set("maxLat", (latitude + dLat).toFixed(5));
        p.set("minLng", (longitude - dLng).toFixed(5));
        p.set("maxLng", (longitude + dLng).toFixed(5));
        p.set("view", "map");
        p.delete("page");
        router.push(`/sahibinden/ilanlar?${p.toString()}`);
      },
      () => { setBusy(false); alert("Konum alınamadı. Lütfen izin verin."); },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="absolute right-3 top-3 z-[500] flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-slate-800 shadow-lg ring-1 ring-slate-200 transition hover:bg-amber-50 hover:text-amber-700 disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4 text-amber-500" />} Yakınımdakiler
    </button>
  );
}

export default function ListingsMap({ listings }: { listings: Pt[] }) {
  const pts = listings.filter((l) => l.property?.latitude != null && l.property?.longitude != null);

  const center: [number, number] = pts.length
    ? [pts[0].property!.latitude as number, pts[0].property!.longitude as number]
    : [39.0, 35.2]; // Türkiye merkezi

  return (
    <div className="relative">
      <MapContainer
        center={center as any}
        zoom={pts.length ? 11 : 6}
        scrollWheelZoom
        style={{ height: 600, width: "100%" }}
        className="z-0 overflow-hidden rounded-2xl border border-slate-200"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        <ClusterLayer pts={pts} />
        <AreaSearchButton />
        <NearMeButton />
      </MapContainer>

      {pts.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 top-16 z-[400] mx-auto w-fit rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow">
          Bu sonuçlarda haritada gösterilecek konumlu ilan yok.
        </div>
      )}
    </div>
  );
}
