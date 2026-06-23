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
