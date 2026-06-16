import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { RoleShop, StoreStatus } from "@prisma/client";
import { validateRequest } from "@/app/auth";

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔴 DB'DEN GERÇEK USER'I TEKRAR ÇEK
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, roleshop: true }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (dbUser.roleshop === RoleShop.SELLER) {
      return NextResponse.json(
        { error: "Already seller" },
        { status: 400 }
      );
    }

    // 🔥 TRANSACTION
    const result = await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          roleshop: RoleShop.SELLER
        }
      });

      const store = await tx.store.create({
        data: {
          name: body.name,
          description: body.description || "",
          email: body.email,
          phone: body.phone,
          url: body.url,
          logo: body.logo || "/default-store-logo.png",
          cover: body.cover || "/default-store-cover.jpg",
          defaultShippingService:
            body.defaultShippingService || "International Delivery",
          defaultShippingFeePerItem: Number(body.defaultShippingFeePerItem) || 0,
          defaultShippingFeeForAdditionalItem:
            Number(body.defaultShippingFeeForAdditionalItem) || 0,
          defaultShippingFeePerKg: Number(body.defaultShippingFeePerKg) || 0,
          defaultShippingFeeFixed: Number(body.defaultShippingFeeFixed) || 0,
          defaultDeliveryTimeMin: Number(body.defaultDeliveryTimeMin) || 7,
          defaultDeliveryTimeMax: Number(body.defaultDeliveryTimeMax) || 31,
          returnPolicy: body.returnPolicy || "Return in 30 days",
          userId: user.id,
          status: StoreStatus.PENDING,
          averageRating: 0,
          featured: false
        }
      });

      return { updatedUser, store };
    });

    // ✅ DB'DEN TEKRAR OKU (KANIT)
    const finalUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, roleshop: true }
    });


    return NextResponse.json({
      success: true,
      user: finalUser,
      store: result.store
    });
  } catch (err: any) {
    console.error("APPLY SELLER ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}
