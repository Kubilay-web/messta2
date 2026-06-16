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
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search job experience"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Job Experience Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{job.name}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setUpdatingJobexperience(job)}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 transition"
                      aria-label={`Edit ${job.name}`}
                    >
                      <FaRegEdit size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-500">
                  No job experience found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
