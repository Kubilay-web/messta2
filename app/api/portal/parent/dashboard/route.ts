// GET /api/portal/parent/dashboard
// Client profili + sözleşmeler + yaklaşan geziler + bekleyen ödemeler + favoriler

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
        where: { status: { in: ["ACTIVE", "DRAFT"] } },
        include: {
          property: { select: { id: true, title: true, city: true, propertyType: true } },
          payments: {
            where: { status: "PENDING" },
            orderBy: { dueDate: "asc" },
            take: 3,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      visits: {
        where: { status: "SCHEDULED", scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
        take: 5,
        include: {
          property: { select: { title: true, city: true } },
          agent: { select: { firstName: true, lastName: true, phone: true } },
        },
      },
      interests: {
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          listing: {
            include: {
              property: {
                include: { images: { where: { isCover: true }, take: 1 } },
              },
            },
          },
        },
      },
    },
  });

  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const [pendingTotal, totalContracts, upcomingVisitsCount, favoriteCount] = await Promise.all([
    db.contractPayment.aggregate({
      where: { status: "PENDING", contract: { clientId: client.id } },
      _sum: { amount: true },
      _count: true,
    }),
    db.propertyContract.count({
      where: { clientId: client.id, status: { in: ["ACTIVE", "DRAFT"] } },
    }),
    db.propertyVisit.count({
      where: { clientId: client.id, status: "SCHEDULED", scheduledAt: { gte: new Date() } },
    }),
    db.clientInterest.count({ where: { clientId: client.id } }),
  ]);

  return NextResponse.json({
    client,
    stats: {
      totalContracts,
      upcomingVisits: upcomingVisitsCount,
      pendingPaymentCount: pendingTotal._count,
      pendingPaymentTotal: pendingTotal._sum.amount ?? 0,
      favoriteCount,
    },
    contracts: client.contracts,
    upcomingVisits: client.visits,
    interests: client.interests,
  });
}
