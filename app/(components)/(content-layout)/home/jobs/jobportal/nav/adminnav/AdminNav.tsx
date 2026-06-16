"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminNav() {
  const pathname = usePathname();
  console.log(pathname);
  console.log(pathname === "/dashboard/job/job/admin");

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <>
      <nav className="nav justify-content-center m-3">
        <Link
          style={{
            color: pathname === "/dashboards/jobs/admin" ? "white" : "black",
            fontWeight: pathname === "/dashboards/jobs/admin" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin" ? "green" : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin"
        >
          Admin
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/industry" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/industry" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/industry"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin/industry"
        >
          Create industry
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/organization"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/organization"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/organization"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin/organization"
        >
          Add Organization
        </Link>

        <Link
          style={{
            color: pathname === "/dashboards/jobs/admin/team" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/team" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/team"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin/team"
        >
          Team size
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/country" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/country" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/country"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin/country"
        >
          Add Country
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/state" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/state" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/state"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          className="nav-link"
          href="/dashboards/jobs/admin/state"
        >
          Add State
        </Link>

        <Link
          style={{
            color: pathname === "/dashboards/jobs/admin/city" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/city" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/city"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/city"
          className="nav-link"
        >
          Add City
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/language" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/language" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/language"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/language"
          className="nav-link"
        >
          Add Language
        </Link>
        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/skill" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/skill" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/skill"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/skill"
          className="nav-link"
        >
          Add Skill
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/profession"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/profession"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/profession"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/profession"
          className="nav-link"
        >
          Add Profession
        </Link>
      </nav>

      <nav className="nav justify-content-center m-3">
        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/pricing" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/pricing" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/pricing"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/pricing"
          className="nav-link"
        >
          Add Pricing
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/paymentsettings"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/paymentsettings"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/paymentsettings"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/paymentsettings"
          className="nav-link"
        >
          Payment Settings
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/sitesettings"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/sitesettings"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/sitesettings"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/sitesettings"
          className="nav-link"
        >
          Site Settings
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/orders" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/orders" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/orders"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/orders"
          className="nav-link"
        >
          Orders
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/jobcategories"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/jobcategories"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/jobcategories"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/jobcategories"
          className="nav-link"
        >
          Job_categories
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/education" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/education" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/education"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/education"
          className="nav-link"
        >
          education
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/jobtype" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/jobtype" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/jobtype"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/jobtype"
          className="nav-link"
        >
          Jobtype
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/salarytype"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/salarytype"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/salarytype"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/salarytype"
          className="nav-link"
        >
          Salarytype
        </Link>

        <Link
          style={{
            color: pathname === "/dashboards/jobs/admin/tag" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/tag" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/tag" ? "green" : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/tag"
          className="nav-link"
        >
          tag
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/jobrole" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/jobrole" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/jobrole"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/jobrole"
          className="nav-link"
        >
          job role
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/jobexperience"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/jobexperience"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/jobexperience"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/jobexperience"
          className="nav-link"
        >
          job experience
        </Link>

        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/jobs/create"
                ? "white"
                : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/jobs/create"
                ? "bold"
                : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/jobs/create"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/jobs/create"
          className="nav-link"
        >
          Job Create
        </Link>
      </nav>

      <nav className="nav justify-content-center m-3">
        <Link
          style={{
            color:
              pathname === "/dashboards/jobs/admin/alljobs" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/alljobs" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/alljobs"
                ? "green"
                : "transparent",
            // Add any additional styles for the active state here
          }}
          href="/dashboards/jobs/admin/alljobs"
          className="nav-link"
        >
          alljobs
        </Link>

        {/* Admin Links */}
        <Link
          className="nav-link"
          style={{
            color: pathname === "/dashboards/jobs/admin/blog" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/blog" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/blog"
                ? "green"
                : "transparent",
          }}
          href="/dashboards/jobs/admin/blog"
        >
          Add blog
        </Link>

        <Link
          className="nav-link"
          style={{
            color:
              pathname === "/dashboards/jobs/admin/blogs" ? "white" : "black",
            fontWeight:
              pathname === "/dashboards/jobs/admin/blogs" ? "bold" : "normal",
            backgroundColor:
              pathname === "/dashboards/jobs/admin/blogs"
                ? "green"
                : "transparent",
          }}
          href="/dashboards/jobs/admin/blogs"
        >
          blogs
        </Link>
      </nav>
    </>
  );
}
