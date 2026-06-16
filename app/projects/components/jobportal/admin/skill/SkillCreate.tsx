"use client";

import { useSkillStore } from "@/app/job-portal-store/skill";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function SkillCreate() {
  const {
    name,
    setName,
    updatingSkill,
    setUpdatingSkill,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkillStore();

  return (
    <div className="my-5">
      {/* Skill Name Input */}
      <input
        type="text"
        value={updatingSkill ? updatingSkill.name : name}
        onChange={(e) =>
          updatingSkill
            ? setUpdatingSkill({ ...updatingSkill, name: e.target.value })
            : setName(e.target.value)
        }
        placeholder="Enter Skill Name"
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-3">
        {/* Create or Update Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            updatingSkill ? updateSkill() : createSkill();
          }}
          className={`px-5 py-2 rounded-lg text-white ${
            updatingSkill ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-200`}
        >
          {updatingSkill ? "Update" : "Create"}
        </button>

        {/* Delete and Clear Buttons */}
        {updatingSkill && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteSkill();
              }}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>

            <button
              onClick={() => setUpdatingSkill(null)}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200 flex items-center justify-center"
            >
              <MdOutlineClear size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
