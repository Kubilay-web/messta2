import { validateRequest } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

// POST: Resim yükle
export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, productId } = params;

    // Environment variables kontrolü
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

    if (!cloudName || !apiKey || !apiSecret || !uploadPreset) {
      console.error('Cloudinary environment variables are missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dosyayı base64 formatına çevir
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64Image}`;

    // Cloudinary'ye yükleme için form data oluştur
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', dataURI);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('folder', `stores/${storeUrl}/products/${productId}/variants`);
    cloudinaryFormData.append('public_id', `${Date.now()}_${file.name.replace(/\.[^/.]+$/, '')}`);
    cloudinaryFormData.append('timestamp', Math.floor(Date.now() / 1000).toString());

    // Cloudinary signature oluştur
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = [
      `folder=stores/${storeUrl}/products/${productId}/variants`,
      `public_id=${Date.now()}_${file.name.replace(/\.[^/.]+$/, '')}`,
      `timestamp=${timestamp}`,
      `upload_preset=${uploadPreset}`,
    ].join('&');

    // HMAC SHA-1 signature oluştur
    const crypto = require('crypto');
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('api_key', apiKey);

    // Cloudinary API'sine istek gönder
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      console.error('Cloudinary upload failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to upload image to Cloudinary' },
        { status: 500 }
      );
    }

    const cloudinaryResult = await cloudinaryResponse.json();

    return NextResponse.json({
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      alt: file.name,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      format: cloudinaryResult.format,
      bytes: cloudinaryResult.bytes,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// Cloudinary'den resim silme endpoint'i (isteğe bağlı)
export async function DELETE(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Signature oluştur
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
    
    const crypto = require('crypto');
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    // Cloudinary'den resmi sil
    const deleteResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }),
      }
    );

    if (!deleteResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to delete image from Cloudinary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}