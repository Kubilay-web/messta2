"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "../lib/format";

export default function MortgageCalculator({
  price,
  currency = "TRY",
}: {
  price: number;
  currency?: string;
}) {
  const [downPct, setDownPct] = useState(25);
  const [rate, setRate] = useState(2.99); // aylık faiz %
  const [term, setTerm] = useState(120); // ay

  const result = useMemo(() => {
    const down = (price * downPct) / 100;
    const principal = Math.max(0, price - down);
    const r = rate / 100;
    // Aylık taksit (anüite formülü)
    const monthly =
      r === 0 ? principal / term : (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
    const total = monthly * term;
    const interest = total - principal;
    return { down, principal, monthly, total, interest };
  }, [price, downPct, rate, term]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-bold text-gray-800">🧮 Konut Kredisi Hesaplama</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label={`Peşinat (%${downPct})`}>
          <input
            type="range"
            min={0}
            max={90}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <span className="text-xs text-gray-500">{formatPrice(result.down, currency)}</span>
        </Field>
        <Field label="Aylık Faiz (%)">
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </Field>
        <Field label="Vade (Ay)">
          <select
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          >
            {[12, 24, 36, 60, 84, 120, 180, 240, 360].map((m) => (
              <option key={m} value={m}>{m} ay</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Kredi Tutarı" value={formatPrice(result.principal, currency)} />
        <Stat label="Aylık Taksit" value={formatPrice(result.monthly, currency)} highlight />
        <Stat label="Toplam Faiz" value={formatPrice(result.interest, currency)} />
        <Stat label="Toplam Geri Ödeme" value={formatPrice(result.total, currency)} />
      </div>
      <p className="mt-2 text-[11px] text-gray-600">
        * Tahmini değerlerdir; kesin koşullar için bankanızla görüşün.
      </p>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-yellow-50" : "bg-gray-50"}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-bold ${highlight ? "text-yellow-700" : "text-gray-800"}`}>{value}</p>
    </div>
  );
}
