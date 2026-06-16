"use client";

import { useTeamStore } from "@/app/job-portal-store/team";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function IndustryCreate() {
  const {
    name,
    setName,
    updatingTeam,
    setUpdatingTeam,
    createTeam,
    updateTeam,
    deleteTeam,
  } = useTeamStore();

  return (
    <div className="my-5">
      {/* Team Name Input */}
      <input
        type="text"
        placeholder="Team name"
        value={updatingTeam ? updatingTeam?.name : name}
        onChange={(e) =>
          updatingTeam
            ? setUpdatingTeam({ ...updatingTeam, name: e.target.value })
            : setName(e.target.value)
        }
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Create / Update Button */}
        <button
          className={`px-5 py-2 rounded-lg text-white font-medium transition-colors ${
            updatingTeam ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={(e) => {
            e.preventDefault();
            updatingTeam ? updateTeam() : createTeam();
          }}
        >
          {updatingTeam ? "Update" : "Create"}
        </button>

        {/* Delete Button */}
        {updatingTeam && (
          <button
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
            onClick={(e) => {
              e.preventDefault();
              deleteTeam();
            }}
          >
            <MdOutlineDeleteOutline size={20} />
          </button>
        )}

        {/* Clear Button */}
        {updatingTeam && (
          <button
            className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium"
            onClick={() => setUpdatingTeam(null)}
          >
            <MdOutlineClear size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
