import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/db";
import { mux } from "@/app/lib/mux";
import { validateRequest } from "@/app/auth";



export async function POST(req: NextRequest) {
  try {
    console.log("Starting video creation process...");

    // Authentication - NextAuth kullanarak
    const {user} = await validateRequest();
    
    if (!user) {
      console.log("Unauthorized: No user session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User authenticated:", user.id);

    // Kullanıcıyı veritabanında bul
    const users = await db.user.findUnique({
      where: {
        id: user.id, // Eğer Clerk kullanıyorsanız: clerkId: session.user.id
      },
    });

    if (!users) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user.id);

    // Mux upload oluştur
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: user.id,
        playback_policy: ["public"],
        input: [
          {
            generated_subtitles: [
              {
                language_code: "en",
                name: "English",
              },
            ],
          },
        ],
      },
      cors_origin: "*",
    });

    console.log("Mux upload created:", upload.id);

    // Video kaydı oluştur
    const video = await db.video.create({
      data: {
        userId: user.id,
        title: "Untitled",
        muxStatus: "waiting",
        muxUploadId: upload.id,
        visibility: "private", // Varsayılan olarak private
      },
    });

    console.log("Video record created:", video.id);

    return NextResponse.json({
      video,
      url: upload.url,
    });
  } catch (error: any) {
    console.error("Video creation error:", error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}




export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categoryId = searchParams.get("categoryId"); // <-- categoryId al

    console.log("📹 Fetching videos for category:", categoryId);

    // Base where condition - Eğer categoryId varsa filtrele, yoksa tüm videoları getir
    let where: any = {};

    // Category filtre ekle
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Cursor-based pagination
    let cursorCondition = {};
    if (cursor) {
      try {
        const [id, updatedAt] = cursor.split("_");
        cursorCondition = {
          OR: [
            { updatedAt: { lt: new Date(updatedAt) } },
            {
              updatedAt: new Date(updatedAt),
              id: { lt: id }
            }
          ]
        };
      } catch (error) {
        console.error("Cursor parsing error:", error);
      }
    }

    // Final where condition
    const finalWhere = {
      ...where,
      ...(Object.keys(cursorCondition).length > 0 ? cursorCondition : {}),
    };

    console.log("Final where condition:", finalWhere);

    // Videoları çek
    const videos = await db.video.findMany({
      where: finalWhere,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl:true,
          }
        },
        _count: {
          select: {
            views: true,
            reactions: {
              where: { type: "like" }
            },
            comments: true,
          }
        }
      },
      orderBy: [
        { updatedAt: "desc" },
        { id: "desc" },
      ],
      take: limit + 1, // Sonraki sayfa için fazladan bir eleman alıyoruz
    });

    console.log(`✅ Found ${videos.length} videos`);

    // Pagination logic
    const hasMore = videos.length > limit;
    const items = hasMore ? videos.slice(0, -1) : videos;

    let nextCursor = null;
    if (hasMore && items.length > 0) {
      const lastItem = items[items.length - 1];
      nextCursor = `${lastItem.id}_${lastItem.updatedAt.toISOString()}`;
    }

    // Response'u zenginleştir
    const enrichedItems = items.map(video => ({
      ...video,
      viewCount: video._count.views,
      likeCount: video._count.reactions,
      commentCount: video._count.comments,
    }));

    return NextResponse.json({
      items: enrichedItems,
      nextCursor,
      hasMore,
      total: items.length,
    });
  } catch (error: any) {
    console.error("❌ Error fetching videos:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
