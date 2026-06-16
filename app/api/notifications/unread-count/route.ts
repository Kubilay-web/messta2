import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NotificationCountInfo } from "@/app/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const unreadCount = await db.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    });

    const data: NotificationCountInfo = {
      unreadCount,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
