import Stripe from "stripe";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

// App Router'da Stripe webhook için raw body gerekir
export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "Signature eksik." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook doğrulama hatası:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const contractPaymentId = session.metadata?.contractPaymentId;

    if (contractPaymentId) {
      try {
        await prisma.contractPayment.update({
          where: { id: contractPaymentId },
          data: {
            status:        "PAID",
            paidDate:      new Date(),
            paymentMethod: "Stripe",
            receiptNo:     session.payment_intent as string ?? session.id,
          },
        });
      } catch (e) {
        console.error("contractPayment güncelleme hatası:", e);
        return NextResponse.json({ error: "DB güncelleme hatası." }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
