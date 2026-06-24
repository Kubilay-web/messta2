import "server-only";
import prisma from "@/app/lib/prisma";
import type { Prisma, ShPlan, ShSubscription } from "@prisma/client";
import { addInterval, intervalLabel, type BillingInterval } from "./lib/billing";
import { sendMail } from "./lib/mail";
import { getPaypalSubscription } from "./lib/paypal";

// ===========================================================================
//  Abonelik motoru
//  - createPendingSubscription: checkout öncesi taslak + ilk PENDING ödeme
//  - activateAndApply:          ilk başarılı ödemede ACTIVE + hak uygula
//  - recordRenewalInvoice:      yenilemede dönemi uzat + hak yeniden uygula (idempotent)
//  - markPastDue / cancel / expire: yaşam döngüsü + hak geri alma
// ===========================================================================

type SubTarget = { storeId?: string | null; listingId?: string | null };

/** Checkout başlamadan önce abonelik taslağı + ilk tahsilat kaydı oluşturur. */
export async function createPendingSubscription(
  userId: string,
  planId: string,
  provider: "stripe" | "paypal" | "wallet",
  target: SubTarget = {},
) {
  const plan = await prisma.shPlan.findUnique({ where: { id: planId } });
  if (!plan || !plan.active) throw new Error("Plan bulunamadı");

  // Hedef doğrulama
  if (plan.kind === "STORE_PRO") {
    if (!target.storeId) throw new Error("Mağaza seçilmedi");
    const store = await prisma.shStore.findFirst({ where: { id: target.storeId, ownerId: userId } });
    if (!store) throw new Error("Mağaza size ait değil");
  } else {
    if (!target.listingId) throw new Error("İlan seçilmedi");
    const listing = await prisma.shListing.findFirst({ where: { id: target.listingId, userId } });
    if (!listing) throw new Error("İlan size ait değil");
  }

  const sub = await prisma.shSubscription.create({
    data: {
      userId,
      planId,
      kind: plan.kind,
      storeId: plan.kind === "STORE_PRO" ? target.storeId ?? null : null,
      listingId: plan.kind !== "STORE_PRO" ? target.listingId ?? null : null,
      status: "PENDING",
      provider,
    },
  });

  const payment = await prisma.shPayment.create({
    data: {
      userId,
      amount: plan.price,
      currency: plan.currency,
      type: "SUBSCRIPTION",
      status: "PENDING",
      subscriptionId: sub.id,
      provider,
      meta: { planId, subscriptionId: sub.id, kind: plan.kind },
    },
  });

  return { subscription: sub, payment, plan };
}

/**
 * İlk başarılı tahsilatta aboneliği aktive eder, dönemi açar ve hakkı uygular.
 * provider* alanları (stripe sub id / paypal sub id) saklanır. Idempotent.
 */
/**
 * PayPal abonelik onayından DÖNÜŞTE çağrılır (webhook'tan bağımsız doğrulama):
 * PayPal'dan aboneliğin durumunu çeker, ACTIVE/APPROVED ise yerel aboneliği
 * aktive eder. Idempotent. `ppSubId` PayPal'ın dönüş URL'sine eklediği id'dir.
 */
export async function confirmPaypalSubscriptionReturn(ppSubId: string) {
  const sub = await getPaypalSubscription(ppSubId);
  if (!sub) return { ok: false as const, error: "PayPal aboneliği bulunamadı" };
  const localId = sub.custom_id as string | undefined;
  if (!localId) return { ok: false as const, error: "Yerel abonelik kimliği yok" };
  const status = sub.status as string | undefined;
  if (status !== "ACTIVE" && status !== "APPROVED") return { ok: false as const, status };

  const periodEnd = sub.billing_info?.next_billing_time
    ? new Date(sub.billing_info.next_billing_time)
    : undefined;
  return activateAndApply({
    subscriptionId: localId,
    provider: "paypal",
    providerSubId: ppSubId,
    periodEnd,
  });
}

export async function activateAndApply(opts: {
  subscriptionId: string;
  provider: string;
  providerSubId?: string;
  providerCustomerId?: string;
  paymentId?: string;
  refId?: string;
  periodStart?: Date;
  periodEnd?: Date;
}) {
  const sub = await prisma.shSubscription.findUnique({
    where: { id: opts.subscriptionId },
    include: { plan: true },
  });
  if (!sub) return { ok: false as const, error: "Abonelik yok" };
  if (sub.status === "ACTIVE" && sub.providerSubId === opts.providerSubId) {
    return { ok: true as const, already: true as const };
  }

  const start = opts.periodStart ?? new Date();
  const end =
    opts.periodEnd ?? addInterval(start, sub.plan.interval as BillingInterval, sub.plan.intervalCount);

  await prisma.shSubscription.update({
    where: { id: sub.id },
    data: {
      status: "ACTIVE",
      provider: opts.provider,
      providerSubId: opts.providerSubId ?? sub.providerSubId,
      providerCustomerId: opts.providerCustomerId ?? sub.providerCustomerId,
      currentPeriodStart: start,
      currentPeriodEnd: end,
      failedAttempts: 0,
    },
  });

  if (opts.paymentId) {
    await prisma.shPayment
      .update({
        where: { id: opts.paymentId },
        data: { status: "PAID", provider: opts.provider, refId: opts.refId ?? null },
      })
      .catch(() => {});
  }

  await applyEntitlement(sub.id, end);
  await notify(sub.userId, "Aboneliğiniz başladı", `${sub.plan.name} (${intervalLabel(sub.plan.interval as BillingInterval, sub.plan.intervalCount)})`);
  return { ok: true as const };
}

/**
 * Yenileme faturası geldiğinde dönemi uzatır, ödeme kaydı yazar ve hakkı tazeler.
 * Idempotent — aynı refId ikinci kez işlenmez.
 */
export async function recordRenewalInvoice(opts: {
  subscriptionId: string;
  provider: string;
  refId: string; // fatura/işlem no — idempotency
  amount?: number;
  periodEnd?: Date;
}) {
  const sub = await prisma.shSubscription.findUnique({
    where: { id: opts.subscriptionId },
    include: { plan: true },
  });
  if (!sub) return { ok: false as const, error: "Abonelik yok" };

  const dup = await prisma.shPayment.findFirst({
    where: { subscriptionId: sub.id, refId: opts.refId },
    select: { id: true },
  });
  if (dup) return { ok: true as const, already: true as const };

  const base = sub.currentPeriodEnd && sub.currentPeriodEnd > new Date() ? sub.currentPeriodEnd : new Date();
  const end = opts.periodEnd ?? addInterval(base, sub.plan.interval as BillingInterval, sub.plan.intervalCount);

  await prisma.shPayment.create({
    data: {
      userId: sub.userId,
      amount: opts.amount ?? sub.plan.price,
      currency: sub.plan.currency,
      type: "SUBSCRIPTION",
      status: "PAID",
      subscriptionId: sub.id,
      provider: opts.provider,
      refId: opts.refId,
      meta: { renewal: true, planId: sub.planId },
    },
  });

  await prisma.shSubscription.update({
    where: { id: sub.id },
    data: { status: "ACTIVE", currentPeriodEnd: end, failedAttempts: 0 },
  });

  await applyEntitlement(sub.id, end);
  return { ok: true as const };
}

/** Ödeme başarısız — grace dönemine al. 3 denemeden sonra çağıran iptal edebilir. */
export async function markPastDue(subscriptionId: string) {
  const sub = await prisma.shSubscription.update({
    where: { id: subscriptionId },
    data: { status: "PAST_DUE", failedAttempts: { increment: 1 } },
    include: { plan: true },
  });
  await notify(
    sub.userId,
    "Ödeme alınamadı",
    `${sub.plan.name} aboneliğiniz için ödeme başarısız. Lütfen ödeme yönteminizi güncelleyin.`,
  );
  return sub;
}

/** Aboneliği iptal eder. atPeriodEnd=true ise dönem sonunda biter, yoksa hemen. */
export async function cancelSubscription(subscriptionId: string, userId: string, atPeriodEnd = true) {
  const sub = await prisma.shSubscription.findFirst({ where: { id: subscriptionId, userId } });
  if (!sub) return { ok: false as const, error: "Abonelik bulunamadı" };

  if (atPeriodEnd) {
    await prisma.shSubscription.update({
      where: { id: sub.id },
      data: { cancelAtPeriodEnd: true, canceledAt: new Date(), status: "CANCELED", autoRenew: false },
    });
  } else {
    await prisma.shSubscription.update({
      where: { id: sub.id },
      data: { status: "EXPIRED", canceledAt: new Date(), autoRenew: false, cancelAtPeriodEnd: true },
    });
    await removeEntitlement(sub.id);
  }
  return { ok: true as const, atPeriodEnd };
}

/** Süresi dolmuş aboneliği kapatır ve hakkı geri alır. */
export async function expireSubscription(subscriptionId: string) {
  await prisma.shSubscription.update({
    where: { id: subscriptionId },
    data: { status: "EXPIRED" },
  });
  await removeEntitlement(subscriptionId);
}

// ---------------------------------------------------------------------------
//  Hak (entitlement) uygulama / geri alma — kind'a göre
// ---------------------------------------------------------------------------

/** Aboneliğin sağladığı avantajı hedefe (mağaza/ilan) yansıtır. */
export async function applyEntitlement(subscriptionId: string, until: Date) {
  const sub = await prisma.shSubscription.findUnique({
    where: { id: subscriptionId },
    include: { plan: true },
  });
  if (!sub) return;

  switch (sub.kind) {
    case "STORE_PRO": {
      if (!sub.storeId) return;
      await prisma.shStore.update({
        where: { id: sub.storeId },
        data: { isPro: true, proUntil: until, proPlanId: sub.planId },
      });
      break;
    }
    case "DOPING_AUTO": {
      if (!sub.listingId) return;
      const flagData: Prisma.ShListingUpdateInput = { autoDopingOn: true };
      applyDopingFlags(flagData, sub.plan.dopingType, until);
      await prisma.shListing.update({ where: { id: sub.listingId }, data: flagData });
      // Doping geçmişine kayıt (idempotent değil; her dönem yeni satır — geçmiş için makul)
      await prisma.shListingDoping
        .create({
          data: {
            listingId: sub.listingId,
            packageId: await resolveDopingPackageId(sub.plan),
            userId: sub.userId,
            status: "ACTIVE",
            expiresAt: until,
          },
        })
        .catch(() => {});
      break;
    }
    case "LISTING_HOSTING": {
      if (!sub.listingId) return;
      await prisma.shListing.update({
        where: { id: sub.listingId },
        data: { hostingPaidUntil: until, expiresAt: until, status: "ACTIVE", isActive: true },
      });
      break;
    }
  }
}

/** Abonelik bitince avantajı kaldırır. */
async function removeEntitlement(subscriptionId: string) {
  const sub = await prisma.shSubscription.findUnique({ where: { id: subscriptionId } });
  if (!sub) return;

  switch (sub.kind) {
    case "STORE_PRO":
      if (sub.storeId)
        await prisma.shStore
          .update({ where: { id: sub.storeId }, data: { isPro: false, proUntil: null, proPlanId: null } })
          .catch(() => {});
      break;
    case "DOPING_AUTO":
      if (sub.listingId)
        await prisma.shListing
          .update({
            where: { id: sub.listingId },
            data: {
              autoDopingOn: false,
              isShowcase: false,
              isFeatured: false,
              isUrgent: false,
              showcaseUntil: null,
              featuredUntil: null,
              urgentUntil: null,
            },
          })
          .catch(() => {});
      break;
    case "LISTING_HOSTING":
      if (sub.listingId)
        await prisma.shListing
          .update({ where: { id: sub.listingId }, data: { status: "EXPIRED" } })
          .catch(() => {});
      break;
  }
}

function applyDopingFlags(data: Prisma.ShListingUpdateInput, type: string | null, until: Date) {
  switch (type) {
    case "SHOWCASE":
      data.isShowcase = true;
      data.showcaseUntil = until;
      break;
    case "FEATURED":
      data.isFeatured = true;
      data.featuredUntil = until;
      break;
    case "URGENT":
      data.isUrgent = true;
      data.urgentUntil = until;
      break;
    case "BUMP":
      data.bumpedAt = new Date();
      break;
    default:
      // Tip yoksa varsayılan: vitrin
      data.isShowcase = true;
      data.showcaseUntil = until;
  }
}

/** DOPING_AUTO planı için geçmişe yazılacak bir ShDopingPackage bulur/oluşturur. */
async function resolveDopingPackageId(plan: ShPlan): Promise<string> {
  const type = plan.dopingType ?? "SHOWCASE";
  const existing = await prisma.shDopingPackage.findFirst({
    where: { type, name: `[abonelik] ${plan.name}` },
    select: { id: true },
  });
  if (existing) return existing.id;
  const created = await prisma.shDopingPackage.create({
    data: {
      name: `[abonelik] ${plan.name}`,
      type,
      durationDays: 7,
      price: plan.price,
      currency: plan.currency,
      active: false, // katalogda görünmesin; sadece geçmiş bağlamak için
    },
  });
  return created.id;
}

async function notify(userId: string, title: string, body: string) {
  await prisma.shNotification
    .create({
      data: { userId, type: "DOPING_EXPIRING", title, body, link: "/sahibinden/hesabim/abonelikler" },
    })
    .catch(() => {});
  try {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (u?.email)
      await sendMail({
        to: u.email,
        subject: title,
        html: `<div style="font-family:Arial;padding:16px"><p>${body}</p></div>`,
      });
  } catch {
    /* yok say */
  }
}

export type { ShSubscription };
