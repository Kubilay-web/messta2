// import db from "@/app/lib/db";
// import { cn } from "@/app/lib/utils";
// import { JobFilterValues } from "../lib/validation";
// import { Jobs, db } from "@db/client";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import JobListItem from "./JobListItem";

// interface JobResultsProps {
//   filterValues: JobFilterValues;
//   page?: number;
// }

// export default async function JobResults({
//   filterValues = { q: undefined, type: undefined, location: undefined },
//   page = 1,
// }: JobResultsProps) {
//   const { q, type, location } = filterValues;

//   const jobsPerPage = 6;
//   const skip = (page - 1) * jobsPerPage;

//   // Metin araması
//   const searchString = q
//     ?.split(" ")
//     .filter((word) => word.length > 0)
//     .join(" & ");

//   const searchFilter: db.JobsWhereInput = searchString
//     ? {
//         OR: [
//           { title: { search: searchString } },
//           { company: { name: { search: searchString } } },
//           { job_type: { name: { search: searchString } } },
//           { city: { name: { search: searchString } } },
//           { state: { name: { search: searchString } } },
//           { country: { name: { search: searchString } } },
//         ],
//       }
//     : {};

//   // Filtreleme
//   const where: db.JobsWhereInput = {
//     AND: [
//       searchFilter,
//       type ? { job_type: { name: type } } : {},
//       location
//         ? {
//             OR: [
//               { city: { name: location } },
//               { state: { name: location } },
//               { country: { name: location } },
//             ],
//           }
//         : {},
//       { status: "active" }, // veya approved/published duruma göre değiştir
//     ],
//   };

//   const jobsPromise = db.jobs.findMany({
//     where,
//     include: {
//       company: true,
//       job_type: true,
//       city: true,
//       state: true,
//       country: true,
//     },
//     orderBy: { createdAt: "desc" },
//     skip,
//     take: jobsPerPage,
//   });

//   const countPromise = db.jobs.count({ where });

//   const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

//   return (
//     <div className="grow space-y-4">
//       {jobs.length === 0 && (
//         <p className="m-auto text-center">
//           No jobs found. Try adjusting your search filters.
//         </p>
//       )}
//       {jobs.map((job) => (
//         <Link key={job.id} href={`/apps/jobportal/job/jobs/${job.slug}`} className="block">
//           <JobListItem job={job} />
//         </Link>
//       ))}
//       {jobs.length > 0 && (
//         <Pagination
//           currentPage={page}
//           totalPages={Math.ceil(totalResults / jobsPerPage)}
//           filterValues={filterValues}
//         />
//       )}
//     </div>
//   );
// }

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   filterValues: JobFilterValues;
// }

// function Pagination({
//   currentPage,
//   totalPages,
//   filterValues: { q, type, location },
// }: PaginationProps) {
//   function generatePageLink(page: number) {
//     const searchParams = new URLSearchParams({
//       ...(q && { q }),
//       ...(type && { type }),
//       ...(location && { location }),
//       page: page.toString(),
//     });

//     return `/?${searchParams.toString()}`;
//   }

//   return (
//     <div className="flex justify-between">
//       <Link
//         href={generatePageLink(currentPage - 1)}
//         className={cn(
//           "flex items-center gap-2 font-semibold",
//           currentPage <= 1 && "invisible"
//         )}
//       >
//         <ArrowLeft size={16} />
//         Previous page
//       </Link>
//       <span className="font-semibold">
//         Page {currentPage} of {totalPages}
//       </span>
//       <Link
//         href={generatePageLink(currentPage + 1)}
//         className={cn(
//           "flex items-center gap-2 font-semibold",
//           currentPage >= totalPages && "invisible"
//         )}
//       >
//         Next page
//         <ArrowRight size={16} />
//       </Link>
//     </div>
//   );
// }











import db from "@/app/lib/db";
import { cn } from "@/app/lib/utils";
import { JobFilterValues } from "../lib/validation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export default async function JobResults({
  filterValues = { q: undefined, type: undefined, location: undefined },
  page = 1,
}: JobResultsProps) {
  const { q, type, location } = filterValues;

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  // Metin araması
  const searchFilter = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { company: { name: { contains: q, mode: "insensitive" } } },
          { job_type: { name: { contains: q, mode: "insensitive" } } },
          { city: { name: { contains: q, mode: "insensitive" } } },
          { state: { statename: { contains: q, mode: "insensitive" } } },
          { country: { name: { contains: q, mode: "insensitive" } } },
        ],
      }
    : {};

  // Filtreleme
  const where = {
    AND: [
      searchFilter,
      type ? { job_type: { name: type } } : {},
      location
        ? {
            OR: [
              { city: { name: location } },
              { state: { statename: location } },
              { country: { name: location } },
            ],
          }
        : {},
      { status: "active" },
    ],
  };

  const jobsPromise = db.jobs.findMany({
    where,
    include: {
      company: true,
      job_type: true,
      city: true,
      state: true,
      country: true,
      job_category: true,
      job_role: true,
      job_experience: true,
      education: true,
      salary_type: true,
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: jobsPerPage,
  });

  const countPromise = db.jobs.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/apps/jobportal/job/jobs/${job.slug}`}
          className="block"
        >
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible"
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible"
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}