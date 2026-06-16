"use client";
import { useEffect, useState } from "react";
import { useEducationStore } from "@/app/job-portal-store/education";
import { FaRegEdit } from "react-icons/fa";

export default function EducationList() {
  const { fetchEducation, educations, setUpdatingEducation } = useEducationStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const filteredEducation = educations?.filter((education) =>
    education?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Education"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Education List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEducation.length > 0 ? (
              filteredEducation.map((education) => (
                <tr key={education.id}>
                  <td className="px-6 py-4 text-gray-700">{education.name}</td>
                  <td className="px-6 py-4">
                    <button
                      className="flex items-center rounded-lg bg-blue-500 px-3 py-1 text-white shadow hover:bg-blue-600 transition-colors"
                      onClick={() => setUpdatingEducation(education)}
                    >
                      <FaRegEdit className="mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  No education found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
