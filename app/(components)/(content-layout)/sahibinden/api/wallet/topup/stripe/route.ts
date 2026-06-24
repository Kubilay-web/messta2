import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { stripe, getOrCreateStripeCustomer } from "../../../../lib/stripe";
import prisma from "@/app/lib/prisma";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

// Yükleme tutarına göre kademeli bonus (örn. 500₺ ve üzeri %5).
function topupBonus(amount: number): number {
  if (amount >= 1000) return Math.round(amount * 0.1 * 100) / 100;
  if (amount >= 500) return Math.round(amount * 0.05 * 100) / 100;
  return 0;
}

/** Cüzdana kart ile bakiye yükleme (tek seferlik Stripe Checkout). Body: { amount } */
export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { amount } = await req.json();
    const value = Number(amount);
    if (!(value >= 10)) return NextResponse.json({ error: "En az 10₺ yükleyin" }, { status: 400 });

    const wallet = await prisma.shWallet.findUnique({ where: { userId: user.id } });
    const currency = wallet?.currency ?? "TRY";
    const bonus = topupBonus(value);

    const payment = await prisma.shPayment.create({
      data: {
        userId: user.id,
        amount: value,
        currency,
        type: "WALLET_TOPUP",
        status: "PENDING",
        provider: "stripe",
        meta: { kind: "wallet_topup", bonus },
      },
    });

    const customerId = await getOrCreateStripeCustomer(user.id);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Cüzdan yükleme${bonus > 0 ? ` (+${bonus}₺ bonus)` : ""}`,
            },
            unit_amount: Math.round(value * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { paymentId: payment.id, kind: "sahibinden_wallet_topup" },
      success_url: `${BASE}/sahibinden/hesabim/cuzdan?ok=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE}/sahibinden/hesabim/cuzdan?iptal=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
