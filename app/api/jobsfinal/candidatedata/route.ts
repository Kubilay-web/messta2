// app/api/candidate-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/prisma'; // db yerine prisma import edilmeli

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (!type) {
      return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 });
    }

    let data;
    
    switch (type) {
      case 'categories':
        // Profession modeli olmadığı için Jobcategory kullanıyoruz
        data = await db.jobcategory.findMany({
          include: {
            _count: {
              select: { Jobs: true } // Candidate ilişkisi olmadığı için Jobs sayısını gösteriyoruz
            }
          },
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'skills':
        data = await db.skill.findMany({
          include: {
            _count: {
              select: { Jobskill: true } // CandidateSkill yerine Jobskill sayısı
            }
          },
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'locations':
        const cities = await db.city.findMany({
          select: { name: true },
          orderBy: { name: 'asc' }
        });
        data = cities.map(city => city.name);
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching candidate data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}