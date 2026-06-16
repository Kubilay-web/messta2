// app/api/onesocial/experience/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// Deneyim ekleme
export async function POST(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const experience = await prisma.experienceSocial.create({
      data: {
        title: body.title,
        companyName: body.companyName,
        companyLogo: body.companyLogo,
        location: body.location,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        currentlyWorking: body.currentlyWorking,
        userId: user.id, // Kullanıcı ID'si
      },
    });

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

// Deneyimleri getirme
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('username');

    if (!userId) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const experiences = await prisma.experienceSocial.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}