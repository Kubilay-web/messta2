// app/api/company/stripe/[id]/route.ts

import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Güncel API versiyonu
});

export async function POST(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    // 1. Plan'ı Prisma üzerinden al
    const plan = await db.plan.findUnique({ where: { id } });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 2. Stripe Checkout Session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: plan.leble,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/job-portal/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/job-portal/stripe/cancel`,
      metadata: {
        product_id: plan.id,
      },
    });

    return NextResponse.json({ id: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
