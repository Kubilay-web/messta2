// POST   /api/portal/parent/property/[id]/visit         → gezi talebi oluştur
// PUT    /api/portal/parent/property/[id]/visit?vid=    → gezi güncelle (iptal / feedback)
// DELETE /api/portal/parent/property/[id]/visit?vid=    → gezi sil

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

async function getClient(userId: string) {
  return db.propertyClient.findFirst({ where: { userId } });
}

export async function POST(req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await getClient(user.id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const listing = await db.listing.findFirst({
    where: { id: context.params.id, agencyId: client.agencyId },
    select: { id: true, agentId: true, propertyId: true },
  });
  if (!listing) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
  if (!listing.agentId) return NextResponse.json({ error: "Danışman atanmamış" }, { status: 400 });

  const { scheduledAt, notes } = await req.json();
  if (!scheduledAt) return NextResponse.json({ error: "scheduledAt zorunlu" }, { status: 400 });

  const visit = await db.propertyVisit.create({
    data: {
      scheduledAt: new Date(scheduledAt),
      notes: notes ?? null,
      status: "SCHEDULED",
      propertyId: listing.propertyId,
      listingId: listing.id,
      agentId: listing.agentId,
      clientId: client.id,
    },
  });

  return NextResponse.json(visit, { status: 201 });
}

export async function PUT(req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await getClient(user.id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const vid = searchParams.get("vid");
  if (!vid) return NextResponse.json({ error: "vid zorunlu" }, { status: 400 });

  const { status, feedback, rating } = await req.json();

  const visit = await db.propertyVisit.findFirst({ where: { id: vid, clientId: client.id } });
  if (!visit) return NextResponse.json({ error: "Gezi bulunamadı" }, { status: 404 });

  // Client yalnızca SCHEDULED → CANCELLED geçişi yapabilir
  if (status !== undefined && status !== "CANCELLED") {
    return NextResponse.json({ error: "Yalnızca iptal işlemi yapılabilir" }, { status: 403 });
  }
  if (status === "CANCELLED" && visit.status !== "SCHEDULED") {
    return NextResponse.json({ error: "Yalnızca planlanmış geziler iptal edilebilir" }, { status: 400 });
  }

  // Geri bildirim yalnızca COMPLETED gezilere eklenebilir
  if ((feedback !== undefined || rating !== undefined) && visit.status !== "COMPLETED") {
    return NextResponse.json({ error: "Geri bildirim yalnızca tamamlanmış gezilere eklenebilir" }, { status: 400 });
  }

  const updated = await db.propertyVisit.update({
    where: { id: vid },
    data: {
      ...(status === "CANCELLED" && { status: "CANCELLED" }),
      ...(feedback !== undefined && { feedback }),
      ...(rating !== undefined && { rating: Number(rating) }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await getClient(user.id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const vid = searchParams.get("vid");
  if (!vid) return NextResponse.json({ error: "vid zorunlu" }, { status: 400 });

  const visit = await db.propertyVisit.findFirst({ where: { id: vid, clientId: client.id } });
  if (!visit) return NextResponse.json({ error: "Gezi bulunamadı" }, { status: 404 });
  if (visit.status !== "CANCELLED") {
    return NextResponse.json({ error: "Yalnızca iptal edilmiş geziler silinebilir" }, { status: 400 });
  }

  await db.propertyVisit.delete({ where: { id: vid } });
  return NextResponse.json({ success: true });
}
