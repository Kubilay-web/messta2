import "server-only";
import Stripe from "stripe";
import prisma from "@/app/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion,
});

export const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;

/**
 * Kullanıcı için Stripe müşterisi bulur/oluşturur ve id'yi User'a yazar.
 * Abonelik (mode:"subscription") ve saklı kartla otomatik çekim için gerekli.
 */
export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { shStripeCustomerId: true, email: true, name: true },
  });
  if (user?.shStripeCustomerId) return user.shStripeCustomerId;

  const customer = await stripe.customers.create({
    email: user?.email ?? undefined,
    name: user?.name ?? undefined,
    metadata: { appUserId: userId, source: "sahibinden" },
  });
  await prisma.user.update({ where: { id: userId }, data: { shStripeCustomerId: customer.id } });
  return customer.id;
}

/**
 * Stripe ile (kısmi) iade. `refId` ödeme kaydındaki Stripe referansıdır:
 * checkout session (cs_…), payment_intent (pi_…) veya charge (ch_…) olabilir.
 * Tutar verilmezse tamamı iade edilir. Başarısızsa null döner (çağıran cüzdana düşer).
 */
export async function refundStripe(
  refId: string,
  amountMajor?: number,
): Promise<string | null> {
  try {
    let paymentIntentId: string | undefined;
    let chargeId: string | undefined;

    if (refId.startsWith("cs_")) {
      const session = await stripe.checkout.sessions.retrieve(refId);
      paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? undefined);
    } else if (refId.startsWith("pi_")) {
      paymentIntentId = refId;
    } else if (refId.startsWith("ch_")) {
      chargeId = refId;
    } else {
      return null; // tanınmayan referans (ör. demo/wallet) → iade sağlayıcıdan yapılamaz
    }

    const refund = await stripe.refunds.create({
      ...(paymentIntentId ? { payment_intent: paymentIntentId } : {}),
      ...(chargeId ? { charge: chargeId } : {}),
      ...(amountMajor != null ? { amount: Math.round(amountMajor * 100) } : {}),
    });
    return refund.id;
  } catch (e) {
    console.warn("[stripe] iade başarısız:", (e as Error)?.message);
    return null;
  }
}
