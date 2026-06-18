import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { capturePaypalOrder } from "../../../../lib/paypal";
import { fulfillDopingPayment } from "../../../../payments";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { orderId, paymentId } = await req.json();
    if (!orderId || !paymentId)
      return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });

    const capture = await capturePaypalOrder(orderId);
    if (capture?.status !== "COMPLETED") {
      return NextResponse.json({ error: "Ödeme tamamlanmadı" }, { status: 400 });
    }

    await fulfillDopingPayment(paymentId, "paypal", orderId);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
