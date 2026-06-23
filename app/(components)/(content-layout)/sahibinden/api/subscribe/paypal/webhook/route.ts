import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { activateAndApply, recordRenewalInvoice, expireSubscription } from "../../../../subscriptions";
import { verifyPaypalWebhook } from "../../../../lib/paypal";

// PayPal abonelik webhook'u.
//  - BILLING.SUBSCRIPTION.ACTIVATED → providerSubId eşle (custom_id = local sub id)
//  - PAYMENT.SALE.COMPLETED         → ilk tahsilat → aktive + hak / sonrakiler → yenileme
//  - BILLING.SUBSCRIPTION.CANCELLED/EXPIRED/SUSPENDED → kapat
export async function POST(req: NextRequest) {
  // Ham gövde imza doğrulaması için gerekli (parse'tan önce alınmalı)
  const rawBody = await req.text();

  // İmza doğrulama — sahte bildirimleri (bedava abonelik girişimi) engeller
  const valid = await verifyPaypalWebhook(
    {
      authAlgo: req.headers.get("paypal-auth-algo"),
      certUrl: req.headers.get("paypal-cert-url"),
      transmissionId: req.headers.get("paypal-transmission-id"),
      transmissionSig: req.headers.get("paypal-transmission-sig"),
      transmissionTime: req.headers.get("paypal-transmission-time"),
    },
    rawBody,
  );
  if (!valid) {
    return NextResponse.json({ error: "İmza doğrulanamadı" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "geçersiz gövde" }, { status: 400 });
  }

  const type = event?.event_type as string;
  const resource = event?.resource ?? {};

  try {
    switch (type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const localId = resource.custom_id as string | undefined;
        const ppSubId = resource.id as string | undefined;
        if (localId && ppSubId) {
          await prisma.shSubscription
            .update({
              where: { id: localId },
              data: { providerSubId: ppSubId, provider: "paypal" },
            })
            .catch(() => {});
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        const ppSubId = resource.billing_agreement_id as string | undefined;
        const saleId = resource.id as string | undefined;
        if (!ppSubId || !saleId) break;
        const sub = await prisma.shSubscription.findFirst({
          where: { providerSubId: ppSubId },
          select: { id: true, status: true, currentPeriodEnd: true },
        });
        if (!sub) break;

        const amount = resource.amount?.total ? Number(resource.amount.total) : undefined;
        const firstCharge = sub.status === "PENDING" || !sub.currentPeriodEnd;
        if (firstCharge) {
          const payment = await prisma.shPayment.findFirst({
            where: { subscriptionId: sub.id, type: "SUBSCRIPTION" },
            orderBy: { createdAt: "asc" },
            select: { id: true },
          });
          await activateAndApply({
            subscriptionId: sub.id,
            provider: "paypal",
            providerSubId: ppSubId,
            paymentId: payment?.id,
            refId: saleId,
          });
        } else {
          await recordRenewalInvoice({
            subscriptionId: sub.id,
            provider: "paypal",
            refId: saleId,
            amount,
          });
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED":
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const ppSubId = resource.id as string | undefined;
        if (ppSubId) {
          const sub = await prisma.shSubscription.findFirst({
            where: { providerSubId: ppSubId },
            select: { id: true },
          });
          if (sub) await expireSubscription(sub.id);
        }
        break;
      }
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "İşleme hatası" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
