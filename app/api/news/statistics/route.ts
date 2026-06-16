import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

export async function GET(req: Request) {
  try {
    // Total news count
    const totalNews = await db.news.count();

    // Count of news with different statuses
    const pendingNews = await db.news.count({
      where: {
        status: "pending",
      },
    });

    const activeNews = await db.news.count({
      where: {
        status: "active",
      },
    });

    const deactiveNews = await db.news.count({
      where: {
        status: "deactive",
      },
    });

    // Total writers count
    const totalWriters = await db.writer.count();

    // Return the statistics in the response
    return NextResponse.json(
      {
        totalNews,
        pendingNews,
        activeNews,
        deactiveNews,
        totalWriters,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
