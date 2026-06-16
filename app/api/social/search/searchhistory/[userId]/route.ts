import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const history = await db.userSearch.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        searchedUser: {
          select: {
            id: true,
            username: true,
            avatarUrl: true
          }
        }
      },
      take: 20
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("getSearchHistory error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
