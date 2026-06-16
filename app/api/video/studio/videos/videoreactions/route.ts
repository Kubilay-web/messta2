import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/app/lib/db"; // Prisma Client'ı import et
import { validateRequest } from "@/app/auth";

// MongoDB ObjectId doğrulaması için regex
const objectIdPattern = /^[a-fA-F0-9]{24}$/;

// Video reaction (like/dislike) işlemleri için Zod şeması
const reactionInputSchema = z.object({
  videoId: z.string().regex(objectIdPattern, "Invalid ObjectId format"), // ObjectId formatı kontrolü
  type: z.enum(["like", "dislike"]),
});

// HTTP POST isteği ile like veya dislike işlemi yapılacak
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Zod ile gelen veriyi doğrula
    const { videoId, type } = reactionInputSchema.parse(body);

    // Kullanıcı ID'sini (ctx.user.id gibi bir yerden almanız gerekebilir) elde et
    const { user } = await validateRequest();
    const userId = user?.id; // Kullanıcı ID'si burada alınmalı

    // Kullanıcı zaten bu videoya like/dislike verdi mi kontrol et
    const existingReaction = await db.videoReaction.findFirst({
      where: {
        userId: userId,
        videoId: videoId,
      },
    });
    if (existingReaction) {
      // Eğer zaten bir beğeni/dislike varsa, bunu kaldır
      if (existingReaction.type === type) {
        await db.videoReaction.delete({
          where: {
            id: existingReaction.id,
          },
        });
        return NextResponse.json({ message: "Reaction removed" });
      } else {
        // Eğer mevcut reaksiyon farklıysa, beğeniyi veya dislike'ı güncelle
        const updatedReaction = await db.videoReaction.update({
          where: {
            id: existingReaction.id,
          },
          data: {
            type,
          },
        });
        return NextResponse.json(updatedReaction);
      }
    } else {
      // Eğer daha önce reaksiyon verilmemişse, yeni bir reaksiyon oluştur
      const newReaction = await db.videoReaction.create({
        data: {
          userId,
          videoId,
          type,
        },
      });
      return NextResponse.json(newReaction);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
