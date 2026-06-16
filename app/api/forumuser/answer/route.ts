import { NextResponse } from "next/server";
import { AnswerServerSchema } from "@/app/lib/validation";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import ROUTES from "@/app/constants/routes";

export async function POST(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = AnswerServerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz veri", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { content, questionId } = parsed.data;
    const userId = user.id;

    const result = await db.$transaction(async (tx) => {
      // Sorunun varlığını kontrol et
      const question = await tx.questionForum.findUnique({
        where: { id: questionId },
      });
      if (!question) {
        throw new Error("Question not found");
      }

      // Yeni cevabı oluştur
      const newAnswer = await tx.answerForum.create({
        data: {
          content,
          questionId,
          UserId: userId,
        },
      });

      // Soruya ait cevap sayısını artır
      await tx.questionForum.update({
        where: { id: questionId },
        data: {
          answers: {
            increment: 1,
          },
        },
      });

      return newAnswer;
    });

    revalidatePath(ROUTES.QUESTION(questionId));

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("Answer creation error:", error);
    return NextResponse.json(
      { error: error.message || "Cevap oluşturulamadı" },
      { status: 500 },
    );
  }
}
