"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { perIntervalSuffix, intervalLabel, type BillingInterval } from "../lib/billing";
import { subscribeWithWallet, cancelSub, setAutoRenew } from "../billing-actions";

export interface PlanVM {
  id: string;
  name: string;
  kind: "STORE_PRO" | "DOPING_AUTO" | "LISTING_HOSTING";
  interval: BillingInterval;
  intervalCount: number;
  price: number;
  currency: string;
  trialDays: number;
  features: string[];
  badge: string | null;
  dopingType: string | null;
}

export interface TargetVM {
  id: string;
  label: string;
}

export interface ActiveSubVM {
  id: string;
  planName: string;
  kind: string;
  status: string;
  provider: string;
  interval: BillingInterval;
  intervalCount: number;
  price: number;
  currency: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  autoRenew: boolean;
  targetLabel: string | null;
}

const KIND_TR: Record<string, string> = {
  STORE_PRO: "Pro Mağaza",
  DOPING_AUTO: "Otomatik Doping",
  LISTING_HOSTING: "İlan Yayını",
};

const STATUS_TR: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: "Aktif", cls: "bg-green-100 text-green-700" },
  TRIALING: { label: "Deneme", cls: "bg-blue-100 text-blue-700" },
  PAST_DUE: { label: "Ödeme bekliyor", cls: "bg-orange-100 text-orange-700" },
  CANCELED: { label: "Dönem sonunda bitecek", cls: "bg-gray-100 text-gray-600" },
  PENDING: { label: "Onay bekliyor", cls: "bg-yellow-100 text-yellow-700" },
  EXPIRED: { label: "Sona erdi", cls: "bg-red-100 text-red-700" },
};

function fmt(n: number, c: string) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
}

// ---------------------------------------------------------------------------

export default function BillingClient({
  plans,
  stores,
  listings,
  active,
  walletBalance,
  paypalEnabled,
}: {
  plans: PlanVM[];
  stores: TargetVM[];
  listings: TargetVM[];
  active: ActiveSubVM[];
  walletBalance: number;
  paypalEnabled: boolean;
}) {
  const byKind = (k: string) => plans.filter((p) => p.kind === k);

  return (
    <div className="space-y-10">
      {active.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-800">Aktif Aboneliklerim</h2>
          <div className="space-y-2">
            {active.map((s) => (
              <ActiveSubRow key={s.id} sub={s} />
            ))}
          </div>
        </section>
      )}

      <PlanGroup
        title="Pro Mağaza Üyeliği"
        desc="Mağazanı öne çıkar, daha fazla ilan hakkı ve istatistik."
        plans={byKind("STORE_PRO")}
        targets={stores}
        targetLabel="Mağaza"
        targetKey="storeId"
        walletBalance={walletBalance}
        paypalEnabled={paypalEnabled}
      />
      <PlanGroup
        title="Otomatik Yenilenen Doping"
        desc="İlanın süre bitince otomatik tekrar vitrine/öne çıkar — hep üstte kalır."
        plans={byKind("DOPING_AUTO")}
        targets={listings}
        targetLabel="İlan"
        targetKey="listingId"
        walletBalance={walletBalance}
        paypalEnabled={paypalEnabled}
      />
      <PlanGroup
        title="İlan Yayın Ücreti (Günlük / Haftalık)"
        desc="İlanın yayında kaldığı sürece periyodik ücretlendirilir, otomatik yenilenir."
        plans={byKind("LISTING_HOSTING")}
        targets={listings}
        targetLabel="İlan"
        targetKey="listingId"
        walletBalance={walletBalance}
        paypalEnabled={paypalEnabled}
      />
    </div>
  );
}

function PlanGroup({
  title,
  desc,
  plans,
  targets,
  targetLabel,
  targetKey,
  walletBalance,
  paypalEnabled,
}: {
  title: string;
  desc: string;
  plans: PlanVM[];
  targets: TargetVM[];
  targetLabel: string;
  targetKey: "storeId" | "listingId";
  walletBalance: number;
  paypalEnabled: boolean;
}) {
  const [target, setTarget] = useState(targets[0]?.id ?? "");
  if (plans.length === 0) return null;

  return (
    <section>
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      <p className="mb-3 text-sm text-gray-500">{desc}</p>

      {targets.length > 0 ? (
        <div className="mb-4 flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">{targetLabel}:</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-yellow-400"
          >
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="mb-4 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-700">
          Önce bir {targetLabel.toLowerCase()} oluşturmalısınız.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            target={target}
            targetKey={targetKey}
            disabled={targets.length === 0}
            walletBalance={walletBalance}
            paypalEnabled={paypalEnabled}
          />
        ))}
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  target,
  targetKey,
  disabled,
  walletBalance,
  paypalEnabled,
}: {
  plan: PlanVM;
  target: string;
  targetKey: "storeId" | "listingId";
  disabled: boolean;
  walletBalance: number;
  paypalEnabled: boolean;
}) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const suffix = perIntervalSuffix(plan.interval, plan.intervalCount);
  const targetBody = () => ({ planId: plan.id, [targetKey]: target });

  async function viaProvider(provider: "stripe" | "paypal") {
    setErr(null);
    setBusy(provider);
    try {
      const res = await fetch(`/sahibinden/api/subscribe/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(targetBody()),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Başlatılamadı");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message ?? "Hata");
      setBusy(null);
    }
  }

  function viaWallet() {
    setErr(null);
    start(async () => {
      const res = await subscribeWithWallet(plan.id, { [targetKey]: target });
      if (res.ok) {
        router.refresh();
      } else {
        setErr(res.error ?? "Hata");
      }
    });
  }

  const canWallet = walletBalance >= plan.price;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-5 ${
        plan.badge ? "border-yellow-400 ring-1 ring-yellow-200" : "border-gray-200"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[11px] font-bold text-gray-900">
          {plan.badge}
        </span>
      )}
      <h3 className="text-base font-bold text-gray-800">{plan.name}</h3>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-gray-900">{fmt(plan.price, plan.currency)}</span>
        <span className="text-sm text-gray-500">{suffix}</span>
      </div>
      <p className="mt-0.5 text-xs text-black">{intervalLabel(plan.interval, plan.intervalCount)} yenilenir</p>
      {plan.trialDays > 0 && (
        <p className="mt-1 text-xs font-medium text-green-600">{plan.trialDays} gün ücretsiz deneme</p>
      )}

      <ul className="mt-3 flex-1 space-y-1.5">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
            <span className="mt-0.5 text-green-500">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {err && <p className="mt-3 rounded-lg bg-red-50 px-2 py-1 text-xs text-red-600">{err}</p>}

      <div className="mt-4 space-y-2">
        <button
          disabled={disabled || busy === "stripe"}
          onClick={() => viaProvider("stripe")}
          className="w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {busy === "stripe" ? "Yönlendiriliyor…" : "Kart ile abone ol"}
        </button>
        <div className="flex gap-2">
          {paypalEnabled && (
            <button
              disabled={disabled || busy === "paypal"}
              onClick={() => viaProvider("paypal")}
              className="flex-1 rounded-xl border border-gray-300 py-2 text-sm font-semibold text-[#003087] transition hover:bg-gray-50 disabled:opacity-50"
            >
              PayPal
            </button>
          )}
          <button
            disabled={disabled || pending || !canWallet}
            onClick={viaWallet}
            title={canWallet ? "" : "Yetersiz bakiye"}
            className="flex-1 rounded-xl border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            {pending ? "…" : "Cüzdan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActiveSubRow({ sub }: { sub: ActiveSubVM }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const st = STATUS_TR[sub.status] ?? { label: sub.status, cls: "bg-gray-100 text-gray-600" };

  function doCancel() {
    if (!confirm("Abonelik dönem sonunda iptal edilecek. Onaylıyor musunuz?")) return;
    start(async () => {
      await cancelSub(sub.id, true);
      router.refresh();
    });
  }
  function toggleRenew() {
    start(async () => {
      await setAutoRenew(sub.id, !sub.autoRenew);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">{sub.planName}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>{st.label}</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
            {KIND_TR[sub.kind] ?? sub.kind}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500">
          {fmt(sub.price, sub.currency)}
          {perIntervalSuffix(sub.interval, sub.intervalCount)}
          {sub.targetLabel ? ` · ${sub.targetLabel}` : ""}
          {sub.currentPeriodEnd
            ? ` · sonraki: ${new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(new Date(sub.currentPeriodEnd))}`
            : ""}
        </p>
      </div>

      {sub.status !== "EXPIRED" && !sub.cancelAtPeriodEnd && (
        <div className="flex items-center gap-2">
          {sub.provider === "wallet" && (
            <button
              disabled={pending}
              onClick={toggleRenew}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Oto-yenileme: {sub.autoRenew ? "Açık" : "Kapalı"}
            </button>
          )}
          <button
            disabled={pending}
            onClick={doCancel}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            İptal et
          </button>
        </div>
      )}
    </div>
  );
}
