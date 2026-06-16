import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const query = searchParams.get("query") || "";
    const filter = searchParams.get("filter") || "popular";

    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "page and pageSize must be at least 1" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (query) {
      whereClause.name = {
        contains: query,
        mode: "insensitive",
      };
    }

    let orderBy: any = {};

    switch (filter) {
      case "popular":
        orderBy = {}; // Elle sıralanacak
        break;
      case "recent":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "name":
        orderBy = { name: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    let tags = await db.tagForum.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: filter === "popular" ? undefined : orderBy,
      include: {
        tagQuestions: true,
      },
    });

    // Popülerlik sıralaması (elle)
    if (filter === "popular") {
      tags = tags.sort((a, b) => b.tagQuestions.length - a.tagQuestions.length);
    }

    const tagsWithCount = tags.map((tag) => ({
      ...tag,
      questions: tag.tagQuestions.length,
    }));

    const totalCount = await db.tagForum.count({ where: whereClause });
    const isNext = skip + tags.length < totalCount;

    return NextResponse.json(
      {
        success: true,
        data: { tags: tagsWithCount, isNext },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching tags." },
      { status: 500 }
    );
  }
}
