
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log("🔍 Looking for parent with userId:", userId);

    // Parent tablosunda userId ile ara
    const parent = await db.parent.findUnique({
      where: { 
        userId: userId  // userId unique olduğu için direkt bulur
      },
      select: { 
        id: true,
        firstName: true,
        lastName: true 
      }
    });

    if (!parent) {
      console.log("❌ No parent found for userId:", userId);
      return NextResponse.json(
        { error: 'Parent not found' },
        { status: 404 }
      );
    }

    console.log("✅ Found parent:", parent);

    return NextResponse.json({
      data: {
        parentId: parent.id,
        name: `${parent.firstName} ${parent.lastName}`
      },
      error: null
    });
  } catch (error) {
    console.error('Error finding parent:', error);
    return NextResponse.json(
      { error: 'Failed to find parent' },
      { status: 500 }
    );
  }
}