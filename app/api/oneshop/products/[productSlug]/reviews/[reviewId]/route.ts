import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';


export async function DELETE(
  request: NextRequest,
  { params }: { params: { productSlug: string; reviewId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await db.user.findUnique({
      where: { email: user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const review = await db.review.findUnique({
      where: { id: params.reviewId }
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check if user owns the review
    if (review.userId !== user.id) {
      return NextResponse.json({ error: 'Not authorized to delete this review' }, { status: 403 });
    }

    await db.review.delete({
      where: { id: params.reviewId }
    });

    // Update product rating
    const product = await db.product.findUnique({
      where: { id: review.productId },
      include: { reviews: true }
    });

    if (product && product.reviews.length > 0) {
      const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
      await db.product.update({
        where: { id: review.productId },
        data: {
          rating: avgRating,
          numReviews: product.reviews.length
        }
      });
    }

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}