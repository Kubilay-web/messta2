// app/api/events/user/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"

interface RouteParams {
  params: {
    username: string;
  }
}

// GET isteği için handler
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { username } = params;

    // Kullanıcıyı bul
    const user = await db.user.findUnique({
      where: { username },
      select: { 
        id: true, 
        username: true, 
        displayName: true,
        avatarUrl: true,
        bio: true
      }
    });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Kullanıcının public event'larını getir
    const events = await db.event.findMany({
      where: { 
        userId: user.id, 
        isPrivate: false 
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        meetings: {
          where: {
            status: 'SCHEDULED'
          },
          select: {
            startTime: true,
            endTime: true
          }
        }
      }
    });

    return NextResponse.json({
      message: "Public events fetched successfully",
      user: {
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        bio: user.bio
      },
      events
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