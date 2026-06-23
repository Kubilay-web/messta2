import { formatPrice } from "../lib/format";

export default function RegionReportChart({
  months,
  city,
  currency = "TRY",
}: {
  months: { month: string; avg: number; count: number }[];
  city: string | null;
  currency?: string;
}) {
  const max = Math.max(1, ...months.map((m) => m.avg));
  const first = months.find((m) => m.avg > 0)?.avg ?? 0;
  const last = [...months].reverse().find((m) => m.avg > 0)?.avg ?? 0;
  const trend = first > 0 ? ((last - first) / first) * 100 : 0;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-gray-800">📊 {city} Bölge Raporu (6 Ay)</h2>
        {trend !== 0 && (
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trend >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
            {trend >= 0 ? "▲" : "▼"} %{Math.abs(trend).toFixed(1)} ortalama fiyat
          </span>
        )}
      </div>
      <div className="flex items-end gap-2" style={{ height: 140 }}>
        {months.map((m) => {
          const h = Math.round((m.avg / max) * 110);
          return (
            <div key={m.month} className="flex flex-1 flex-col items-center justify-end gap-1" title={`${m.month}: ${formatPrice(m.avg, currency)} ort, ${m.count} ilan`}>
              <span className="text-[9px] text-gray-600">{m.count}</span>
              <div className="w-full rounded-t bg-blue-500" style={{ height: `${Math.max(2, h)}px` }} />
              <span className="text-[10px] text-gray-600">{m.month.slice(5)}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-gray-600">Çubuk üstündeki sayı o ayki ilan adedidir.</p>
    </section>
  );
}
