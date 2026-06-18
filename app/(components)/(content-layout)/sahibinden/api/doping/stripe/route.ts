import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { stripe } from "../../../lib/stripe";
import { createPendingDopingPayment } from "../../../payments";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { listingId, packageId } = await req.json();
    if (!listingId || !packageId)
      return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });

    const { payment, pkg } = await createPendingDopingPayment(user.id, listingId, packageId);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: pkg.currency.toLowerCase(),
            product_data: { name: `Doping: ${pkg.name}` },
            unit_amount: Math.round(pkg.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { paymentId: payment.id, kind: "sahibinden_doping" },
      success_url: `${BASE}/sahibinden/doping/basarili?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE}/sahibinden/hesabim/ilanlarim`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
