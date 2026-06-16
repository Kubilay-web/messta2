import { Search, MapPin, Home, Building2, Maximize, DoorOpen, ArrowDownUp } from "lucide-react";
import { propertyTypeLabel } from "./labels";

type SP = Record<string, string | string[] | undefined>;

const AMENITIES: { key: string; label: string }[] = [
  { key: "hasElevator", label: "Asansör" },
  { key: "hasParking", label: "Otopark" },
  { key: "isFurnished", label: "Eşyalı" },
  { key: "hasBalcony", label: "Balkon" },
  { key: "hasGarden", label: "Bahçe" },
  { key: "hasPool", label: "Havuz" },
];

function asArray(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}
function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default function SearchForm({
  sp = {},
  cities = [],
  compact = false,
}: {
  sp?: SP;
  cities?: string[];
  compact?: boolean;
}) {
  const field =
    "h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
  const plain =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  const Icon = ({ as: As }: { as: any }) => (
    <As className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
  );

  return (
    <form
      method="get"
      action="/realestate/ilanlar"
      className="rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-900/5 backdrop-blur"
    >
      <div className={`grid grid-cols-2 gap-2 ${compact ? "lg:grid-cols-6" : "sm:grid-cols-3 lg:grid-cols-6"}`}>
        <div className="relative col-span-2">
          <Icon as={Search} />
          <input type="text" name="q" defaultValue={first(sp.q)} placeholder="Kelime ile ara…" className={field} />
        </div>

        <div className="relative">
          <Icon as={Home} />
          <select name="type" defaultValue={first(sp.type)} className={field}>
            <option value="">Durum</option>
            <option value="SALE">Satılık</option>
            <option value="RENT">Kiralık</option>
            <option value="SHORT_RENT">Kısa Dönem</option>
          </select>
        </div>

        <div className="relative">
          <Icon as={Building2} />
          <select name="ptype" defaultValue={first(sp.ptype)} className={field}>
            <option value="">Tür</option>
            {Object.entries(propertyTypeLabel).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Icon as={MapPin} />
          <input type="text" name="city" list="market-cities" defaultValue={first(sp.city)} placeholder="Şehir" className={field} />
          <datalist id="market-cities">
            {cities.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>

        <button
          type="submit"
          className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:opacity-95 sm:col-span-1"
        >
          <Search className="h-4 w-4" /> Ara
        </button>
      </div>

      {!compact && (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <input type="number" name="min" defaultValue={first(sp.min)} placeholder="Min ₺" className={plain} />
          <input type="number" name="max" defaultValue={first(sp.max)} placeholder="Max ₺" className={plain} />
          <div className="relative">
            <Icon as={DoorOpen} />
            <input type="text" name="rooms" defaultValue={first(sp.rooms)} placeholder="Oda (3+1)" className={field} />
          </div>
          <div className="relative">
            <Icon as={Maximize} />
            <input type="number" name="minArea" defaultValue={first(sp.minArea)} placeholder="Min m²" className={field} />
          </div>
          <input type="number" name="maxArea" defaultValue={first(sp.maxArea)} placeholder="Max m²" className={plain} />
          <div className="relative">
            <Icon as={ArrowDownUp} />
            <select name="sort" defaultValue={first(sp.sort)} className={field}>
              <option value="">En yeni</option>
              <option value="price_asc">Fiyat ↑</option>
              <option value="price_desc">Fiyat ↓</option>
            </select>
          </div>

          <div className="col-span-2 flex flex-wrap gap-2 pt-1 sm:col-span-3 lg:col-span-6">
            {AMENITIES.map((a) => (
              <label
                key={a.key}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 transition has-[:checked]:border-blue-300 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700"
              >
                <input type="checkbox" name="am" value={a.key} defaultChecked={asArray(sp.am).includes(a.key)} className="accent-blue-600" />
                {a.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
