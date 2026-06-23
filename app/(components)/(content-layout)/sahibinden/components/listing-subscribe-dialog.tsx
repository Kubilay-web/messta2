"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { perIntervalSuffix, intervalLabel, type BillingInterval } from "../lib/billing";
import { subscribeWithWallet } from "../billing-actions";

export interface ListingPlanVM {
  id: string;
  name: string;
  kind: "DOPING_AUTO" | "LISTING_HOSTING";
  interval: BillingInterval;
  intervalCount: number;
  price: number;
  currency: string;
  trialDays: number;
  features: string[];
  badge: string | null;
  dopingType: string | null;
}

const KIND_TR: Record<string, string> = {
  DOPING_AUTO: "Otomatik Doping",
  LISTING_HOSTING: "Yayın Ücreti",
};

const TYPE_ICON: Record<string, string> = {
  SHOWCASE: "⭐",
  FEATURED: "🔝",
  URGENT: "🔥",
  BUMP: "⬆️",
};

function fmt(n: number, c: string) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
}

export default function ListingSubscribeDialog({
  listingId,
  plans,
  walletBalance,
  paypalEnabled,
}: {
  listingId: string;
  plans: ListingPlanVM[];
  walletBalance: number;
  paypalEnabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(plans[0]?.id ?? null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  if (plans.length === 0) return null;

  const sel = plans.find((p) => p.id === selected) ?? null;
  const canWallet = !!sel && walletBalance >= sel.price;

  async function viaProvider(provider: "stripe" | "paypal") {
    if (!selected) return;
    setError("");
    setBusy(provider);
    try {
      const res = await fetch(`/sahibinden/api/subscribe/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selected, listingId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Başlatılamadı");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Hata");
      setBusy(null);
    }
  }

  function viaWallet() {
    if (!selected) return;
    setError("");
    start(async () => {
      const res = await subscribeWithWallet(selected!, { listingId });
      if (res.ok) {
        setDone(true);
        setTimeout(() => {
          setOpen(false);
          setDone(false);
          router.refresh();
        }, 1200);
      } else {
        setError(res.error ?? "Hata");
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100"
        title="Günlük / haftalık otomatik yenilenen doping veya yayın"
      >
        🔁 Otomatik / Süreli
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Otomatik Yenilenen Plan</h3>
              <button onClick={() => setOpen(false)} className="text-gray-600">
                ✕
              </button>
            </div>
            <p className="mb-3 text-xs text-gray-500">
              Süre bitince otomatik yenilenir, istediğin an iptal edebilirsin.
            </p>

            {done ? (
              <div className="py-8 text-center">
                <p className="text-3xl">✅</p>
                <p className="mt-2 font-semibold text-green-700">Abonelik başladı!</p>
              </div>
            ) : (
              <>
                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-3 text-left transition ${
                        selected === p.id ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {p.kind === "DOPING_AUTO" ? TYPE_ICON[p.dopingType ?? ""] ?? "⭐" : "📋"}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {p.name}
                            {p.badge && (
                              <span className="ml-1 rounded bg-yellow-400 px-1 text-[10px] font-bold text-gray-900">
                                {p.badge}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {KIND_TR[p.kind]} · {intervalLabel(p.interval, p.intervalCount)}
                            {p.trialDays > 0 ? ` · ${p.trialDays}g deneme` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-right">
                        <span className="block font-bold text-yellow-600">{fmt(p.price, p.currency)}</span>
                        <span className="text-[10px] text-gray-400">{perIntervalSuffix(p.interval, p.intervalCount)}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => viaProvider("stripe")}
                    disabled={!selected || busy === "stripe"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#635bff] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {busy === "stripe" ? "Yönlendiriliyor…" : "💳 Kart ile abone ol"}
                  </button>
                  <div className="flex gap-2">
                    {paypalEnabled && (
                      <button
                        onClick={() => viaProvider("paypal")}
                        disabled={!selected || busy === "paypal"}
                        className="flex-1 rounded-lg bg-[#ffc439] py-2.5 text-sm font-bold text-[#003087] hover:opacity-90 disabled:opacity-50"
                      >
                        PayPal
                      </button>
                    )}
                    <button
                      onClick={viaWallet}
                      disabled={!selected || pending || !canWallet}
                      title={canWallet ? "" : "Yetersiz bakiye"}
                      className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      {pending ? "…" : "Cüzdan"}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-center text-[11px] text-gray-500">
                  Cüzdan bakiyesi: {fmt(walletBalance, sel?.currency ?? "TRY")}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
