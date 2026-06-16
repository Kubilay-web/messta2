// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/app/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const { couponCode, cart } = await request.json();

//     if (!couponCode || !cart) {
//       return NextResponse.json(
//         { success: false, message: 'Coupon code and cart are required' },
//         { status: 400 }
//       );
//     }

//     // Kuponu doğrula
//     const coupon = await prisma.coupon.findFirst({
//       where: {
//         code: couponCode.toUpperCase().trim(),
//         endDate: {
//           gte: new Date().toISOString()
//         }
//       },
//       include: {
//         store: true,
//       },
//     });

//     if (!coupon) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid coupon code' },
//         { status: 404 }
//       );
//     }

//     // Kuponun geçerlilik tarihi kontrolü
//     const startDate = new Date(coupon.startDate);
//     const endDate = coupon.endDate ? new Date(coupon.endDate) : null;
//     const currentDate = new Date();

//     if (startDate > currentDate) {
//       return NextResponse.json(
//         { success: false, message: 'Coupon is not yet active' },
//         { status: 400 }
//       );
//     }

//     if (endDate && endDate < currentDate) {
//       return NextResponse.json(
//         { success: false, message: 'Coupon has expired' },
//         { status: 400 }
//       );
//     }

//     // Sepette kuponun mağazasına ait ürün var mı kontrol et
//     const cartItems = Array.isArray(cart) ? cart : [];
//     const storeItems = cartItems.filter(item => {
//       // Eğer item'da storeId yoksa, varsayılan olarak coupon'ın storeId'sini kabul et
//       // Gerçek uygulamada bu daha detaylı olmalı
//       return true; // Şimdilik tüm item'ları kabul et
//     });

//     if (storeItems.length === 0) {
//       return NextResponse.json(
//         { success: false, message: 'No eligible items for this coupon' },
//         { status: 400 }
//       );
//     }

//     // Toplam tutarı hesapla
//     const subTotal = storeItems.reduce((sum, item) => {
//       return sum + (item.price * item.quantity);
//     }, 0);

//     // İndirim miktarını hesapla
//     const discountAmount = (subTotal * coupon.discount) / 100;

//     return NextResponse.json({
//       success: true,
//       message: `Coupon applied! ${coupon.discount}% discount`,
//       coupon: {
//         couponId: coupon.id,
//         couponCode: coupon.code,
//         discountPercentage: coupon.discount,
//         discountAmount: parseFloat(discountAmount.toFixed(2)),
//         storeId: coupon.storeId,
//         storeName: coupon.store.name,
//       }
//     });

//   } catch (error) {
//     console.error('Coupon application error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to apply coupon' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/db";
import { CartProductType } from "@/app/lib/types";
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest) {
  try {
    const {user} = await validateRequest();
    const body = await req.json();
    const { couponCode, cart, userId } = body;

    if (!couponCode || !cart || !Array.isArray(cart)) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    // Kuponu tekrar doğrula
    const coupon = await db.coupon.findUnique({
      where: {
        code: couponCode.toUpperCase(),
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 }
      );
    }

    // Sepet toplamını hesapla
    const cartTotal = cart.reduce((sum: number, item: CartProductType) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Kupon için minimum harcama kontrolü
    if (cartTotal < 0) { // Minimum harcama tutarını buraya ekleyebilirsiniz
      return NextResponse.json(
        { success: false, message: "Minimum purchase amount not reached" },
        { status: 400 }
      );
    }

    // İndirim tutarını hesapla
    const discountAmount = (cartTotal * coupon.discount) / 100;

    // Kupon kullanım kaydı oluştur
    const userToUse = userId || user?.id;
    if (userToUse) {
      await db.couponToUser.create({
        data: {
          userId: userToUse,
          couponId: coupon.id,
        },
      });
    }

    // Yanıtı hazırla
    const appliedCoupon = {
      couponId: coupon.id,
      couponCode: coupon.code,
      discountPercentage: coupon.discount,
      discountAmount: discountAmount,
      expiryDate: coupon.endDate || "",
      minPurchaseAmount: 0,
      maxDiscountAmount: null,
      isActive: true,
      appliedToCartTotal: true,
    };

    return NextResponse.json({
      success: true,
      coupon: appliedCoupon,
      message: "Coupon applied successfully",
      discountAmount,
      cartTotal,
      finalTotal: cartTotal - discountAmount,
    });

  } catch (error) {
    console.error("Coupon apply error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to apply coupon" },
      { status: 500 }
    );
  }
}