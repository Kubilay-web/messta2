// POST /api/portal/parent/payments/stripe/webhook
// Stripe ödeme tamamlandığında ContractPayment → PAID günceller

import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:"2025-08-27.basil"
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentId = session.metadata?.paymentId;

    if (paymentId) {
      await db.contractPayment.update({
        where: { id: paymentId },
        data: {
          status: "PAID",
          paidDate: new Date(),
          paymentMethod: "Stripe / Kart",
          receiptNo: session.payment_intent as string ?? session.id,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}

// Stripe webhook için raw body gerekir — Next.js body parsing'i devre dışı bırak
export const dynamic = "force-dynamic";
