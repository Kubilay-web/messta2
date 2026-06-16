import { formatMoney } from "../lib/utils";
import { Jobs } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Jobs & {
    company?: { name: string; logoUrl?: string };
    job_type?: { name: string };
    city?: { name: string };
    state?: { name: string };
    country?: { name: string };
  };
}

export default function JobPage({
  job: {
    title,
    description,
    company,
    applicationUrl,
    job_type,
    city,
    state,
    country,
    min_salary,
    max_salary,
    salary_mode,
  },
}: JobPageProps) {
  const companyName = company?.name || "Unknown Company";
  const companyLogoUrl = company?.logoUrl;
  const typeName = job_type?.name || "N/A";
  const location =
    city?.name || state?.name || country?.name || "Worldwide";

  const salary =
    salary_mode === "custom"
      ? min_salary
      : max_salary || min_salary || 0;

  const applicationLink = applicationUrl
    ? new URL(applicationUrl).origin
    : null;

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt={`${companyName} logo`}
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationLink ? (
                <Link
                  href={applicationLink}
                  className="text-blue-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground space-y-1">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {typeName}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>

      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
