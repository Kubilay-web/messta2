import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// POST: Toplu işlemler (status update, delete multiple)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, storeIds, data } = body;

    if (!action || !storeIds || !Array.isArray(storeIds)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'update-status':
        if (!data || !data.status) {
          return NextResponse.json(
            { success: false, message: 'Status is required' },
            { status: 400 }
          );
        }

        await db.store.updateMany({
          where: {
            id: {
              in: storeIds,
            },
          },
          data: {
            status: data.status,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Updated status for ${storeIds.length} stores`,
        });

      case 'delete':
        await db.store.deleteMany({
          where: {
            id: {
              in: storeIds,
            },
          },
        });

        return NextResponse.json({
          success: true,
          message: `Deleted ${storeIds.length} stores`,
        });

      case 'feature':
        await db.store.updateMany({
          where: {
            id: {
              in: storeIds,
            },
          },
          data: {
            featured: data?.featured ?? true,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Updated featured status for ${storeIds.length} stores`,
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error performing bulk operation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}