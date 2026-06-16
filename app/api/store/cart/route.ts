// /app/api/store/cart/route.ts
import { NextResponse } from "next/server"; // Next.js 13'e ait NextResponse import ediliyor
import db from "@/app/lib/db"; // Veritabanı bağlantısını import ediyoruz
import { validateRequest } from "@/app/auth"; // Kullanıcı doğrulama fonksiyonu

// GET metodu
export async function GET(req: Request) {
  try {
    // Kullanıcıyı doğruluyoruz
    const { user } = await validateRequest();
    const userId = user.id;

    // Kullanıcı verilerini alıyoruz
    const userData = await db.user.findUnique({
      where: { id: userId }, // Veritabanında kullanıcıyı ID'ye göre arıyoruz
    });

    // Sepet verisini alıyoruz
    const cartData = userData?.cartData || {};

    // Başarılı yanıt
    return NextResponse.json({ success: true, cartData });
  } catch (error) {
    // Hata durumu
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export default async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    const userId = user.id;
    const { itemId, size } = req.body; // İstekten gelen verileri alıyoruz

    // Kullanıcıyı buluyoruz
     const userData = await db.user.findUnique({
      where: { id: userId }, // Veritabanında kullanıcıyı ID'ye göre arıyoruz
    });
    let cartData = userData.cartData || {}; // Sepet verisini alıyoruz

    // Ürün sepette var mı kontrol ediyoruz
    if (cartData[itemId]) {
      // Ürün varsa, beden bilgisi var mı kontrol ediyoruz
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Miktarı artırıyoruz
      } else {
        cartData[itemId][size] = 1; // Yoksa, yeni beden ekliyoruz
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1; // Yeni ürün ekliyoruz
    }

    // Kullanıcının sepetini güncelliyoruz
    await db.user.findByIdAndUpdate(userId, { cartData });

    NextResponse.json({ success: true, message: "Ürün sepete eklendi" });
  } catch (error) {
    console.error(error);
    NextResponse.json({ success: false, message: error.message });
  }
}





// PUT metodu - Sepetteki ürün miktarını güncellemek için
export async function PUT(req: Request) {
  try {
    // Kullanıcıyı doğruluyoruz
    const { user } = await validateRequest();
    const userId = user.id;

    // PUT isteğinden gelen verileri alıyoruz
    const { itemId, size, quantity } = await req.json(); // Sepet ürün ID, beden ve miktar

    // Kullanıcıyı ve sepet verisini buluyoruz
    const userData = await db.user.findUnique({ where: { id: userId } });

    // Eğer kullanıcı ve cartData mevcutsa, işlemi devam ettiriyoruz
    if (userData && userData.cartData) {
      let cartData = userData.cartData;

      // Sepetteki ürünü buluyoruz ve miktarını güncelliyoruz
      if (cartData[itemId] && cartData[itemId][size]) {
        cartData[itemId][size] = quantity; // Yeni miktar
        await db.user.update({
          where: { id: userId },
          data: { cartData }, // Sepeti güncelliyoruz
        });

        return NextResponse.json({ success: true, message: "Sepet güncellendi" });
      } else {
        return NextResponse.json({ success: false, message: "Ürün bulunamadı" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ success: false, message: "Kullanıcı veya sepet bulunamadı" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
