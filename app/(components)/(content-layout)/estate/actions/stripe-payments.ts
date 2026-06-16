"use server";

import db      from "@/app/lib/db";
import Stripe  from "stripe";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-05-28.basil" });
const PATH   = "/estate/portal/client/payments";

// Stripe TRY kuruş çeviri (1 TRY = 100 kuruş)
function toStripeAmount(amount: number, currency: string): number {
  const zeroCurrencies = ["JPY", "KRW", "CLP"];
  return zeroCurrencies.includes(currency.toUpperCase())
    ? Math.round(amount)
    : Math.round(amount * 100);
}

// ==================== ÖDEME NİYETİ OLUŞTUR ====================
export async function createPaymentIntent(paymentId: string) {
  const payment = await db.contractPayment.findUnique({
    where:  { id: paymentId },
    select: {
      id: true, title: true, amount: true,
      contract: { select: { contractNo: true, currency: true, clientName: true } },
    },
  });

  if (!payment) throw new Error("Ödeme kaydı bulunamadı.");
  if (!payment.contract) throw new Error("İlgili sözleşme bulunamadı.");

  const currency = (payment.contract.currency ?? "TRY").toLowerCase();

  const intent = await stripe.paymentIntents.create({
    amount:   toStripeAmount(payment.amount, currency),
    currency,
    metadata: {
      paymentId,
      contractNo: payment.contract.contractNo,
      clientName: payment.contract.clientName,
      title:      payment.title,
    },
    description: `${payment.contract.contractNo} — ${payment.title}`,
  });

  return { clientSecret: intent.client_secret!, paymentIntentId: intent.id };
}

// ==================== STRIPE ÖDEME ONAYLA ====================
export async function confirmStripePayment(
  paymentId:       string,
  paymentIntentId: string,
) {
  // Stripe'da gerçekten başarılı mı kontrol et
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (intent.status !== "succeeded") {
    throw new Error("Stripe ödemesi henüz tamamlanmadı.");
  }

  await db.contractPayment.update({
    where: { id: paymentId },
    data: {
      status:        "PAID",
      paidDate:      new Date(),
      paymentMethod: "Kredi/Banka Kartı",
      receiptNo:     `STRIPE-${paymentIntentId.slice(-8).toUpperCase()}`,
    },
  });

  revalidatePath(PATH);
  return { ok: true };
}

// ==================== MANUEL ÖDEME BİLDİR (EFT/Nakit/Çek) ====================
export async function notifyManualPayment(
  paymentId: string,
  method:    "EFT" | "Nakit" | "Çek",
  note?:     string,
) {
  // Manuel ödemelerde status PENDING kalır, ajan onaylar
  // Sadece yöntemi ve notu kaydet
  await db.contractPayment.update({
    where: { id: paymentId },
    data: {
      paymentMethod: method,
      notes: note
        ? `[Müşteri bildirimi] ${note}`
        : `[Müşteri bildirimi] ${method} ile ödeme yapıldığı bildirildi.`,
    },
  });

  revalidatePath(PATH);
  return { ok: true };
}
