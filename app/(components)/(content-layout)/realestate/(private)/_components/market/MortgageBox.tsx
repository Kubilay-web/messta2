"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

// Basit kredi/taksit hesaplayıcı (satılık ilanlar için).
export default function MortgageBox({ price, currency = "TRY" }: { price: number; currency?: string }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(3.0); // aylık %
  const [months, setMonths] = useState(120);

  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";
  const fmt = (n: number) => `${sym}${Math.round(n).toLocaleString("tr-TR")}`;

  const { loan, monthly, interest, total } = useMemo(() => {
    const loan = Math.max(0, price * (1 - downPct / 100));
    const r = rate / 100;
    const monthly =
      r === 0 ? loan / months : (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = monthly * months;
    return { loan, monthly, interest: total - loan, total };
  }, [price, downPct, rate, months]);

  const inputCls =
    "h-9 w-full rounded-md border border-gray-300 bg-white px-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
        <Calculator className="h-5 w-5 text-blue-600" /> Kredi Hesaplayıcı
      </h3>

      <div className="grid grid-cols-3 gap-2">
        <label className="space-y-1 text-xs text-gray-500">
          Peşinat (%)
          <input
            type="number"
            className={inputCls}
            value={downPct}
            min={0}
            max={100}
            onChange={(e) => setDownPct(Number(e.target.value))}
          />
        </label>
        <label className="space-y-1 text-xs text-gray-500">
          Aylık Faiz (%)
          <input
            type="number"
            step="0.01"
            className={inputCls}
            value={rate}
            min={0}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>
        <label className="space-y-1 text-xs text-gray-500">
          Vade (ay)
          <input
            type="number"
            className={inputCls}
            value={months}
            min={1}
            max={360}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center">
        <p className="text-xs text-blue-700">Aylık Taksit</p>
        <p className="text-2xl font-extrabold text-blue-700">{fmt(monthly)}</p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg border p-2">
          <p className="text-gray-500">Kredi</p>
          <p className="font-semibold">{fmt(loan)}</p>
        </div>
        <div className="rounded-lg border p-2">
          <p className="text-gray-500">Toplam Faiz</p>
          <p className="font-semibold">{fmt(interest)}</p>
        </div>
        <div className="rounded-lg border p-2">
          <p className="text-gray-500">Toplam</p>
          <p className="font-semibold">{fmt(total)}</p>
        </div>
      </div>
    </div>
  );
}
