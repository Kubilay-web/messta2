// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/app/lib/prisma';

// export async function POST(request: NextRequest) {
//   console.log('=== COUPON VALIDATE API CALLED ===');
  
//   try {
//     const body = await request.json();
//     const { couponCode, userId } = body;

//     console.log('Request body:', { couponCode, userId });

//     if (!couponCode) {
//       return NextResponse.json(
//         { valid: false, message: 'Coupon code is required' },
//         { status: 400 }
//       );
//     }

//     // Kupon kodunu uppercase'e çevir
//     const code = couponCode.toUpperCase().trim();
//     console.log('Searching for coupon:', code);

//     // Kuponu veritabanında ara
//     const coupon = await prisma.coupon.findFirst({
//       where: {
//         code: code,
//       },
//       include: {
//         store: true,
//       },
//     });

//     console.log('Found coupon:', coupon);

//     if (!coupon) {
//       return NextResponse.json(
//         { valid: false, message: 'Invalid coupon code' },
//         { status: 404 }
//       );
//     }

//     // Tarih kontrolleri (MongoDB'de string olarak saklandığı için)
//     const currentDate = new Date();
//     const startDate = new Date(coupon.startDate);
    
//     console.log('Date check:', {
//       currentDate,
//       startDate,
//       startDateValid: startDate <= currentDate
//     });

//     // Başlangıç tarihi kontrolü
//     if (startDate > currentDate) {
//       return NextResponse.json(
//         { valid: false, message: 'Coupon is not yet active' },
//         { status: 400 }
//       );
//     }

//     // Bitiş tarihi kontrolü (eğer varsa)
//     if (coupon.endDate) {
//       const endDate = new Date(coupon.endDate);
//       console.log('End date check:', {
//         endDate,
//         endDateValid: endDate >= currentDate
//       });
      
//       if (endDate < currentDate) {
//         return NextResponse.json(
//           { valid: false, message: 'Coupon has expired' },
//           { status: 400 }
//         );
//       }
//     }

//     // Kullanıcı daha önce bu kuponu kullandı mı? (opsiyonel)
//     if (userId) {
//       const alreadyUsed = await prisma.couponToUser.findFirst({
//         where: {
//           couponId: coupon.id,
//           userId: userId,
//         },
//       });

//       if (alreadyUsed) {
//         return NextResponse.json(
//           { valid: false, message: 'You have already used this coupon' },
//           { status: 400 }
//         );
//       }
//     }

//     // Başarılı response
//     return NextResponse.json({
//       valid: true,
//       coupon: {
//         id: coupon.id,
//         code: coupon.code,
//         discount: coupon.discount,
//         storeId: coupon.storeId,
//         storeName: coupon.store?.name || 'Unknown Store',
//       },
//       message: 'Coupon is valid'
//     });

//   } catch (error) {
//     console.error('Coupon validation error:', error);
    
//     // Detaylı hata mesajı
//     let errorMessage = 'Failed to validate coupon';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
    
//     return NextResponse.json(
//       { 
//         valid: false, 
//         message: errorMessage,
//         error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET request için de basit bir endpoint (test için)
// export async function GET(request: NextRequest) {
//   console.log('=== COUPON VALIDATE GET REQUEST ===');
  
//   return NextResponse.json({
//     message: 'Coupon validate API is working',
//     timestamp: new Date().toISOString(),
//     endpoint: '/api/oneshop/coupon/validate'
//   });
// }









import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/prisma"
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await validateRequest();
    const body = await req.json();
    const { couponCode, userId } = body;

    if (!couponCode) {
      return NextResponse.json(
        { valid: false, message: "Coupon code is required" },
        { status: 400 }
      );
    }

    // Kuponu veritabanında ara
    const coupon = await db.coupon.findUnique({
      where: {
        code: couponCode.toUpperCase(),
      },
      include: {
        store: true,
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: "Invalid coupon code" },
        { status: 404 }
      );
    }

    // Kupon süresi kontrolü
    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    
    if (currentDate < startDate) {
      return NextResponse.json(
        { valid: false, message: "Coupon is not active yet" },
        { status: 400 }
      );
    }

    if (coupon.endDate) {
      const endDate = new Date(coupon.endDate);
      if (currentDate > endDate) {
        return NextResponse.json(
          { valid: false, message: "Coupon has expired" },
          { status: 400 }
        );
      }
    }

    // Kullanım limiti kontrolü
    const couponUsageCount = await db.couponToUser.count({
      where: {
        couponId: coupon.id,
        userId: userId || session?.user?.id,
      },
    });

    if (couponUsageCount >= 1) { // Her kullanıcı 1 kez kullanabilir
      return NextResponse.json(
        { valid: false, message: "You have already used this coupon" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        couponId: coupon.id,
        couponCode: coupon.code,
        discountPercentage: coupon.discount,
        discountAmount: 0, // Bu değer apply endpoint'inde hesaplanacak
        expiryDate: coupon.endDate || "",
        minPurchaseAmount: 0,
        maxDiscountAmount: null,
        isActive: true,
        appliedToCartTotal: true,
        storeId: coupon.storeId,
      },
      message: "Coupon is valid",
    });

  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}