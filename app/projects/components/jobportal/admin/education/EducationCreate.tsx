"use client";

import { useEducationStore } from "@/app/job-portal-store/education";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function EducationCreate() {
  const {
    name,
    setName,
    updatingEducation,
    setUpdatingEducation,
    createEducation,
    updateEducation,
    deleteEducation,
  } = useEducationStore();

  return (
    <div className="my-5">
      {/* Education Input Field */}
      <input
        type="text"
        placeholder="Education Name"
        value={updatingEducation ? updatingEducation?.name : name}
        onChange={(e) =>
          updatingEducation
            ? setUpdatingEducation({ ...updatingEducation, name: e.target.value })
            : setName(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Button Section */}
      <div className="flex flex-wrap gap-3">
        {/* Create / Update Button */}
        <button
          className={`rounded-lg px-4 py-2 text-white shadow ${
            updatingEducation ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
          onClick={(e) => {
            e.preventDefault();
            updatingEducation ? updateEducation() : createEducation();
          }}
        >
          {updatingEducation ? "Update" : "Create"}
        </button>

        {/* Delete Button */}
        {updatingEducation && (
          <button
            className="flex items-center rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              deleteEducation();
            }}
          >
            <MdOutlineDeleteOutline className="mr-1" />
            Delete
          </button>
        )}

        {/* Clear Button */}
        {updatingEducation && (
          <button
            className="flex items-center rounded-lg bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600 transition-colors"
            onClick={() => setUpdatingEducation(null)}
          >
            <MdOutlineClear className="mr-1" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
