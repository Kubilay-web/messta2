import { NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const client = await db.propertyClient.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!client) return NextResponse.json({ error: "Müşteri bulunamadı" }, { status: 404 });

  const visits = await db.propertyVisit.findMany({
    where: { clientId: client.id },
    include: {
      property: { select: { id: true, title: true, city: true, propertyType: true } },
      listing:  { select: { id: true, title: true } },
      agent:    { select: { firstName: true, lastName: true, phone: true, imageUrl: true } },
    },
    orderBy: { scheduledAt: "desc" },
  });

  return NextResponse.json({ visits });
}
