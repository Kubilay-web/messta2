"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CandidateNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Candidate", href: "/dashboards/jobs/candidate" },
    { name: "My Profile", href: "/dashboards/jobs/candidate/my-profile" },
    { name: "Applied Jobs", href: "/dashboards/jobs/candidate/myjobs" },
    { name: "Saved Jobs", href: "/dashboards/jobs/candidate/savedjobs" },
    { name: "Delete Account", href: "/dashboards/jobs/candidate/deleteaccount" },
    { name: "Logout", href: "/dashboards/jobs/candidate/logout" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 mt-5">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-blue-800"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
