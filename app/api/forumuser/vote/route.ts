import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { CreateVoteSchema } from "@/app/lib/validation";
import { validateRequest } from "@/app/auth";

const MAX_RETRIES = 5;

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { targetId, targetType, voteType } = CreateVoteSchema.parse(body);

    let retries = 0;
    let responseMessage = "Vote processed."; // varsayılan

    while (true) {
      try {
        await db.$transaction(async (tx) => {
          const existingVote = await tx.voteForum.findFirst({
            where: {
              userId,
              actionId: targetId,
              actionType: targetType,
            },
          });

          const updateTarget =
            targetType === "question" ? tx.questionForum : tx.answerForum;

          if (existingVote) {
            if (existingVote.voteType === voteType) {
              // Geri çekme
              await tx.voteForum.delete({
                where: { id: existingVote.id },
              });

              await updateTarget.update({
                where: { id: targetId },
                data: {
                  [voteType === "upvote" ? "upvotes" : "downvotes"]: {
                    decrement: 1,
                  },
                },
              });

              responseMessage = "Vote removed.";
              return;
            }

            // Oy değişikliği
            await tx.voteForum.update({
              where: { id: existingVote.id },
              data: { voteType },
            });

            await updateTarget.update({
              where: { id: targetId },
              data: {
                [existingVote.voteType === "upvote" ? "upvotes" : "downvotes"]:
                  {
                    decrement: 1,
                  },
              },
            });

            await updateTarget.update({
              where: { id: targetId },
              data: {
                [voteType === "upvote" ? "upvotes" : "downvotes"]: {
                  increment: 1,
                },
              },
            });

            responseMessage = "Vote updated.";
            return;
          }

          // İlk oy
          await tx.voteForum.create({
            data: {
              userId,
              actionId: targetId,
              actionType: targetType,
              voteType,
            },
          });

          await updateTarget.update({
            where: { id: targetId },
            data: {
              [voteType === "upvote" ? "upvotes" : "downvotes"]: {
                increment: 1,
              },
            },
          });

          responseMessage = "Vote created.";
        });

        break;
      } catch (error: any) {
        if (
          error.message?.includes("write conflict") ||
          error.message?.includes("deadlock") ||
          error.code === "P2034"
        ) {
          if (retries < MAX_RETRIES) {
            retries++;
            console.warn(
              `Transaction conflict, retrying ${retries}/${MAX_RETRIES}...`,
            );
            await new Promise((res) => setTimeout(res, 100 * retries));
            continue;
          }
        }
        throw error;
      }
    }

    return NextResponse.json(
      { success: true, message: responseMessage },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Vote error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Vote failed" },
      { status: 500 },
    );
  }
}
