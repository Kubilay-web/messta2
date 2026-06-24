import "server-only";
import prisma from "@/app/lib/prisma";
import { sendMail, mailDopingReceipt } from "./lib/mail";
import { creditWallet, debitWallet } from "./wallet";
import { refundStripe } from "./lib/stripe";
import { refundPaypal } from "./lib/paypal";

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

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

/** Cüzdandan doping satın alır (gerçek tahsilat — demo değil). */
export async function buyDopingWithWallet(userId: string, listingId: string, packageId: string) {
  const { payment, pkg } = await createPendingDopingPayment(userId, listingId, packageId);
  const deb = await debitWallet({
    userId,
    amount: pkg.price,
    currency: pkg.currency,
    description: `Doping: ${pkg.name}`,
    refType: "doping",
    refId: payment.id,
    paymentId: payment.id,
  });
  if (!deb.ok) {
    await prisma.shPayment.delete({ where: { id: payment.id } }).catch(() => {});
    return { ok: false as const, error: deb.error ?? "Yetersiz bakiye" };
  }
  await fulfillDopingPayment(payment.id, "wallet", payment.id);
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
//  İade (kart / PayPal / cüzdan) — orijinal yönteme, olmazsa cüzdana
// ---------------------------------------------------------------------------

/**
 * Bir ödemeyi (kısmen) iade eder. Stripe/PayPal ödemeleri mümkünse orijinal
 * karta/hesaba iade edilir; sağlayıcı iadesi yapılamazsa veya cüzdan ödemesiyse
 * tutar kullanıcının cüzdanına geri yatırılır. Idempotent + kısmi iade destekli.
 */
export async function refundPayment(
  paymentId: string,
  opts?: { amount?: number; reason?: string; refundToUserId?: string },
): Promise<{ ok: boolean; method?: string; amount?: number; providerRef?: string | null; error?: string; already?: boolean }> {
  const payment = await prisma.shPayment.findUnique({ where: { id: paymentId } });
  if (!payment) return { ok: false, error: "Ödeme bulunamadı" };
  if (payment.status === "REFUNDED") return { ok: true, already: true };
  if (payment.status !== "PAID") return { ok: false, error: "İade edilemez (ödeme tamamlanmamış)" };

  const remaining = round2(payment.amount - payment.refundedAmount);
  const amount = round2(Math.min(opts?.amount ?? remaining, remaining));
  if (!(amount > 0)) return { ok: false, error: "İade edilecek tutar yok" };

  const toUser = opts?.refundToUserId ?? payment.userId;
  let method = "wallet";
  let providerRef: string | null = null;

  if (payment.provider === "stripe" && payment.refId) {
    providerRef = await refundStripe(payment.refId, amount);
    if (providerRef) method = "stripe";
  } else if (payment.provider === "paypal" && payment.refId) {
    providerRef = await refundPaypal(payment.refId, amount, payment.currency);
    if (providerRef) method = "paypal";
  }

  // Sağlayıcı iadesi yapılamadıysa (veya cüzdan/demo ödemesiyse) cüzdana iade et.
  if (method === "wallet") {
    await creditWallet({
      userId: toUser,
      type: "REFUND",
      amount,
      currency: payment.currency,
      description: opts?.reason ?? "İade",
      refType: "refund",
      refId: paymentId,
      paymentId,
    });
  }

  const totalRefunded = round2(payment.refundedAmount + amount);
  await prisma.shPayment.update({
    where: { id: paymentId },
    data: {
      refundedAmount: totalRefunded,
      refundedAt: new Date(),
      refundRef: providerRef ?? payment.refundRef ?? undefined,
      status: totalRefunded + 1e-6 >= payment.amount ? "REFUNDED" : "PAID",
    },
  });
  return { ok: true, method, amount, providerRef };
}

// ---------------------------------------------------------------------------
//  Kapora (emanet) — serbest bırakma / iade / anlaşmazlık
// ---------------------------------------------------------------------------

async function notifyDeposit(userId: string, title: string, body: string, listingId?: string) {
  await prisma.shNotification
    .create({
      data: { userId, type: "FAVORITE_SOLD", title, body, link: "/sahibinden/hesabim/kaporalar", listingId },
    })
    .catch(() => {});
  const u = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (u?.email)
    await sendMail({ to: u.email, subject: title, html: `<div style="font-family:Arial;padding:16px"><p>${body}</p></div>` }).catch(
      () => {},
    );
}

/** Alıcı (veya admin) kaporayı satıcıya serbest bırakır. */
export async function releaseDeposit(depositId: string, actorId: string, isAdmin = false) {
  const d = await prisma.shDeposit.findUnique({ where: { id: depositId } });
  if (!d) return { ok: false as const, error: "Kapora bulunamadı" };
  if (!isAdmin && actorId !== d.buyerId) return { ok: false as const, error: "Yalnızca kaporayı yatıran serbest bırakabilir" };
  if (d.status !== "HELD" && d.status !== "DISPUTED") return { ok: false as const, error: "Serbest bırakılabilir durumda değil" };

  await creditWallet({
    userId: d.sellerId,
    type: "TOPUP",
    amount: d.amount,
    currency: d.currency,
    description: "Kapora serbest bırakıldı",
    refType: "deposit-release",
    refId: d.id,
    paymentId: d.paymentId ?? undefined,
  });
  await prisma.shDeposit.update({ where: { id: d.id }, data: { status: "RELEASED", releasedAt: new Date() } });
  await notifyDeposit(d.sellerId, "Kapora hesabınıza aktarıldı", `${d.amount} ${d.currency} kapora serbest bırakıldı.`, d.listingId);
  await notifyDeposit(d.buyerId, "Kapora serbest bırakıldı", `${d.amount} ${d.currency} satıcıya aktarıldı.`, d.listingId);
  return { ok: true as const };
}

/** Satıcı (veya admin) kaporayı alıcıya iade eder. */
export async function refundDeposit(depositId: string, actorId: string, isAdmin = false) {
  const d = await prisma.shDeposit.findUnique({ where: { id: depositId } });
  if (!d) return { ok: false as const, error: "Kapora bulunamadı" };
  if (!isAdmin && actorId !== d.sellerId) return { ok: false as const, error: "Yalnızca satıcı iade edebilir" };
  if (d.status !== "HELD" && d.status !== "DISPUTED") return { ok: false as const, error: "İade edilebilir durumda değil" };

  if (d.paymentId) {
    await refundPayment(d.paymentId, { reason: "Kapora iadesi", refundToUserId: d.buyerId });
  } else {
    await creditWallet({
      userId: d.buyerId,
      type: "REFUND",
      amount: d.amount,
      currency: d.currency,
      description: "Kapora iadesi",
      refType: "deposit-refund",
      refId: d.id,
    });
  }
  await prisma.shDeposit.update({ where: { id: d.id }, data: { status: "REFUNDED", refundedAt: new Date() } });
  await notifyDeposit(d.buyerId, "Kaporanız iade edildi", `${d.amount} ${d.currency} iade edildi.`, d.listingId);
  await notifyDeposit(d.sellerId, "Kapora iade edildi", `${d.amount} ${d.currency} alıcıya iade edildi.`, d.listingId);
  return { ok: true as const };
}

/** Taraflardan biri emanetteki kapora için anlaşmazlık açar (admin çözer). */
export async function openDepositDispute(depositId: string, actorId: string, reason: string) {
  const d = await prisma.shDeposit.findUnique({ where: { id: depositId } });
  if (!d) return { ok: false as const, error: "Kapora bulunamadı" };
  if (actorId !== d.buyerId && actorId !== d.sellerId) return { ok: false as const, error: "Yetki yok" };
  if (d.status !== "HELD") return { ok: false as const, error: "Yalnızca emanetteki kapora için anlaşmazlık açılabilir" };

  await prisma.shDeposit.update({
    where: { id: d.id },
    data: { status: "DISPUTED", disputeReason: reason.slice(0, 1000), disputedById: actorId },
  });
  const other = actorId === d.buyerId ? d.sellerId : d.buyerId;
  await notifyDeposit(other, "Kapora anlaşmazlığı açıldı", `Karşı taraf anlaşmazlık açtı: ${reason.slice(0, 140)}`, d.listingId);
  return { ok: true as const };
}
