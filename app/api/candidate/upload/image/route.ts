import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// POST: Image Upload
export async function POST(req: Request) {
  try {
    const { logo } = await req.json();

    if (!logo) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await cloudinary.v2.uploader.upload(logo, {
      folder: "profile_images",
    });

    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}

// PUT: Image Delete
export async function PUT(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "No public_id provided" },
        { status: 400 },
      );
    }

    const result = await cloudinary.v2.uploader.destroy(public_id);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Image delete failed" }, { status: 500 });
  }
}
