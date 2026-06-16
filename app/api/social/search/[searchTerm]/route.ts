import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client

export async function GET(
  req: NextRequest,
  { params }: { params: { searchTerm: string } }
) {
  try {
    const { searchTerm } = params;
    if (!searchTerm) {
      return NextResponse.json({ error: "Missing searchTerm" }, { status: 400 });
    }

    // Arama: username, first_name, last_name alanlarında contains ile
    const results = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: searchTerm, mode: "insensitive" } },
        ]
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true
      },
      take: 10
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("searchUser error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
