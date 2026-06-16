// app/api/oneshop/checkout/paypal/success/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import paypal from "@paypal/checkout-server-sdk";

const initializePayPal = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_SECRET!;
  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(environment);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const orderId = searchParams.get("order_id");

  console.log("PayPal success callback:", { token, orderId });

  if (!token || !orderId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=invalid`);
  }

  try {
    const paypalClient = initializePayPal();
    
    // PayPal order'ı capture et
    const requestCapture = new paypal.orders.OrdersCaptureRequest(token);
    const capture = await paypalClient.execute(requestCapture);
    
    if (capture.result.status !== "COMPLETED") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=not_completed`);
    }

    // Order'ı "Paid" olarak güncelle
    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
      },
    });

    // PaymentDetails'ı güncelle
    await db.paymentDetails.updateMany({
      where: { paymentInetntId: token },
      data: { status: "Completed" },
    });

    console.log("✅ Order paid successfully:", orderId);

    // Başarılı sayfasına yönlendir
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/shop/order/${orderId}?payment_success=true`);

  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=failed`);
  }
}