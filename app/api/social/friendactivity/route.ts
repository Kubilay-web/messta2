// app/api/social/friendactivity/route.ts
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const userId = user.id;

  // 1️⃣ Arkadaşlarını al (status = 'accepted')
  const friends = await db.friendRequest.findMany({
    where: {
      OR: [
        { userId: userId, status: "accepted" },
        { friendId: userId, status: "accepted" },
      ],
    },
    select: { userId: true, friendId: true },
  });

  const friendIds = friends.map(f =>
    f.userId === userId ? f.friendId : f.userId
  );

  if (friendIds.length === 0) return Response.json([]);

  // 2️⃣ Arkadaşların beğenileri
  const likes = await db.react.findMany({
    where: { reactById: { in: friendIds } },
    include: {
      reactBy: { select: { username: true, avatarUrl: true } },
      postRef: { include: { user: { select: { username: true, avatarUrl: true } } } },
    },
  });

  // 3️⃣ Arkadaşların yorumları
  const comments = await db.commentSocial.findMany({
    where: { commentById: { in: friendIds } },
    include: {
      commentBy: { select: { username: true, avatarUrl: true } },
      post: { include: { user: { select: { username: true, avatarUrl: true } } } },
    },
  });

  // 4️⃣ Tek bir listeye topla
  const activities = [
    ...likes.map(like => ({
      id: like.id,
      type: "like",
      actor: like.reactBy,
      targetUser: like.postRef.user,
      postId: like.postRef.id,
      message: `${like.reactBy.username}, ${like.postRef.user.username}'nin gönderisini beğendi.`,
      createdAt: like.createdAt,
    })),
    ...comments.map(comment => ({
      id: comment.id,
      type: "comment",
      actor: comment.commentBy,
      targetUser: comment.post.user,
      postId: comment.post.id,
      message: `${comment.commentBy.username}, ${comment.post.user.username}'nin gönderisine yorum yaptı.`,
      createdAt: comment.commentAt,
    })),
  ];

  // 5️⃣ Zaman sırasına göre sırala
  activities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return Response.json(activities);
}
