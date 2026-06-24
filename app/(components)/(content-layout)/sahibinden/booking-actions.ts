"use server";

import prisma from "@/app/lib/prisma";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import {
  createPendingBooking,
  fulfillBookingPayment,
  confirmBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
  blockDates,
  unblockDates,
  proposeBookingChange,
  respondBookingChange,
  submitBookingReview,
  getOrCreateIcalToken,
} from "./rentals";
import { debitWallet } from "./wallet";

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) return null;
  return user;
}

/** Rezervasyonu cüzdan bakiyesinden öder ve hemen oluşturur. */
export async function bookWithWallet(input: {
  listingId: string;
  start: string;
  end: string;
  guests?: number;
  note?: string;
  phone?: string;
}) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };

  let bookingId: string | undefined;
  try {
    const { booking, payment, quote } = await createPendingBooking({
      renterId: user.id,
      listingId: input.listingId,
      start: input.start,
      end: input.end,
      guests: input.guests,
      note: input.note,
      phone: input.phone,
    });
    bookingId = booking.id;

    const debit = await debitWallet({
      userId: user.id,
      amount: quote.total,
      description: "Kiralama rezervasyonu",
      refType: "rental",
      refId: booking.id,
      paymentId: payment.id,
    });
    if (!debit.ok) {
      await prisma.shPayment.delete({ where: { id: payment.id } }).catch(() => {});
      await prisma.shRentalBooking.delete({ where: { id: booking.id } }).catch(() => {});
      return { ok: false as const, error: "Yetersiz bakiye", needTopup: true };
    }

    const res = await fulfillBookingPayment(payment.id, "wallet", `wallet-${booking.id}`);
    revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
    if (!res.ok) return { ok: false as const, error: res.error ?? "İşlem başarısız" };
    return { ok: true as const, bookingId: booking.id };
  } catch (e: any) {
    if (bookingId) await prisma.shRentalBooking.delete({ where: { id: bookingId } }).catch(() => {});
    return { ok: false as const, error: e?.message ?? "Hata" };
  }
}

export async function confirmBookingAction(bookingId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await confirmBooking(bookingId, user.id);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function rejectBookingAction(bookingId: string, reason?: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await rejectBooking(bookingId, user.id, reason);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function cancelBookingAction(bookingId: string, reason?: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await cancelBooking(bookingId, user.id, reason);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function completeBookingAction(bookingId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  // Sadece ev sahibi tamamlayabilir
  const b = await prisma.shRentalBooking.findFirst({ where: { id: bookingId, ownerId: user.id }, select: { id: true } });
  if (!b) return { ok: false as const, error: "Yetki yok" };
  const res = await completeBooking(bookingId);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function blockDatesAction(listingId: string, start: string, end: string, reason?: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await blockDates(listingId, user.id, start, end, reason);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function unblockDatesAction(blockId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await unblockDates(blockId, user.id);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function proposeBookingChangeAction(bookingId: string, start: string, end: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await proposeBookingChange(bookingId, user.id, start, end);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function respondBookingChangeAction(bookingId: string, accept: boolean) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await respondBookingChange(bookingId, user.id, accept);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function submitBookingReviewAction(bookingId: string, rating: number, comment?: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  const res = await submitBookingReview(bookingId, user.id, rating, comment);
  revalidatePath("/sahibinden/hesabim/rezervasyonlarim");
  return res;
}

export async function getIcalTokenAction(listingId: string) {
  const user = await requireUser();
  if (!user) return { ok: false as const, error: "Giriş yapın" };
  return getOrCreateIcalToken(listingId, user.id);
}
