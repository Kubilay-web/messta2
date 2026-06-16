// app/api/events/[eventId]/availability/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"

interface RouteParams {
  params: {
    eventId: string;
  }
}

// GET isteği için handler
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = params;

    // Event'ı bul ve public olup olmadığını kontrol et
    const event = await db.event.findFirst({
      where: { 
        id: eventId,
        isPrivate: false // Sadece public event'lar için
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
    
    if (!event) {
      return NextResponse.json({ message: 'Event not found or not public' }, { status: 404 });
    }

    // Kullanıcının availability bilgilerini getir
    const availability = await db.availability.findUnique({
      where: { 
        userId: event.user.id 
      },
      include: {
        days: {
          where: {
            isAvailable: true // Sadece müsait olunan günleri getir
          },
          orderBy: {
            day: 'asc' // Günleri sıralı şekilde getir
          }
        }
      }
    });

    if (!availability) {
      return NextResponse.json({ 
        message: 'Availability not found for this event',
        data: null 
      }, { status: 200 });
    }

    // Hassas bilgileri filtrele ve sadece gerekli bilgileri döndür
    const publicAvailability = {
      timeGap: availability.timeGap,
      days: availability.days.map(day => ({
        day: day.day,
        startTime: day.startTime,
        endTime: day.endTime,
        isAvailable: day.isAvailable
      }))
    };

    return NextResponse.json({
      message: "Event availability fetched successfully",
      data: publicAvailability
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

