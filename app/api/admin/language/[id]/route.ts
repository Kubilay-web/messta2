import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";

// PUT: Dil güncelleme
export async function PUT(req, context) {
  const { id } = context.params; // URL parametrelerinden id'yi alıyoruz
  const body = await req.json(); // İstek gövdesini alıyoruz
  const { name } = body; // Gövdeden name (isim) değerini çıkarıyoruz

  // Yeni slug oluşturmak için slugify kullanıyoruz
  const slug = slugify(name, { lower: true });

  try {
    // İlk olarak dilin var olup olmadığını kontrol ediyoruz
    const existingLanguage = await db.language.findUnique({
      where: { id }, // Veritabanında id'ye göre dil araması yapıyoruz
    });

    // Dil bulunamazsa 404 döndürüyoruz
    if (!existingLanguage) {
      return NextResponse.json({ error: "Dil bulunamadı" }, { status: 404 });
    }

    // Dilin bilgilerini güncelliyoruz
    const updatedLanguage = await db.language.update({
      where: { id }, // Güncellemek istediğimiz dilin id'sini burada kullanıyoruz
      data: {
        name, // ismi güncelliyoruz
        slug, // slug'ı güncelliyoruz
      },
    });

    return NextResponse.json(updatedLanguage); // Güncellenmiş dil verisini geri döndürüyoruz
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 }); // Hata durumunda 500 dönüyoruz
  }
}

// DELETE: Dil silme
export async function DELETE(req, context) {
  const { id } = context.params; // URL parametrelerinden id'yi alıyoruz

  try {
    // Silmek istediğimiz dilin var olup olmadığını kontrol ediyoruz
    const existingLanguage = await db.language.findUnique({
      where: { id }, // Veritabanında id'ye göre dil araması yapıyoruz
    });

    // Dil bulunamazsa 404 döndürüyoruz
    if (!existingLanguage) {
      return NextResponse.json({ error: "Dil bulunamadı" }, { status: 404 });
    }

    // Dil kaydını siliyoruz
    const deletedLanguage = await db.language.delete({
      where: { id }, // Silmek istediğimiz dilin id'sini burada kullanıyoruz
    });

    return NextResponse.json(deletedLanguage); // Silinen dil verisini geri döndürüyoruz
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 }); // Hata durumunda 500 döndürüyoruz
  }
}
