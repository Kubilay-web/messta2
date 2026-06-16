import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();
    const { username } = body;

    if (!username) {
      return new Response(JSON.stringify({ error: "username is required" }), { status: 400 });
    }

    // Kullanıcıyı bul
    const targetUser = await db.user.findUnique({
      where: { username },
    });

    if (!targetUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    await db.followSocial.deleteMany({
      where: {
        followerId: user.id,
        followingId: targetUser.username, // Çünkü tablon username saklıyor
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("Unfollow error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
