import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { fulfillCheckoutSession } from "../../../../lib/stripe-fulfill";
import {
  recordRenewalInvoice,
  markPastDue,
  expireSubscription,
} from "../../../../subscriptions";
import prisma from "@/app/lib/prisma";

// Sahibinden için tek Stripe webhook ucu:
//  - checkout.session.completed → doping / kapora / abonelik başlangıcı / cüzdan dolumu
//  - invoice.paid               → abonelik YENİLEME (subscription_cycle)
//  - invoice.payment_failed     → grace (PAST_DUE)
//  - customer.subscription.deleted/updated → iptal / dönem senkron
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  let event: any;
  try {
    event = sig && secret ? stripe.webhooks.constructEvent(body, sig, secret) : JSON.parse(body);
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook imza hatası: ${e?.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await fulfillCheckoutSession(event.data.object);
        break;
      }

      case "invoice.paid": {
        const inv = event.data.object;
        const stripeSubId = invoiceSubId(inv);
        // İlk fatura (subscription_create) checkout.session.completed ile işlendi.
        if (inv?.billing_reason === "subscription_cycle" && stripeSubId) {
          const sub = await prisma.shSubscription.findFirst({
            where: { providerSubId: stripeSubId },
            select: { id: true },
          });
          if (sub) {
            await recordRenewalInvoice({
              subscriptionId: sub.id,
              provider: "stripe",
              refId: inv.id,
              amount: inv.amount_paid ? inv.amount_paid / 100 : undefined,
              periodEnd: inv.period_end ? new Date(inv.period_end * 1000) : undefined,
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const inv = event.data.object;
        const stripeSubId = invoiceSubId(inv);
        if (stripeSubId) {
          const sub = await prisma.shSubscription.findFirst({
            where: { providerSubId: stripeSubId },
            select: { id: true },
          });
          if (sub) await markPastDue(sub.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const local = await prisma.shSubscription.findFirst({
          where: { providerSubId: sub.id },
          select: { id: true },
        });
        if (local) await expireSubscription(local.id);
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object;
        const local = await prisma.shSubscription.findFirst({
          where: { providerSubId: sub.id },
          select: { id: true },
        });
        if (local) {
          await prisma.shSubscription.update({
            where: { id: local.id },
            data: {
              cancelAtPeriodEnd: !!sub.cancel_at_period_end,
              currentPeriodEnd: sub.current_period_end
                ? new Date(sub.current_period_end * 1000)
                : undefined,
            },
          });
        }
        break;
      }
    }
  } catch (e: any) {
    // 500 dönersek Stripe tekrar dener — idempotent olduğumuz için güvenli.
    return NextResponse.json({ error: e?.message ?? "İşleme hatası" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/** Stripe API sürümüne göre faturadan abonelik kimliğini güvenli çıkarır. */
function invoiceSubId(inv: any): string | undefined {
  return (
    inv?.subscription ??
    inv?.parent?.subscription_details?.subscription ??
    inv?.lines?.data?.[0]?.subscription ??
    inv?.lines?.data?.[0]?.parent?.subscription_item_details?.subscription ??
    undefined
  );
}
