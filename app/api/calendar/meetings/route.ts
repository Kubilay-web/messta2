// app/api/meetings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth';

// Meeting filter enum'ları
enum MeetingFilterEnum {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
  CANCELLED = 'CANCELLED',
  ALL = 'ALL'
}

type MeetingFilterEnumType = MeetingFilterEnum;

// GET isteği için handler
export async function GET(request: NextRequest) {
  try {

    const { user } = await validateRequest();
        const userId = user?.id;
    
        if (!userId) {
          return NextResponse.json(
            { message: "User ID required" },
            { status: 401 }
          );
        }
   
    // URL'den filter parametresini al
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter') as MeetingFilterEnumType || MeetingFilterEnum.UPCOMING;

    // Geçerli filter kontrolü
    const validFilters = Object.values(MeetingFilterEnum);
    if (!validFilters.includes(filter)) {
      return NextResponse.json({ 
        message: 'Invalid filter parameter',
        validFilters 
      }, { status: 400 });
    }

    // Meeting'leri getir
    const meetings = await getUserMeetingsService(userId, filter);

    return NextResponse.json({
      message: "Meetings fetched successfully",
      meetings
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// Servis fonksiyonu
async function getUserMeetingsService(userId: string, filter: MeetingFilterEnumType) {
  const now = new Date();
  
  // Filter'a göre where koşulu oluştur
  let whereClause: any = { userId };
  
  switch (filter) {
    case MeetingFilterEnum.UPCOMING:
      whereClause.startTime = { gte: now };
      whereClause.status = 'SCHEDULED';
      break;
    
    case MeetingFilterEnum.PAST:
      whereClause.startTime = { lt: now };
      break;
    
    case MeetingFilterEnum.CANCELLED:
      whereClause.status = 'CANCELLED';
      break;
    
    case MeetingFilterEnum.ALL:
    default:
      // Tüm meeting'ler
      break;
  }

  // Meeting'leri veritabanından getir
  const meetings = await db.meeting.findMany({
    where: whereClause,
    orderBy: { 
      startTime: filter === MeetingFilterEnum.UPCOMING ? 'asc' : 'desc'
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
          duration: true,
          locationType: true
        }
      },
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true
        }
      }
    }
  });

  return meetings;
}

