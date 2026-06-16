// app/api/seller/store/[storeUrl]/products/bulk/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, productIds } = body;

    // Store ownership kontrolü
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    if (action === 'delete') {
      // Toplu silme
      await db.product.deleteMany({
        where: {
          id: {
            in: productIds,
          },
          storeId: store.id,
        },
      });
    } else if (action === 'archive') {
      // Toplu arşivleme (eğer bir status alanınız varsa)
      // Örnek: await db.product.updateMany(...)
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in bulk action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}