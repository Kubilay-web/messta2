import companyLogoPlaceholder from "@/public/assets/company-logo-placeholder.png";
import { formatMoney, relativeDate } from "../lib/utils";
import { Jobs, Company, Jobtype, City, CountryJob } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

type JobWithRelations = Jobs & {
  company?: Company | null;
  job_type?: Jobtype | null;
  city?: City | null;
  country?: CountryJob | null;
};

interface JobListItemProps {
  job: JobWithRelations;
}

export default function JobListItem({ job }: JobListItemProps) {
  const {
    title,
    company,
    job_type,
    city,
    country,
    min_salary,
    max_salary,
    createdAt,
  } = job;

  const companyName = company?.name || "Şirket Belirtilmemiş";
  const companyLogoUrl = company?.logoSecureUrl || companyLogoPlaceholder;
  const typeName = job_type?.name || "Belirtilmemiş";
  const location = city?.name || country?.name || "Lokasyon Yok";
  const salary =
    min_salary && max_salary
      ? `${formatMoney(min_salary)} - ${formatMoney(max_salary)}`
      : "Maaş Belirtilmemiş";

  return (
    <article className="flex gap-3 rounded-lg border-4 p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {typeName}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {location}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {salary}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{typeName}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
