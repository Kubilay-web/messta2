"use client";

import { useTeamStore } from "@/app/job-portal-store/team";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function TeamList() {
  const { fetchTeams, teams, setUpdatingTeam } = useTeamStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search team"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Team Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left font-medium text-gray-700">Name</th>
              <th className="py-3 px-5 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <tr
                  key={team.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-5">{team.name}</td>
                  <td className="py-3 px-5">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center justify-center transition-colors"
                      onClick={() => setUpdatingTeam(team)}
                    >
                      <FaRegEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No team found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
