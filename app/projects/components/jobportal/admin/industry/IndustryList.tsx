"use client";

import { useIndustryStore } from "@/app/job-portal-store/industry";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function IndustryList() {
  const { industries, fetchIndustries, setUpdatingIndustry } = useIndustryStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  const filteredIndustry = industries?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search industry"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Industry Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredIndustry?.length > 0 ? (
              filteredIndustry.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{c.name}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => setUpdatingIndustry(c)}
                      className="flex items-center justify-center rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition-colors"
                      aria-label={`Edit ${c.name}`}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  No industries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
