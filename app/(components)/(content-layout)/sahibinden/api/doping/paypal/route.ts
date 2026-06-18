import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import { createPendingDopingPayment } from "../../../payments";
import { createPaypalOrder } from "../../../lib/paypal";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Giriş yapın" }, { status: 401 });

    const { listingId, packageId } = await req.json();
    const { payment, pkg } = await createPendingDopingPayment(user.id, listingId, packageId);
    const { approveUrl } = await createPaypalOrder(pkg.price, pkg.currency, payment.id);

    if (!approveUrl) return NextResponse.json({ error: "PayPal yönlendirmesi alınamadı" }, { status: 500 });
    return NextResponse.json({ approveUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
