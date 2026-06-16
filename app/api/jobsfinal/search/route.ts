// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Filtre parametrelerini al
    const categories = searchParams.getAll('categories');
    const jobTypes = searchParams.getAll('jobTypes');
    const qualifications = searchParams.getAll('qualifications');
    const experiences = searchParams.getAll('experiences');
    const skills = searchParams.getAll('skills');
    const minSalary = parseInt(searchParams.get('minSalary') || '0');
    const maxSalary = parseInt(searchParams.get('maxSalary') || '100000');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // Filtreleme koşullarını oluştur
    const where: any = {
      status: 'active' // Sadece aktif iş ilanları (şemada 'active' olarak tanımlanmış)
    };
    
    // Kategori filtresi
    if (categories.length > 0) {
      where.jobCategoryId = { in: categories };
    }
    
    // İş türü filtresi
    if (jobTypes.length > 0) {
      where.jobTypeId = { in: jobTypes };
    }
    
    // Eğitim filtresi
    if (qualifications.length > 0) {
      where.educationId = { in: qualifications };
    }
    
    // Deneyim filtresi
    if (experiences.length > 0) {
      where.jobExperienceId = { in: experiences };
    }
    
    // Beceri filtresi - Şemaya göre Jobskill modeli üzerinden
    if (skills.length > 0) {
      where.Jobskill = {
        some: {
          skillId: { in: skills }
        }
      };
    }
    
    // Maaş filtresi - Şemada salary_mode alanı var (range veya custom)
    if (minSalary > 0 || maxSalary < 100000) {
      where.OR = [
        // Range modunda maaş filtresi
        {
          AND: [
            { salary_mode: 'range' },
            { min_salary: { gte: minSalary } },
            { max_salary: { lte: maxSalary } }
          ]
        },
        // Custom modunda maaş filtresi
        {
          AND: [
            { salary_mode: 'custom' },
            { custom_salary: { gte: minSalary } },
            { custom_salary: { lte: maxSalary } }
          ]
        }
      ];
    }
    
    // Arama filtresi
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        {
          company: {
            name: { contains: search, mode: 'insensitive' }
          }
        }
      ];
    }
    
    // Sıralama koşullarını belirle
    let orderBy: any = {};
    switch (sortBy) {
      case 'featured':
        orderBy = [{ featured: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'relevant':
        orderBy = [{ total_views: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'rated':
        // Rating sistemi yok, görüntüleme sayısına göre sırala
        orderBy = { total_views: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }
    
    // Toplam iş sayısını al
    const totalCount = await db.jobs.count({ where });
    
    // İş ilanlarını getir - Şemaya göre ilişkileri düzenle
    const jobs = await db.jobs.findMany({
      where,
      include: {
        company: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true
              }
            },
            industryType: true,
            organizationType: true,
            teamType: true,
            city: true,
            state: true,
            country: true
          }
        },
        job_category: true,
        job_type: true,
        job_role: true,
        job_experience: true,
        education: true,
        salary_type: true,
        city: true,
        state: true,
        country: true,
        Job_benfits: {
          include: {
            benfit: true
          }
        },
        Jobskill: {
          include: {
            skill: true
          }
        },
        jobtags: {
          include: {
            tag: true
          }
        }
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    });
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      jobs,
      totalCount,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}