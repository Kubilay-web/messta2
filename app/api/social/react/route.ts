// app/api/social/react/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { postId, react } = body;

    if (!postId || !react)
      return NextResponse.json(
        { message: "Missing postId or react" },
        { status: 400 }
      );

    // Kullanıcının zaten react yapıp yapmadığını kontrol et
    const existingReact = await db.react.findFirst({
      where: { postRefId: postId, reactById: user.id },
    });

    let isNewReact = false; // notification eklemek için flag

    if (!existingReact) {
      // Yeni react ekle
      await db.react.create({
        data: { react, postRefId: postId, reactById: user.id },
      });
      isNewReact = true;
    } else {
      if (existingReact.react === react) {
        // Aynı react ise sil
        await db.react.delete({ where: { id: existingReact.id } });
        isNewReact = false; // notification yok
      } else {
        // Farklı react ise güncelle
        await db.react.update({
          where: { id: existingReact.id },
          data: { react },
        });
        isNewReact = true;
      }
    }

    // Post ve sahibi bilgilerini al
    const post = await db.postSocial.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    // Notification ekle, kendi postuna react ise ekleme
    if (
      isNewReact &&
      post &&
      post.user &&
      post.user.id !== user.id
    ) {
      await db.notificationSocial.create({
        data: {
          fromUserId: user.id,
          toUserId: post.user.id,
          type: "react",
          message: `${user.username} gönderine "${react}" tepkisi verdi.`,
          postId,
          isRead: false,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
