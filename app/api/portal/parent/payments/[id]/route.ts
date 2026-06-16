// GET    /api/portal/parent/payments/[id]  → tek ödeme kaydı
// PUT    /api/portal/parent/payments/[id]  → ödeme durumu güncelle (PAID vb.)
// DELETE /api/portal/parent/payments/[id]  → ödeme sil (sadece PENDING)

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

async function verifyOwner(userId: string, paymentId: string) {
  const client = await db.propertyClient.findFirst({ where: { userId } });
  if (!client) return null;
  return db.contractPayment.findFirst({
    where: { id: paymentId, contract: { clientId: client.id } },
  });
}

export async function GET(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payment = await verifyOwner(user.id, context.params.id);
  if (!payment) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  return NextResponse.json(payment);
}

export async function PUT(req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = ["AGENT", "ADMIN", "SUPER_ADMIN"];
  if (!user.roleGayrimenkul || !allowed.includes(user.roleGayrimenkul)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const existing = await verifyOwner(user.id, context.params.id);
  if (!existing) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  const { status, paymentMethod, receiptNo, notes } = await req.json();

  const updated = await db.contractPayment.update({
    where: { id: context.params.id },
    data: {
      ...(status && { status }),
      ...(status === "PAID" && { paidDate: new Date() }),
      ...(paymentMethod !== undefined && { paymentMethod }),
      ...(receiptNo !== undefined && { receiptNo }),
      ...(notes !== undefined && { notes }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = ["AGENT", "ADMIN", "SUPER_ADMIN"];
  if (!user.roleGayrimenkul || !allowed.includes(user.roleGayrimenkul)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const existing = await verifyOwner(user.id, context.params.id);
  if (!existing) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  if (existing.status !== "PENDING") {
    return NextResponse.json({ error: "Sadece PENDING ödemeler silinebilir" }, { status: 400 });
  }

  await db.contractPayment.delete({ where: { id: context.params.id } });
  return NextResponse.json({ success: true });
}
