import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// POST: Yeni soru oluştur
export async function POST(req: Request) {
  try {
    const { title, content, tagNames } = await req.json();

    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !content || !Array.isArray(tagNames) || tagNames.length === 0) {
      return NextResponse.json(
        { error: "Eksik veya hatalı alanlar var" },
        { status: 400 }
      );
    }

    const existingTags = await db.tagForum.findMany({
      where: { name: { in: tagNames } },
      select: { id: true, name: true },
    });

    const existingTagNames = existingTags.map((t) => t.name);
    const newTagNames = tagNames.filter((name) => !existingTagNames.includes(name));

    const newTags = await Promise.all(
      newTagNames.map((name) => db.tagForum.create({ data: { name } }))
    );

    const allTags = [...existingTags, ...newTags];
    const tagIds = allTags.map((t) => t.id);

    const newQuestion = await db.questionForum.create({
      data: {
        title,
        content,
        UserId: user.id,
      },
    });

    if (tagIds.length > 0) {
      await db.tagQuestionForum.createMany({
        data: tagIds.map((tagId) => ({
          tagId,
          questionId: newQuestion.id,
        })),
      });
    }

    const questionWithTags = await db.questionForum.findUnique({
      where: { id: newQuestion.id },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        tagQuestions: { include: { tag: true } },
      },
    });

    return NextResponse.json(questionWithTags, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Could not create question" },
      { status: 500 }
    );
  }
}

// PUT: Soruyu güncelle
export async function PUT(req: Request) {
  try {
    const { id, title, content, tagNames } = await req.json();

    if (!id || !title || !content || !Array.isArray(tagNames)) {
      return NextResponse.json(
        { error: "Eksik veya hatalı alanlar var" },
        { status: 400 }
      );
    }

    await db.questionForum.update({
      where: { id },
      data: { title, content },
    });

    await db.tagQuestionForum.deleteMany({
      where: { questionId: id },
    });

    const tags = await Promise.all(
      tagNames.map((tagName: string) => {
        return db.tagForum.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      })
    );

    await db.tagQuestionForum.createMany({
      data: tags.map((tag) => ({
        tagId: tag.id,
        questionId: id,
      })),
    });

    const updatedQuestion = await db.questionForum.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, avatarUrl: true },
        },
        tagQuestions: {
          include: { tag: true },
        },
      },
    });

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error("Soru güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Soru güncellenemedi" },
      { status: 500 }
    );
  }
}

// GET: Soru listesi getir (query, filtre, sayfalama ile)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const query = searchParams.get("query") || "";
    const filter = searchParams.get("filter") || "newest";

    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "Page and pageSize must be at least 1" },
        { status: 400 }
      );
    }

    if (filter === "recommended") {
      return NextResponse.json(
        { success: true, data: { questions: [], isNext: false } },
        { status: 200 }
      );
    }

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ];
    }

    if (filter === "unanswered") {
      whereClause.answers = 0;
    }

    let orderBy: any = { createdAt: "desc" };
    if (filter === "popular") {
      orderBy = { upvotes: "desc" };
    }

    const questions = await db.questionForum.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy,
      include: {
        user: {
          select: { id: true, username: true, avatarUrl: true },
        },
        tagQuestions: {
          include: { tag: true },
        },
      },
    });

    const questionsWithTags = questions.map((q) => ({
      ...q,
      tags: q.tagQuestions.map((tq) => tq.tag),
    }));

    const totalCount = await db.questionForum.count({ where: whereClause });
    const isNext = skip + questions.length < totalCount;

    return NextResponse.json(
      {
        success: true,
        data: { questions: questionsWithTags, isNext },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Soru listesi alınırken hata:", error);
    return NextResponse.json(
      { error: "Soru listesi alınamadı" },
      { status: 500 }
    );
  }
}
