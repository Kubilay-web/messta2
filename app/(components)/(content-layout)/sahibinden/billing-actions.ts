"use server";

import prisma from "@/app/lib/prisma";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import {
  createPendingSubscription,
  activateAndApply,
  cancelSubscription,
} from "./subscriptions";
import { debitWallet, getOrCreateWallet } from "./wallet";

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) return null;
  return user;
}

type Target = { storeId?: string; listingId?: string };

/**
 * Aboneliğin İLK tahsilatını cüzdan bakiyesinden yapar ve hemen aktive eder.
 * Otomatik yenilemeler cron (api/cron/billing) tarafından yine cüzdandan çekilir.
 */
export async function subscribeWithWallet(planId: string, target: Target = {}) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };

  let subscriptionId: string | undefined;
  try {
    const plan = await prisma.shPlan.findUnique({ where: { id: planId } });
    if (!plan || !plan.active) return { ok: false as const, error: "Plan bulunamadı" };

    await getOrCreateWallet(user.id, plan.currency);
    const { subscription, payment } = await createPendingSubscription(
      user.id,
      planId,
      "wallet",
      target,
    );
    subscriptionId = subscription.id;

    // Deneme süresi varsa ilk dönem ücretsiz — bakiyeden düşme.
    if (plan.trialDays > 0) {
      await activateAndApply({
        subscriptionId: subscription.id,
        provider: "wallet",
        paymentId: payment.id,
        refId: `trial-${subscription.id}`,
      });
      revalidatePath("/sahibinden/hesabim/abonelikler");
      return { ok: true as const, trial: true };
    }

    const debit = await debitWallet({
      userId: user.id,
      amount: plan.price,
      description: `${plan.name} aboneliği (ilk dönem)`,
      refType: "subscription",
      refId: `${subscription.id}:first`,
      paymentId: payment.id,
    });
    if (!debit.ok) {
      // Bakiye yetersiz — taslağı temizle
      await prisma.shPayment.delete({ where: { id: payment.id } }).catch(() => {});
      await prisma.shSubscription.delete({ where: { id: subscription.id } }).catch(() => {});
      return { ok: false as const, error: "Yetersiz bakiye", needTopup: true };
    }

    await activateAndApply({
      subscriptionId: subscription.id,
      provider: "wallet",
      paymentId: payment.id,
      refId: `${subscription.id}:first`,
    });

    revalidatePath("/sahibinden/hesabim/abonelikler");
    return { ok: true as const };
  } catch (e: any) {
    if (subscriptionId) {
      await prisma.shSubscription.delete({ where: { id: subscriptionId } }).catch(() => {});
    }
    return { ok: false as const, error: e?.message ?? "Hata" };
  }
}

/** Aboneliği iptal eder (varsayılan: dönem sonunda). */
export async function cancelSub(subscriptionId: string, atPeriodEnd = true) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };

  const sub = await prisma.shSubscription.findFirst({
    where: { id: subscriptionId, userId: user.id },
    select: { provider: true, providerSubId: true },
  });
  if (!sub) return { ok: false as const, error: "Abonelik bulunamadı" };

  // Sağlayıcı tarafında da iptal et (Stripe)
  if (sub.provider === "stripe" && sub.providerSubId) {
    try {
      const { stripe } = await import("./lib/stripe");
      if (atPeriodEnd) {
        await stripe.subscriptions.update(sub.providerSubId, { cancel_at_period_end: true });
      } else {
        await stripe.subscriptions.cancel(sub.providerSubId);
      }
    } catch {
      /* yerel iptal yine de uygulanır */
    }
  }

  const res = await cancelSubscription(subscriptionId, user.id, atPeriodEnd);
  revalidatePath("/sahibinden/hesabim/abonelikler");
  return res;
}

/** Cüzdan otomatik yenileme tercihini açar/kapatır. */
export async function setAutoRenew(subscriptionId: string, on: boolean) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  await prisma.shSubscription.updateMany({
    where: { id: subscriptionId, userId: user.id },
    data: { autoRenew: on },
  });
  revalidatePath("/sahibinden/hesabim/abonelikler");
  return { ok: true as const };
}

/** Cüzdan otomatik yükleme (saklı kart) ayarlarını günceller. */
export async function setAutoTopup(input: { enabled: boolean; threshold: number; amount: number }) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  await getOrCreateWallet(user.id);
  await prisma.shWallet.update({
    where: { userId: user.id },
    data: {
      autoTopup: input.enabled,
      autoTopupThreshold: Math.max(0, input.threshold),
      autoTopupAmount: Math.max(0, input.amount),
    },
  });
  revalidatePath("/sahibinden/hesabim/cuzdan");
  return { ok: true as const };
}
