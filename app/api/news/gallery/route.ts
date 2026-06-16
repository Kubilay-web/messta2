import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Aktif olan haberleri al
    const news = await db.news.findMany({
      where: {
        status: "active",
      },
      select: {
        image: true, // Sadece image kolonunu alıyoruz
      },
      orderBy: {
        createdAt: "desc", // Son eklenen haberler öncelikli
      },
    });

    // Rastgele 9 tane haberin image'ını seçmek için, öncelikle şunları yapıyoruz:
    const randomImages = shuffleArray(news).slice(0, 9);

    return NextResponse.json({ images: randomImages });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Diziyi karıştırmak için basit bir fonksiyon
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
