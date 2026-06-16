// app/api/events/toggle-privacy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth';

// PUT isteği için handler
export async function PUT(request: NextRequest) {
  try {
    // Body'den eventId'yi al
    const { eventId } = await request.json();
    
    const {user}=await validateRequest();
    const userId = user?.id;
    
    if (!userId) {
      return NextResponse.json({ message: 'User ID required' }, { status: 401 });
    }

    if (!eventId) {
      return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
    }

    // Event'ı bul ve yetki kontrolü yap
    const event = await db.event.findFirst({
      where: { 
        id: eventId, 
        userId: userId 
      }
    });
    
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Privacy durumunu değiştir
    const updatedEvent = await db.event.update({
      where: { id: eventId },
      data: { isPrivate: !event.isPrivate }
    });

    return NextResponse.json({
      message: `Event set to ${updatedEvent.isPrivate ? "private" : "public"} successfully`,
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// Sadece PUT methoduna izin ver
export async function GET() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}