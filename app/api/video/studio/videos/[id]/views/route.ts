import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/lib/db"
import { NextRequest,NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";



// POST metodu: Video izleme kaydını oluşturur
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Dinamik parametreyi params'dan alıyoruz
  const { id } = params;  // await gereksiz!

  try {
    // Kullanıcı doğrulaması (auth işlemi)
    const {user} = await validateRequest();  // validateRequest ile doğrulama
    const userId = user?.id;  // Kullanıcı ID'si alınıyor

    if (!userId) {
      return NextResponse.json({ error: "userId gereklidir." }, { status: 400 });
    }

    // Kullanıcının bu video ile daha önce bir izleme kaydı olup olmadığını kontrol et
    const existingView = await db.videoView.findFirst({
      where: {
        videoId: id,  // Dinamik parametreyi burada kullanıyoruz
        userId: userId,
      },
    });

    if (existingView) {
      // Kullanıcı daha önce bu videoyu izlediği için yeni view eklemiyoruz
      return NextResponse.json(existingView, { status: 200 });
    }

    // Yeni video view kaydını oluştur (id'yi manuel olarak belirtmeye gerek yok)
    const newView = await db.videoView.create({
      data: {
        videoId: id,  // Dinamik parametreyi burada kullanıyoruz
        userId,        // Kullanıcı ID'sini kullanıyoruz
      },
    });

    return NextResponse.json(newView, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}







// GET metodu: Video bilgilerini alır
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Dinamik parametreyi params'dan alıyoruz
  const { id } = params;

  if (!id || Array.isArray(id)) {
    return NextResponse.json({ error: "Geçersiz video ID'si." }, { status: 400 });
  }

  try {
    // Prisma ile videoView bilgilerini sorguluyoruz
    const videoView = await db.videoView.findUnique({
      where: {
        id: id as string,  // Dinamik parametreyi burada kullanıyoruz
      },
      include: {
        video: true,  // İlişkili video bilgisini de dahil ediyoruz

      },
    });

    if (!videoView) {
      return NextResponse.json({ error: "Video bulunamadı." }, { status: 404 });
    }

    // İlgili video ve kullanıcı bilgileriyle birlikte videoView verisini döndürüyoruz
    return NextResponse.json(videoView, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}

