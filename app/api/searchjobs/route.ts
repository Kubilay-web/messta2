import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import queryString from "query-string";

export async function GET(req) {
  try {
    const searchParams = queryString.parseUrl(req.url).query;

    const { country, state, city, minSalary, maxSalary, job_category_id } =
      searchParams || {};

    const currentDate = new Date();

    const filter = {
      status: "active",
      deadline: {
        gte: currentDate,
      },
      ...(job_category_id && {
        jobCategoryId: job_category_id,
      }),
      ...(minSalary &&
        maxSalary && {
          custom_salary: {
            gte: parseInt(minSalary),
            lte: parseInt(maxSalary),
          },
        }),
      ...(country && { countryId: country }),
      ...(state && { stateId: state }),
      ...(city && { cityId: city }),
    };

    const jobs = await db.jobs.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc",
      },
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
    });

    return NextResponse.json(jobs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
