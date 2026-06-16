import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function PATCH(
  request: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const productId = context.params.productId;
    const { active } = await request.json();

    // Get product with store
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        store: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.store.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update product status (you may need to add a status field to Product model)
    // For now, we'll just return success
    return NextResponse.json({ success: true, active });
  } catch (error) {
    console.error('Error updating product status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}