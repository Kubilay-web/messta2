import JobPage from "../../../components/JobPage";
import { Button } from "../../../components/ui/button";
import db from "@/app/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getJob = cache(async (slug: string) => {
  const job = await db.jobs.findFirst({
    where: { slug: { equals: slug, mode: "insensitive" } }, // 👈 case-insensitive
  });
  if (!job) notFound();
  return job;
});

export async function generateStaticParams() {
  const jobs = await db.jobs.findMany({
    select: { slug: true },
  });
  return jobs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const job = await getJob(slug);

  return {
    title: job.title,
    description: job.description ?? "Job details",
  };
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const job = await getJob(slug);


  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
