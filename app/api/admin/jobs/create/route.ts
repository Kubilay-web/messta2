import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function GET() {
  try {
    const jobs = await db.jobs.findMany({
      include: {
        job_category: { select: { name: true } },
        company: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    highlight,
    featured,
    title,
    isSalaryRange,
    deadline,
    totalVacancies,
    selectedCompany,
    selectedJobCategory,
    selectedCountry,
    selectedState,
    selectedCity,
    address,
    minSalary,
    maxSalary,
    customSalary,
    selectedSalaryType,
    education,
    experience,
    jobRole,
    jobType,
    tags,
    benefits,
    skills,
    applicationReceived,
    description,
  } = body;

  console.log("body", body);

  try {
    const job = await db.jobs.create({
      data: {
        title,
        slug: slugify(title),
        deadline: new Date(deadline),
        vacancies: totalVacancies,
        company: {
          connect: { id: selectedCompany },
        },
        job_category: {
          connect: { id: selectedJobCategory },
        },
        country: {
          connect: { id: selectedCountry },
        },
        state: {
          connect: { id: selectedState },
        },
        city: {
          connect: { id: selectedCity },
        },
        address,
        min_salary: minSalary ? parseInt(minSalary, 10) : undefined,
        max_salary: maxSalary ? parseInt(maxSalary, 10) : undefined,
        custom_salary: customSalary ? parseInt(customSalary, 10) : undefined,
        salary_type: {
          connect: { id: selectedSalaryType },
        },
        job_experience: {
          connect: { id: experience },
        },
        job_role: {
          connect: { id: jobRole },
        },
        education: {
          connect: { id: education },
        },
        job_type: {
          connect: { id: jobType },
        },
        apply_on: applicationReceived,
        description,
        highlight: Boolean(highlight),
        featured: Boolean(featured),
        salary_mode: isSalaryRange ? "range" : "custom",
        status: "active",
      },
    });

    // Job tags
    if (tags && tags.length > 0) {
      await db.jobtag.createMany({
        data: tags.map((tagId: string) => ({
          jobId: job.id,
          tagId,
        })),
      });
    }

    // Benefits
    if (benefits) {
      const createdBenefit = await db.benfits.create({
        data: {
          companyId: selectedCompany,
          name: benefits,
        },
      });

      await db.job_benfits.create({
        data: {
          jobId: job.id,
          benfitsId: createdBenefit.id,
        },
      });
    }

    // Job Skills
    if (skills && skills.length > 0) {
      await db.jobskill.createMany({
        data: skills.map((skillId: string) => ({
          jobId: job.id,
          skillId,
        })),
      });
    }

    return NextResponse.json({ success: "Job created successfully" });
  } catch (err: any) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 },
    );
  }
}
