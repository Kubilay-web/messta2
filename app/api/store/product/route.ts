import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client import ediyoruz
import cloudinary from "cloudinary";
import { Readable } from "stream";

// Cloudinary konfigürasyonu
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Helper function to handle image upload
const uploadImageToCloudinary = async (image: File) => {
  try {
    const buffer = await image.arrayBuffer();  // Image'ı buffer'a çeviriyoruz
    const stream = Readable.from(Buffer.from(buffer));  // Buffer'ı stream'e dönüştür

    // Cloudinary upload stream kullanıyoruz
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject('Cloudinary upload error: ' + error.message);
          } else {
            resolve(result?.secure_url || '');  // Yüklenen resmin URL'sini döndürüyoruz
          }
        }
      );

      // Stream'i Cloudinary upload stream'e bağlıyoruz
      stream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Add Product - Ürün ekleme işlemi
export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // FormData'yı alıyoruz

    // Form verilerini alıyoruz
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const subCategory = formData.get('subCategory') as string;
    const bestseller = formData.get('bestseller') === 'true';  // Boolean dönüşümü
    const sizes = JSON.parse(formData.get('sizes') as string); // JSON string olarak gelen boyutları parse ediyoruz
    
    // Görselleri alıyoruz (varsa)
    const images = [
      formData.get('image1'),
      formData.get('image2'),
      formData.get('image3'),
      formData.get('image4'),
    ].filter(image => image instanceof File);

    // Resimleri Cloudinary'ye yükleyip URL'leri alıyoruz
    const imageUrls = await Promise.all(
      images.map(async (image: File) => await uploadImageToCloudinary(image))
    );

    const productData = {
      name,
      description,
      price: parseFloat(price), // Fiyatı float'a dönüştürüyoruz
      category,
      subCategory,
      bestseller,
      sizes,
      images: imageUrls, // Resim URL'lerini ekliyoruz
      date: new Date(),
    };

    // Veritabanına yeni ürünü ekliyoruz
    const newProduct = await db.productShop.create({
      data: productData,
    });

    return NextResponse.json({ success: true, message: "Product Added", productId: newProduct.id });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// List Products - Ürünleri listeleme
export async function GET(req: Request) {
  try {
    const products = await db.productShop.findMany();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Remove Product - Ürün silme



export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url); // URL'i alıyoruz
    const productId = url.searchParams.get('productId'); // Query parametrelerinden 'productId'yi alıyoruz

    if (!productId) {
      throw new Error("Product ID is missing");
    }

    // Ürünü veritabanından siliyoruz
    await db.productShop.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error("Error removing product:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}



// Get Single Product Info - Tek bir ürün bilgisi al
export async function GETSingleProduct(req: Request) {
  try {
    const { productId } = await req.json();
    
    const product = await db.productShop.findUnique({
      where: { id: productId },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
