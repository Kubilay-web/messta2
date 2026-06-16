import db from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id: tagId } = params;

    if (!tagId) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const query = searchParams.get("query") || "";

    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "Page and pageSize must be at least 1" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * pageSize;

    // Tag'i getir
    const tag = await db.tagForum.findUnique({
      where: { id: tagId },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    // Bu tag'e ait questionId'leri çek
    const tagQuestionRelations = await db.tagQuestionForum.findMany({
      where: { tagId },
      select: { questionId: true },
    });

    const questionIds = tagQuestionRelations.map((rel) => rel.questionId);

    if (questionIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: {
            tag,
            questions: [],
            isNext: false,
          },
        },
        { status: 200 }
      );
    }

    const whereClause: any = {
      id: { in: questionIds },
      UserId: { not: null },
    };

    if (query) {
      whereClause.title = {
        contains: query,
        mode: "insensitive",
      };
    }

    const questions = await db.questionForum.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        tagQuestions: {
          include: { tag: { select: { id: true, name: true } } },
        },
        AnswerForum: true,
        CollectionForum: true,
      },
    });

    const totalCount = await db.questionForum.count({ where: whereClause });
    const isNext = skip + questions.length < totalCount;

    return NextResponse.json(
      {
        success: true,
        data: {
          tag,
          questions,
          isNext,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tag questions:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching questions." },
      { status: 500 }
    );
  }
}
