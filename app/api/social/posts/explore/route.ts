import  db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Giriş yapan kullanıcıyı doğrula
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Herkese ait tüm postları çek (arkadaşlık kontrolü YOK)
    const posts = await db.postSocial.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        comments: {
          include: {
            commentBy: true,
          },
        },
        React: true,
        SavedPost: true,
      },
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("GET /api/social/posts/explore error:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}