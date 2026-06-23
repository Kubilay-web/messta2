"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SORTS: { value: string; label: string }[] = [
  { value: "newest", label: "En Yeni" },
  { value: "price_asc", label: "Fiyat (Artan)" },
  { value: "price_desc", label: "Fiyat (Azalan)" },
  { value: "area_desc", label: "m² (Büyükten)" },
  { value: "area_asc", label: "m² (Küçükten)" },
  { value: "oldest", label: "En Eski" },
];

export default function ResultsToolbar({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const view = sp.get("view") ?? "grid";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
      <span className="text-sm text-gray-600">
        <strong className="text-gray-900">{total.toLocaleString("tr-TR")}</strong> ilan
      </span>
      <div className="flex items-center gap-2">
        <select
          value={sp.get("sort") ?? "newest"}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-yellow-400"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="hidden overflow-hidden rounded-lg border border-gray-200 sm:flex">
          <button
            onClick={() => setParam("view", "grid")}
            className={`px-2.5 py-1.5 ${view === "grid" ? "bg-yellow-400 text-gray-900" : "text-gray-500"}`}
            aria-label="Izgara görünüm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setParam("view", "list")}
            className={`px-2.5 py-1.5 ${view === "list" ? "bg-yellow-400 text-gray-900" : "text-gray-500"}`}
            aria-label="Liste görünüm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
