import "server-only";
import prisma from "@/app/lib/prisma";
import { sendMail, mailDopingReceipt } from "./lib/mail";

// ---------------------------------------------------------------------------
//  Kapora (escrow-lite)
// ---------------------------------------------------------------------------

export async function createPendingDeposit(userId: string, listingId: string, amount: number) {
  const listing = await prisma.shListing.findUnique({ where: { id: listingId } });
  if (!listing) throw new Error("İlan bulunamadı");
  if (listing.userId === userId) throw new Error("Kendi ilanınıza kapora veremezsiniz");
  if (!(amount > 0)) throw new Error("Geçerli bir tutar girin");

  const payment = await prisma.shPayment.create({
    data: {
      userId,
      amount,
      currency: listing.currency,
      type: "DEPOSIT",
      status: "PENDING",
      meta: { listingId, kind: "deposit" },
    },
  });
  const deposit = await prisma.shDeposit.create({
    data: {
      listingId,
      buyerId: userId,
      sellerId: listing.userId,
      amount,
      currency: listing.currency,
      status: "PENDING",
      paymentId: payment.id,
    },
  });
  return { payment, deposit, listing };
}

export async function fulfillDepositPayment(paymentId: string, provider: string, refId?: string) {
  const payment = await prisma.shPayment.findUnique({ where: { id: paymentId } });
  if (!payment) return { ok: false, error: "Ödeme bulunamadı" };
  if (payment.status === "PAID") return { ok: true, already: true };

  const deposit = await prisma.shDeposit.findFirst({ where: { paymentId } });
  if (!deposit) return { ok: false, error: "Kapora kaydı yok" };

  await prisma.shPayment.update({ where: { id: paymentId }, data: { status: "PAID", provider, refId: refId ?? null } });
  await prisma.shDeposit.update({ where: { id: deposit.id }, data: { status: "HELD" } });

  const listing = await prisma.shListing.findUnique({ where: { id: deposit.listingId }, select: { title: true } });

  // Her iki tarafa bildirim
  for (const uid of [deposit.buyerId, deposit.sellerId]) {
    await prisma.shNotification
      .create({
        data: {
          userId: uid,
          type: "FAVORITE_SOLD",
          title: uid === deposit.buyerId ? "Kaporanız emanete alındı" : "İlanınıza kapora yatırıldı",
          body: `${listing?.title ?? "İlan"} — ${deposit.amount} ${deposit.currency}`,
          link: "/sahibinden/hesabim/randevular",
          listingId: deposit.listingId,
        },
      })
      .catch(() => {});
  }

  try {
    const [buyer, seller] = await Promise.all([
      prisma.user.findUnique({ where: { id: deposit.buyerId }, select: { email: true } }),
      prisma.user.findUnique({ where: { id: deposit.sellerId }, select: { email: true } }),
    ]);
    const body = `<div style="font-family:Arial;padding:16px"><p><strong>${listing?.title ?? "İlan"}</strong> için <b>${deposit.amount} ${deposit.currency}</b> kapora güvenli şekilde emanete alındı.</p></div>`;
    if (buyer?.email) await sendMail({ to: buyer.email, subject: "Kaporanız emanete alındı", html: body });
    if (seller?.email) await sendMail({ to: seller.email, subject: "İlanınıza kapora yatırıldı", html: body });
  } catch {
    /* yok say */
  }

  return { ok: true };
}

/** Doping için PENDING ödeme + bağlamı oluşturur. */
export async function createPendingDopingPayment(userId: string, listingId: string, packageId: string) {
  const [listing, pkg] = await Promise.all([
    prisma.shListing.findUnique({ where: { id: listingId } }),
    prisma.shDopingPackage.findUnique({ where: { id: packageId } }),
  ]);
  if (!listing) throw new Error("İlan bulunamadı");
  if (listing.userId !== userId) throw new Error("Yetkiniz yok");
  if (!pkg || !pkg.active) throw new Error("Paket bulunamadı");

  const payment = await prisma.shPayment.create({
    data: {
      userId,
      amount: pkg.price,
      currency: pkg.currency,
      type: "DOPING",
      status: "PENDING",
      meta: { listingId, packageId },
    },
  });
  return { payment, pkg, listing };
}

/** Ödemeyi tamamlar: doping uygular, ilan bayraklarını set eder, mail + bildirim gönderir. Idempotent. */
export async function fulfillDopingPayment(paymentId: string, provider: string, refId?: string) {
  const payment = await prisma.shPayment.findUnique({ where: { id: paymentId } });
  if (!payment) return { ok: false, error: "Ödeme bulunamadı" };
  if (payment.status === "PAID") return { ok: true, already: true };

  const meta = (payment.meta as any) ?? {};
  const listingId = meta.listingId as string;
  const packageId = meta.packageId as string;

  const pkg = await prisma.shDopingPackage.findUnique({ where: { id: packageId } });
  const listing = await prisma.shListing.findUnique({ where: { id: listingId } });
  if (!pkg || !listing) return { ok: false, error: "Paket/ilan yok" };

  const expiresAt = new Date(Date.now() + pkg.durationDays * 86400000);

  await prisma.shPayment.update({
    where: { id: paymentId },
    data: { status: "PAID", provider, refId: refId ?? null },
  });

  await prisma.shListingDoping.create({
    data: { listingId, packageId, userId: payment.userId, paymentId, status: "ACTIVE", expiresAt },
  });

  const flagData: Record<string, unknown> = {};
  switch (pkg.type) {
    case "SHOWCASE": flagData.isShowcase = true; flagData.showcaseUntil = expiresAt; break;
    case "FEATURED": flagData.isFeatured = true; flagData.featuredUntil = expiresAt; break;
    case "URGENT": flagData.isUrgent = true; flagData.urgentUntil = expiresAt; break;
    case "BUMP": flagData.bumpedAt = new Date(); break;
  }
  await prisma.shListing.update({ where: { id: listingId }, data: flagData });

  // Bildirim + mail
  await prisma.shNotification.create({
    data: {
      userId: payment.userId,
      type: "DOPING_EXPIRING",
      title: "Doping uygulandı",
      body: `${pkg.name} — ${listing.title}`,
      link: "/sahibinden/hesabim/ilanlarim",
      listingId,
    },
  }).catch(() => {});

  const owner = await prisma.user.findUnique({ where: { id: payment.userId }, select: { email: true } });
  if (owner?.email) {
    const tpl = mailDopingReceipt({
      packageName: pkg.name,
      amount: pkg.price,
      currency: pkg.currency,
      listingTitle: listing.title,
    });
    await sendMail({ to: owner.email, ...tpl });
  }

  return { ok: true };
}
