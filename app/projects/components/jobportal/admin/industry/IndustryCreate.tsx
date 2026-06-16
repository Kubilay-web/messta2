"use client";

import { useIndustryStore } from "@/app/job-portal-store/industry";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export default function IndustryCreate() {
  const {
    name,
    setName,
    updatingIndustry,
    setUpdatingIndustry,
    createIndustry,
    updateIndustry,
    deleteIndustry,
  } = useIndustryStore();

  return (
    <div className="my-5">
      {/* Industry Input */}
      <input
        type="text"
        placeholder="Industry Name"
        value={updatingIndustry ? updatingIndustry?.name : name}
        onChange={(e) =>
          updatingIndustry
            ? setUpdatingIndustry({ ...updatingIndustry, name: e.target.value })
            : setName(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
      />

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (updatingIndustry) {
              updateIndustry();
              toast.success("Successfully updated");
            } else {
              createIndustry();
              toast.success("Successfully created");
            }
          }}
          className={`flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white shadow ${
            updatingIndustry ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {updatingIndustry ? "Update" : "Create"}
        </button>

        {updatingIndustry && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteIndustry();
                toast.success("Successfully deleted");
              }}
              className="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 transition-colors"
            >
              <MdOutlineDeleteOutline className="mr-1" />
              Delete
            </button>

            <button
              onClick={() => setUpdatingIndustry(null)}
              className="flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600 transition-colors"
            >
              <MdOutlineClear className="mr-1" />
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
