import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "QuestionId parametresi eksik" },
        { status: 400 },
      );
    }

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");
    const filter = url.searchParams.get("filter") ?? "latest";

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    let orderBy: Record<string, "asc" | "desc"> = {};
    switch (filter) {
      case "latest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "popular":
        orderBy = { upvotes: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const totalAnswers = await db.answerForum.count({
      where: { questionId: id },
    });

    const answers = await db.answerForum.findMany({
      where: { questionId: id },
      orderBy,
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    const isNext = totalAnswers > skip + answers.length;

    return NextResponse.json(
      {
        answers,
        isNext,
        totalAnswers,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Cevaplar getirilirken hata:", error);
    return NextResponse.json(
      { error: "Cevaplar getirilemedi" },
      { status: 500 },
    );
  }
}
