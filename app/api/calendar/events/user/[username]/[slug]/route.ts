// app/api/events/user/[username]/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"

interface RouteParams {
  params: {
    username: string;
    slug: string;
  }
}

// GET isteği için handler
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { username, slug } = params;

    // Kullanıcıyı bul
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Belirli kullanıcı ve slug'a göre public event'ı getir
    const event = await db.event.findFirst({
      where: { 
        userId: user.id, 
        slug: slug,
        isPrivate: false 
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            bio: true
          }
        },
        meetings: {
          where: {
            status: 'SCHEDULED'
          },
          select: {
            id: true,
            guestName: true,
            guestEmail: true,
            startTime: true,
            endTime: true,
            meetLink: true,
            status: true
          },
          orderBy: {
            startTime: 'asc'
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event details fetched successfully",
      event
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// Diğer HTTP methodları için hata döndür
export async function POST() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ 
    message: 'Method not allowed' 
  }, { status: 405 });
}