import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const currentDate = new Date();

    const jobs = await db.jobs.findMany({
      where: {
        companyId: id,
        status: "active",
        deadline: {
          gte: currentDate,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job_category: true,
        company: true,
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
        Job_benfits: {
          include: {
            benfit: true,
          },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
