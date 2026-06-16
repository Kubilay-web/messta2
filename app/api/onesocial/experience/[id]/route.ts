// app/api/onesocial/experience/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// Deneyim güncelleme
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const experience = await db.experienceSocial.update({
      where: { id: params.id, userId: user.id },
      data: {
        title: body.title,
        companyName: body.companyName,
        companyLogo: body.companyLogo,
        location: body.location,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        currentlyWorking: body.currentlyWorking,
      },
    });

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// Deneyim silme
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.experienceSocial.delete({
      where: { id: params.id, userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}