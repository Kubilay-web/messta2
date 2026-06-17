import { Star } from "lucide-react";

// Salt-okunur yıldız gösterimi (yarım yıldız desteklemez, en yakın tama yuvarlar görsel olarak).
export default function StarRating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const px = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${px} ${i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
          />
        ))}
      </span>
      {value > 0 && <span className="text-sm font-bold text-slate-700">{value.toFixed(1)}</span>}
      {count != null && <span className="text-xs text-slate-400">({count})</span>}
    </span>
  );
}
