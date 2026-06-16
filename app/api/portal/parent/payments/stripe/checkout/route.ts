// POST /api/portal/parent/payments/stripe/checkout
// ContractPayment için Stripe Checkout Session oluşturur

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil"
});

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { paymentId } = await req.json();
  if (!paymentId) return NextResponse.json({ error: "paymentId zorunlu" }, { status: 400 });

  // Ödemenin bu müşteriye ait olduğunu doğrula
  const client = await db.propertyClient.findFirst({ where: { userId: user.id } });
  if (!client) return NextResponse.json({ error: "Müşteri bulunamadı" }, { status: 404 });

  const payment = await db.contractPayment.findFirst({
    where: { id: paymentId, contract: { clientId: client.id } },
    include: {
      contract: {
        include: { property: { select: { title: true } } },
      },
    },
  });

  if (!payment) return NextResponse.json({ error: "Ödeme bulunamadı" }, { status: 404 });
  if (payment.status === "PAID" || payment.status === "REFUNDED") {
    return NextResponse.json({ error: "Bu ödeme zaten tamamlanmış veya iade edilmiş" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: payment.contract.currency?.toLowerCase() ?? "try",
          product_data: {
            name: `${payment.contract.property.title} — ${payment.title}`,
            description: `Sözleşme: ${payment.contract.contractNo}`,
          },
          unit_amount: Math.round(payment.amount * 100), // kuruş cinsinden
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: user.email ?? undefined,
    success_url: `${base}/realestate/portal/client/payments?success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/realestate/portal/client/payments?cancelled=1`,
    metadata: {
      paymentId: payment.id,
      contractId: payment.contractId,
      clientId: client.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
