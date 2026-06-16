import { NextResponse } from "next/server";
import db from "@/app/lib/db";
export async function POST(req: Request) {
  // Formdan gelen veriyi alıyoruz
  const { email, username, name, bio, avatar } = await req.json();

  try {
    // Veritabanına profil kaydediyoruz
    const profile = await db.profileInstagram.create({
      data: {
        email, // Kullanıcının emaili burada gönderilmeli
        username,
        name,
        bio,
        avatar: avatar || null, // Avatar opsiyonel
      },
    });

    // Başarıyla profil kaydedildiyse 201 status kodu ile başarı mesajı döndürüyoruz
    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    console.error("Profil oluşturulurken bir hata oluştu:", error);
    return NextResponse.json({ error: "Profil oluşturulamadı." }, { status: 500 });
  }
}



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // URL'den e-posta alıyoruz

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const profile = await db.profileInstagram.findUnique({
      where: { email: email },
    });

    if (profile) {
      return NextResponse.json({ exists: true }); // Profil varsa
    } else {
      return NextResponse.json({ exists: false }); // Profil yoksa
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}
