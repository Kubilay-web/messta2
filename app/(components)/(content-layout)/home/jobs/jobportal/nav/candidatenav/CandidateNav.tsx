"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function CandidateNav() {
  const pathname = usePathname();
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);
  return (
    <>
      <nav className="nav justify-content-center mb-3">
        <Link
          className="nav-link"
          style={{
            color: pathname === "/dashboard/job/candidate" ? "white" : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate" ? "green" : "transparent",
          }}
          href="/dashboard/job/candidate"
        >
          Candidate
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/candidate/my-profile"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate/my-profile"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate/my-profile"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/candidate/my-profile"
        >
          My Profile
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/candidate/myjobs"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate/myjobs"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate/myjobs"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/candidate/myjobs"
        >
          Applied Jobs
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/candidate/savedjobs"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate/savedjobs"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate/savedjobs"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/candidate/savedjobs"
        >
          Saved Jobs
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/candidate/deleteaccount"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate/deleteaccount"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate/deleteaccount"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/candidate/deleteaccount"
        >
          Delete Account
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboard/job/candidate/logout"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboard/job/candidate/logout"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboard/job/candidate/logout"
                ? "green"
                : "transparent",
          }}
          href="/dashboard/job/candidate/logout"
        >
          Logout
        </Link>
      </nav>
    </>
  );
}
