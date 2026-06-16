import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.postSocial.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        comments: {
          include: {
            commentBy: {
              select: { id: true, username: true, avatarUrl: true },
            },
          },
        },
        React: {
          include: {
            reactBy: {
              select: { id: true, username: true, avatarUrl: true },
            },
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("GET /discover feed error:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
