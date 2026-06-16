import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);

    const videoId = params.id; // Dinamik route
    const limit = searchParams.get("limit");
    const cursor = searchParams.get("cursor");

    // Eksik parametre kontrolü
    if (!videoId || !limit) {
      return NextResponse.json(
        { message: "Missing videoId or limit" },
        { status: 400 }
      );
    }

    const limitValue = parseInt(limit, 10) || 20;
    let cursorValue: number | undefined = undefined;

    // Cursor doğrulama
    if (cursor && cursor !== "null") {
      cursorValue = parseInt(cursor, 10);
      if (isNaN(cursorValue)) {
        return NextResponse.json(
          { message: "Invalid cursor value" },
          { status: 400 }
        );
      }
    }

    // Video bilgisi ve ilişkili veriler al
    const video = await db.video.findUnique({
      where: { id: videoId },
      include: {
        category: true,  // Kategori bilgisi dahil ediliyor
        user: true,      // Kullanıcı bilgisi
      },
    });

    if (!video) {
      return NextResponse.json(
        { message: "Video not found" },
        { status: 404 }
      );
    }

    // Video izlenme sayısını hesapla
    const viewsCount = await db.videoView.count({
      where: {
        videoId: videoId,
      },
    });

    // Video beğeni sayısını hesapla
    const likesCount = await db.videoReaction.count({
      where: {
        videoId: videoId,
        type: 'like',  // Beğeni türü
      },
    });

    // Öneriler
    const suggestions = await db.video.findMany({
      where: {
        categoryId: video.categoryId,  // Aynı kategoriye ait videolar
        NOT: { id: videoId },  // Mevcut video hariç
        ...(cursorValue && { createdAt: { lt: cursorValue } }),  // Cursor doğrulama
      },
      take: limitValue,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,         // Kullanıcı bilgileri dahil
        category: true,     // Kategori bilgisi dahil
      },
    });

    // Önerilen videolar için izlenme ve beğeni sayısını hesaplayın
    const suggestionsWithCounts = await Promise.all(
      suggestions.map(async (suggestion) => {
        const suggestionViewsCount = await db.videoView.count({
          where: {
            videoId: suggestion.id,
          },
        });

        const suggestionLikesCount = await db.videoReaction.count({
          where: {
            videoId: suggestion.id,
            type: 'like',  // Beğeni türü
          },
        });

        return {
          ...suggestion,
          viewsCount: suggestionViewsCount,
          likesCount: suggestionLikesCount,
        };
      })
    );

    // nextCursor hesaplama
    const nextCursor =
      suggestionsWithCounts.length === limitValue
        ? suggestionsWithCounts[suggestionsWithCounts.length - 1].createdAt
        : null;

    return NextResponse.json({
      items: suggestionsWithCounts,
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
