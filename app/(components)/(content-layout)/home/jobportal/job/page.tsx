import JobFilterSidebar from "../components/JobFilterSidebar";
import JobResults from "../components/JobResults";
import H1 from "../components/ui/h1";
import { JobFilterValues } from "../lib/validation";
import { Metadata } from "next";
import db from "@/app/lib/db";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    page?: string;
  };
}

function getTitle({ q, type, location }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} developer jobs`
    : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
    })} | Flow Jobs`,
  };
}

async function fetchJobs(filterValues: JobFilterValues, page?: number) {
  const where: any = {};

  if (filterValues.q) {
    where.title = { contains: filterValues.q, mode: "insensitive" };
  }
  if (filterValues.type) {
    where.job_type = {
      name: { equals: filterValues.type, mode: "insensitive" },
    };
  }
  if (filterValues.location) {
    where.OR = [
      {
        city: { name: { contains: filterValues.location, mode: "insensitive" } },
      },
      {
        state: { name: { contains: filterValues.location, mode: "insensitive" } },
      },
      {
        country: {
          name: { contains: filterValues.location, mode: "insensitive" },
        },
      },
    ];
  }

  const pageSize = 10;
  const skip = page ? (page - 1) * pageSize : 0;

  return db.jobs.findMany({
    where,
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
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

export default async function Home({
  searchParams: { q, type, location, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
  };

  const jobs = await fetchJobs(filterValues, page ? parseInt(page) : undefined);

  

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults jobs={jobs} page={page ? parseInt(page) : 1} />
      </section>
    </main>
  );
}
