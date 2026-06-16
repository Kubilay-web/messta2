import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {

    const {user} = await validateRequest();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const body = await req.json();
    const { username } = body;
    if (!username) return new Response(JSON.stringify({ error: "username is required" }), { status: 400 });

    // Accepted friend request sil
    await db.friendRequest.deleteMany({
      where: {
        OR: [
          { userId: user.id, username, status: "accepted" },
          { userId: username, username: user.id, status: "accepted" },
        ],
      },
    });

    // Takipleri sil
    await db.followSocial.deleteMany({
      where: {
        OR: [
          { followerId: user.id, followingId: username },
          { followerId: username, followingId: user.id },
        ],
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
