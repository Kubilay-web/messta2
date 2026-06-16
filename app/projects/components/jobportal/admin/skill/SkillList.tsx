"use client";

import { useEffect, useState } from "react";
import { useSkillStore } from "@/app/job-portal-store/skill";
import { FaRegEdit } from "react-icons/fa";

export default function SkillList() {
  const { fetchSkills, skills, setUpdatingSkill } = useSkillStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const filteredSkills = skills?.filter((c) =>
    c?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search skill"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Skill List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Name</th>
              <th className="text-left py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills && filteredSkills.length > 0 ? (
              filteredSkills.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{c.name}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => setUpdatingSkill(c)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 px-4 text-center text-gray-500">
                  No skill found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
