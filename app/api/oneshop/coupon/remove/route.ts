// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const { couponId, userId } = await request.json();

//     if (!couponId) {
//       return NextResponse.json(
//         { success: false, message: 'Coupon ID is required' },
//         { status: 400 }
//       );
//     }

//     // Gerçek uygulamada burada kupon kullanım kaydını silebilirsiniz
//     // Örneğin: await prisma.couponToUser.deleteMany({ where: { couponId, userId } });

//     return NextResponse.json({
//       success: true,
//       message: 'Coupon removed successfully',
//     });

//   } catch (error) {
//     console.error('Coupon removal error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to remove coupon' },
//       { status: 500 }
//     );
//   }
// }









import { NextRequest, NextResponse } from "next/server";
import  db  from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest) {
  try {
    const {user} = await validateRequest();
    const body = await req.json();
    const { couponId, userId } = body;

    if (!couponId) {
      return NextResponse.json(
        { success: false, message: "Coupon ID is required" },
        { status: 400 }
      );
    }

    // Kupon kullanım kaydını sil (isteğe bağlı)
    const userToUse = userId || user?.id;
    if (userToUse) {
      await db.couponToUser.deleteMany({
        where: {
          couponId: couponId,
          userId: userToUse,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Coupon removed successfully",
    });

  } catch (error) {
    console.error("Coupon remove error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove coupon" },
      { status: 500 }
    );
  }
}