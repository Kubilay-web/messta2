"use client";

import { useEffect, useState } from "react";
import { useProfessionStore } from "@/app/job-portal-store/profession";
import { FaRegEdit } from "react-icons/fa";

export default function ProfessionList() {
  const { fetchProfessions, professions, setUpdatingProfession } =
    useProfessionStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProfessions();
  }, []);

  const filteredProfessions = professions?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search profession"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessions.length > 0 ? (
              filteredProfessions.map((p) => (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setUpdatingProfession(p)}
                      className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
                    >
                      <FaRegEdit className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No profession found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
