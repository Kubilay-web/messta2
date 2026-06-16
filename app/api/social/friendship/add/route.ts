// app/api/social/friends/route.ts
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = body.username;

    if (!username) {
      return new Response(JSON.stringify({ error: "username is required" }), { status: 400 });
    }

    const { user } = await validateRequest();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Username üzerinden kullanıcıyı bul
    const friendUser = await db.user.findUnique({
      where: { username },
      select: { id: true, username: true },
    });

    if (!friendUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Arkadaşlık isteği oluştur
    const request = await db.friendRequest.create({
      data: {
        status: "pending",
        user: { connect: { id: user.id } },          // gönderen
        friend: { connect: { id: friendUser.id } },  // alan
      },
    });

    // Takip de ekle
    await db.followSocial.create({
      data: { followerId: user.id, followingId: friendUser.id },
    });

    return new Response(JSON.stringify({
      message: "Friend request sent successfully",
      to: friendUser.username,
      request,
    }), { status: 200 });
  } catch (err) {
    console.error("Friend request error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
