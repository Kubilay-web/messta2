"use client";

import { useOrganizationStore } from "@/app/job-portal-store/organization";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function IndustryCreate() {
  const {
    name,
    setName,
    updatingOrganization,
    setUpdatingOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  } = useOrganizationStore();

  return (
    <div className="my-5 w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <input
        type="text"
        placeholder="Organization name"
        value={updatingOrganization ? updatingOrganization?.name : name}
        onChange={(e) =>
          updatingOrganization
            ? setUpdatingOrganization({
                ...updatingOrganization,
                name: e.target.value,
              })
            : setName(e.target.value)
        }
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="flex flex-wrap gap-3 justify-between">
        <button
          className={`flex-1 py-2 px-4 text-white font-semibold rounded-md ${
            updatingOrganization ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
          onClick={(e) => {
            e.preventDefault();
            updatingOrganization ? updateOrganization() : createOrganization();
          }}
        >
          {updatingOrganization ? "Update" : "Create"}
        </button>

        {updatingOrganization && (
          <div className="flex gap-3">
            <button
              className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault();
                deleteOrganization();
              }}
            >
              <MdOutlineDeleteOutline size={20} />
            </button>

            <button
              className="flex items-center justify-center p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
              onClick={() => setUpdatingOrganization(null)}
            >
              <MdOutlineClear size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
