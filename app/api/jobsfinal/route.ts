import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"
import slugify from "slugify";

// ✅ Tüm iş ilanlarını getir
export async function GET() {
  try {
    const jobs = await db.jobs.findMany({
      include: {
        company: true,
        job_category: true,
        job_role: true,
        job_experience: true,
        education: true,
        job_type: true,
        salary_type: true,
        city: true,
        state: true,
        country: true,
        jobtags: true,
        Job_benfits: true,
        Jobskill: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// ✅ Yeni iş ilanı oluştur

export function generateSlug(title: string): string {
  const baseSlug = slugify(title);
  const timestamp = Date.now().toString(36); // Benzersizlik için timestamp
  return `${baseSlug}-${timestamp}`;
}




export async function POST(request: NextRequest) {
  try {
    console.log('=== JOBSFINAL API POST ÇAĞRILDI ===');
    
    const body = await request.json();
    console.log('Gelen request body:', JSON.stringify(body, null, 2));

    // Validasyon
    const requiredFields = ['title', 'jobCategoryId', 'companyId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Zorunlu alanlar eksik: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Slug oluştur
    const slug = generateSlug(body.title);
    console.log('Oluşturulan slug:', slug);

    // String'den number'a dönüşüm yap
    const minSalary = body.min_salary ? parseInt(body.min_salary) : 0;
    const maxSalary = body.max_salary ? parseInt(body.max_salary) : 0;
    const customSalary = body.custom_salary ? parseInt(body.custom_salary) : 0;
    const vacancies = body.vacancies ? parseInt(body.vacancies) : 1;

    console.log('Dönüştürülen değerler:', {
      minSalary, maxSalary, customSalary, vacancies
    });

    // Prisma ile veri oluştur
    const job = await db.jobs.create({
      data: {
        title: body.title,
        slug: slug,
        jobCategoryId: body.jobCategoryId,
        jobExperienceId: body.jobExperienceId || null,
        jobTypeId: body.jobTypeId || null,
        educationId: body.educationId || null,
        salaryTypeId: body.salaryTypeId || null,
        vacancies: vacancies.toString(), // Modelde String olarak tanımlı
        min_salary: minSalary, // ← NUMBER olarak
        max_salary: maxSalary, // ← NUMBER olarak
        custom_salary: customSalary, // ← NUMBER olarak
        salary_mode: body.salary_mode || "custom",
        deadline: body.deadline ? new Date(body.deadline) : null,
        description: body.description || "",
        apply_on: body.apply_on || "app",
        apply_email: body.apply_email || null,
        apply_url: body.apply_url || null,
        featured: body.featured || false,
        highlight: body.highlight || false,
        companyId: body.companyId,
        cityId: body.cityId || null,
        stateId: body.stateId || null,
        countryId: body.countryId || null,
        address: body.address || "",
        status: 'pending',
        // Skills ilişkisi
        ...(body.skillIds && body.skillIds.length > 0 && {
          Jobskill: {
            create: body.skillIds.map((skillId: string) => ({
              skillId: skillId
            }))
          }
        })
      },
      include: {
        company: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            }
          }
        },
        job_category: true,
        job_type: true,
        Jobskill: {
          include: {
            skill: true
          }
        }
      }
    });

    console.log('İş ilanı başarıyla oluşturuldu:', job.id);
    
    return NextResponse.json(job, { status: 201 });
    
  } catch (error) {
    console.error('Error creating job:', error);
    
    // Prisma specific errors
    if (error instanceof Error) {
      // Foreign key constraint hatası
      if (error.message.includes('Foreign key constraint failed')) {
        return NextResponse.json(
          { error: 'Geçersiz kategori, şirket veya skill ID. Lütfen geçerli değerler seçin.' },
          { status: 400 }
        );
      }
      
      // Unique constraint hatası (slug zaten varsa)
      if (error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
          { error: 'Bu başlıkta zaten bir iş ilanı var. Lütfen başlığı değiştirin.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'İş ilanı oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}
