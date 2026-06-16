"use client";

import { useEffect, useState } from "react";
import { useJobroleStore } from "@/app/job-portal-store/jobrole";
import { FaRegEdit } from "react-icons/fa";

export default function JobroleList() {
  const { fetchJobrole, jobrole, setUpdatingJobrole } = useJobroleStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobrole();
  }, [fetchJobrole]);

  const filteredJobroles = jobrole?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search job role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Job Role List Table */}
      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredJobroles && filteredJobroles.length > 0 ? (
              filteredJobroles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{role.name}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => setUpdatingJobrole(role)}
                      className="flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-2 transition"
                      aria-label={`Edit ${role.name}`}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No job roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
