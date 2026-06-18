"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  categories = [],
  size = "md",
}: {
  categories?: { name: string; slug: string }[];
  size?: "md" | "lg";
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    const base = cat ? `/sahibinden/kategori/${cat}` : "/sahibinden/ara";
    const qs = params.toString();
    router.push(qs ? `${base}?${qs}` : base);
  }

  return (
    <form
      onSubmit={submit}
      className={`flex w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 ${
        size === "lg" ? "h-12 sm:h-14" : "h-10 sm:h-11"
      }`}
    >
      {categories.length > 0 && (
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="hidden border-r border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 outline-none sm:block"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      )}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Kelime, ilan no veya mağaza adı ile ara"
        className="min-w-0 flex-1 px-3 text-sm text-gray-800 outline-none sm:px-4"
      />
      <button
        type="submit"
        className="flex items-center gap-1.5 bg-yellow-400 px-4 text-sm font-semibold text-gray-900 transition hover:bg-yellow-500 sm:px-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="hidden sm:inline">Ara</span>
      </button>
    </form>
  );
}
