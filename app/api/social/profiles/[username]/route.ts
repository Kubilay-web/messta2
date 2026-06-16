import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    // Kullanıcıyı bul
    const profile = await db.user.findUnique({
      where: { username },
      include: {
        postsocial: {
          include: {
            comments: true,
            user: true,
          },
        },
      },
    });

    if (!profile) {
      return new Response(JSON.stringify({ message: "Kullanıcı bulunamadı" }), {
        status: 404,
      });
    }

    // Arkadaşları çek (status: accepted)
    const friendsAsUser = await db.friendRequest.findMany({
      where: { userId: profile.id, status: "accepted" },
      include: { friend: true },
    });

    const friendsAsFriend = await db.friendRequest.findMany({
      where: { friendId: profile.id, status: "accepted" },
      include: { user: true },
    });

    // Tek bir arrayde birleştir
    const friends = [
      ...friendsAsUser.map((f) => f.friend),
      ...friendsAsFriend.map((f) => f.user),
    ];

    return new Response(
      JSON.stringify({ ...profile, friends }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
