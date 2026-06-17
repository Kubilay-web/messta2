"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Check, Star, CheckCircle2, ShieldAlert, Sparkles, Coins, Flame, Frame, Loader2 } from "lucide-react";
import { DOPING_PACKAGES, type DopingEffect } from "../lib/doping";
import { createDopingOrder, captureDopingOrder, payDopingWithCredits } from "../actions/doping";

const EFFECT_META: Record<DopingEffect, { label: string; Icon: any }> = {
  showcase: { label: "Vitrin", Icon: Star },
  urgent: { label: "Acil", Icon: Flame },
  highlight: { label: "Renkli Çerçeve", Icon: Frame },
};

export default function DopingClient({
  listingId,
  listingTitle,
  credits = 0,
}: {
  listingId: string;
  listingTitle: string;
  credits?: number;
}) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [selected, setSelected] = useState<string>(DOPING_PACKAGES[0].id);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [creditBusy, setCreditBusy] = useState(false);
  const [balance, setBalance] = useState(credits);

  const pkg = DOPING_PACKAGES.find((p) => p.id === selected)!;
  const canPayCredits = balance >= pkg.credits;

  const payWithCredits = async () => {
    if (creditBusy) return;
    setCreditBusy(true);
    setErr(null);
    const res = await payDopingWithCredits(listingId, pkg.id);
    setCreditBusy(false);
    if ((res as any)?.error) { setErr((res as any).error); return; }
    setBalance((res as any).balance ?? balance - pkg.credits);
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
        <h2 className="text-xl font-black text-emerald-800">Doping uygulandı! 🎉</h2>
        <p className="mt-1 text-sm text-emerald-600">"{listingTitle}" artık öne çıkıyor.</p>
        <button onClick={() => { router.push("/sahibinden/hesabim"); router.refresh(); }} className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">
          İlanlarıma dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Kontör bakiyesi */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Coins className="h-4 w-4 text-amber-500" /> Kontör bakiyeniz: <b>{balance}</b>
        </span>
        <Link href="/sahibinden/hesabim/uyelik" className="text-xs font-bold text-amber-600 hover:underline">Kontör yükle / üyelik →</Link>
      </div>

      {/* Paketler (efekt gruplu) */}
      <div className="grid gap-3 sm:grid-cols-3">
        {DOPING_PACKAGES.map((p) => {
          const active = p.id === selected;
          const Meta = EFFECT_META[p.effect];
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`relative rounded-2xl border-2 p-4 text-left transition ${active ? "border-amber-500 bg-amber-50/60 shadow-md" : "border-slate-200 bg-white hover:border-amber-300"}`}
            >
              {p.badge && (
                <span className={`absolute -top-2.5 left-4 rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-bold text-white shadow ${p.accent}`}>{p.badge}</span>
              )}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  <Meta.Icon className="h-3.5 w-3.5" /> {Meta.label}
                </span>
                {active && <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-white"><Check className="h-3.5 w-3.5" /></span>}
              </div>
              <h3 className="mt-1 font-bold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-xl font-black text-amber-600">${p.price.toFixed(2)} <span className="text-xs font-semibold text-slate-400">/ {p.credits} kontör</span></p>
              <ul className="mt-2 space-y-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> {f}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {err && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">{err}</p>}

      {/* Ödeme */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-slate-800"><Sparkles className="h-4 w-4 text-amber-500" /> {pkg.name}</span>
          <span className="text-lg font-black text-amber-600">${pkg.price.toFixed(2)}</span>
        </div>

        {/* Kontör ile öde */}
        <button
          onClick={payWithCredits}
          disabled={!canPayCredits || creditBusy}
          className={`mb-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl font-bold transition ${
            canPayCredits ? "bg-slate-900 text-white hover:opacity-90" : "cursor-not-allowed bg-slate-100 text-slate-400"
          } disabled:opacity-70`}
        >
          {creditBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Coins className="h-4 w-4" />}
          {canPayCredits ? `${pkg.credits} kontör ile öde` : `Yetersiz kontör (${pkg.credits} gerekli)`}
        </button>

        <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> veya kartla <span className="h-px flex-1 bg-slate-200" />
        </div>

        {clientId ? (
          <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
              forceReRender={[selected]}
              createOrder={async () => {
                setErr(null);
                const res = await createDopingOrder(listingId, pkg.id);
                if ((res as any)?.error || !(res as any)?.orderId) {
                  setErr((res as any)?.error ?? "Sipariş oluşturulamadı.");
                  throw new Error("order failed");
                }
                return (res as any).orderId as string;
              }}
              onApprove={async (data) => {
                const res = await captureDopingOrder(data.orderID!, listingId, pkg.id);
                if ((res as any)?.error) { setErr((res as any).error); return; }
                setDone(true);
              }}
              onError={() => setErr("Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyin.")}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            Kartlı ödeme için PayPal yapılandırılmalı. Kontörle ödeme aktiftir.
          </div>
        )}
        <p className="mt-3 text-center text-[11px] text-slate-400">Tutar USD cinsindendir. Kontörle ödemede anında uygulanır.</p>
      </div>
    </div>
  );
}
