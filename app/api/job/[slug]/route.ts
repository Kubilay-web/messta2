import { NextResponse } from "next/server";
import db from "@/app/lib/db";
// dbConnect artık gerekmez Prisma kullandığın için

export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;

  try {
    const job = await db.jobs.findFirst({
      where: { slug },
      include: {
        job_category: true,
        company: {
          include: {
            industryType: true,
          },
        },
        job_role: true,
        job_experience: true,
        education: true,
        job_type: true,
        salary_type: true,
        country: true,
        state: true,
        city: true,
        jobtags: {
          include: {
            tag: true,
          },
        },
        Jobskill: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!job) {
      return NextResponse.json({ err: "Job not found" }, { status: 404 });
    }

    const openjobs = await db.jobs.count({
      where: {
        companyId: job.companyId,
        deadline: {
          gte: new Date(),
        },
      },
    });

    return NextResponse.json({
      job,
      openjobs,
      tag: job.jobtags,
      skills: job.Jobskill,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
