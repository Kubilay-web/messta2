import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";

export async function PUT(req, context) {
  try {
    const body = await req.json();

    // İş ilanı güncelleme verilerini hazırla
    const jobsupdate = {
      title: body.title,
      slug: slugify(body.title),
      vacancies: body.vacancies,
      min_salary: body.minSalary ? parseInt(body.minSalary) : 0,
      max_salary: body.maxSalary ? parseInt(body.maxSalary) : 0,
      custom_salary: body.customSalary ? parseInt(body.customSalary) : 0,
      deadline: body.deadline ? new Date(body.deadline) : null,
      description: body.description,
      status: body.status || "pending",
      apply_on: body.apply_on || "app",
      apply_email: body.apply_email,
      apply_url: body.apply_url,
      featured: body.featured || false,
      highlight: body.highlight || false,
      fetaured_until: body.featured_until
        ? new Date(body.featured_until)
        : null,
      highlight_until: body.highlight_until
        ? new Date(body.highlight_until)
        : null,
      jobcount: body.jobcount || 0,
      total_views: body.total_views || 0,
      address: body.address,
      salary_mode: body.salary_mode || "custom",

      // İlişkisel alanlar
      companyId: body.companyId,
      jobCategoryId: body.jobCategoryId,
      jobRoleId: body.jobRoleId,
      jobExperienceId: body.jobExperienceId,
      educationId: body.educationId,
      jobTypeId: body.jobTypeId,
      salaryTypeId: body.salaryTypeId,
      cityId: body.cityId,
      stateId: body.stateId,
      countryId: body.countryId,
    };

    // Transaction içinde tüm işlemleri gerçekleştir
    const result = await db.$transaction(async (db) => {
      // 1. İş ilanını güncelle
      const job = await db.jobs.update({
        where: { id: context.params.id },
        data: jobsupdate,
      });

      // 2. Etiketleri güncelle
      await db.jobtag.deleteMany({ where: { jobId: job.id } });
      if (body.tags && body.tags.length > 0) {
        await db.jobtag.createMany({
          data: body.tags.map((tagId) => ({
            jobId: job.id,
            tagId: tagId,
          })),
        });
      }

      // 3. Faydaları güncelle
      // Önce mevcut job_benfits ilişkilerini sil
      await db.job_benfits.deleteMany({ where: { jobId: job.id } });

      if (body.benefits && body.benefits.length > 0) {
        // Şirketin mevcut benefits kaydını bul veya oluştur
        let benefit = await db.benfits.findFirst({
          where: { companyId: body.companyId },
        });

        if (!benefit) {
          benefit = await db.benfits.create({
            data: {
              companyId: body.companyId,
              name: body.benefits,
            },
          });
        } else {
          // Mevcut benefits kaydını güncelle
          benefit = await db.benfits.update({
            where: { id: benefit.id },
            data: {
              name: body.benefits,
            },
          });
        }

        // Yeni job_benfits ilişkisini oluştur
        await db.job_benfits.create({
          data: {
            jobId: job.id,
            benfitsId: benefit.id,
          },
        });
      }

      // 4. Becerileri güncelle
      await db.jobskill.deleteMany({ where: { jobId: job.id } });
      if (body.skills && body.skills.length > 0) {
        await db.jobskill.createMany({
          data: body.skills.map((skillId) => ({
            jobId: job.id,
            skillId: skillId,
          })),
        });
      }

      return job;
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: err.message,
        details: process.env.NODE_ENV === "development" ? err : null,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req, context) {
  try {
    const result = await db.$transaction(async (db) => {
      // 1. İş ilanını bul
      const job = await db.jobs.findUnique({
        where: { id: context.params.id },
      });

      if (!job) {
        throw new Error("İş ilanı bulunamadı");
      }

      // 2. İlişkili kayıtları sil
      await db.jobtag.deleteMany({ where: { jobId: job.id } });
      await db.job_benfits.deleteMany({ where: { jobId: job.id } });
      await db.jobskill.deleteMany({ where: { jobId: job.id } });

      // 3. İş ilanını sil
      return await db.jobs.delete({
        where: { id: job.id },
      });
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: err.message,
        details: process.env.NODE_ENV === "development" ? err : null,
      },
      { status: 500 },
    );
  }
}
