"use client";

import { useTagStore } from "@/app/job-portal-store/tag";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function TagCreate() {
  const {
    name,
    setName,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTagStore();

  return (
    <div className="my-5">
      {/* Tag Input */}
      <input
        type="text"
        placeholder="Tag Name"
        value={updatingTag ? updatingTag.name : name}
        onChange={(e) =>
          updatingTag
            ? setUpdatingTag({ ...updatingTag, name: e.target.value })
            : setName(e.target.value)
        }
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Create / Update Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            updatingTag ? updateTag() : createTag();
          }}
          className={`px-5 py-2 rounded-md text-white ${
            updatingTag ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-200`}
        >
          {updatingTag ? "Update" : "Create"}
        </button>

        {/* Delete & Clear Buttons */}
        {updatingTag && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTag();
              }}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              <MdOutlineDeleteOutline className="inline-block text-lg" />
            </button>

            <button
              onClick={() => setUpdatingTag(null)}
              className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
            >
              <MdOutlineClear className="inline-block text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
