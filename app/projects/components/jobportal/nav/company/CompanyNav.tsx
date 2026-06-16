"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CompanyNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/job/company", label: "Company" },
    { href: "/dashboard/job/company/profile", label: "Profile" },
    { href: "/dashboard/job/company/job", label: "Create Jobs" },
    { href: "/dashboard/job/company/companyjob", label: "All Jobs" },
    { href: "/dashboard/job/company/orders", label: "Orders" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 mb-6 mt-8">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-blue-700"
              }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
