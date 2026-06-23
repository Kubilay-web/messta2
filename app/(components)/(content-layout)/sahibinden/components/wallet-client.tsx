"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setAutoTopup } from "../billing-actions";

export interface TxnVM {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  currency: string;
  description: string | null;
  createdAt: string;
}

const TYPE_TR: Record<string, { label: string; cls: string }> = {
  TOPUP: { label: "Yükleme", cls: "text-green-600" },
  BONUS: { label: "Bonus", cls: "text-green-600" },
  REFUND: { label: "İade", cls: "text-green-600" },
  SPEND: { label: "Harcama", cls: "text-red-600" },
};

const PRESETS = [50, 100, 250, 500, 1000];

function fmt(n: number, c = "TRY") {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c }).format(n);
}

export default function WalletClient({
  balance,
  currency,
  txns,
  autoTopup,
  autoTopupThreshold,
  autoTopupAmount,
}: {
  balance: number;
  currency: string;
  txns: TxnVM[];
  autoTopup: boolean;
  autoTopupThreshold: number;
  autoTopupAmount: number;
}) {
  const [amount, setAmount] = useState(250);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function topup() {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/sahibinden/api/wallet/topup/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Başlatılamadı");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message ?? "Hata");
      setBusy(false);
    }
  }

  const bonus = amount >= 1000 ? amount * 0.1 : amount >= 500 ? amount * 0.05 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        {/* Bakiye kartı */}
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
          <p className="text-sm text-white/70">Cüzdan Bakiyesi</p>
          <p className="mt-1 text-4xl font-extrabold">{fmt(balance, currency)}</p>
          <p className="mt-2 text-xs text-white/60">
            Bakiyenizle doping, ilan ve abonelik ödemelerini anında yapabilirsiniz.
          </p>
        </div>

        {/* Yükleme */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 font-bold text-gray-800">Bakiye Yükle</h2>
          <div className="mb-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  amount === p
                    ? "border-yellow-400 bg-yellow-50 text-gray-900"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {fmt(p, currency)}
                {(p >= 500) && <span className="ml-1 text-[10px] text-green-600">+{p >= 1000 ? "%10" : "%5"}</span>}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              value={amount}
              onChange={(e) => setAmount(Math.max(10, Number(e.target.value)))}
              className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
            />
            <button
              disabled={busy}
              onClick={topup}
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {busy ? "Yönlendiriliyor…" : `Kart ile ${fmt(amount, currency)} yükle`}
            </button>
          </div>
          {bonus > 0 && (
            <p className="mt-2 text-xs font-medium text-green-600">
              +{fmt(bonus, currency)} bonus kazanacaksınız.
            </p>
          )}
          {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
        </div>

        {/* Hareketler */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 font-bold text-gray-800">Hesap Hareketleri</h2>
          {txns.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">Henüz hareket yok.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {txns.map((t) => {
                const meta = TYPE_TR[t.type] ?? { label: t.type, cls: "text-gray-600" };
                return (
                  <div key={t.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t.description ?? meta.label}</p>
                      <p className="text-xs text-gray-400">
                        {new Intl.DateTimeFormat("tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(t.createdAt))}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${meta.cls}`}>
                        {t.amount > 0 ? "+" : ""}
                        {fmt(t.amount, t.currency)}
                      </p>
                      <p className="text-[11px] text-gray-400">{fmt(t.balanceAfter, t.currency)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AutoTopupPanel
        enabled={autoTopup}
        threshold={autoTopupThreshold}
        amount={autoTopupAmount}
        currency={currency}
      />
    </div>
  );
}

function AutoTopupPanel({
  enabled,
  threshold,
  amount,
  currency,
}: {
  enabled: boolean;
  threshold: number;
  amount: number;
  currency: string;
}) {
  const [on, setOn] = useState(enabled);
  const [thr, setThr] = useState(threshold || 50);
  const [amt, setAmt] = useState(amount || 250);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  function save() {
    setSaved(false);
    start(async () => {
      await setAutoTopup({ enabled: on, threshold: thr, amount: amt });
      setSaved(true);
      router.refresh();
    });
  }

  return (
    <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="font-bold text-gray-800">Otomatik Yükleme</h2>
      <p className="mt-1 text-xs text-gray-500">
        Bakiyen eşiğin altına düşünce saklı kartından otomatik yüklenir — aboneliklerin hiç kesilmez.
      </p>

      <label className="mt-4 flex items-center gap-2">
        <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} className="h-4 w-4" />
        <span className="text-sm font-medium text-gray-700">Otomatik yüklemeyi aç</span>
      </label>

      <div className={`mt-3 space-y-3 ${on ? "" : "opacity-50"}`}>
        <div>
          <label className="text-xs text-gray-500">Bakiye şunun altına düşünce ({currency})</label>
          <input
            type="number"
            min={0}
            value={thr}
            disabled={!on}
            onChange={(e) => setThr(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Şu kadar yükle ({currency})</label>
          <input
            type="number"
            min={10}
            value={amt}
            disabled={!on}
            onChange={(e) => setAmt(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <button
        disabled={pending}
        onClick={save}
        className="mt-4 w-full rounded-xl bg-gray-900 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
      {saved && <p className="mt-2 text-center text-xs text-green-600">Kaydedildi ✓</p>}
    </div>
  );
}
