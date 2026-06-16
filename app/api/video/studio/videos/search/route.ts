import { NextResponse } from "next/server";
import db from "@/app/lib/db";  // Prisma'dan db importu
import { Prisma } from "@prisma/client";

// Varsayılan limit değeri
const DEFAULT_LIMIT = 20;

async function fetchVideos(query: string, categoryId: string, limit: number, cursor: string | undefined) {
  try {
    // Arama kriterleri oluşturuluyor
    const where: Prisma.VideoWhereInput = {
      AND: [
        query ? { title: { contains: query, mode: "insensitive" } } : {},
        categoryId ? { categoryId: categoryId } : {},
      ],
    };

    // Video arama
    const videos = await db.video.findMany({
      where,
      take: limit,
      skip: cursor ? 1 : 0,  // Eğer cursor varsa, bir önceki sayfayı atla
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" }, // Tarihe göre sıralama
      include: {
        user: true,
        category: true,
        reactions: true, // reactions (beğeniler)
        views: true, // views (izlenmeler)
      },
    });

    // Her video için izlenme ve beğeni sayısını hesapla
    const videosWithCounts = videos.map((video) => ({
      ...video,
      viewsCount: video.views.length, // views sayısını al
      likesCount: video.reactions.filter((reaction) => reaction.type === "like").length, // sadece "like" olanları say
    }));

    return videosWithCounts;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Internal Server Error");
  }
}

export async function GET(request: Request) {
  try {
    // URL'den parametreleri alıyoruz
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);
    const cursor = searchParams.get("cursor");

    // Videos verisini al
    const videos = await fetchVideos(query, categoryId, limit, cursor);

    // Sonraki cursor'ı hesapla
    const nextCursor = videos.length === limit ? videos[videos.length - 1].id : null;

    // Response
    return NextResponse.json({
      items: videos,
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Request'in body'sini JSON formatında alıyoruz
    const { query, categoryId, limit = DEFAULT_LIMIT, cursor } = await request.json();

    // Videos verisini al
    const videos = await fetchVideos(query, categoryId, limit, cursor);

    // Sonraki cursor'ı hesapla
    const nextCursor = videos.length === limit ? videos[videos.length - 1].id : null;

    // Response
    return NextResponse.json({
      items: videos,
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
