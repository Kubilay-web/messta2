// app/api/jobdata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/prisma';

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
        data = await db.jobcategory.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'jobtypes':
        data = await db.jobtype.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'experiences':
        data = await db.jobexperienceId.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'educations':
        data = await db.educationid.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'skills':
        data = await db.skill.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'companies':
        data = await db.company.findMany({
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            }
          },
          orderBy: { name: 'asc' }
        });
        break;
        
      case 'countries':
        data = await db.countryJob.findMany({
          orderBy: { name: 'asc' }
        });
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}