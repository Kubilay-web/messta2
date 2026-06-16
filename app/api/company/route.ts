import { NextResponse } from "next/server";
import db from "@/app/lib/db"

export async function GET() {
  try {
    const companies = await db.company.findMany({
      include: {
        city: true,
        country: true,
        industryType: true,
        teamType: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50, // max 50 company
    });

    return NextResponse.json(companies);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
