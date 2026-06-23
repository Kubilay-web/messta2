import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { stripe, getOrCreateStripeCustomer } from "../../../lib/stripe";
import { createPendingBooking } from "../../../rentals";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

/** Rezervasyon oluşturur + Stripe Checkout başlatır. Body: { listingId, start, end, guests?, note?, phone? } */
export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { listingId, start, end, guests, note, phone } = await req.json();
    if (!listingId || !start || !end)
      return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });

    const { booking, payment, listing, quote } = await createPendingBooking({
      renterId: user.id,
      listingId,
      start,
      end,
      guests: Number(guests) || 1,
      note,
      phone,
    });

    const customerId = await getOrCreateStripeCustomer(user.id);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: quote.currency.toLowerCase(),
            product_data: { name: `${listing.title} — ${quote.nights} gece rezervasyon` },
            unit_amount: Math.round(quote.total * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { paymentId: payment.id, bookingId: booking.id, kind: "sahibinden_rental" },
      success_url: `${BASE}/sahibinden/hesabim/rezervasyonlarim?ok=1`,
      cancel_url: `${BASE}/sahibinden/ilan/${listingId}?iptal=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
