import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const targetId = searchParams.get("targetId");
    const targetType = searchParams.get("targetType");

    if (!targetId || !targetType) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 },
      );
    }

    const vote = await db.voteForum.findFirst({
      where: {
        userId,
        actionId: targetId,
        actionType: targetType,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        hasUpvoted: vote?.voteType === "upvote",
        hasDownvoted: vote?.voteType === "downvote",
      },
    });
  } catch (error) {
    console.error("HasVoted error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
