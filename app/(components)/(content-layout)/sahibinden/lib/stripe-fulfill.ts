import "server-only";
import prisma from "@/app/lib/prisma";
import { stripe } from "./stripe";
import { fulfillDopingPayment, fulfillDepositPayment } from "../payments";
import { fulfillBookingPayment } from "../rentals";
import { activateAndApply } from "../subscriptions";
import { creditWallet } from "../wallet";

// ---------------------------------------------------------------------------
//  Stripe Checkout fulfillment — TEK kaynak.
//  Hem webhook (checkout.session.completed) hem de başarı-dönüş sayfaları
//  buradaki fonksiyonları kullanır; böylece webhook tetiklenmese bile
//  (lokal/test) ödeme dönüşte doğrulanıp tamamlanır. Tüm fulfill'ler idempotent.
// ---------------------------------------------------------------------------

/** Cüzdan dolumunu tamamlar (bonus dahil). Idempotent. */
export async function fulfillWalletTopup(paymentId: string, sessionId: string) {
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

/** Checkout session'dan aboneliği aktive eder. Idempotent. */
export async function activateSubscriptionFromSession(session: any) {
  const subscriptionId = session.metadata?.subscriptionId as string | undefined;
  if (!subscriptionId) return;
  let periodStart: Date | undefined;
  let periodEnd: Date | undefined;
  const providerSubId: string | undefined = session.subscription ?? undefined;
  let refId: string | undefined = session.invoice ?? session.id;

  if (providerSubId) {
    try {
      const stripeSub = (await stripe.subscriptions.retrieve(providerSubId)) as any;
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

/** Bir checkout session'ı metadata.kind'a göre ilgili fulfill'e yönlendirir. */
export async function fulfillCheckoutSession(session: any) {
  const kind = session?.metadata?.kind as string | undefined;
  const paymentId = session?.metadata?.paymentId as string | undefined;
  if (kind === "sahibinden_doping" && paymentId) {
    await fulfillDopingPayment(paymentId, "stripe", session.id);
  } else if (kind === "sahibinden_deposit" && paymentId) {
    await fulfillDepositPayment(paymentId, "stripe", session.id);
  } else if (kind === "sahibinden_wallet_topup" && paymentId) {
    await fulfillWalletTopup(paymentId, session.id);
  } else if (kind === "sahibinden_rental" && paymentId) {
    await fulfillBookingPayment(paymentId, "stripe", session.id);
  } else if (kind === "sahibinden_subscription" && session?.metadata?.subscriptionId) {
    await activateSubscriptionFromSession(session);
  }
}

/**
 * Başarı-dönüş sayfalarının çağırdığı doğrulayıcı: session'ı Stripe'tan çeker,
 * ödendi/tamamlandıysa fulfillment'ı çalıştırır. Webhook'tan bağımsız + idempotent.
 */
export async function confirmStripeSession(
  sessionId: string,
): Promise<{ ok: boolean; status?: string }> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required" ||
      session.status === "complete";
    if (!paid) return { ok: false, status: session.payment_status ?? session.status ?? undefined };
    await fulfillCheckoutSession(session);
    return { ok: true, status: session.payment_status ?? "paid" };
  } catch {
    return { ok: false };
  }
}
