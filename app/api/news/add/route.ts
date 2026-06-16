// import { PrismaClient } from "@prisma/client";
// import { v2 as cloudinary } from "cloudinary";
// import moment from "moment";
// import { validateRequest } from "@/app/auth";

// const prisma = new PrismaClient();

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
//   secure: true,
// });

// export async function POST(req: Request) {
//   try {
//     const { user } = await validateRequest();

//     const formData = await req.formData();

//     const title = formData.get("title")?.toString().trim();
//     const description = formData.get("description")?.toString() || "";
//     const image = formData.get("image") as File;

//     if (!title || !image) {
//       return new Response(
//         JSON.stringify({ message: "Title and image are required" }),
//         { status: 400 },
//       );
//     }

//     // Convert image Blob to Buffer (for Cloudinary)
//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Upload to Cloudinary
//     const uploadResult = await new Promise<any>((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           folder: "news_images",
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         },
//       );
//       stream.end(buffer);
//     });

//     const writer = await prisma.writer.findUnique({
//       where: { userId: user.id },
//     });

//     if (!writer) {
//       return new Response(JSON.stringify({ message: "Writer not found" }), {
//         status: 404,
//       });
//     }

//     const news = await prisma.news.create({
//       data: {
//         writerId: writer.id,
//         writerName: writer.penName,
//         title,
//         slug: title.toLowerCase().replace(/\s+/g, "-"),
//         category: writer.category,
//         image: uploadResult.secure_url,
//         description,
//         date: moment().format("LL"),
//         status: "pending",
//         count: 0,
//       },
//     });

//     return new Response(
//       JSON.stringify({ message: "News Added Successfully", news }),
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("Error adding news:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }






import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import moment from "moment";
import { validateRequest } from "@/app/auth";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString().trim(); // Kategori eklendi
    const description = formData.get("description")?.toString() || "";
    const image = formData.get("image") as File;

    // Validasyonlar
    if (!title || !image) {
      return new Response(
        JSON.stringify({ success: false, message: "Title and image are required" }),
        { status: 400 }
      );
    }

    if (!category) {
      return new Response(
        JSON.stringify({ success: false, message: "Category is required" }),
        { status: 400 }
      );
    }

    // Convert image Blob to Buffer (for Cloudinary)
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    let uploadResult;
    try {
      uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "news_images",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(buffer);
      });
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return new Response(
        JSON.stringify({ success: false, message: "Image upload failed" }),
        { status: 500 }
      );
    }

    // Writer'ı bul
    const writer = await prisma.writer.findUnique({
      where: { userId: user.id },
    });

    if (!writer) {
      return new Response(
        JSON.stringify({ success: false, message: "Writer not found" }),
        { status: 404 }
      );
    }

    // Benzersiz slug oluştur
    let slug = title
      .toLowerCase()
      .replace(/[ğüşıöç]/g, (char) => {
        const replacements: Record<string, string> = {
          ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c",
        };
        return replacements[char] || char;
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Slug benzersiz mi kontrol et
    const existingNews = await prisma.news.findUnique({
      where: { slug },
    });

    if (existingNews) {
      slug = `${slug}-${Date.now()}`;
    }

    // Haberi oluştur
    const news = await prisma.news.create({
      data: {
        writerId: writer.id,
        writerName: writer.penName,
        title,
        slug,
        category: category, // Kullanıcının seçtiği kategori
        image: uploadResult.secure_url,
        description,
        date: moment().format("LL"),
        status: "pending",
        count: 0,
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "News Added Successfully", 
        news 
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding news:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error" 
      }),
      { status: 500 }
    );
  }
}