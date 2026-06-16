import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/db"; // Prisma Client import (veya kendi db connection)

// Eğer Prisma kullanıyorsan, NotificationSocial modelini buradan çekiyoruz.
// Eğer direkt MongoDB kullanıyorsan, uygun query ile değiştir.

export async function GET(req: NextRequest) {
  try {
    // Burada kullanıcı ID'si alabilirsin (örn: session, token vb.)
    // Şimdilik demo için tüm aktiviteleri çekiyoruz
    const activities = await db.notificationSocial.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        fromUser: true, // actor bilgisi
      },
      take: 50, // son 50 aktivite
    });

    // Frontend’e gönderilecek formatı map ediyoruz
    const formatted = activities.map((act) => ({
      id: act.id,
      type: act.type, // "like" veya "comment"
      postId: act.postId || "",
      actor: {
        username: act.fromUser.username,
        avatarUrl: act.fromUser.avatarUrl || "/default-avatar.png",
      },
      createdAt: act.createdAt.toISOString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
