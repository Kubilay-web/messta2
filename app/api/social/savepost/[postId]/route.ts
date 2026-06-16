import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const { userId } = await req.json();

    if (!postId || !userId || postId === "undefined") {
      return NextResponse.json(
        { error: "Missing or invalid postId or userId" },
        { status: 400 }
      );
    }

    const existing = await db.savedPost.findFirst({
      where: { userId, postId },
    });

    let result;
    if (existing) {
      result = await db.savedPost.delete({ where: { id: existing.id } });
    } else {
      result = await db.savedPost.create({
        data: {
          user: { connect: { id: userId } },
          post: { connect: { id: postId } },
          savedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("savePost error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
