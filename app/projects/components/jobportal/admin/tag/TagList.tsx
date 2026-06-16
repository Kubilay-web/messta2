"use client";
import { useEffect, useState } from "react";
import { useTagStore } from "@/app/job-portal-store/tag";
import { FaRegEdit } from "react-icons/fa";

export default function TagList() {
  const { fetchTags, tags, setUpdatingTag } = useTagStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const filteredTags = tags?.filter((c) =>
    c?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b border-gray-200">Name</th>
              <th className="text-left p-3 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTags.length > 0 ? (
              filteredTags.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b border-gray-200">{c.name}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      onClick={() => setUpdatingTag(c)}
                      className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-3 text-center text-gray-500">
                  No tags found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
