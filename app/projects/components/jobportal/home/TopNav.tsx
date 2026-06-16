"use client";

import Link from "next/link";
import { useSession } from "@/app/SessionProvider";
import { logout } from "@/app/(components)/(authentication-layout)/authentication/actions";
import { useQueryClient } from "@tanstack/react-query";
import "./style.css"

export default function TopNav() {
  const { user } = useSession();
  const queryClient = useQueryClient();

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 nav-job-container">
        <div className="flex justify-between h-16 items-center nav-job">
          {/* Left Links */}
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-500 font-medium">
              Home
            </Link>
            <Link href="/home/jobs/search-company" className="text-gray-700 hover:text-blue-500 font-medium">
              Companies
            </Link>
            <Link href="/home/jobs/candidates" className="text-gray-700 hover:text-blue-500 font-medium">
              Candidates
            </Link>
            <Link href="/home/jobs/jobs-list" className="text-gray-700 hover:text-blue-500 font-medium">
              Search Jobs
            </Link>
            <Link href="/home/jobs/pricing" className="text-gray-700 hover:text-blue-500 font-medium">
              Pricing
            </Link>
          </div>

          {/* Right User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.rolejob === "CANDIDATE" && (
                  <Link
                    href={`/dashboard/job/candidate`}
                    className="text-gray-700 hover:text-blue-500 font-medium"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user.rolejob === "ADMIN" && (
                  <Link
                    href={`/dashboards/jobs/admin`}
                    className="text-gray-700 hover:text-blue-500 font-medium"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user.rolejob === "COMPANY" && (
                  <Link
                    href={`/dashboard/job/company`}
                    className="text-gray-700 hover:text-blue-500 font-medium"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}

                <button
                  onClick={() => {
                    queryClient.clear();
                    logout();
                  }}
                  className="text-gray-700 hover:text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-500 font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-500 font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
