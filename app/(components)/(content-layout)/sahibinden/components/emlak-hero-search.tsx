"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TR_CITIES } from "../lib/categories";

const TABS = [
  { value: "SALE", label: "Satılık" },
  { value: "RENT", label: "Kiralık" },
  { value: "DAILY_RENT", label: "Günlük" },
];

export default function EmlakHeroSearch() {
  const router = useRouter();
  const [type, setType] = useState("SALE");
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (city) params.set("city", city);
    if (q.trim()) params.set("q", q.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    const qs = params.toString();
    router.push(`/sahibinden/kategori/emlak${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="w-full rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:p-4">
      {/* Tabs */}
      <div className="mb-3 flex gap-1 rounded-lg bg-gray-100 p-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
              type === t.value ? "bg-yellow-400 text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 gap-2 sm:grid-cols-12">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Kelime ile ara (ör. deniz manzaralı 2+1)"
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-yellow-400 sm:col-span-5"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-yellow-400 sm:col-span-3"
        >
          <option value="">Tüm Şehirler</option>
          {TR_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="flex gap-2 sm:col-span-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMin(e.target.value)}
            placeholder="min ₺"
            className="w-full rounded-lg border border-gray-200 px-2 py-2.5 text-sm outline-none focus:border-yellow-400"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMax(e.target.value)}
            placeholder="max ₺"
            className="w-full rounded-lg border border-gray-200 px-2 py-2.5 text-sm outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-yellow-500 sm:col-span-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Ara
        </button>
      </form>
    </div>
  );
}
