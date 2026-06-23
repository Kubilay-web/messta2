import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { recordRenewalInvoice, markPastDue, expireSubscription } from "../../../subscriptions";
import { debitWallet } from "../../../wallet";

// Faturalama cron'u (harici zamanlayıcı saatte bir çağırır):
//  1) Cüzdan abonelikleri: dönem bitiyorsa bakiyeden otomatik çek → yenile / PAST_DUE
//  2) PAST_DUE & grace süresi dolmuş → EXPIRED + hak geri al
//  3) Dönem sonunda iptal edilenler (CANCELED, cancelAtPeriodEnd) → süre dolunca EXPIRED
//  4) Backstop: Stripe gecikirse süresi geçmiş aktif abonelikleri kapat
const MS_DAY = 86_400_000;
const GRACE_DAYS = 3;
const RENEW_WINDOW_MS = 60 * 60 * 1000; // dönem bitimine 1 saat kala dene

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const soon = new Date(now.getTime() + RENEW_WINDOW_MS);
  const result = { renewed: 0, failed: 0, expired: 0 };

  // 1) Cüzdan ile otomatik yenileme
  const dueWallet = await prisma.shSubscription.findMany({
    where: {
      provider: "wallet",
      autoRenew: true,
      status: { in: ["ACTIVE", "PAST_DUE"] },
      cancelAtPeriodEnd: false,
      currentPeriodEnd: { lte: soon },
    },
    include: { plan: true },
    take: 500,
  });

  for (const sub of dueWallet) {
    const cycle = sub.currentPeriodEnd?.toISOString() ?? now.toISOString();
    const debit = await debitWallet({
      userId: sub.userId,
      amount: sub.plan.price,
      description: `${sub.plan.name} otomatik yenileme`,
      refType: "subscription",
      refId: `${sub.id}:${cycle}`,
    });
    if (debit.ok) {
      await recordRenewalInvoice({
        subscriptionId: sub.id,
        provider: "wallet",
        refId: `${sub.id}:${cycle}`,
      });
      result.renewed++;
    } else {
      await markPastDue(sub.id);
      result.failed++;
    }
  }

  // 2) PAST_DUE & grace dolmuş → kapat
  const graceCutoff = new Date(now.getTime() - GRACE_DAYS * MS_DAY);
  const stale = await prisma.shSubscription.findMany({
    where: { status: "PAST_DUE", currentPeriodEnd: { lt: graceCutoff } },
    select: { id: true },
    take: 500,
  });
  for (const s of stale) {
    await expireSubscription(s.id);
    result.expired++;
  }

  // 3) Dönem sonunda iptal → süresi dolanları kapat
  const canceledDue = await prisma.shSubscription.findMany({
    where: { status: "CANCELED", cancelAtPeriodEnd: true, currentPeriodEnd: { lt: now } },
    select: { id: true },
    take: 500,
  });
  for (const s of canceledDue) {
    await expireSubscription(s.id);
    result.expired++;
  }

  // 4) Backstop: cüzdan-dışı aktif ama süresi çoktan geçmiş (webhook kaçmış olabilir)
  const orphan = await prisma.shSubscription.findMany({
    where: {
      status: "ACTIVE",
      provider: { not: "wallet" },
      currentPeriodEnd: { lt: new Date(now.getTime() - GRACE_DAYS * MS_DAY) },
    },
    select: { id: true },
    take: 200,
  });
  for (const s of orphan) {
    await expireSubscription(s.id);
    result.expired++;
  }

  return NextResponse.json({ ok: true, at: now.toISOString(), ...result });
}
