"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { CalendarRange, X } from "lucide-react";

export default function DateRangeFilter({ from, to }: { from?: string; to?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  function setRange(key: "from" | "to", val: string) {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set(key, val); else params.delete(key);
    router.push(`/estate/dashboard/insights?${params.toString()}`);
  }

  function preset(days: number) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    const params = new URLSearchParams();
    params.set("from", start.toISOString().slice(0, 10));
    params.set("to", end.toISOString().slice(0, 10));
    router.push(`/estate/dashboard/insights?${params.toString()}`);
  }

  function clear() { router.push("/estate/dashboard/insights"); }

  const inputCls = "rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2 text-sm font-medium text-black">
        <CalendarRange className="w-4 h-4" /> Tarih Aralığı
      </div>
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        <div>
          <label className="block text-xs text-black mb-0.5">Başlangıç</label>
          <input type="date" className={inputCls} value={from ?? ""} onChange={(e) => setRange("from", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-black mb-0.5">Bitiş</label>
          <input type="date" className={inputCls} value={to ?? ""} onChange={(e) => setRange("to", e.target.value)} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => preset(7)}>Son 7 gün</Button>
        <Button variant="outline" size="sm" onClick={() => preset(30)}>Son 30 gün</Button>
        <Button variant="outline" size="sm" onClick={() => preset(365)}>Son 1 yıl</Button>
        {(from || to) && (
          <Button variant="ghost" size="sm" onClick={clear}><X className="w-4 h-4 mr-1" /> Temizle</Button>
        )}
      </div>
    </div>
  );
}
