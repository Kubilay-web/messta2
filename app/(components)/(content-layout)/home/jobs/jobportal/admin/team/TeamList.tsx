"use client";

import { useTeamStore } from "@/app/job-portal-store/team";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function TeamList() {
  const { fetchTeams, teams, setUpdatingTeam } = useTeamStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search team"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingTeam(team)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No team found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
