import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { stripe, getOrCreateStripeCustomer } from "../../../lib/stripe";
import { createPendingSubscription } from "../../../subscriptions";
import { toStripeInterval } from "../../../lib/billing";
import prisma from "@/app/lib/prisma";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

/**
 * Tekrarlayan abonelik için Stripe Checkout (mode: "subscription") başlatır.
 * Body: { planId, storeId?, listingId? }
 */
export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { planId, storeId, listingId } = await req.json();
    if (!planId) return NextResponse.json({ error: "Plan seçilmedi" }, { status: 400 });

    const plan = await prisma.shPlan.findUnique({ where: { id: planId } });
    if (!plan || !plan.active) return NextResponse.json({ error: "Plan bulunamadı" }, { status: 404 });

    const { subscription } = await createPendingSubscription(user.id, planId, "stripe", {
      storeId,
      listingId,
    });

    const customerId = await getOrCreateStripeCustomer(user.id);

    // Önceden tanımlı price varsa onu kullan; yoksa inline recurring price_data.
    const lineItem: any = plan.stripePriceId
      ? { price: plan.stripePriceId, quantity: 1 }
      : {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: { name: plan.name },
            unit_amount: Math.round(plan.price * 100),
            recurring: {
              interval: toStripeInterval(plan.interval),
              interval_count: plan.intervalCount,
            },
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [lineItem],
      subscription_data: {
        trial_period_days: plan.trialDays > 0 ? plan.trialDays : undefined,
        metadata: { subscriptionId: subscription.id, kind: "sahibinden_subscription" },
      },
      metadata: {
        subscriptionId: subscription.id,
        kind: "sahibinden_subscription",
      },
      success_url: `${BASE}/sahibinden/hesabim/abonelikler?ok=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE}/sahibinden/hesabim/abonelikler?iptal=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
