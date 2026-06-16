// app/api/candidates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filtre parametrelerini al
    const categories = searchParams.getAll('categories');
    const skills = searchParams.getAll('skills');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Filtreleme koşullarını oluştur
    const where: any = {
      // status: 'available' // Sadece müsait adaylar
    };

    // Kategori filtresi
    if (categories.length > 0) {
      where.OR = categories.map(categoryId => ({
        professionIds: {
          has: categoryId
        }
      }));
    }

    // Beceri filtresi - skillIds array'ini kontrol et
    if (skills.length > 0) {
      where.skill_id = {
        hasSome: skills
      };
    }

    // Arama filtresi
    if (search) {
      where.OR = [
        { full_name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        {
          user: {
            displayName: { contains: search, mode: 'insensitive' }
          }
        }
      ];
    }

    // Lokasyon filtresi
    if (location) {
      where.OR = [
        { city: { name: { contains: location, mode: 'insensitive' } } },
        { country: { name: { contains: location, mode: 'insensitive' } } }
      ];
    }

    // Sıralama
    let orderBy: any = {};
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'premium':
        orderBy = { profile_completion: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Toplam sayı
    const totalCount = await db.candidate.count({ where });

    // Adayları getir
    const candidates = await db.candidate.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            email: true
          }
        },
        city: {
          select: {
            name: true
          }
        },
        country: {
          select: {
            name: true
          }
        }
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    });

    // CandidateSkill ilişkisi olmadığı için ayrıca skill bilgilerini çekiyoruz
    const candidatesWithSkills = await Promise.all(
      candidates.map(async (candidate) => {
        if (candidate.skill_id && candidate.skill_id.length > 0) {
          const skills = await db.skill.findMany({
            where: {
              id: { in: candidate.skill_id }
            },
            select: {
              id: true,
              name: true
            },
            take: 5
          });
          return {
            ...candidate,
            skills
          };
        }
        return {
          ...candidate,
          skills: []
        };
      })
    );

    return NextResponse.json({
      candidates: candidatesWithSkills,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}