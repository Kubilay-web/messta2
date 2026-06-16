// app/api/admin/contacts/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const [
      totalContacts,
      recentContacts,
      contactsByCountry,
      contactsByRole,
    ] = await Promise.all([
      // Total count
      db.contact.count(),
      
      // Recent contacts (last 7 days)
      db.contact.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // Contacts by country
      db.contact.groupBy({
        by: ["country"],
        _count: true,
        orderBy: {
          _count: {
            country: "desc",
          },
        },
        take: 5,
      }),
      
      // Contacts by role
      db.contact.groupBy({
        by: ["role"],
        _count: true,
      }),
    ]);

    return NextResponse.json({
      total: totalContacts,
      recent: recentContacts,
      byCountry: contactsByCountry.map(c => ({
        country: c.country,
        count: c._count,
      })),
      byRole: contactsByRole.map(r => ({
        role: r.role,
        count: r._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact statistics" },
      { status: 500 }
    );
  }
}