// Bağımlılıksız OpenStreetMap gömme haritası (koordinat ya da şehir/ilçe metni ile).
import { MapPin } from "lucide-react";

export default function MapEmbed({
  lat,
  lng,
  query,
  height = 320,
}: {
  lat?: number | null;
  lng?: number | null;
  query?: string;
  height?: number;
}) {
  let src: string | null = null;

  if (lat != null && lng != null) {
    const d = 0.01;
    const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
    src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  } else if (query) {
    // Koordinat yoksa şehir/ilçe metni ile yaklaşık konum (geocode'suz: arama linki + statik kutu)
    src = null;
  }

  if (!src) {
    return (
      <a
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(query ?? "")}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
        style={{ height }}
      >
        <MapPin className="h-5 w-5 text-amber-500" /> Haritada göster: {query || "Konum"}
      </a>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <iframe
        title="Konum haritası"
        src={src}
        className="w-full"
        style={{ height, border: 0 }}
        loading="lazy"
      />
    </div>
  );
}
