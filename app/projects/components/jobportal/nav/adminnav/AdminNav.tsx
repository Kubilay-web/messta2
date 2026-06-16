"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksRow1 = [
  { href: "/dashboards/jobs/admin", label: "Admin" },
  { href: "/dashboards/jobs/admin/industry", label: "Create Industry" },
  { href: "/dashboards/jobs/admin/organization", label: "Add Organization" },
  { href: "/dashboards/jobs/admin/team", label: "Team Size" },
  { href: "/dashboards/jobs/admin/country", label: "Add Country" },
  { href: "/dashboards/jobs/admin/state", label: "Add State" },
  { href: "/dashboards/jobs/admin/city", label: "Add City" },
  { href: "/dashboards/jobs/admin/language", label: "Add Language" },
  { href: "/dashboards/jobs/admin/skill", label: "Add Skill" },
  { href: "/dashboards/jobs/admin/profession", label: "Add Profession" },
];

const linksRow2 = [
  { href: "/dashboards/jobs/admin/pricing", label: "Add Pricing" },
  { href: "/dashboards/jobs/admin/paymentsettings", label: "Payment Settings" },
  { href: "/dashboards/jobs/admin/sitesettings", label: "Site Settings" },
  { href: "/dashboards/jobs/admin/orders", label: "Orders" },
  { href: "/dashboards/jobs/admin/jobcategories", label: "Job Categories" },
  { href: "/dashboards/jobs/admin/education", label: "Education" },
  { href: "/dashboards/jobs/admin/jobtype", label: "Job Type" },
  { href: "/dashboards/jobs/admin/salarytype", label: "Salary Type" },
  { href: "/dashboards/jobs/admin/tag", label: "Tag" },
  { href: "/dashboards/jobs/admin/jobrole", label: "Job Role" },
  { href: "/dashboards/jobs/admin/jobexperience", label: "Job Experience" },
  { href: "/dashboards/jobs/admin/jobs/create", label: "Job Create" },
];

const linksRow3 = [
  { href: "/dashboards/jobs/admin/alljobs", label: "All Jobs" },
  { href: "/dashboards/jobs/admin/blog", label: "Add Blog" },
  { href: "/dashboards/jobs/admin/blogs", label: "Blogs" },
];

export default function AdminNav() {
  const pathname = usePathname();

  const renderLinks = (links: { href: string; label: string }[]) =>
    links.map((link) => {
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive
              ? "bg-blue-600 text-white font-bold"
              : "text-gray-700 hover:bg-green-200 hover:text-blue-800"
          }`}
        >
          {link.label}
        </Link>
      );
    });

  return (
    <div className="space-y-2 mt-5">
      <nav className="flex flex-wrap justify-center gap-2">{renderLinks(linksRow1)}</nav>
      <nav className="flex flex-wrap justify-center gap-2">{renderLinks(linksRow2)}</nav>
      <nav className="flex flex-wrap justify-center gap-2">{renderLinks(linksRow3)}</nav>
    </div>
  );
}
