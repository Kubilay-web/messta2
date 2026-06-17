import { Search, SlidersHorizontal } from "lucide-react";
import {
  PROPERTY_TYPE_LABEL, AMENITY_DEFS, FACING_OPTIONS,
  BUILD_STATUS_LABEL, DEED_STATUS_LABEL, USAGE_STATUS_LABEL,
} from "../lib/format";
import { ROOM_OPTIONS } from "../lib/categories";
import { FEATURE_GROUPS } from "../lib/features";

type SP = Record<string, string | string[] | undefined>;

function asArray(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}
function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

// İkonsuz, sade alan. @tailwindcss/forms padding'ini ezmesin diye ! ile zorlanır.
const field =
  "h-11 w-full rounded-xl border border-slate-200 bg-white !px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";
const chip =
  "flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 transition has-[:checked]:border-amber-300 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-700";

export default function SearchForm({
  sp = {},
  cities = [],
  compact = false,
}: {
  sp?: SP;
  cities?: string[];
  compact?: boolean;
}) {
  return (
    <form
      method="get"
      action="/sahibinden/ilanlar"
      className="rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-900/5 backdrop-blur"
    >
      <div className={`grid grid-cols-2 gap-2 ${compact ? "lg:grid-cols-6" : "sm:grid-cols-3 lg:grid-cols-6"}`}>
        <input
          type="text"
          name="q"
          defaultValue={first(sp.q)}
          placeholder="Kelime, ilan no, semt ile ara…"
          className={`${field} col-span-2 text-black`}
        />

        <select name="type" defaultValue={first(sp.type)} className={field}>
          <option value="">Durum (tümü)</option>
          <option value="SALE">Satılık</option>
          <option value="RENT">Kiralık</option>
          <option value="SHORT_RENT">Günlük</option>
        </select>

        <select name="ptype" defaultValue={first(sp.ptype)} className={field}>
          <option value="">Tür (tümü)</option>
          {Object.entries(PROPERTY_TYPE_LABEL).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <input
          type="text"
          name="city"
          list="shb-cities"
          defaultValue={first(sp.city)}
          placeholder="Şehir"
          className={field}
        />
        <datalist id="shb-cities">
          {cities.map((c) => <option key={c} value={c} />)}
        </datalist>

        <button
          type="submit"
          className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-4 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition hover:opacity-95 sm:col-span-1"
        >
          <Search className="h-4 w-4" /> Ara
        </button>
      </div>

      {!compact && (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <input type="text" name="district" defaultValue={first(sp.district)} placeholder="İlçe / Semt" className={field} />
          <input type="number" name="min" defaultValue={first(sp.min)} placeholder="Min ₺" className={field} />
          <input type="number" name="max" defaultValue={first(sp.max)} placeholder="Max ₺" className={field} />

          <select name="rooms" defaultValue={first(sp.rooms)} className={field}>
            <option value="">Oda sayısı</option>
            {ROOM_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <input type="number" name="minArea" defaultValue={first(sp.minArea)} placeholder="Min m²" className={field} />

          <select name="sort" defaultValue={first(sp.sort)} className={field}>
            <option value="">En yeni</option>
            <option value="price_asc">Fiyat (artan)</option>
            <option value="price_desc">Fiyat (azalan)</option>
            <option value="popular">En çok görüntülenen</option>
          </select>

          <div className="col-span-2 flex flex-wrap gap-2 pt-1 sm:col-span-3 lg:col-span-6">
            {AMENITY_DEFS.map((a) => (
              <label key={a.key} className={chip}>
                <input type="checkbox" name="am" value={a.key} defaultChecked={asArray(sp.am).includes(a.key)} className="accent-amber-500" />
                {a.label}
              </label>
            ))}
          </div>

          {/* Gelişmiş filtreler (tapu/yapı durumu, krediye uygun, gruplu özellikler) */}
          <details className="col-span-2 sm:col-span-3 lg:col-span-6">
            <summary className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200">
              <SlidersHorizontal className="h-4 w-4 text-amber-500" /> Gelişmiş filtreler
            </summary>
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <select name="build" defaultValue={first(sp.build)} className={field}>
                  <option value="">Yapı durumu</option>
                  {Object.entries(BUILD_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select name="deed" defaultValue={first(sp.deed)} className={field}>
                  <option value="">Tapu durumu</option>
                  {Object.entries(DEED_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select name="usage" defaultValue={first(sp.usage)} className={field}>
                  <option value="">Kullanım durumu</option>
                  {Object.entries(USAGE_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "credit", label: "Krediye uygun" },
                  { name: "furnished", label: "Eşyalı" },
                  { name: "site", label: "Site içerisinde" },
                  { name: "verified", label: "Onaylı ilan" },
                ].map((c) => (
                  <label key={c.name} className={chip}>
                    <input type="checkbox" name={c.name} value="1" defaultChecked={first(sp[c.name]) === "1"} className="accent-amber-500" />
                    {c.label}
                  </label>
                ))}
              </div>

              <div>
                <p className="mb-1 text-xs font-bold text-slate-500">Cephe</p>
                <div className="flex flex-wrap gap-2">
                  {FACING_OPTIONS.map((f) => (
                    <label key={f.value} className={chip}>
                      <input type="checkbox" name="facing" value={f.value} defaultChecked={asArray(sp.facing).includes(f.value)} className="accent-amber-500" />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              {FEATURE_GROUPS.map((g) => (
                <div key={g.key}>
                  <p className="mb-1 text-xs font-bold text-slate-500">{g.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <label key={it.key} className="flex cursor-pointer items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[13px] text-slate-600 transition has-[:checked]:border-amber-300 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-700">
                        <input type="checkbox" name="feat" value={it.key} defaultChecked={asArray(sp.feat).includes(it.key)} className="accent-amber-500" />
                        {it.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </form>
  );
}
