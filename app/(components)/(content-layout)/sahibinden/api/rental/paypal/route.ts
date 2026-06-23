import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { createPaypalOrder, paypalEnabled } from "../../../lib/paypal";
import { createPendingBooking } from "../../../rentals";

/** Rezervasyon oluşturur + PayPal order başlatır. Body: { listingId, start, end, guests?, note?, phone? } */
export async function POST(req: NextRequest) {
  try {
    if (!paypalEnabled) return NextResponse.json({ error: "PayPal yapılandırılmamış" }, { status: 400 });
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

    const order = await createPaypalOrder(quote.total, quote.currency, payment.id, {
      returnPath: `/sahibinden/rental/paypal-donus?paymentId=${payment.id}&bookingId=${booking.id}`,
      cancelPath: `/sahibinden/ilan/${listingId}?iptal=1`,
      description: `${listing.title} — ${quote.nights} gece`,
    });

    if (!order.approveUrl) return NextResponse.json({ error: "Onay linki alınamadı" }, { status: 500 });
    return NextResponse.json({ url: order.approveUrl, orderId: order.id, paymentId: payment.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
