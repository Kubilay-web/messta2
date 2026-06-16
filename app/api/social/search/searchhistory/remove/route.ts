import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, searchedUserId } = body;

    if (!userId || !searchedUserId) {
      return NextResponse.json({ error: "Missing userId or searchedUserId" }, { status: 400 });
    }

    await db.userSearch.deleteMany({
      where: {
        userId,
        searchedUserId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("removeFromSearchHistory error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
