"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CompanyNav() {
  const pathname = usePathname();
  return (
    <>
      <nav className="nav justify-content-center mb-3">
        {/* Company Links */}
        <Link
          className="nav-link"
          style={{
            color: pathname === "/dashboard/job/company" ? "white" : "black",
            fontWeight:
              pathname === "/dashboard/job/company" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboard/job/company" ? "green" : "transparent",
          }}
          href="/dashboard/job/company"
        >
          Company
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/company/profile" ? "white" : "black",
            fontWeight:
              pathname === "/dashboard/job/company/profile" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboard/job/company/profile"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/company/profile"
        >
          Profile
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/company/job" ? "white" : "black",
            fontWeight:
              pathname === "/dashboard/job/company/job" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboard/job/company/job"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/company/job"
        >
          Create Jobs
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/company/companyjob"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/company/companyjob"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/company/companyjob"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/company/companyjob"
        >
          All Jobs
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/company/orders" ? "white" : "black",
            fontWeight:
              pathname === "/dashboard/job/company/orders" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboard/job/company/orders"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/company/orders"
        >
          Orders
        </Link>
      </nav>
    </>
  );
}
