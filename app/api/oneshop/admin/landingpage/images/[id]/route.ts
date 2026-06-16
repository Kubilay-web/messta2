import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { v2 as cloudinary } from "cloudinary";

/* ------------------------------------------------------------------ */
/* Cloudinary Config (SERVER SIDE) */
/* ------------------------------------------------------------------ */
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */
function isCloudinaryUrl(url: string): boolean {
  return url.includes("res.cloudinary.com");
}

function getCloudinaryPublicId(url: string): string | null {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    const pathWithVersion = parts[1]; // v123456/folder/name.ext
    const path = pathWithVersion.replace(/^v\d+\//, "");

    return path.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* PUT - Update Image */
/* ------------------------------------------------------------------ */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id;
    const body = await request.json();

    console.log("🔵 Backend: Updating image:", imageId);

    const {
      id,
      sectionId,
      createdAt,
      updatedAt,
      ...cleanData
    } = body;

    const finalData = {
      ...cleanData,
      link: cleanData.link?.trim() || null,
      productSlug: cleanData.productSlug?.trim() || null,
      variantId: cleanData.variantId?.trim() || null,
      size: cleanData.size?.trim() || null,
      alt: cleanData.alt?.trim() || null,
    };

    const image = await db.landingPageImage.update({
      where: { id: imageId },
      data: {
        url: finalData.url,
        alt: finalData.alt,
        type: finalData.type,
        order: finalData.order,
        link: finalData.link,
        productSlug: finalData.productSlug,
        variantId: finalData.variantId,
        size: finalData.size,
      },
    });

    return NextResponse.json(image);
  } catch (error: any) {
    console.error("❌ Update image error:", error);

    let errorMessage = "Failed to update image";
    if (error.code === "P2025") errorMessage = "Image not found";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/* DELETE - Unsplash: DB only | Cloudinary: Cloudinary + DB */
/* ------------------------------------------------------------------ */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("🗑️ Deleting image ID:", params.id);

    const image = await db.landingPageImage.findUnique({
      where: { id: params.id },
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // 🔥 SADECE Cloudinary ise sil
    if (image.url && isCloudinaryUrl(image.url)) {
      const publicId = getCloudinaryPublicId(image.url);

      if (publicId) {
        console.log("☁️ Deleting from Cloudinary:", publicId);

        await cloudinary.uploader.destroy(publicId, {
          invalidate: true,
        });
      } else {
        console.warn("⚠️ Cloudinary publicId çıkarılamadı:", image.url);
      }
    } else {
      console.log("ℹ️ Seed / external image → only DB delete");
    }

    // 🗄️ DB delete (HER ZAMAN)
    await db.landingPageImage.delete({
      where: { id: params.id },
    });

    console.log("✅ Image deleted");

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Delete image error:", error);

    return NextResponse.json(
      { error: `Failed to delete image: ${error.message}` },
      { status: 500 }
    );
  }
}
