// POST   /api/portal/parent/property/[id]/interest → favoriye ekle
// DELETE /api/portal/parent/property/[id]/interest → favoriden çıkar

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await db.propertyClient.findFirst({ where: { userId: user.id } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { notes, priority } = await req.json().catch(() => ({}));

  const interest = await db.clientInterest.upsert({
    where: { clientId_listingId: { clientId: client.id, listingId: context.params.id } },
    create: { clientId: client.id, listingId: context.params.id, notes, priority: priority ?? "MEDIUM" },
    update: { notes, priority },
  });

  return NextResponse.json(interest, { status: 201 });
}

export async function DELETE(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await db.propertyClient.findFirst({ where: { userId: user.id } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  await db.clientInterest.deleteMany({
    where: { clientId: client.id, listingId: context.params.id },
  });

  return NextResponse.json({ success: true });
}
