"use client";
import React, { useEffect, useState, Fragment } from "react";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  slug:string;
  vacancies: number;
  status: string;
  createdAt: string;
  expiresOn?: string;
  company?: { name: string; logoSecureUrl?: string };
  job_category?: { name: string };
  job_role?: { name: string };
  job_type?: { name: string };
}

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Fragment>
      <Seo title="Jobs List" />
      <Pageheader
        Heading="Jobs List"
        breadcrumbs={["Apps", "Jobs"]}
        currentpage="Jobs List"
      />

      <div className="grid grid-cols-12">
        <div className="xl:col-span-12 col-span-12">
          <div className="box overflow-hidden">
            <div className="box-header justify-between">
              <div className="box-title">All Jobs List</div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/apps/jobs/job-post/"
                  className="ti-btn btn-wave ti-btn-primary !m-0 ti-btn-sm"
                >
                  <i className="ri-add-line align-middle"></i>Post Job
                </Link>
              </div>
            </div>

            <div className="box-body !p-0">
              {loading ? (
                <p className="p-4">Loading...</p>
              ) : (
                <div className="table-responsive">
                  <Spktables
                    showCheckbox={true}
                    Customcheckclass="!ps-6"
                    tableClass="ti-custom-table ti-custom-table-head w-full jobs-list-table"
                    header={[
                      { title: "Job Title" },
                      { title: "Company" },
                      { title: "Vacancies" },
                      { title: "Status" },
                      { title: "Job Type" },
                      { title: "Posted Date" },
                      { title: "Action" },
                    ]}
                  >
                    {jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-t hover:bg-gray-200 dark:hover:bg-light"
                      >
                        <td className="!ps-6">{job.title}</td>
                        <td>{job.company?.name ?? "Unknown"}</td>
                        <td>{job.vacancies}</td>
                        <td>{job.status}</td>
                        <td>{job.job_type?.name ?? "-"}</td>
                        <td>
                          {new Date(job.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td>
                          <Link
                            href={`/home/jobs/job-details/${job.slug}`}
                            className="ti-btn ti-btn-soft-primary ti-btn-sm"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </Spktables>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobsList;
