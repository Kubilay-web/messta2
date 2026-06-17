"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Check, Crown, Coins, ShieldAlert, CheckCircle2 } from "lucide-react";
import { MEMBERSHIP_PLANS, PLAN_LABEL } from "../lib/membership";
import { createMembershipOrder, captureMembershipOrder } from "../actions/membership";

export default function MembershipClient({
  current,
}: {
  current: { plan: string; creditsRemaining: number; isActive: boolean; expiresAt: string | null };
}) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [selected, setSelected] = useState<string>("PRO");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const plan = MEMBERSHIP_PLANS.find((p) => p.id === selected)!;

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
        <h2 className="text-xl font-black text-emerald-800">Üyeliğiniz aktif! 🎉</h2>
        <p className="mt-1 text-sm text-emerald-600">Kontörleriniz hesabınıza yüklendi.</p>
        <button onClick={() => { router.push("/sahibinden/hesabim"); router.refresh(); }} className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">
          Hesabıma dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Mevcut durum */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600"><Crown className="h-5 w-5" /></span>
          <div>
            <p className="text-sm font-bold text-slate-800">Mevcut üyelik: {PLAN_LABEL[current.plan] ?? current.plan}</p>
            <p className="text-xs text-slate-500">
              {current.isActive && current.expiresAt ? `${new Date(current.expiresAt).toLocaleDateString("tr-TR")} tarihine kadar` : "Ücretsiz plan"}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700">
          <Coins className="h-4 w-4" /> {current.creditsRemaining} kontör
        </span>
      </div>

      {/* Planlar */}
      <div className="grid gap-3 sm:grid-cols-3">
        {MEMBERSHIP_PLANS.map((p) => {
          const active = p.id === selected;
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
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                {active && <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-white"><Check className="h-3.5 w-3.5" /></span>}
              </div>
              <p className="mt-1 text-2xl font-black text-amber-600">${p.price.toFixed(2)}<span className="text-xs font-medium text-slate-400">/ay</span></p>
              <ul className="mt-3 space-y-1.5">
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
          <span className="text-sm font-bold text-slate-800">{plan.name} · {plan.credits} kontör / ay</span>
          <span className="text-lg font-black text-amber-600">${plan.price.toFixed(2)}</span>
        </div>
        {clientId ? (
          <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "pill", label: "subscribe" }}
              forceReRender={[selected]}
              createOrder={async () => {
                setErr(null);
                const res = await createMembershipOrder(plan.id);
                if ((res as any)?.error || !(res as any)?.orderId) {
                  setErr((res as any)?.error ?? "Sipariş oluşturulamadı.");
                  throw new Error("order failed");
                }
                return (res as any).orderId as string;
              }}
              onApprove={async (data) => {
                const res = await captureMembershipOrder(data.orderID!, plan.id);
                if ((res as any)?.error) { setErr((res as any).error); return; }
                setDone(true);
              }}
              onError={() => setErr("Ödeme sırasında bir hata oluştu.")}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            Ödeme sağlayıcısı yapılandırılmamış (<code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>).
          </div>
        )}
        <p className="mt-3 text-center text-[11px] text-slate-400">Aylık ödeme; kontörler hemen yüklenir. Tutar USD cinsindendir.</p>
      </div>
    </div>
  );
}
