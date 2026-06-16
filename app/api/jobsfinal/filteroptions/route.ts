// app/api/jobs/filter-options/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Kategoriler ve job sayıları
    const categories = await db.jobcategory.findMany({
      include: { _count: { select: { Jobs: true } } }
    });

    const jobTypes = await db.jobtype.findMany({
      include: { _count: { select: { Jobs: true } } }
    });

    const qualifications = await db.educationid.findMany({
      include: { _count: { select: { Jobs: true } } }
    });

    const experiences = await db.jobexperienceId.findMany({
      include: { _count: { select: { Jobs: true } } }
    });

    const skills = await db.skill.findMany({
      include: { _count: { select: { Jobskill: true } } } // Skill -> Jobskill relation
    });

    return NextResponse.json({
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        count: c._count.Jobs
      })),
      jobTypes: jobTypes.map(j => ({
        id: j.id,
        name: j.name,
        count: j._count.Jobs
      })),
      qualifications: qualifications.map(q => ({
        id: q.id,
        name: q.name,
        count: q._count.Jobs
      })),
      experiences: experiences.map(e => ({
        id: e.id,
        name: e.name,
        count: e._count.Jobs
      })),
      skills: skills.map(s => ({
        id: s.id,
        name: s.name,
        count: s._count.Jobskill
      }))
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
