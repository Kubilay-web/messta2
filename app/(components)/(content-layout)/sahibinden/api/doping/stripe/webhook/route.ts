import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { fulfillDopingPayment, fulfillDepositPayment } from "../../../../payments";
import { fulfillBookingPayment } from "../../../../rentals";
import {
  activateAndApply,
  recordRenewalInvoice,
  markPastDue,
  expireSubscription,
} from "../../../../subscriptions";
import { creditWallet } from "../../../../wallet";
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
        const s = event.data.object;
        const kind = s?.metadata?.kind;
        if (kind === "sahibinden_doping" && s?.metadata?.paymentId) {
          await fulfillDopingPayment(s.metadata.paymentId, "stripe", s.id);
        } else if (kind === "sahibinden_deposit" && s?.metadata?.paymentId) {
          await fulfillDepositPayment(s.metadata.paymentId, "stripe", s.id);
        } else if (kind === "sahibinden_wallet_topup" && s?.metadata?.paymentId) {
          await fulfillWalletTopup(s.metadata.paymentId, s.id);
        } else if (kind === "sahibinden_rental" && s?.metadata?.paymentId) {
          await fulfillBookingPayment(s.metadata.paymentId, "stripe", s.id);
        } else if (kind === "sahibinden_subscription" && s?.metadata?.subscriptionId) {
          await activateSubscriptionFromSession(s);
        }
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

async function fulfillWalletTopup(paymentId: string, sessionId: string) {
  const payment = await prisma.shPayment.findUnique({ where: { id: paymentId } });
  if (!payment || payment.status === "PAID") return;
  await prisma.shPayment.update({
    where: { id: paymentId },
    data: { status: "PAID", provider: "stripe", refId: sessionId },
  });
  const bonus = ((payment.meta as any)?.bonus as number) ?? 0;
  await creditWallet({
    userId: payment.userId,
    type: "TOPUP",
    amount: payment.amount,
    currency: payment.currency,
    description: "Kart ile bakiye yükleme",
    refType: "topup",
    refId: paymentId,
    paymentId,
  });
  if (bonus > 0) {
    await creditWallet({
      userId: payment.userId,
      type: "BONUS",
      amount: bonus,
      currency: payment.currency,
      description: "Yükleme bonusu",
      refType: "topup-bonus",
      refId: paymentId,
    });
  }
}

async function activateSubscriptionFromSession(session: any) {
  const subscriptionId = session.metadata.subscriptionId as string;
  let periodStart: Date | undefined;
  let periodEnd: Date | undefined;
  let providerSubId: string | undefined = session.subscription ?? undefined;
  let refId: string | undefined = session.invoice ?? session.id;

  // Stripe aboneliğinden dönem tarihlerini çek
  if (providerSubId) {
    try {
      const stripeSub = (await stripe.subscriptions.retrieve(providerSubId)) as any;
      // API sürümüne göre dönem alanları üst seviyede veya item içinde olabilir
      const startUnix = stripeSub.current_period_start ?? stripeSub.items?.data?.[0]?.current_period_start;
      const endUnix = stripeSub.current_period_end ?? stripeSub.items?.data?.[0]?.current_period_end;
      if (startUnix) periodStart = new Date(startUnix * 1000);
      if (endUnix) periodEnd = new Date(endUnix * 1000);
      if (stripeSub.latest_invoice) refId = String(stripeSub.latest_invoice);
    } catch {
      /* tarihleri plan interval'inden türetiriz */
    }
  }

  const payment = await prisma.shPayment.findFirst({
    where: { subscriptionId, type: "SUBSCRIPTION" },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  await activateAndApply({
    subscriptionId,
    provider: "stripe",
    providerSubId,
    providerCustomerId: session.customer ?? undefined,
    paymentId: payment?.id,
    refId,
    periodStart,
    periodEnd,
  });
}
