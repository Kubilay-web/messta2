import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    // Kullanıcı doğrulaması
    const { user } = await validateRequest();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    // İstekten gelen veriyi al
    const body = await req.json();
    const username = body.username;

    if (!username) return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });

    // username'e karşılık gelen userId'yi alalım
    const userToDelete = await db.user.findUnique({
      where: { username: username },
    });

    if (!userToDelete) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // 1. Arkadaşlık isteğini sil
    await db.friendRequest.deleteMany({
      where: { userId: user.id, friendId: userToDelete.id, status: "pending" },
    });

    // 2. Takip ilişkisinin silinmesi
    await db.followSocial.deleteMany({
      where: { followerId: user.id, followingId: userToDelete.id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
