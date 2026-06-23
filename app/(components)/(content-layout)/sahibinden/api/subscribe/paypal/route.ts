import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { createPendingSubscription } from "../../../subscriptions";
import { createPaypalBillingPlan, createPaypalSubscription, paypalEnabled } from "../../../lib/paypal";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

/** PayPal ile tekrarlayan abonelik başlatır. Body: { planId, storeId?, listingId? } */
export async function POST(req: NextRequest) {
  try {
    if (!paypalEnabled) return NextResponse.json({ error: "PayPal yapılandırılmamış" }, { status: 400 });

    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { planId, storeId, listingId } = await req.json();
    if (!planId) return NextResponse.json({ error: "Plan seçilmedi" }, { status: 400 });

    const plan = await prisma.shPlan.findUnique({ where: { id: planId } });
    if (!plan || !plan.active) return NextResponse.json({ error: "Plan bulunamadı" }, { status: 404 });

    // PayPal billing plan'ı yoksa oluştur ve sakla
    let paypalPlanId = plan.paypalPlanId;
    if (!paypalPlanId) {
      paypalPlanId = await createPaypalBillingPlan({
        name: plan.name,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval as "DAY" | "WEEK" | "MONTH" | "YEAR",
        intervalCount: plan.intervalCount,
        trialDays: plan.trialDays,
      });
      await prisma.shPlan.update({ where: { id: plan.id }, data: { paypalPlanId } });
    }

    const { subscription } = await createPendingSubscription(user.id, planId, "paypal", {
      storeId,
      listingId,
    });

    const { approveUrl } = await createPaypalSubscription({
      planId: paypalPlanId,
      localSubId: subscription.id,
      returnUrl: `${BASE}/sahibinden/hesabim/abonelikler?ok=1`,
      cancelUrl: `${BASE}/sahibinden/hesabim/abonelikler?iptal=1`,
    });

    if (!approveUrl) return NextResponse.json({ error: "Onay linki alınamadı" }, { status: 500 });
    return NextResponse.json({ url: approveUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
