import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { productId, variantId, sizeId } = await request.json();

    // Wishlist'te var mı kontrol et
    const existingWishlist = await db.wishlist.findFirst({
      where: {
        userId: user.id,
        productId,
        variantId,
        ...(sizeId && { sizeId }),
      },
    });

    if (existingWishlist) {
      // Zaten wishlist'te ise kaldır
      await db.wishlist.delete({
        where: { id: existingWishlist.id },
      });
      return NextResponse.json({ message: "Wishlist'ten kaldırıldı" });
    }

    // Wishlist'e ekle
    const wishlist = await db.wishlist.create({
      data: {
        userId: user.id,
        productId,
        variantId,
        ...(sizeId && { sizeId }),
      },
      include: {
        product: {
          select: {
            name: true,
          },
        },
        variant: {
          select: {
            variantName: true,
          },
        },
        size: {
          select: {
            size: true,
          },
        },
      },
    });

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error("Wishlist hatası:", error);
    return NextResponse.json(
      { error: "Wishlist işleminde bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const wishlists = await db.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            variants: {
              take: 1,
              include: {
                images: {
                  take: 1,
                },
              },
            },
            store: {
              select: {
                name: true,
              },
            },
          },
        },
        variant: {
          select: {
            variantName: true,
            variantImage: true,
          },
        },
        size: {
          select: {
            size: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(wishlists);
  } catch (error) {
    console.error("Wishlist getirme hatası:", error);
    return NextResponse.json(
      { error: "Wishlist getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}