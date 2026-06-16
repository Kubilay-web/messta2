"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Home, LayoutGrid, Map as MapIcon } from "lucide-react";
import type { MapPoint } from "./ListingsLeaflet";

const ListingsLeaflet = dynamic(() => import("./ListingsLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] grid place-items-center rounded-2xl border bg-gray-50 text-sm text-gray-500">
      Harita yükleniyor…
    </div>
  ),
});

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

type Listing = {
  id: string;
  title: string;
  listingType: string;
  askingPrice: number;
  currency: string;
  monthlyRent: number | null;
  property: {
    city: string;
    district: string;
    neighborhood: string | null;
    propertyType: string;
    roomCount: string | null;
    grossArea: number | null;
    latitude: number | null;
    longitude: number | null;
    images: { url: string }[];
  } | null;
};

export default function ListingsResults({
  listings,
  basePath,
}: {
  listings: Listing[];
  basePath: string;
}) {
  const [view, setView] = useState<"list" | "map">("list");

  const points: MapPoint[] = listings
    .filter((l) => l.property?.latitude != null && l.property?.longitude != null)
    .map((l) => ({
      id: l.id,
      title: l.title,
      price: `${l.askingPrice.toLocaleString("tr-TR")} ${l.currency}`,
      lat: l.property!.latitude as number,
      lng: l.property!.longitude as number,
      href: `${basePath}/${l.id}`,
    }));

  return (
    <div className="space-y-4">
      {/* Görünüm değiştirici */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{listings.length} ilan</p>
        <div className="inline-flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            <LayoutGrid className="w-4 h-4" /> Liste
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === "map" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            <MapIcon className="w-4 h-4" /> Harita
          </button>
        </div>
      </div>

      {view === "map" ? (
        points.length > 0 ? (
          <ListingsLeaflet points={points} />
        ) : (
          <div className="h-[300px] grid place-items-center rounded-2xl border bg-gray-50 text-sm text-gray-500">
            Konum bilgisi olan ilan bulunmuyor.
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => {
            const p = l.property;
            const cover = p?.images?.[0]?.url;
            return (
              <Link key={l.id} href={`${basePath}/${l.id}`}>
                <div className="border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full bg-white">
                  <div className="relative h-48 w-full bg-gray-100">
                    {cover ? (
                      <img src={cover} alt={l.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Home className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {listingTypeLabel[l.listingType] ?? l.listingType}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col">
                    <h3 className="font-bold line-clamp-2">{l.title}</h3>
                    {p && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {p.neighborhood && `${p.neighborhood}, `}{p.district}, {p.city}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {p?.propertyType && <span className="bg-gray-100 px-2 py-0.5 rounded">{propertyTypeLabel[p.propertyType] ?? p.propertyType}</span>}
                      {p?.roomCount && <span className="bg-gray-100 px-2 py-0.5 rounded">{p.roomCount}</span>}
                      {p?.grossArea && <span className="bg-gray-100 px-2 py-0.5 rounded">{p.grossArea} m²</span>}
                    </div>
                    <p className="text-xl font-extrabold text-blue-600 mt-auto pt-2">
                      {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                      {l.monthlyRent && (
                        <span className="text-xs font-normal text-muted-foreground"> · {l.monthlyRent.toLocaleString("tr-TR")}/ay</span>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
