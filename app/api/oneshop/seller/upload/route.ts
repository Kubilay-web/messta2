// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { validateRequest } from '@/app/auth';

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Dosya boyutu kontrolü (bytes cinsinden)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

// Buffer'ı base64'e çevirme yardımcı fonksiyonu
const bufferToBase64 = (buffer: Buffer): string => {
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};

export async function POST(request: NextRequest) {
  try {
    // Kimlik doğrulama kontrolü
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to upload files.' },
        { status: 401 }
      );
    }

    // Form verilerini al
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'products'; // Varsayılan folder

    // Dosya kontrolü
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please select a file to upload.' },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Allowed file types are: JPEG, PNG, WebP, GIF, SVG.',
          allowedTypes: ALLOWED_FILE_TYPES
        },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          error: `File size too large. Maximum allowed size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
          maxSize: MAX_FILE_SIZE
        },
        { status: 400 }
      );
    }

    // File'ı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Base64 formatına çevir
    const base64String = bufferToBase64(buffer);

    // Cloudinary yükleme seçenekleri
    const uploadOptions: any = {
      folder: folder,
      resource_type: 'auto', // Otomatik dosya tipi tespiti
      public_id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      overwrite: false, // Aynı isimde dosya varsa üzerine yazma
      unique_filename: true, // Benzersiz dosya adı oluştur
      transformation: [
        { quality: 'auto:good' }, // Otomatik kalite optimizasyonu
        { fetch_format: 'auto' } // Otomatik format optimizasyonu
      ]
    };

    // Resim ise ek optimizasyonlar
    if (file.type.startsWith('image/')) {
      uploadOptions.transformation.push(
        { width: 1200, crop: 'limit' }, // Maksimum genişlik 1200px
        { fetch_format: 'webp' }, // WebP formatına dönüştür (daha küçük dosya)
        { quality: '80' } // Kalite ayarı
      );
    }

    // Cloudinary'e yükle
    const result = await cloudinary.uploader.upload(base64String, uploadOptions);

    // Başarılı yanıt
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        folder: result.folder,
        created_at: result.created_at,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
        tags: result.tags || [],
        // Thumbnail URL'leri (farklı boyutlar için)
        thumbnail_url: cloudinary.url(result.public_id, {
          width: 300,
          height: 300,
          crop: 'fill',
          quality: 'auto',
          fetch_format: 'auto'
        }),
        medium_url: cloudinary.url(result.public_id, {
          width: 600,
          height: 600,
          crop: 'limit',
          quality: 'auto',
          fetch_format: 'auto'
        }),
        large_url: cloudinary.url(result.public_id, {
          width: 1200,
          height: 1200,
          crop: 'limit',
          quality: 'auto',
          fetch_format: 'auto'
        })
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Cloudinary upload error:', error);

    // Cloudinary hata mesajlarını daha anlaşılır hale getir
    let errorMessage = 'Failed to upload file';
    let statusCode = 500;

    if (error.message.includes('File size too large')) {
      errorMessage = 'File size exceeds the maximum allowed limit';
      statusCode = 400;
    } else if (error.message.includes('Invalid image file')) {
      errorMessage = 'The uploaded file is not a valid image';
      statusCode = 400;
    } else if (error.http_code === 401) {
      errorMessage = 'Cloudinary authentication failed. Please check your API credentials.';
      statusCode = 500;
    } else if (error.http_code === 400) {
      errorMessage = 'Bad request to Cloudinary. Please check the file and try again.';
      statusCode = 400;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}

// GET isteği için: Upload edilen dosyaları listeleme
export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'products';
    const maxResults = parseInt(searchParams.get('limit') || '50');

    // Cloudinary'den dosyaları listele
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: maxResults,
      context: true
    });

    return NextResponse.json({
      success: true,
      data: result.resources.map((resource: any) => ({
        url: resource.secure_url,
        public_id: resource.public_id,
        format: resource.format,
        bytes: resource.bytes,
        width: resource.width,
        height: resource.height,
        created_at: resource.created_at,
        folder: resource.folder,
        context: resource.context || {}
      })),
      total: result.resources.length,
      folder: folder
    });

  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

// DELETE isteği için: Dosya silme
export async function DELETE(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('public_id');

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Cloudinary'den dosyayı sil
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully',
        data: result
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to delete file',
        data: result
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}