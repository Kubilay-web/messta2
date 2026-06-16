import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { Readable } from "stream";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

/**
 * Converts a web stream to a Node.js stream.
 */
function streamFromWebReadable(readableStream) {
  const reader = readableStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // PDF dosya türü kontrolü
    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF file." }, { status: 400 });
    }

    const bufferStream = streamFromWebReadable(file.stream());

    // Cloudinary'e yükleme işlemi
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "raw",  // 'raw' tipi, PDF gibi dosyalar için uygun
          folder: "cv_files",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      bufferStream.pipe(stream); // Akışa veri gönderiliyor
    });

    // Yükleme başarılı, sonucu döndürüyoruz
    return NextResponse.json({
      secure_url: uploadResult.secure_url,
      original_filename: uploadResult.original_filename,
      public_id: uploadResult.public_id,
    });

  } catch (error) {
    console.error("CV upload error:", error);
    return NextResponse.json({ error: "CV upload failed" }, { status: 500 });
  }
}
