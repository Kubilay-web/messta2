import Link from "next/link";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { paypalEnabled } from "../../lib/paypal";
import BillingClient, {
  type PlanVM,
  type TargetVM,
  type ActiveSubVM,
} from "../../components/billing-client";
import { walletBalance } from "../../wallet";
import { confirmStripeSession } from "../../lib/stripe-fulfill";
import { confirmPaypalSubscriptionReturn } from "../../subscriptions";
import type { BillingInterval } from "../../lib/billing";

export const dynamic = "force-dynamic";

export default async function AboneliklerPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; subscription_id?: string; ok?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) return null;

  // Kart/PayPal dönüşünde aboneliği webhook'tan bağımsız aktive et.
  const { session_id, subscription_id } = await searchParams;
  if (session_id) await confirmStripeSession(session_id);
  if (subscription_id) await confirmPaypalSubscriptionReturn(subscription_id);

  const [plans, stores, listings, subs, balance] = await Promise.all([
    prisma.shPlan.findMany({ where: { active: true }, orderBy: [{ kind: "asc" }, { order: "asc" }] }),
    prisma.shStore.findMany({ where: { ownerId: user.id }, select: { id: true, name: true } }),
    prisma.shListing.findMany({
      where: { userId: user.id, status: { in: ["ACTIVE", "PENDING"] } },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.shSubscription.findMany({
      where: { userId: user.id, status: { in: ["ACTIVE", "TRIALING", "PAST_DUE", "CANCELED", "PENDING"] } },
      include: { plan: true, store: { select: { name: true } }, listing: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
    walletBalance(user.id),
  ]);

  const planVM: PlanVM[] = plans.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    interval: p.interval as BillingInterval,
    intervalCount: p.intervalCount,
    price: p.price,
    currency: p.currency,
    trialDays: p.trialDays,
    features: p.features,
    badge: p.badge,
    dopingType: p.dopingType,
  }));

  const storeVM: TargetVM[] = stores.map((s) => ({ id: s.id, label: s.name }));
  const listingVM: TargetVM[] = listings.map((l) => ({ id: l.id, label: l.title }));

  const activeVM: ActiveSubVM[] = subs.map((s) => ({
    id: s.id,
    planName: s.plan.name,
    kind: s.kind,
    status: s.status,
    provider: s.provider,
    interval: s.plan.interval as BillingInterval,
    intervalCount: s.plan.intervalCount,
    price: s.plan.price,
    currency: s.plan.currency,
    currentPeriodEnd: s.currentPeriodEnd ? s.currentPeriodEnd.toISOString() : null,
    cancelAtPeriodEnd: s.cancelAtPeriodEnd,
    autoRenew: s.autoRenew,
    targetLabel: s.store?.name ?? s.listing?.title ?? null,
  }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Aboneliklerim & Planlar</h1>
        <Link
          href="/sahibinden/hesabim/cuzdan"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cüzdan: {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(balance)}
        </Link>
      </div>

      {planVM.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          Henüz tanımlı plan yok. Yönetici planları ekledikten sonra burada görünecek.
        </p>
      ) : (
        <BillingClient
          plans={planVM}
          stores={storeVM}
          listings={listingVM}
          active={activeVM}
          walletBalance={balance}
          paypalEnabled={paypalEnabled}
        />
      )}
    </div>
  );
}
