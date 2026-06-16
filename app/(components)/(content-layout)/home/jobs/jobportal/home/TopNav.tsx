"use client";

import Link from "next/link";
import { useSession } from "@/app/SessionProvider";
import { logout } from "@/app/(components)/(authentication-layout)/authentication/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function TopNav() {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            JobPortal
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/home/jobs/search-company" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Companies
            </Link>
            <Link href="/home/jobs/candidates" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Candidates
            </Link>
            <Link href="/home/jobs/jobs-list" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Search Jobs
            </Link>
            <Link href="/home/jobs/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Pricing
            </Link>

            {user ? (
              <>
                {user?.rolejob === "CANDIDATE" && (
                  <Link
                    href={`/dashboard/job/candidate`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user?.rolejob === "ADMIN" && (
                  <Link
                    href={`/dashboards/jobs/admin`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user?.rolejob === "COMPANY" && (
                  <Link
                    href={`/dashboard/job/company`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                <button
                  onClick={() => {
                    queryClient.clear();
                    logout();
                  }}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
              Home
            </Link>
            <Link href="/home/jobs/search-company" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
              Companies
            </Link>
            <Link href="/home/jobs/candidates" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
              Candidates
            </Link>
            <Link href="/home/jobs/jobs-list" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
              Search Jobs
            </Link>
            <Link href="/home/jobs/pricing" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
              Pricing
            </Link>

            {user ? (
              <>
                {user?.rolejob === "CANDIDATE" && (
                  <Link
                    href={`/dashboard/job/candidate`}
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user?.rolejob === "ADMIN" && (
                  <Link
                    href={`/dashboards/jobs/admin`}
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                {user?.rolejob === "COMPANY" && (
                  <Link
                    href={`/dashboard/job/company`}
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md"
                  >
                    {user.username} ({user.rolejob})
                  </Link>
                )}
                <button
                  onClick={() => {
                    queryClient.clear();
                    logout();
                  }}
                  className="block text-gray-700 hover:text-red-600 font-medium py-2 px-3 rounded-md w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
                  Login
                </Link>
                <Link href="/register" className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
