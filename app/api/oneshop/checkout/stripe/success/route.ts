import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  console.log("Stripe success callback:", { sessionId, orderId });

  if (!sessionId || !orderId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=invalid`);
  }

  try {
    // 1. ÖNCE Stripe'dan ödeme durumunu kontrol et
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log("Stripe session status:", {
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency
    });

    // 2. Stripe ödeme durumunu kontrol et
    if (session.payment_status !== "paid") {
      console.error("Stripe payment not completed:", session.payment_status);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=not_paid`);
    }

    console.log("✅ Stripe'da ödeme başarılı:", {
      sessionId: session.id,
      paymentStatus: session.payment_status,
      amount: session.amount_total
    });

    // 3. ŞİMDİ veritabanını güncelle (Stripe ödemesi onaylandıktan sonra)
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "Paid",      // Veritabanında PAID
        orderStatus: "Confirmed",
      },
    });

    console.log("✅ Veritabanı güncellendi: Order", orderId, "olarak işaretlendi PAID");

    // 4. PaymentDetails'ı güncelle
    await db.paymentDetails.updateMany({
      where: { paymentInetntId: sessionId },
      data: { 
        status: "Completed",
      },
    });

    // 5. Stokları güncelle (eğer daha önce yapılmadıysa)
    try {
      const order = await db.order.findUnique({
        where: { id: orderId },
        include: { groups: { include: { items: true } } }
      });

      if (order) {
        for (const group of order.groups) {
          for (const item of group.items) {
            await db.size.update({
              where: { id: item.sizeId },
              data: { quantity: { decrement: item.quantity } },
            });
          }
        }
        console.log("✅ Stoklar güncellendi");
      }
    } catch (stockError) {
      console.error("Stock update error:", stockError);
    }

    // 6. Kullanıcıyı başarılı sayfasına yönlendir
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/shop/order/${orderId}?payment_success=true&payment_method=stripe`);

  } catch (error) {
    console.error("Stripe success error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=failed`);
  }
}