import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    const sections = await db.landingPageSection.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: {
        images: {
          orderBy: { order: "asc" }
        }
      }
    });
    
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return NextResponse.json(
      { error: "Failed to fetch landing page data" },
      { status: 500 }
    );
  }
}