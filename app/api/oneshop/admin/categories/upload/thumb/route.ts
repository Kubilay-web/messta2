import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type',
          message: 'Only JPEG, PNG, WebP, and GIF are allowed',
        },
        { status: 400 }
      );
    }

    // Size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'File too large',
          message: 'Max size is 5MB',
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    /* ---------------- Original Upload ---------------- */
    const originalUpload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'categories',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    /* ---------------- Thumbnail (400x400) ---------------- */
    let thumbBuffer = buffer;

    if (file.type !== 'image/gif') {
      thumbBuffer = await sharp(buffer)
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .toBuffer();
    }

    const thumbUpload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'categories/thumbnails',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(thumbBuffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        fileUrl: originalUpload.secure_url,
        publicId: originalUpload.public_id,
        thumbUrl: thumbUpload.secure_url,
        thumbPublicId: thumbUpload.public_id,
        fileSize: file.size,
        fileType: file.type,
      },
      message: 'File uploaded successfully',
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Upload failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
