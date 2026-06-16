"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

export default function MortgageCalculator({
  price,
  currency = "TRY",
}: {
  price: number;
  currency?: string;
}) {
  const [downPct, setDownPct] = useState(25); // peşinat %
  const [rate, setRate] = useState(3.0);      // aylık faiz %
  const [months, setMonths] = useState(120);  // vade (ay)

  const { loan, monthly, total, interest } = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = Math.max(price - down, 0);
    const r = rate / 100;
    let monthly: number;
    if (r === 0) monthly = loan / months;
    else monthly = (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const total = monthly * months;
    return { loan, monthly, total, interest: total - loan };
  }, [price, downPct, rate, months]);

  const fmt = (n: number) =>
    isFinite(n) ? Math.round(n).toLocaleString("tr-TR") + " " + currency : "—";

  const inputCls =
    "w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <div className="rounded-2xl border bg-white p-5 space-y-4">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-600" /> Kredi Hesaplayıcı
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <label className="text-xs text-muted-foreground space-y-1">
          Peşinat (%)
          <input type="number" className={inputCls} value={downPct} min={0} max={100}
            onChange={(e) => setDownPct(Number(e.target.value))} />
        </label>
        <label className="text-xs text-muted-foreground space-y-1">
          Aylık Faiz (%)
          <input type="number" step="0.01" className={inputCls} value={rate} min={0}
            onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label className="text-xs text-muted-foreground space-y-1">
          Vade (ay)
          <input type="number" className={inputCls} value={months} min={1} max={360}
            onChange={(e) => setMonths(Number(e.target.value))} />
        </label>
      </div>

      <div className="rounded-xl bg-blue-50 p-4 text-center">
        <p className="text-xs text-blue-700">Aylık Taksit</p>
        <p className="text-2xl font-extrabold text-blue-700">{fmt(monthly)}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg border p-2">
          <p className="text-muted-foreground">Kredi Tutarı</p>
          <p className="font-semibold">{fmt(loan)}</p>
        </div>
        <div className="rounded-lg border p-2">
          <p className="text-muted-foreground">Toplam Faiz</p>
          <p className="font-semibold">{fmt(interest)}</p>
        </div>
        <div className="rounded-lg border p-2">
          <p className="text-muted-foreground">Toplam Geri Ödeme</p>
          <p className="font-semibold">{fmt(total)}</p>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">
        * Tahmini değerlerdir; kesin teklif için bankanıza/danışmanınıza başvurun.
      </p>
    </div>
  );
}
