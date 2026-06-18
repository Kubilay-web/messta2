import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { stripe } from "../../../lib/stripe";
import { createPendingDeposit } from "../../../payments";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { listingId, amount } = await req.json();
    const amt = Number(amount);
    if (!listingId || !(amt > 0)) return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });

    const { payment, listing } = await createPendingDeposit(user.id, listingId, amt);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: listing.currency.toLowerCase(),
            product_data: { name: `Kapora: ${listing.title}` },
            unit_amount: Math.round(amt * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { paymentId: payment.id, kind: "sahibinden_deposit" },
      success_url: `${BASE}/sahibinden/kapora/basarili?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE}/sahibinden/ilan/${listingId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
