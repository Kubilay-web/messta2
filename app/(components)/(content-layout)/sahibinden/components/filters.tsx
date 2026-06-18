"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TR_CITIES, CATEGORY_ATTRIBUTES, LISTING_TYPE_LABELS, type AttrField } from "../lib/categories";

export default function Filters({
  topSlug,
  subCategories = [],
}: {
  topSlug?: string;
  subCategories?: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [minPrice, setMinPrice] = useState(sp.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(sp.get("maxPrice") ?? "");

  const attrFields: AttrField[] = (topSlug && CATEGORY_ATTRIBUTES[topSlug]) || [];

  function update(patch: Record<string, string | undefined>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function applyPrice() {
    update({ minPrice: minPrice || undefined, maxPrice: maxPrice || undefined });
  }

  function clearAll() {
    router.push(pathname);
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">Filtreler</h3>
        <button onClick={clearAll} className="text-xs font-medium text-yellow-600 hover:underline">
          Temizle
        </button>
      </div>

      {subCategories.length > 0 && (
        <Section title="Kategori">
          <div className="space-y-1">
            {subCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => router.push(`/sahibinden/kategori/${c.slug}`)}
                className="block w-full truncate text-left text-sm text-gray-600 hover:text-yellow-600"
              >
                {c.name}
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section title="İlan Tipi">
        <select
          value={sp.get("type") ?? ""}
          onChange={(e) => update({ type: e.target.value || undefined })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
        >
          <option value="">Tümü</option>
          {Object.entries(LISTING_TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Fiyat">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="min"
            className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
          />
          <span className="text-gray-600">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="max"
            className="w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full rounded-lg bg-gray-100 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
        >
          Uygula
        </button>
      </Section>

      <Section title="Şehir">
        <select
          value={sp.get("city") ?? ""}
          onChange={(e) => update({ city: e.target.value || undefined })}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
        >
          <option value="">Tüm Türkiye</option>
          {TR_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Section>

      {attrFields
        .filter((f) => f.filterable)
        .map((f) => (
          <Section key={f.key} title={f.label}>
            {f.type === "select" && f.options ? (
              <select
                value={sp.get(`a_${f.key}`) ?? ""}
                onChange={(e) => update({ [`a_${f.key}`]: e.target.value || undefined })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
              >
                <option value="">Tümü</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "boolean" ? (
              <select
                value={sp.get(`a_${f.key}`) ?? ""}
                onChange={(e) => update({ [`a_${f.key}`]: e.target.value || undefined })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
              >
                <option value="">Farketmez</option>
                <option value="true">Evet</option>
                <option value="false">Hayır</option>
              </select>
            ) : (
              <input
                defaultValue={sp.get(`a_${f.key}`) ?? ""}
                onBlur={(e) => update({ [`a_${f.key}`]: e.target.value || undefined })}
                placeholder={f.label}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
            )}
          </Section>
        ))}
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <h4 className="mb-2 text-sm font-semibold text-gray-700">{title}</h4>
      {children}
    </div>
  );
}
