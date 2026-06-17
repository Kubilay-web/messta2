"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

// Basit konut kredisi (annüite) hesaplayıcı.
export default function MortgageCalculator({ price = 0, currency = "TRY" }: { price?: number; currency?: string }) {
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";
  const [down, setDown] = useState(Math.round(price * 0.25));
  const [rate, setRate] = useState(2.99); // aylık faiz %
  const [months, setMonths] = useState(120);

  const { monthly, total, totalInterest, principal } = useMemo(() => {
    const principal = Math.max(0, price - down);
    const r = rate / 100;
    if (principal <= 0 || months <= 0) return { monthly: 0, total: 0, totalInterest: 0, principal };
    const m = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = m * months;
    return { monthly: m, total, totalInterest: total - principal, principal };
  }, [price, down, rate, months]);

  const fmt = (v: number) => `${sym}${Math.round(v).toLocaleString("tr-TR")}`;
  const field = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-800">Kredi Hesaplama</h3>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <label className="text-xs font-medium text-slate-500">
          Peşinat
          <input type="number" value={down} onChange={(e) => setDown(Number(e.target.value))} className={`mt-1 ${field}`} />
        </label>
        <label className="text-xs font-medium text-slate-500">
          Vade (ay)
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className={`mt-1 ${field}`} />
        </label>
        <label className="col-span-2 text-xs font-medium text-slate-500">
          Aylık faiz (%)
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={`mt-1 ${field}`} />
        </label>
      </div>

      <div className="mt-3 space-y-1.5 rounded-xl bg-amber-50 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Kredi tutarı</span>
          <span className="font-semibold text-slate-800">{fmt(principal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Toplam faiz</span>
          <span className="font-semibold text-slate-800">{fmt(totalInterest)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-amber-200 pt-1.5">
          <span className="font-semibold text-slate-700">Aylık taksit</span>
          <span className="text-base font-extrabold text-amber-700">{fmt(monthly)}</span>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">Tahmini değerdir; banka koşullarına göre değişebilir.</p>
    </div>
  );
}
