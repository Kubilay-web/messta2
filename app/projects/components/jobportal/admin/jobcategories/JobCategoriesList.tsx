"use client";

import { useEffect, useState } from "react";
import { useJobcategoryStore } from "@/app/job-portal-store/jobcategories";
import { FaRegEdit } from "react-icons/fa";
import IconPicker from "react-icons-picker";

export default function JobCategoryList() {
  const { jobcategories, setUpdatingJobcategory, fetchJobcategories } =
    useJobcategoryStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobcategories();
  }, [fetchJobcategories]);

  const filteredJobcategories = jobcategories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Job Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredJobcategories.length > 0 ? (
              filteredJobcategories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{c.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <IconPicker
                        onClick={() => setUpdatingJobcategory(c)}
                        value={c.icon}
                        color={true}
                        size={32}
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white shadow hover:bg-blue-600"
                      onClick={() => setUpdatingJobcategory(c)}
                      aria-label={`Edit ${c.name}`}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No job categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
