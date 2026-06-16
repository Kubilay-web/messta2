// import { NextResponse } from "next/server";
// import db from "@/app/lib/db";
// import { ObjectId } from "mongodb";
// import { NextRequest } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import formidable from "formidable";
// import fs from "fs/promises";
// import { Readable } from "stream";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   const { id } = params;

//   // Validate ObjectId
//   if (!ObjectId.isValid(id)) {
//     return NextResponse.json({ message: "Invalid news ID" }, { status: 400 });
//   }

//   try {
//     const news = await db.news.findUnique({
//       where: { id },
//     });

//     if (!news) {
//       return NextResponse.json({ message: "News not found" }, { status: 404 });
//     }

//     return NextResponse.json({ news }, { status: 200 });
//   } catch (error) {
//     console.error("News fetch error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
//   secure: true,
// });

// // Helper to convert Blob to Buffer
// async function streamToBuffer(stream: Readable): Promise<Buffer> {
//   const chunks: Uint8Array[] = [];
//   for await (const chunk of stream) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

// // PUT /api/news/edit/[id]
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const news_id = params.id;

//   if (!ObjectId.isValid(news_id)) {
//     return NextResponse.json({ message: "Invalid news ID" }, { status: 400 });
//   }

//   try {
//     const formData = await req.formData();
//     const title = formData.get("title")?.toString() || "";
//     const description = formData.get("description")?.toString() || "";
//     const oldImage = formData.get("old_image")?.toString() || "";
//     const file = formData.get("new_image") as File | null;

//     let imageUrl = oldImage;

//     // Yeni dosya varsa Cloudinary'e yükle, eskiyi sil
//     if (file && file.size > 0) {
//       if (oldImage) {
//         const parts = oldImage.split("/");
//         const publicId = parts[parts.length - 1].split(".")[0];
//         await cloudinary.uploader.destroy(`news_images/${publicId}`);
//       }

//       const buffer = await streamToBuffer(file.stream());
//       const uploaded = await new Promise<any>((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "news_images" }, (err, result) => {
//             if (err) reject(err);
//             else resolve(result);
//           })
//           .end(buffer);
//       });

//       imageUrl = uploaded.secure_url;
//     }

//     const updatedNews = await db.news.update({
//       where: { id: news_id },
//       data: {
//         title: title.trim(),
//         slug: title.trim().toLowerCase().split(" ").join("-"),
//         description,
//         image: imageUrl,
//       },
//     });

//     return NextResponse.json(
//       { message: "News Updated Successfully", news: updatedNews },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Update error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }













// app/api/news/edit/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Cloudinary'e resim yükleme fonksiyonu
async function uploadToCloudinary(file: File, folder: string = "news") {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `newsportal/${folder}`,
        resource_type: "auto",
        transformation: [
          { width: 1200, height: 800, crop: "fill" },
          { quality: "auto" }
        ]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
}

// Cloudinary'den resim silme fonksiyonu
async function deleteFromCloudinary(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

// GET - Haber detaylarını getir
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const news = await db.news.findUnique({
      where: { id: params.id }
    });

    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    // Yetki kontrolü
    if (user.role === "ADMIN") {
      return NextResponse.json({ news, userRole: user.role });
    }

    if (user.role === "WRITER") {
      const writer = await db.writer.findUnique({
        where: { userId: user.id }
      });

      if (!writer || news.writerId !== writer.id) {
        return NextResponse.json(
          { message: "You don't have permission to edit this news" },
          { status: 403 }
        );
      }

      return NextResponse.json({ news, userRole: user.role });
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Haber güncelle
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const news = await db.news.findUnique({
      where: { id: params.id }
    });

    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    // Yetki kontrolü
    if (user.role === "ADMIN") {
      // Admin her haberi düzenleyebilir
    } else if (user.role === "WRITER") {
      const writer = await db.writer.findUnique({
        where: { userId: user.id }
      });

      if (!writer || news.writerId !== writer.id) {
        return NextResponse.json(
          { message: "You don't have permission to edit this news" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const oldImageUrl = formData.get("old_image_url") as string;
    const oldImagePublicId = formData.get("old_image_public_id") as string;
    const newImageFile = formData.get("new_image") as File | null;

    let imageUrl = oldImageUrl;
    let imagePublicId = oldImagePublicId;

    // Yeni resim yüklendiyse Cloudinary'e yükle
    if (newImageFile && newImageFile.size > 0) {
      try {
        // Eski resmi Cloudinary'den sil
        if (imagePublicId && imagePublicId !== "") {
          await deleteFromCloudinary(imagePublicId);
        }
        
        // Yeni resmi Cloudinary'e yükle
        const uploadResult: any = await uploadToCloudinary(newImageFile, 'news');
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload image to Cloudinary" },
          { status: 500 }
        );
      }
    }

    // Haberi güncelle
    const updatedNews = await db.news.update({
      where: { id: params.id },
      data: {
        title,
        description,
        category,
        image: imageUrl,
        imagePublicId,
        updatedAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      message: "News updated successfully",
      news: updatedNews
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { message: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
