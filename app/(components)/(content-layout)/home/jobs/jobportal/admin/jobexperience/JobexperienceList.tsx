"use client";

import { useEffect, useState } from "react";
import { useJobexperienceStore } from "@/app/job-portal-store/jobexperiences";
import { FaRegEdit } from "react-icons/fa";

export default function JobExperienceList() {
  const { fetchJobexperience, jobexperience, setUpdatingJobexperience } =
    useJobexperienceStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobexperience();
  }, [fetchJobexperience]);

  const filteredJobs = jobexperience.filter((job) =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search job experience"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: "80px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light p-1"
                    onClick={() => setUpdatingJobexperience(job)}
                    aria-label={`Edit ${job.name}`}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No job experience found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
