import "server-only";
import prisma from "@/app/lib/prisma";
import type { ShBookingStatus, ShCurrency } from "@prisma/client";
import { creditWallet, debitWallet } from "./wallet";
import { refundPayment } from "./payments";
import { sendMail } from "./lib/mail";

// ===========================================================================
//  Kısa dönem kiralama motoru
//  - quoteBooking:   tarih aralığı için fiyat teklifi + doğrulama + müsaitlik
//  - getBlockedRanges: takvim için dolu/kapalı aralıklar
//  - createPendingBooking → fulfillBookingPayment → confirm/reject/cancel/complete
//  Ödeme, iade ve ev sahibine ödeme cüzdan motoru üzerinden yürür.
// ===========================================================================

const MS_DAY = 86_400_000;
const SERVICE_FEE_PCT = Number(process.env.SH_RENTAL_SERVICE_FEE_PCT ?? "0"); // platform komisyonu %
const BLOCKING: ShBookingStatus[] = ["AWAITING_APPROVAL", "CONFIRMED"];

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** "YYYY-MM-DD" veya ISO → UTC gün başlangıcı. */
export function toUTCDate(input: string | Date): Date {
  const d = new Date(input);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/** İki yarı-açık aralık [s1,e1) ve [s2,e2) çakışıyor mu? */
function overlaps(s1: Date, e1: Date, s2: Date, e2: Date) {
  return s1 < e2 && s2 < e1;
}

export interface Quote {
  ok: boolean;
  error?: string;
  nights: number;
  pricePerUnit: number;
  subtotal: number;
  discount: number;
  cleaningFee: number;
  serviceFee: number;
  deposit: number;
  total: number;
  currency: ShCurrency;
}

/**
 * Bir tarih aralığı için fiyat teklifi hesaplar; min/max gece, müsaitlik ve
 * kiralanabilirlik kurallarını doğrular.
 */
export async function quoteBooking(
  listingId: string,
  startInput: string,
  endInput: string,
  guests = 1,
): Promise<Quote> {
  const listing = await prisma.shListing.findUnique({ where: { id: listingId } });
  const empty: Quote = {
    ok: false,
    nights: 0,
    pricePerUnit: 0,
    subtotal: 0,
    discount: 0,
    cleaningFee: 0,
    serviceFee: 0,
    deposit: 0,
    total: 0,
    currency: (listing?.currency as ShCurrency) ?? "TRY",
  };
  if (!listing) return { ...empty, error: "İlan bulunamadı" };
  if (!listing.rentable || !listing.dailyPrice)
    return { ...empty, error: "Bu ilan rezervasyona kapalı" };

  const start = toUTCDate(startInput);
  const end = toUTCDate(endInput);
  if (!(end.getTime() > start.getTime())) return { ...empty, error: "Çıkış tarihi girişten sonra olmalı" };
  if (start.getTime() < toUTCDate(new Date()).getTime())
    return { ...empty, error: "Geçmiş bir tarih seçilemez" };

  const nights = Math.round((end.getTime() - start.getTime()) / MS_DAY);
  if (listing.minNights && nights < listing.minNights)
    return { ...empty, nights, error: `En az ${listing.minNights} gece` };
  if (listing.maxNights && nights > listing.maxNights)
    return { ...empty, nights, error: `En fazla ${listing.maxNights} gece` };
  if (listing.maxGuests && guests > listing.maxGuests)
    return { ...empty, nights, error: `En fazla ${listing.maxGuests} misafir` };

  // Müsaitlik
  const available = await isAvailable(listingId, start, end);
  if (!available) return { ...empty, nights, error: "Seçilen tarihler dolu" };

  // Fiyat: haftalık/aylık varsa indirimli kademeli hesap
  const daily = listing.dailyPrice;
  const baseDaily = nights * daily;
  let subtotal = baseDaily;

  if (listing.monthlyPrice && nights >= 30) {
    const months = Math.floor(nights / 30);
    const rem = nights % 30;
    const remCost = listing.weeklyPrice && rem >= 7
      ? Math.floor(rem / 7) * listing.weeklyPrice + (rem % 7) * daily
      : rem * daily;
    subtotal = months * listing.monthlyPrice + remCost;
  } else if (listing.weeklyPrice && nights >= 7) {
    const weeks = Math.floor(nights / 7);
    const rem = nights % 7;
    subtotal = weeks * listing.weeklyPrice + rem * daily;
  }
  subtotal = round2(subtotal);

  const discount = round2(Math.max(0, baseDaily - subtotal));
  const cleaningFee = round2(listing.cleaningFee ?? 0);
  const serviceFee = round2((subtotal * SERVICE_FEE_PCT) / 100);
  const deposit = round2(listing.rentDeposit ?? 0);
  const total = round2(subtotal + cleaningFee + serviceFee + deposit);

  return {
    ok: true,
    nights,
    pricePerUnit: daily,
    subtotal,
    discount,
    cleaningFee,
    serviceFee,
    deposit,
    total,
    currency: listing.currency,
  };
}

/** Tarih aralığı müsait mi (dolu rezervasyon veya manuel blok yok mu)? */
export async function isAvailable(
  listingId: string,
  start: Date,
  end: Date,
  excludeBookingId?: string,
): Promise<boolean> {
  const [bookings, blocks] = await Promise.all([
    prisma.shRentalBooking.findMany({
      where: {
        listingId,
        status: { in: BLOCKING },
        id: excludeBookingId ? { not: excludeBookingId } : undefined,
        startDate: { lt: end },
        endDate: { gt: start },
      },
      select: { id: true },
      take: 1,
    }),
    prisma.shRentalBlock.findMany({
      where: { listingId, startDate: { lt: end }, endDate: { gt: start } },
      select: { id: true },
      take: 1,
    }),
  ]);
  return bookings.length === 0 && blocks.length === 0;
}

/** Takvim için dolu/kapalı aralıklar (bugünden itibaren). */
export async function getBlockedRanges(listingId: string) {
  const today = toUTCDate(new Date());
  const [bookings, blocks] = await Promise.all([
    prisma.shRentalBooking.findMany({
      where: { listingId, status: { in: BLOCKING }, endDate: { gt: today } },
      select: { startDate: true, endDate: true },
    }),
    prisma.shRentalBlock.findMany({
      where: { listingId, endDate: { gt: today } },
      select: { startDate: true, endDate: true },
    }),
  ]);
  return [...bookings, ...blocks].map((r) => ({
    start: r.startDate.toISOString().slice(0, 10),
    end: r.endDate.toISOString().slice(0, 10),
  }));
}

/** Rezervasyon talebi + bekleyen ödeme oluşturur. */
export async function createPendingBooking(input: {
  renterId: string;
  listingId: string;
  start: string;
  end: string;
  guests?: number;
  note?: string;
  phone?: string;
}) {
  const listing = await prisma.shListing.findUnique({ where: { id: input.listingId } });
  if (!listing) throw new Error("İlan bulunamadı");
  if (listing.userId === input.renterId) throw new Error("Kendi ilanınızı kiralayamazsınız");

  const q = await quoteBooking(input.listingId, input.start, input.end, input.guests ?? 1);
  if (!q.ok) throw new Error(q.error ?? "Geçersiz rezervasyon");

  const start = toUTCDate(input.start);
  const end = toUTCDate(input.end);

  const booking = await prisma.shRentalBooking.create({
    data: {
      listingId: input.listingId,
      renterId: input.renterId,
      ownerId: listing.userId,
      startDate: start,
      endDate: end,
      unit: "DAY",
      nights: q.nights,
      guests: input.guests ?? 1,
      pricePerUnit: q.pricePerUnit,
      subtotal: q.subtotal,
      cleaningFee: q.cleaningFee,
      serviceFee: q.serviceFee,
      discount: q.discount,
      deposit: q.deposit,
      totalAmount: q.total,
      currency: q.currency,
      status: "PENDING",
      note: input.note,
      contactPhone: input.phone,
    },
  });

  const payment = await prisma.shPayment.create({
    data: {
      userId: input.renterId,
      amount: q.total,
      currency: q.currency,
      type: "DEPOSIT", // kiralama tahsilatı (rezervasyon)
      status: "PENDING",
      meta: { kind: "rental", bookingId: booking.id, listingId: input.listingId },
    },
  });

  await prisma.shRentalBooking.update({
    where: { id: booking.id },
    data: { paymentId: payment.id },
  });

  return { booking, payment, listing, quote: q };
}

/**
 * Rezervasyon ödemesini tamamlar. Idempotent.
 * instantBook → CONFIRMED, değilse AWAITING_APPROVAL. Depozito emanete alınır.
 */
export async function fulfillBookingPayment(paymentId: string, provider: string, refId?: string) {
  const payment = await prisma.shPayment.findUnique({ where: { id: paymentId } });
  if (!payment) return { ok: false as const, error: "Ödeme bulunamadı" };
  if (payment.status === "PAID") return { ok: true as const, already: true };

  const meta = (payment.meta as any) ?? {};
  const booking = await prisma.shRentalBooking.findUnique({ where: { id: meta.bookingId } });
  if (!booking) return { ok: false as const, error: "Rezervasyon yok" };

  const listing = await prisma.shListing.findUnique({
    where: { id: booking.listingId },
    select: { title: true, instantBook: true },
  });

  // Çifte rezervasyon koruması: ödeme anında hâlâ müsait mi?
  const stillFree = await isAvailable(booking.listingId, booking.startDate, booking.endDate, booking.id);
  if (!stillFree) {
    // Tarihler kapılmış → otomatik iade
    await prisma.shPayment.update({ where: { id: paymentId }, data: { status: "REFUNDED", provider, refId } });
    await prisma.shRentalBooking.update({
      where: { id: booking.id },
      data: { status: "CANCELLED", cancelReason: "Tarihler başka rezervasyonla doldu" },
    });
    await refundToRenter(booking.renterId, payment.amount, payment.currency, booking.id, provider);
    return { ok: false as const, error: "Tarihler dolduğu için iade edildi" };
  }

  const newStatus: ShBookingStatus = listing?.instantBook ? "CONFIRMED" : "AWAITING_APPROVAL";

  await prisma.shPayment.update({
    where: { id: paymentId },
    data: { status: "PAID", provider, refId: refId ?? null },
  });

  // Güvenlik depozitosu emaneti
  let depositId: string | undefined;
  if (booking.deposit > 0) {
    const dep = await prisma.shDeposit.create({
      data: {
        listingId: booking.listingId,
        buyerId: booking.renterId,
        sellerId: booking.ownerId,
        amount: booking.deposit,
        currency: booking.currency,
        status: "HELD",
        paymentId,
      },
    });
    depositId = dep.id;
  }

  await prisma.shRentalBooking.update({
    where: { id: booking.id },
    data: {
      status: newStatus,
      depositId,
      confirmedAt: newStatus === "CONFIRMED" ? new Date() : null,
    },
  });

  await notifyBooking(booking.ownerId, "Yeni rezervasyon", `${listing?.title ?? "İlan"} için ${booking.nights} gecelik rezervasyon ${newStatus === "CONFIRMED" ? "onaylandı" : "onayınızı bekliyor"}.`);
  await notifyBooking(booking.renterId, newStatus === "CONFIRMED" ? "Rezervasyon onaylandı" : "Ödeme alındı", `${listing?.title ?? "İlan"} — ${fmtRange(booking.startDate, booking.endDate)}`);

  return { ok: true as const };
}

/** Ev sahibi onayı. */
export async function confirmBooking(bookingId: string, ownerId: string) {
  const b = await prisma.shRentalBooking.findFirst({ where: { id: bookingId, ownerId } });
  if (!b) return { ok: false as const, error: "Rezervasyon yok" };
  if (b.status !== "AWAITING_APPROVAL") return { ok: false as const, error: "Onaylanabilir durumda değil" };

  await prisma.shRentalBooking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });
  await notifyBooking(b.renterId, "Rezervasyon onaylandı", `${fmtRange(b.startDate, b.endDate)} tarihleri onaylandı.`);
  return { ok: true as const };
}

/** Ev sahibi reddi → tam iade. */
export async function rejectBooking(bookingId: string, ownerId: string, reason?: string) {
  const b = await prisma.shRentalBooking.findFirst({ where: { id: bookingId, ownerId } });
  if (!b) return { ok: false as const, error: "Rezervasyon yok" };
  if (!["AWAITING_APPROVAL", "PENDING"].includes(b.status))
    return { ok: false as const, error: "Reddedilebilir durumda değil" };

  await prisma.shRentalBooking.update({
    where: { id: bookingId },
    data: { status: "REJECTED", cancelReason: reason ?? "Ev sahibi reddetti", cancelledAt: new Date() },
  });
  await refundBooking(b.id);
  await notifyBooking(b.renterId, "Rezervasyon reddedildi", `Ücretiniz cüzdanınıza iade edildi.`);
  return { ok: true as const };
}

/**
 * İptal politikası → iade oranı (kira+ücretler için; depozito her zaman tam iade).
 *   FLEXIBLE: girişe 24+ saat varsa %100, yoksa %0
 *   MODERATE: girişe 5+ gün varsa %100, 1-5 gün %50, <1 gün %0
 *   STRICT:   girişe 7+ gün varsa %50, yoksa %0
 * Ev sahibi iptali/reddi her zaman %100 iade.
 */
export function refundRatioForPolicy(policy: string | null | undefined, startDate: Date, now = new Date()): number {
  const hoursToCheckIn = (startDate.getTime() - now.getTime()) / 3_600_000;
  const days = hoursToCheckIn / 24;
  switch ((policy ?? "MODERATE").toUpperCase()) {
    case "FLEXIBLE":
      return hoursToCheckIn >= 24 ? 1 : 0;
    case "STRICT":
      return days >= 7 ? 0.5 : 0;
    case "MODERATE":
    default:
      if (days >= 5) return 1;
      if (days >= 1) return 0.5;
      return 0;
  }
}

/** Kiracı veya ev sahibi iptali → iade (kiracı iptalinde politika oranı uygulanır). */
export async function cancelBooking(bookingId: string, userId: string, reason?: string) {
  const b = await prisma.shRentalBooking.findFirst({
    where: { id: bookingId, OR: [{ renterId: userId }, { ownerId: userId }] },
    include: { listing: { select: { cancellationPolicy: true } } },
  });
  if (!b) return { ok: false as const, error: "Rezervasyon yok" };
  if (["COMPLETED", "CANCELLED", "REJECTED"].includes(b.status))
    return { ok: false as const, error: "İptal edilemez" };

  const isRenter = userId === b.renterId;
  // Ev sahibi iptali → tam iade. Kiracı iptali → politikaya göre oran.
  const ratio = isRenter ? refundRatioForPolicy(b.listing.cancellationPolicy, b.startDate) : 1;

  await prisma.shRentalBooking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
      cancelReason: reason ?? (isRenter ? "Kiracı iptali" : "Ev sahibi iptali"),
      cancelledAt: new Date(),
    },
  });

  let refundInfo = { refunded: 0 as number };
  if (b.paymentId) refundInfo = await refundBooking(b.id, ratio);

  const other = isRenter ? b.ownerId : b.renterId;
  await notifyBooking(other, "Rezervasyon iptal edildi", `${fmtRange(b.startDate, b.endDate)} iptal edildi.`);
  if (isRenter && b.paymentId) {
    const pct = Math.round(ratio * 100);
    await notifyBooking(
      b.renterId,
      "İptaliniz alındı",
      `${b.listing.cancellationPolicy ?? "MODERATE"} politikası: kira tutarının %${pct}'i + depozito iade edildi (${refundInfo.refunded} ${b.currency}).`,
    );
  }
  return { ok: true as const, refunded: refundInfo.refunded };
}

/** Konaklama tamamlandı: kira ev sahibine, depozito kiracıya. */
export async function completeBooking(bookingId: string) {
  const b = await prisma.shRentalBooking.findUnique({ where: { id: bookingId } });
  if (!b || b.status !== "CONFIRMED") return { ok: false as const, error: "Tamamlanamaz" };

  await prisma.shRentalBooking.update({ where: { id: bookingId }, data: { status: "COMPLETED" } });

  // Ev sahibine ödeme (toplam - depozito - servis ücreti)
  const payout = round2(b.totalAmount - b.deposit - b.serviceFee);
  if (payout > 0) {
    await creditWallet({
      userId: b.ownerId,
      type: "TOPUP",
      amount: payout,
      currency: b.currency,
      description: "Kiralama geliri",
      refType: "rental-payout",
      refId: b.id,
    });
  }
  // Depozito kiracıya iade
  if (b.deposit > 0) {
    await creditWallet({
      userId: b.renterId,
      type: "REFUND",
      amount: b.deposit,
      currency: b.currency,
      description: "Güvenlik depozitosu iadesi",
      refType: "rental-deposit-refund",
      refId: b.id,
    });
    if (b.depositId)
      await prisma.shDeposit.update({ where: { id: b.depositId }, data: { status: "REFUNDED" } }).catch(() => {});
  }
  return { ok: true as const, payout };
}

// --- Manuel takvim blokları ---
export async function blockDates(listingId: string, ownerId: string, start: string, end: string, reason?: string) {
  const listing = await prisma.shListing.findFirst({ where: { id: listingId, userId: ownerId } });
  if (!listing) return { ok: false as const, error: "İlan size ait değil" };
  await prisma.shRentalBlock.create({
    data: { listingId, startDate: toUTCDate(start), endDate: toUTCDate(end), reason },
  });
  return { ok: true as const };
}

export async function unblockDates(blockId: string, ownerId: string) {
  const block = await prisma.shRentalBlock.findUnique({
    where: { id: blockId },
    include: { listing: { select: { userId: true } } },
  });
  if (!block || block.listing.userId !== ownerId) return { ok: false as const, error: "Yetki yok" };
  await prisma.shRentalBlock.delete({ where: { id: blockId } });
  return { ok: true as const };
}

// --- Tarih değişikliği (modification) ---

/** Kiracı veya ev sahibi yeni tarih önerir (diğer taraf onaylar). */
export async function proposeBookingChange(bookingId: string, userId: string, start: string, end: string) {
  const b = await prisma.shRentalBooking.findFirst({
    where: { id: bookingId, OR: [{ renterId: userId }, { ownerId: userId }] },
  });
  if (!b) return { ok: false as const, error: "Rezervasyon yok" };
  if (!["CONFIRMED", "AWAITING_APPROVAL"].includes(b.status))
    return { ok: false as const, error: "Bu durumda değiştirilemez" };

  const ns = toUTCDate(start);
  const ne = toUTCDate(end);
  if (!(ne.getTime() > ns.getTime())) return { ok: false as const, error: "Geçersiz tarih aralığı" };

  const avail = await isAvailable(b.listingId, ns, ne, b.id);
  if (!avail) return { ok: false as const, error: "Seçilen tarihler dolu" };

  const q = await quoteBooking(b.listingId, start, end, b.guests);
  if (!q.ok) return { ok: false as const, error: q.error ?? "Fiyat hesaplanamadı" };

  await prisma.shRentalBooking.update({
    where: { id: b.id },
    data: { proposedStartDate: ns, proposedEndDate: ne, proposedById: userId, proposedTotalAmount: q.total },
  });
  const other = userId === b.renterId ? b.ownerId : b.renterId;
  const diff = round2(q.total - b.totalAmount);
  await notifyBooking(
    other,
    "Tarih değişikliği önerildi",
    `${fmtRange(ns, ne)} — yeni tutar ${q.total} ${b.currency}${diff !== 0 ? ` (fark ${diff > 0 ? "+" : ""}${diff})` : ""}.`,
  );
  return { ok: true as const, total: q.total, diff };
}

/** Karşı taraf tarih değişikliğini kabul/ret eder. Fiyat farkı cüzdandan dengelenir. */
export async function respondBookingChange(bookingId: string, userId: string, accept: boolean) {
  const b = await prisma.shRentalBooking.findFirst({
    where: { id: bookingId, OR: [{ renterId: userId }, { ownerId: userId }] },
  });
  if (!b || !b.proposedStartDate || !b.proposedEndDate || !b.proposedById)
    return { ok: false as const, error: "Bekleyen öneri yok" };
  if (b.proposedById === userId) return { ok: false as const, error: "Kendi önerinizi onaylayamazsınız" };

  const clearProposal = {
    proposedStartDate: null,
    proposedEndDate: null,
    proposedById: null,
    proposedTotalAmount: null,
  };

  if (!accept) {
    await prisma.shRentalBooking.update({ where: { id: b.id }, data: clearProposal });
    await notifyBooking(b.proposedById, "Tarih değişikliği reddedildi", `${fmtRange(b.startDate, b.endDate)} korunuyor.`);
    return { ok: true as const, accepted: false };
  }

  // Hâlâ müsait mi?
  const avail = await isAvailable(b.listingId, b.proposedStartDate, b.proposedEndDate, b.id);
  if (!avail) {
    await prisma.shRentalBooking.update({ where: { id: b.id }, data: clearProposal });
    return { ok: false as const, error: "Tarihler artık müsait değil" };
  }

  const newTotal = b.proposedTotalAmount ?? b.totalAmount;
  const diff = round2(newTotal - b.totalAmount);

  // Fiyat farkını dengele: fark > 0 → kiracıdan ek tahsilat; fark < 0 → kiracıya iade.
  if (diff > 0) {
    const deb = await debitWallet({
      userId: b.renterId,
      amount: diff,
      currency: b.currency,
      description: "Rezervasyon tarih değişikliği farkı",
      refType: "rental-change",
      refId: `${b.id}:${b.proposedStartDate.toISOString()}`,
    });
    if (!deb.ok) return { ok: false as const, error: "Kiracı bakiyesi fark için yetersiz" };
  } else if (diff < 0) {
    await creditWallet({
      userId: b.renterId,
      type: "REFUND",
      amount: -diff,
      currency: b.currency,
      description: "Rezervasyon tarih değişikliği iadesi",
      refType: "rental-change-refund",
      refId: `${b.id}:${b.proposedStartDate.toISOString()}`,
    });
  }

  const nights = Math.round((b.proposedEndDate.getTime() - b.proposedStartDate.getTime()) / MS_DAY);
  await prisma.shRentalBooking.update({
    where: { id: b.id },
    data: {
      startDate: b.proposedStartDate,
      endDate: b.proposedEndDate,
      nights,
      totalAmount: newTotal,
      ...clearProposal,
    },
  });
  await notifyBooking(b.proposedById, "Tarih değişikliği onaylandı", `Yeni tarihler: ${fmtRange(b.proposedStartDate, b.proposedEndDate)}.`);
  return { ok: true as const, accepted: true, diff };
}

// --- Konaklama sonrası değerlendirme ---

/** Kiracı veya ev sahibi tamamlanan rezervasyon sonrası karşı tarafı değerlendirir. */
export async function submitBookingReview(bookingId: string, authorId: string, rating: number, comment?: string) {
  const b = await prisma.shRentalBooking.findFirst({
    where: { id: bookingId, OR: [{ renterId: authorId }, { ownerId: authorId }] },
  });
  if (!b) return { ok: false as const, error: "Rezervasyon yok" };
  if (b.status !== "COMPLETED") return { ok: false as const, error: "Yalnızca tamamlanan rezervasyon değerlendirilebilir" };

  const isRenter = authorId === b.renterId;
  if (isRenter && b.renterReviewed) return { ok: false as const, error: "Zaten değerlendirdiniz" };
  if (!isRenter && b.ownerReviewed) return { ok: false as const, error: "Zaten değerlendirdiniz" };

  const targetUserId = isRenter ? b.ownerId : b.renterId;
  await prisma.shReview.create({
    data: {
      authorId,
      targetUserId,
      listingId: b.listingId,
      rating: Math.max(1, Math.min(5, Math.round(rating))),
      comment: comment?.slice(0, 1000) || null,
      bookingId: b.id,
    },
  });
  await prisma.shRentalBooking.update({
    where: { id: b.id },
    data: isRenter ? { renterReviewed: true } : { ownerReviewed: true },
  });
  await notifyBooking(targetUserId, "Yeni değerlendirme", "Rezervasyonunuz için bir değerlendirme bırakıldı.");
  return { ok: true as const };
}

// --- iCal dışa aktarma (read-only takvim feed'i) ---

/** Bir ilanın dolu (rezervasyon + blok) tarihlerini iCalendar (.ics) metnine çevirir. */
export async function buildListingIcal(listingId: string): Promise<string | null> {
  const listing = await prisma.shListing.findUnique({ where: { id: listingId }, select: { title: true, rentable: true } });
  if (!listing) return null;

  const [bookings, blocks] = await Promise.all([
    prisma.shRentalBooking.findMany({
      where: { listingId, status: { in: BLOCKING } },
      select: { id: true, startDate: true, endDate: true, updatedAt: true },
    }),
    prisma.shRentalBlock.findMany({
      where: { listingId },
      select: { id: true, startDate: true, endDate: true, reason: true, createdAt: true },
    }),
  ]);

  const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//sahibinden//rental//TR",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${(listing.title || "Kiralama").replace(/[\r\n,;]/g, " ")}`,
  ];
  for (const b of bookings) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:booking-${b.id}@sahibinden`,
      `DTSTAMP:${stamp(b.updatedAt)}`,
      `DTSTART;VALUE=DATE:${fmt(b.startDate)}`,
      `DTEND;VALUE=DATE:${fmt(b.endDate)}`,
      "SUMMARY:Rezervasyon (dolu)",
      "END:VEVENT",
    );
  }
  for (const bl of blocks) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:block-${bl.id}@sahibinden`,
      `DTSTAMP:${stamp(bl.createdAt)}`,
      `DTSTART;VALUE=DATE:${fmt(bl.startDate)}`,
      `DTEND;VALUE=DATE:${fmt(bl.endDate)}`,
      `SUMMARY:${(bl.reason || "Kapalı").replace(/[\r\n,;]/g, " ")}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/** İlan için iCal feed token'ı üretir/getirir (ev sahibi). */
export async function getOrCreateIcalToken(listingId: string, ownerId: string) {
  const listing = await prisma.shListing.findFirst({ where: { id: listingId, userId: ownerId }, select: { icalToken: true } });
  if (!listing) return { ok: false as const, error: "İlan size ait değil" };
  if (listing.icalToken) return { ok: true as const, token: listing.icalToken };
  const token = `${listingId.slice(0, 6)}${Math.abs(hashStr(listingId + ownerId)).toString(36)}${Date.now().toString(36)}`;
  await prisma.shListing.update({ where: { id: listingId }, data: { icalToken: token } });
  return { ok: true as const, token };
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

// --- yardımcılar ---

/**
 * Ödenen tutarı kiracıya iade eder. `ratio` (0..1) iptal politikasına göre
 * iade oranıdır (1 = tam iade). İade mümkünse orijinal karta/PayPal'a, değilse
 * cüzdana yapılır (refundPayment). Depozito her zaman tam iade edilir.
 */
async function refundBooking(bookingId: string, ratio = 1) {
  const b = await prisma.shRentalBooking.findUnique({ where: { id: bookingId } });
  if (!b) return { refunded: 0 };
  const payment = b.paymentId ? await prisma.shPayment.findUnique({ where: { id: b.paymentId } }) : null;
  if (!payment || payment.status !== "PAID") return { refunded: 0 };

  // Depozito her durumda tam iade; kira + ücretler politikaya göre kısmi.
  const refundableBase = round2(payment.amount - b.deposit);
  const r = Math.max(0, Math.min(1, ratio));
  const refundAmount = round2(b.deposit + refundableBase * r);

  const res = await refundPayment(payment.id, {
    amount: refundAmount,
    reason: "Rezervasyon iadesi",
    refundToUserId: b.renterId,
  });
  await prisma.shRentalBooking.update({
    where: { id: b.id },
    data: { refundedAmount: refundAmount },
  });
  if (b.depositId)
    await prisma.shDeposit.update({ where: { id: b.depositId }, data: { status: "REFUNDED", refundedAt: new Date() } }).catch(() => {});
  return { refunded: res.ok ? refundAmount : 0, method: res.method };
}

function fmtRange(s: Date, e: Date) {
  const f = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });
  return `${f.format(s)} – ${f.format(e)}`;
}

async function notifyBooking(userId: string, title: string, body: string) {
  await prisma.shNotification
    .create({ data: { userId, type: "FAVORITE_SOLD", title, body, link: "/sahibinden/hesabim/rezervasyonlarim" } })
    .catch(() => {});
  try {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (u?.email)
      await sendMail({ to: u.email, subject: title, html: `<div style="font-family:Arial;padding:16px"><p>${body}</p></div>` });
  } catch {
    /* yok say */
  }
}
