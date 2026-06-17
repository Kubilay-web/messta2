"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GitCompareArrows, X, Building2, Check, Minus } from "lucide-react";
import { getCompareData } from "../actions/listings";
import { useCompare } from "./compare-store";
import {
  PROPERTY_TYPE_LABEL, LISTING_TYPE_LABEL, listingPrice, locationText, AMENITY_DEFS, HEATING_LABEL,
} from "../lib/format";

type Row = any;

export default function CompareClient() {
  const params = useSearchParams();
  const { ids: storeIds, remove, clear } = useCompare();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  // URL ?ids= öncelikli; yoksa localStorage seçimi
  const urlIds = (params.get("ids") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ids = urlIds.length ? urlIds : storeIds;
  const key = ids.join(",");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    if (!ids.length) {
      setRows([]);
      setLoading(false);
      return;
    }
    getCompareData(ids).then((r) => {
      if (alive) {
        setRows(r);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (loading) {
    return <div className="py-20 text-center text-sm text-slate-400">Yükleniyor…</div>;
  }

  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <GitCompareArrows className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <p className="font-semibold text-slate-700">Karşılaştırılacak ilan seçilmedi</p>
        <p className="mt-1 text-sm text-slate-500">İlan kartlarındaki karşılaştır ikonuyla en fazla 4 ilan ekleyin.</p>
        <Link href="/sahibinden/ilanlar" className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white">İlanlara git</Link>
      </div>
    );
  }

  const yesno = (v: any) =>
    v ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <Minus className="mx-auto h-4 w-4 text-slate-300" />;

  const rowsDef: { label: string; render: (r: Row) => React.ReactNode }[] = [
    { label: "Fiyat", render: (r) => <span className="font-extrabold text-amber-600">{listingPrice(r)}</span> },
    { label: "İlan Tipi", render: (r) => LISTING_TYPE_LABEL[r.listingType] ?? r.listingType },
    { label: "Emlak Tipi", render: (r) => PROPERTY_TYPE_LABEL[r.property?.propertyType] ?? "—" },
    { label: "Konum", render: (r) => locationText(r.property) || "—" },
    { label: "Oda", render: (r) => r.property?.roomCount ?? "—" },
    { label: "Brüt m²", render: (r) => (r.property?.grossArea != null ? `${r.property.grossArea} m²` : "—") },
    { label: "Net m²", render: (r) => (r.property?.netArea != null ? `${r.property.netArea} m²` : "—") },
    { label: "Banyo", render: (r) => r.property?.bathroomCount ?? "—" },
    { label: "Kat", render: (r) => r.property?.floorNo ?? "—" },
    { label: "Bina Yaşı", render: (r) => r.property?.buildingAge ?? "—" },
    { label: "Isıtma", render: (r) => (r.property?.heatingType ? HEATING_LABEL[r.property.heatingType] ?? r.property.heatingType : "—") },
    ...AMENITY_DEFS.map((a) => ({ label: a.label, render: (r: Row) => yesno(r.property?.[a.key]) })),
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={clear} className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <X className="h-4 w-4" /> Tümünü temizle
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-32 bg-white p-3" />
              {rows.map((r) => (
                <th key={r.id} className="border-l border-slate-100 p-3 align-top">
                  <Link href={`/sahibinden/ilan/${r.id}`} className="block">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[180px] overflow-hidden rounded-lg bg-slate-100">
                      {r.property?.images?.[0]?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.property.images[0].url} alt={r.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center text-slate-300"><Building2 className="h-8 w-8" /></div>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-left text-[13px] font-bold text-slate-800">{r.title}</p>
                  </Link>
                  <button
                    onClick={() => remove(r.id)}
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-500 hover:underline"
                  >
                    <X className="h-3 w-3" /> Çıkar
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsDef.map((rd, i) => (
              <tr key={rd.label} className={i % 2 ? "bg-slate-50/60" : ""}>
                <td className="sticky left-0 z-10 w-32 bg-inherit p-3 text-xs font-semibold text-slate-500">{rd.label}</td>
                {rows.map((r) => (
                  <td key={r.id} className="border-l border-slate-100 p-3 text-center text-slate-700">{rd.render(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
