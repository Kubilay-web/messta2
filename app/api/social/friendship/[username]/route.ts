import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

interface Params {
  username: string;
}

export async function GET(
  req: Request,
  { params }: { params: Params }
) {
  const { user } = await validateRequest();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    // 1. username parametresinden kullanıcı ID'sini bul
    const targetUser = await db.user.findUnique({
      where: { username: params.username },
    });

    if (!targetUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const targetUserId = targetUser.id;

    // 2. Arkadaşlık ve takip durumlarını kontrol et
    const requestSent = await db.friendRequest.findFirst({
      where: { userId: user.id, friendId: targetUserId, status: "pending" },
    });

    const requestReceived = await db.friendRequest.findFirst({
      where: { userId: targetUserId, friendId: user.id, status: "pending" },
    });

    const friends = await db.friendRequest.findFirst({
      where: {
        status: "accepted",
        OR: [
          { userId: user.id, friendId: targetUserId },
          { userId: targetUserId, friendId: user.id },
        ],
      },
    });

    const following = await db.followSocial.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: targetUser.username,
        },
      },
    });

    return new Response(
      JSON.stringify({
        friends: !!friends,
        requestSent: !!requestSent,
        requestReceived: !!requestReceived,
        following: !!following,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Friendship error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
