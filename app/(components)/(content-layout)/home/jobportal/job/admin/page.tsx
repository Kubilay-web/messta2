import JobListItem from "../../components/JobListItem";
import H1 from "../../components/ui/h1";
import db from "@/app/lib/db";
import Link from "next/link";
import { JobStatus } from "@prisma/client"; // enum

export default async function AdminPage() {
  const unapprovedJobs = await db.jobs.findMany({
    where: { status: JobStatus.pending }, // approved yerine pending kontrolü
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Pending jobs:</h2>
        {unapprovedJobs.length > 0 ? (
          unapprovedJobs.map((job) => (
            <Link
              key={job.id}
              href={`/apps/jobportal/job/admin/jobs/${job.slug}`}
              className="block"
            >
              <JobListItem job={job} />
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground">No Pending jobs</p>
        )}
      </section>
    </main>
  );
}
