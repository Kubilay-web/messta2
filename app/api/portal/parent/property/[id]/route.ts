// GET /api/portal/parent/property/[id]
// İlan detayı: property + listing + contract + visits + interest + images + documents

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await db.propertyClient.findFirst({ where: { userId: user.id } });
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const listing = await db.listing.findFirst({
    where: { id: context.params.id, agencyId: client.agencyId },
    include: {
      property: {
        include: {
          images: { orderBy: { order: "asc" } },
          documents: true,
        },
      },
      agent: {
        select: { id: true, firstName: true, lastName: true, phone: true, email: true, imageUrl: true, designation: true },
      },
      contracts: {
        where: { clientId: client.id },
        include: { payments: { orderBy: { dueDate: "asc" } } },
        take: 1,
      },
      visits: {
        where: { clientId: client.id },
        orderBy: { scheduledAt: "desc" },
      },
      interests: {
        where: { clientId: client.id },
        take: 1,
      },
    },
  });

  if (!listing) return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });

  return NextResponse.json({
    listing,
    contract: listing.contracts[0] ?? null,
    visits: listing.visits,
    isFavorite: listing.interests.length > 0,
  });
}
