import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export async function GET(req) {
  const {user} = await validateRequest();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user.id;

  const notifications = await db.notificationSocial.findMany({
    where: { toUserId: userId },
    include: {
      fromUser: { select: { username: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(notifications);
}



export async function POST(req) {
  const data = await req.json();
  const { fromUserId, toUserId, type, message, postId } = data;

  const newNotification = await db.notificationSocial.create({
    data: {
      fromUserId,
      toUserId,
      type,
      message,
      postId,
    },
  });

  return Response.json(newNotification);
}
