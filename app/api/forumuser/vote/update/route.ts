import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { UpdateVoteCountSchema } from "@/app/lib/validation";

export async function POST(req: Request) {
  try {
    // Doğrulama (schema parsing)
    const body = await req.json();
    const validationResult = UpdateVoteCountSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { targetId, targetType, voteType, change } = validationResult.data;

    // Upvote mu downvote mu?
    const isUpvote = voteType === "upvote";

    // Hangi model güncellenecek?
    let updateResult;
    if (targetType === "question") {
      updateResult = await db.questionForum.update({
        where: { id: targetId },
        data: {
          upvotes: isUpvote ? { increment: change } : undefined,
          downvotes: !isUpvote ? { increment: change } : undefined,
        },
      });
    } else if (targetType === "answer") {
      updateResult = await db.answerForum.update({
        where: { id: targetId },
        data: {
          upvotes: isUpvote ? { increment: change } : undefined,
          downvotes: !isUpvote ? { increment: change } : undefined,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid targetType" },
        { status: 400 },
      );
    }

    // Güncelleme başarısızsa
    if (!updateResult) {
      return NextResponse.json(
        { error: "Failed to update vote count" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Update vote count error:", error);
    return NextResponse.json(
      { error: "Failed to update vote count" },
      { status: 500 },
    );
  }
}
