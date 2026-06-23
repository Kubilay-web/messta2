"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TR_CITIES, CATEGORY_ATTRIBUTES, LISTING_TYPE_LABELS, type AttrField } from "../lib/categories";
import { DISTRICTS_BY_PROVINCE } from "../lib/tr-locations";

export default function Filters({
  topSlug,
  subCategories = [],
  neighborhoods = [],
}: {
  topSlug?: string;
  subCategories?: { name: string; slug: string }[];
  /** Seçili il/ilçedeki aktif ilanlardan derlenen mahalle listesi (data-driven). */
  neighborhoods?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [minPrice, setMinPrice] = useState(sp.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(sp.get("maxPrice") ?? "");

  const attrFields: AttrField[] = (topSlug && CATEGORY_ATTRIBUTES[topSlug]) || [];

  const city = sp.get("city") ?? "";
  const staticDistricts = DISTRICTS_BY_PROVINCE[city];

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
          className={selectCls}
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
            className={rangeInputCls}
          />
          <span className="text-gray-600">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="max"
            className={rangeInputCls}
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
          value={city}
          onChange={(e) => update({ city: e.target.value || undefined, district: undefined, neighborhood: undefined })}
          className={selectCls}
        >
          <option value="">Tüm Türkiye</option>
          {TR_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Section>

      {/* İlçe — büyük şehirlerde seçim kutusu, diğerlerinde serbest metin */}
      {city && (
        <Section title="İlçe">
          {staticDistricts ? (
            <select
              value={sp.get("district") ?? ""}
              onChange={(e) => update({ district: e.target.value || undefined, neighborhood: undefined })}
              className={selectCls}
            >
              <option value="">Tüm İlçeler</option>
              {staticDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              defaultValue={sp.get("district") ?? ""}
              onBlur={(e) => update({ district: e.target.value.trim() || undefined, neighborhood: undefined })}
              placeholder="İlçe ara"
              className={selectCls}
            />
          )}
        </Section>
      )}

      {/* Mahalle — ilandaki gerçek mahallelerden beslenir, yoksa serbest metin */}
      {city && (
        <Section title="Mahalle">
          {neighborhoods.length > 0 ? (
            <select
              value={sp.get("neighborhood") ?? ""}
              onChange={(e) => update({ neighborhood: e.target.value || undefined })}
              className={selectCls}
            >
              <option value="">Tüm Mahalleler</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          ) : (
            <input
              defaultValue={sp.get("neighborhood") ?? ""}
              onBlur={(e) => update({ neighborhood: e.target.value.trim() || undefined })}
              placeholder="Mahalle ara"
              className={selectCls}
            />
          )}
        </Section>
      )}

      {attrFields
        .filter((f) => f.filterable)
        .map((f) => (
          <Section key={f.key} title={f.unit ? `${f.label} (${f.unit})` : f.label}>
            {f.range && f.type === "number" ? (
              <RangeNumber field={f} sp={sp} onCommit={update} />
            ) : f.multi && f.options ? (
              <MultiCheck field={f} sp={sp} onCommit={update} />
            ) : f.type === "select" && f.options ? (
              <select
                value={sp.get(`a_${f.key}`) ?? ""}
                onChange={(e) => update({ [`a_${f.key}`]: e.target.value || undefined })}
                className={selectCls}
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
                className={selectCls}
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
                className={selectCls}
              />
            )}
          </Section>
        ))}
    </aside>
  );
}

/** Sayısal min-max aralık inputu (m², bina yaşı, km, yıl ...). */
function RangeNumber({
  field,
  sp,
  onCommit,
}: {
  field: AttrField;
  sp: URLSearchParams;
  onCommit: (patch: Record<string, string | undefined>) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        defaultValue={sp.get(`a_${field.key}_min`) ?? ""}
        onBlur={(e) => onCommit({ [`a_${field.key}_min`]: e.target.value || undefined })}
        placeholder="min"
        className={rangeInputCls}
      />
      <span className="text-gray-600">-</span>
      <input
        type="number"
        defaultValue={sp.get(`a_${field.key}_max`) ?? ""}
        onBlur={(e) => onCommit({ [`a_${field.key}_max`]: e.target.value || undefined })}
        placeholder="max"
        className={rangeInputCls}
      />
    </div>
  );
}

/** Çoklu-seçim (checkbox) filtresi — örn. oda sayısı 1+1, 3+1 birlikte. */
function MultiCheck({
  field,
  sp,
  onCommit,
}: {
  field: AttrField;
  sp: URLSearchParams;
  onCommit: (patch: Record<string, string | undefined>) => void;
}) {
  const options = field.options ?? [];
  const selected = new Set(
    (sp.get(`a_${field.key}`) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

  function toggle(option: string) {
    const next = new Set(selected);
    if (next.has(option)) next.delete(option);
    else next.add(option);
    onCommit({ [`a_${field.key}`]: next.size ? Array.from(next).join(",") : undefined });
  }

  return (
    <div className="grid grid-cols-2 gap-1">
      {options.map((o) => (
        <label key={o} className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={selected.has(o)}
            onChange={() => toggle(o)}
            className="h-3.5 w-3.5 accent-yellow-500"
          />
          {o}
        </label>
      ))}
    </div>
  );
}

const selectCls =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400";
const rangeInputCls =
  "w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <h4 className="mb-2 text-sm font-semibold text-gray-700">{title}</h4>
      {children}
    </div>
  );
}
