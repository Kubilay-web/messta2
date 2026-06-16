"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/(auth)/actions";
import { useEffect } from "react";

// Role-based redirection in Next.js can be implemented to
// ensure that users are directed to appropriate pages based
//  on their roles or permissions. This is commonly done
//   in web

export default function TopNav() {
  const { user } = useSession();
  const queryClient = useQueryClient(); // Burada useQueryClient doğru şekilde kullanılıyor

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <>
      <nav className="nav justify-content-between shadow">
        <Link className="nav-link mt-2" href="/">
          Home
        </Link>
        <div className="d-flex align-items-center">
          <Link className="nav-link" href="/home/jobs/search-company">
            Companies
          </Link>
          <Link className="nav-link" href="/home/jobs/candidates">
            Candidates
          </Link>
          <Link className="nav-link" href="/home/jobs/jobs-list">
            Search jobs
          </Link>
          <Link className="nav-link" href="/pricing">
            Pricing
          </Link>

          {user ? (
            <>
              {user?.rolejob === "CANDIDATE" ? (
                <Link className="nav-link" href={`/dashboard/job/candidate`}>
                  {user?.username}({user?.rolejob})
                </Link>
              ) : (
                ""
              )}

              {user?.rolejob === "ADMIN" ? (
                <Link className="nav-link" href={`/dashboards/jobs/admin`}>
                  {user?.username}({user?.rolejob})
                </Link>
              ) : (
                ""
              )}

              {user?.rolejob === "COMPANY" ? (
                <Link className="nav-link" href={`/dashboard/job/company`}>
                  {user?.username}({user?.rolejob})
                </Link>
              ) : (
                ""
              )}

              <a
                className="nav-link pointer-job"
                onClick={() => {
                  queryClient.clear();
                  logout();
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="nav-link" href="/login">
                Login
              </Link>
              <Link className="nav-link" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
