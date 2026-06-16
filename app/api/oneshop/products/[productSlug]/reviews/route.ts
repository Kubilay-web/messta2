import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/app/auth';
import db from "@/app/lib/db";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// GET all reviews for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.productSlug },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true
              }
            },
            images: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Calculate rating statistics
    const ratingDistribution = await db.review.groupBy({
      by: ['rating'],
      where: { productId: product.id },
      _count: { rating: true }
    });

    const averageRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

    return NextResponse.json({
      reviews: product.reviews,
      stats: {
        averageRating,
        ratingDistribution,
        totalReviews: product.reviews.length
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST a new review
export async function POST(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await db.product.findUnique({
      where: { slug: params.productSlug }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const rating = parseInt(formData.get('rating') as string);
    const review = formData.get('review') as string;
    const color = formData.get('color') as string;
    const size = formData.get('size') as string;
    const variant = formData.get('variant') as string;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating. Must be between 1 and 5' }, { status: 400 });
    }

    if (!review || review.trim().length < 10) {
      return NextResponse.json({ error: 'Review must be at least 10 characters long' }, { status: 400 });
    }

    // Check if user already reviewed this product variant
    const existingReview = await db.review.findFirst({
      where: {
        productId: product.id,
        userId: dbUser.id,
        variant: variant || ''
      }
    });

    if (existingReview) {
      return NextResponse.json({ error: 'You already reviewed this variant' }, { status: 400 });
    }

    // Upload images to Cloudinary
    const imageFiles = formData.getAll('images[]') as File[];
    const uploadedImages = [];

    for (const file of imageFiles) {
      if (file.size > 0) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Convert to base64 for Cloudinary upload
          const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;
          
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              base64String,
              {
                folder: `product-reviews/${product.id}`,
                resource_type: 'auto',
                transformation: [
                  { width: 800, height: 800, crop: 'limit' }
                ]
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
          }) as any;

          uploadedImages.push({
            url: uploadResult.secure_url,
            alt: `Review image for ${product.name}`,
            publicId: uploadResult.public_id
          });
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          // Continue with other images even if one fails
        }
      }
    }

    // Create review
    const newReview = await db.review.create({
      data: {
        rating,
        review: review.trim(),
        color: color || '',
        size: size || '',
        variant: variant || '',
        productId: product.id,
        userId: dbUser.id,
        images: {
          create: uploadedImages.map(img => ({
            url: img.url,
            alt: img.alt
          }))
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        images: true
      }
    });

    // Update product rating and review count
    const productReviews = await db.review.findMany({
      where: { productId: product.id }
    });

    const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;

    await db.product.update({
      where: { id: product.id },
      data: {
        rating: avgRating,
        numReviews: productReviews.length
      }
    });

    return NextResponse.json(newReview);

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ 
      error: 'Failed to create review',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}