"use client";

import { useEffect, useState } from "react";
import { useJobtypeStore } from "@/app/job-portal-store/jobtype";
import { FaRegEdit } from "react-icons/fa";

export default function JobtypeList() {
  const { jobtypes, fetchJobtypes, setUpdatingJobtype } = useJobtypeStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobtypes();
  }, []);

  const filteredJobtypes = jobtypes.filter((j) =>
    j.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5 w-full max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-xl">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search job type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Jobtype Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobtypes.length > 0 ? (
              filteredJobtypes.map((jobtype) => (
                <tr key={jobtype.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b">{jobtype.name}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => setUpdatingJobtype(jobtype)}
                      className="flex items-center justify-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                      <FaRegEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  No job type found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
