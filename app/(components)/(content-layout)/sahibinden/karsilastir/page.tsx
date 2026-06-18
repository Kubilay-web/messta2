import Link from "next/link";
import { getCompareListings } from "../data";
import { formatPrice } from "../lib/format";
import { CATEGORY_ATTRIBUTES, LISTING_TYPE_LABELS } from "../lib/categories";

export const dynamic = "force-dynamic";

const ATTR_LABELS: Record<string, string> = Object.values(CATEGORY_ATTRIBUTES)
  .flat()
  .reduce((acc, f) => {
    acc[f.key] = f.label;
    return acc;
  }, {} as Record<string, string>);

function attrVal(v: unknown) {
  if (v === true) return "Evet";
  if (v === false) return "Hayır";
  if (v === undefined || v === null || v === "") return "—";
  return String(v);
}

export default async function KarsilastirPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idList = (ids ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const listings = await getCompareListings(idList);

  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
        Karşılaştırılacak ilan seçilmedi.{" "}
        <Link href="/sahibinden/ara" className="font-semibold text-yellow-600 hover:underline">İlanlara göz at</Link>
      </div>
    );
  }

  // tüm ilanlardaki attribute anahtarlarını birleştir
  const attrKeys = Array.from(
    new Set(listings.flatMap((l) => Object.keys((l.attributes as any) ?? {}))),
  );

  const rows: { label: string; values: string[] }[] = [
    { label: "Fiyat", values: listings.map((l) => formatPrice(l.price, l.currency)) },
    { label: "İlan Tipi", values: listings.map((l) => LISTING_TYPE_LABELS[l.type] ?? l.type) },
    { label: "Kategori", values: listings.map((l) => l.category?.name ?? "—") },
    { label: "Konum", values: listings.map((l) => [l.city, l.district].filter(Boolean).join(" / ") || "—") },
    ...attrKeys.map((k) => ({
      label: ATTR_LABELS[k] ?? k,
      values: listings.map((l) => attrVal((l.attributes as any)?.[k])),
    })),
  ];

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">İlan Karşılaştırma ({listings.length})</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-3 text-left text-gray-500">Özellik</th>
              {listings.map((l) => (
                <th key={l.id} className="p-3 text-left align-top">
                  <Link href={`/sahibinden/ilan/${l.id}`} className="block">
                    <div className="mb-1 h-24 w-full overflow-hidden rounded-lg bg-gray-100">
                      {l.images?.[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.images[0]} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="line-clamp-2 text-xs font-semibold text-gray-800 hover:text-yellow-600">
                      {l.title}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="p-3 font-medium text-gray-600">{r.label}</td>
                {r.values.map((v, j) => (
                  <td key={j} className="p-3 text-gray-800">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
