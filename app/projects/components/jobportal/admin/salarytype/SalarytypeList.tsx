"use client";
import { useEffect, useState } from "react";
import { useSalarytypeStore } from "@/app/job-portal-store/salarytype";
import { FaRegEdit } from "react-icons/fa";

export default function SalaryList() {
  const {
    salarytypes,
    fetchSalarytypes,
    setUpdatingSalarytype,
  } = useSalarytypeStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSalarytypes();
  }, [fetchSalarytypes]);

  const filteredSalary = salarytypes?.filter((c) =>
    c?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search salary type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 font-medium text-gray-700">Name</th>
              <th className="text-left p-3 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalary.length > 0 ? (
              filteredSalary.map((c) => (
                <tr
                  key={c.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                      onClick={() => setUpdatingSalarytype(c)}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-3 text-center text-gray-500">
                  No salary type found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
