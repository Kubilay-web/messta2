// GET  /api/portal/parent/payments  → müşterinin sözleşmeleri + ödeme planları
// POST /api/portal/parent/payments  → sözleşmeye yeni ödeme kaydı ekle

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await db.propertyClient.findFirst({
    where: { userId: user.id },
    include: {
      contracts: {
        include: {
          property: { select: { id: true, title: true, address: true, city: true, propertyType: true } },
          payments: { orderBy: { dueDate: "asc" } },
          agent: { select: { id: true, firstName: true, lastName: true, imageUrl: true, phone: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  return NextResponse.json({ client, contracts: client.contracts });
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = ["AGENT", "ADMIN", "SUPER_ADMIN"];
  if (!user.roleGayrimenkul || !allowed.includes(user.roleGayrimenkul)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const { contractId, title, amount, dueDate, paymentMethod, notes } = await req.json();
  if (!contractId || !title || !amount || !dueDate) {
    return NextResponse.json({ error: "contractId, title, amount, dueDate zorunlu" }, { status: 400 });
  }

  // Sözleşmenin bu müşteriye ait olduğunu doğrula
  const client = await db.propertyClient.findFirst({ where: { userId: user.id } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const contract = await db.propertyContract.findFirst({
    where: { id: contractId, clientId: client.id },
  });
  if (!contract) return NextResponse.json({ error: "Sözleşme bulunamadı" }, { status: 404 });

  const payment = await db.contractPayment.create({
    data: {
      contractId,
      title,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      paymentMethod: paymentMethod ?? null,
      notes: notes ?? null,
      status: "PENDING",
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
