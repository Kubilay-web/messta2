import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get all active news sorted by createdAt DESC
    const allNews = await db.news.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
    });

    // Step 2: Group by category and take top 5 per category
    const grouped: Record<string, typeof allNews> = {};

    for (const news of allNews) {
      if (!grouped[news.category]) {
        grouped[news.category] = [];
      }

      if (grouped[news.category].length < 5) {
        grouped[news.category].push(news);
      }
    }

    return NextResponse.json({ news: grouped }, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
