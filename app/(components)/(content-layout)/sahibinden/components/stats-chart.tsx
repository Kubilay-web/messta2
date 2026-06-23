// Basit, bağımlılıksız SVG çubuk grafik — günlük görüntülenme/favori.

export default function StatsChart({
  data,
}: {
  data: { date: string; views: number; favorites: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.views));
  const totalViews = data.reduce((a, b) => a + b.views, 0);
  const totalFavs = data.reduce((a, b) => a + b.favorites, 0);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-gray-800">📈 İlan İstatistikleri (Son {data.length} Gün)</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-600">
            Görüntülenme: <strong className="text-gray-900">{totalViews}</strong>
          </span>
          <span className="text-gray-600">
            Favori: <strong className="text-red-500">{totalFavs}</strong>
          </span>
        </div>
      </div>
      <div className="flex items-end gap-1" style={{ height: 120 }}>
        {data.map((d) => {
          const h = Math.round((d.views / max) * 100);
          return (
            <div key={d.date} className="group flex flex-1 flex-col items-center justify-end" title={`${d.date}: ${d.views} görüntülenme, ${d.favorites} favori`}>
              <div className="relative w-full">
                <div
                  className="w-full rounded-t bg-yellow-400 transition-all group-hover:bg-yellow-500"
                  style={{ height: `${Math.max(2, h)}px` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-gray-600">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </section>
  );
}
