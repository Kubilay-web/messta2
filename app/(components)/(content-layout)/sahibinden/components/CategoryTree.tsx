import Link from "next/link";
import { Home, Briefcase, Trees, Tag, ChevronRight } from "lucide-react";
import { CATEGORY_TREE, LISTING_TYPE_NODES } from "../lib/category-tree";
import { SUBTYPE_LABEL } from "../lib/format";

const ICONS: Record<string, any> = { Home, Briefcase, Trees };

// Konut kategorisinde gösterilecek popüler alt tipler (sahibinden derinliği)
const HOME_SUBTYPES = ["RESIDENCE", "MUSTAKIL", "YAZLIK", "DUBLEX", "CIFTLIK_EVI", "YALI", "DEVREMULK"];

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

function buildHref(sp: SP, overrides: Record<string, string | undefined>) {
  const p = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => {
    if (k === "page" || k === "view" || k in overrides) return;
    (Array.isArray(v) ? v : v ? [v] : []).forEach((x) => p.append(k, x));
  });
  Object.entries(overrides).forEach(([k, val]) => val != null && val !== "" && p.set(k, val));
  const qs = p.toString();
  return `/sahibinden/ilanlar${qs ? `?${qs}` : ""}`;
}

export default function CategoryTree({
  sp,
  counts,
}: {
  sp: SP;
  counts: { byProperty: Record<string, number>; byListing: Record<string, number> };
}) {
  const activePtype = first(sp.ptype);
  const activeType = first(sp.type);
  const activeSub = first(sp.sub);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* İlan durumu */}
      <p className="px-1.5 pb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">İlan Durumu</p>
      <div className="mb-3 flex flex-wrap gap-1.5 px-1">
        <Link
          href={buildHref(sp, { type: undefined })}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${!activeType ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          Tümü
        </Link>
        {LISTING_TYPE_NODES.map((lt) => (
          <Link
            key={lt.key}
            href={buildHref(sp, { type: lt.key })}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${activeType === lt.key ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {lt.label}
            <span className={`text-[10px] ${activeType === lt.key ? "text-amber-100" : "text-slate-400"}`}>
              {counts.byListing[lt.key] ?? 0}
            </span>
          </Link>
        ))}
      </div>

      {/* Kategoriler */}
      <p className="px-1.5 pb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">Kategori</p>

      <Link
        href={buildHref(sp, { ptype: undefined })}
        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold transition ${!activePtype ? "bg-amber-50 text-amber-700" : "text-slate-700 hover:bg-slate-50"}`}
      >
        <Tag className="h-4 w-4 text-slate-400" /> Tüm Kategoriler
      </Link>

      <div className="mt-1 space-y-2">
        {CATEGORY_TREE.map((group) => {
          const Icon = ICONS[group.icon] ?? Home;
          const groupTotal = group.nodes.reduce((s, n) => s + (counts.byProperty[n.propertyTypes[0]] ?? 0), 0);
          return (
            <div key={group.label}>
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-slate-500">
                <Icon className="h-4 w-4 text-amber-500" /> {group.label}
                <span className="ml-auto text-[10px] font-medium text-slate-400">{groupTotal}</span>
              </div>
              <div className="ml-1 border-l border-slate-100 pl-2">
                {group.nodes.map((n) => {
                  const pt = n.propertyTypes[0];
                  const active = activePtype === pt;
                  return (
                    <Link
                      key={n.key}
                      href={buildHref(sp, { ptype: pt })}
                      className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition ${active ? "bg-amber-50 font-semibold text-amber-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <ChevronRight className={`h-3.5 w-3.5 ${active ? "text-amber-500" : "text-slate-300"}`} />
                      <span className="flex-1">{n.label}</span>
                      <span className="text-[11px] text-slate-400">{counts.byProperty[pt] ?? 0}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Konut alt tipleri */}
      <p className="mt-3 px-1.5 pb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">Konut Tipi</p>
      <div className="flex flex-wrap gap-1.5 px-1">
        {HOME_SUBTYPES.map((st) => (
          <Link
            key={st}
            href={buildHref(sp, { sub: activeSub === st ? undefined : st })}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${activeSub === st ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {SUBTYPE_LABEL[st]}
          </Link>
        ))}
      </div>
    </div>
  );
}
