"use client";

import { useProfessionStore } from "@/app/job-portal-store/profession";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function ProfessionCreate() {
  const {
    name,
    setName,
    updatingProfession,
    setUpdatingProfession,
    createProfession,
    updateProfession,
    deleteProfession,
  } = useProfessionStore();

  return (
    <div className="my-5 space-y-4">
      <input
        type="text"
        value={updatingProfession ? updatingProfession.name : name}
        onChange={(e) =>
          updatingProfession
            ? setUpdatingProfession({
                ...updatingProfession,
                name: e.target.value,
              })
            : setName(e.target.value)
        }
        placeholder="Enter profession name"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            updatingProfession ? updateProfession() : createProfession();
          }}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
            updatingProfession ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {updatingProfession ? "Update" : "Create"}
        </button>

        {updatingProfession && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteProfession();
              }}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>

            <button
              onClick={() => setUpdatingProfession(null)}
              className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center"
            >
              <MdOutlineClear size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
