"use client";

import { useSession } from "@/app/SessionProvider";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/(components)/(authentication-layout)/authentication/actions";

export default function TopNav() {
  const { user } = useSession();
  const queryClient = useQueryClient();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Companies", href: "/home/jobs/search-company" },
    { name: "Candidates", href: "/home/jobs/candidates" },
    { name: "Search Jobs", href: "/home/jobs/jobs-list" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 md:px-10 py-3 flex flex-wrap md:flex-nowrap items-center justify-between  top-0 z-50">
      {/* Logo / Home */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg md:text-xl font-bold text-blue-600">
          JobPortal
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-3 mt-2 md:mt-0">
        {user ? (
          <>
            {user?.rolejob === "CANDIDATE" && (
              <Link
                href={`/dashboard/job/candidate`}
                className="px-3 py-1 rounded-lg bg-green-100 text-blue-700 hover:bg-green-200 transition"
              >
                {user?.username} ({user?.rolejob})
              </Link>
            )}

            {user?.rolejob === "ADMIN" && (
              <Link
                href={`/dashboards/jobs/admin`}
                className="px-3 py-1 rounded-lg bg-green-100 text-blue-700 hover:bg-green-200 transition"
              >
                {user?.username} ({user?.rolejob})
              </Link>
            )}

            {user?.rolejob === "COMPANY" && (
              <Link
                href={`/dashboard/job/company`}
                className="px-3 py-1 rounded-lg bg-green-100 text-blue-700 hover:bg-green-200 transition"
              >
                {user?.username} ({user?.rolejob})
              </Link>
            )}

            <button
              onClick={() => {
                queryClient.clear();
                logout();
              }}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        {/* Buraya istersen hamburger menü eklenebilir */}
      </div>
    </nav>
  );
}
