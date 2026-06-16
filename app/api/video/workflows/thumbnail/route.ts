import { PrismaClient } from '@prisma/client';
import cloudinary from 'cloudinary';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const DESCRIPTION_SYSTEM_PROMPT = `
Your task is to generate a visually engaging thumbnail for the video.
Ensure the thumbnail is visually appealing and fits the context.
Include keywords or visuals related to the video content.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { videoId, userId, prompt } = body;

    // 1. Videoyu veritabanından çek
    const video = await prisma.video.findFirst({
      where: {
        id: videoId,
        userId: userId,
      },
    });

    if (!video) {
      return Response.json({ error: 'Video not found' }, { status: 404 });
    }

    // 2. OpenAI ile thumbnail üret
    const aiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: DESCRIPTION_SYSTEM_PROMPT + "\n" + prompt,
        n: 1,
        model: 'dall-e-3',
        size: '1024x1024',
      }),
    });

    const aiBody = await aiResponse.json();
    const tempThumbnailUrl = aiBody?.data?.[0]?.url;

    if (!tempThumbnailUrl) {
      return Response.json({ error: 'Error generating image' }, { status: 500 });
    }

    // 3. Önceki thumbnail varsa sil
    if (video.thumbnailKey) {
      try {
        await cloudinary.v2.uploader.destroy(video.thumbnailKey);
      } catch (err) {
        console.log('Cloudinary delete error:', err);
      }

      await prisma.video.update({
        where: { id: video.id },
        data: { thumbnailKey: null, thumbnailUrl: null },
      });
    }

    // 4. Cloudinary'ye yükle
    const uploadResult = await cloudinary.v2.uploader.upload(tempThumbnailUrl, {
      public_id: `video-thumbnail-${video.id}`,
      folder: 'video-thumbnails',
      overwrite: true,
    });

    if (!uploadResult.secure_url) {
      return Response.json({ error: 'Error uploading thumbnail' }, { status: 500 });
    }

    // 5. Veritabanını güncelle
    await prisma.video.update({
      where: { id: video.id },
      data: {
        thumbnailUrl: uploadResult.secure_url,
        thumbnailKey: uploadResult.public_id,
      },
    });

    return Response.json({
      status: 'success',
      thumbnailUrl: uploadResult.secure_url,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
