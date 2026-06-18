import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { fulfillDopingPayment, fulfillDepositPayment } from "../../../../payments";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  let event;
  try {
    if (sig && secret) {
      event = stripe.webhooks.constructEvent(body, sig, secret);
    } else {
      event = JSON.parse(body);
    }
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook imza hatası: ${e?.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as any;
    if (s?.metadata?.kind === "sahibinden_doping" && s?.metadata?.paymentId) {
      await fulfillDopingPayment(s.metadata.paymentId, "stripe", s.id);
    } else if (s?.metadata?.kind === "sahibinden_deposit" && s?.metadata?.paymentId) {
      await fulfillDepositPayment(s.metadata.paymentId, "stripe", s.id);
    }
  }

  return NextResponse.json({ received: true });
}
