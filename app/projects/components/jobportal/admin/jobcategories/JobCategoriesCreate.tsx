"use client";

import * as React from "react";
import { IconPicker } from "react-fa-icon-picker";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { useJobcategoryStore } from "@/app/job-portal-store/jobcategories";

export default function JobCategoryCreate() {
  const {
    name,
    icon,
    setName,
    setIcon,
    updatingJobcategory,
    setUpdatingJobcategory,
    createJobcategory,
    updateJobcategory,
    deleteJobcategory,
  } = useJobcategoryStore();

  const [selectedIcon, setSelectedIcon] = React.useState<string>(
    icon || updatingJobcategory?.icon || "FaUser"
  );

  React.useEffect(() => {
    if (updatingJobcategory?.icon) {
      setSelectedIcon(updatingJobcategory.icon);
    } else if (icon) {
      setSelectedIcon(icon);
    }
  }, [icon, updatingJobcategory?.icon]);

  const handleIconChange = (newIcon: string) => {
    setSelectedIcon(newIcon);
    if (updatingJobcategory) {
      setUpdatingJobcategory({ ...updatingJobcategory, icon: newIcon });
    } else {
      setIcon(newIcon);
    }
  };

  return (
    <div className="my-5 space-y-4">
      {/* Preview selected icon when updating */}
      {updatingJobcategory && (
        <div className="text-red-500 text-center text-sm">
          <i className={`fa ${updatingJobcategory.icon}`} style={{ fontSize: 34 }} />
        </div>
      )}

      {/* Job Category Name Input */}
      <input
        type="text"
        placeholder="Job Category Name"
        value={updatingJobcategory ? updatingJobcategory.name : name}
        onChange={(e) => {
          if (updatingJobcategory) {
            setUpdatingJobcategory({ ...updatingJobcategory, name: e.target.value });
          } else {
            setName(e.target.value);
          }
        }}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
      />

      {/* Icon Picker */}
      <div>
        <IconPicker
          value={selectedIcon}
          onChange={handleIconChange}
          closeOnSelect={true}
          color="currentColor"
          isSearchable={true}
          hideLabel={true}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          className={`flex-1 rounded-lg px-4 py-2 font-semibold text-white shadow ${
            updatingJobcategory ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={(e) => {
            e.preventDefault();
            updatingJobcategory ? updateJobcategory() : createJobcategory();
          }}
        >
          {updatingJobcategory ? "Update" : "Create"}
        </button>

        {updatingJobcategory && (
          <>
            <button
              className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                deleteJobcategory();
              }}
            >
              <MdOutlineDeleteOutline className="inline-block mr-1" /> Delete
            </button>

            <button
              className="flex-1 rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white shadow hover:bg-gray-600"
              onClick={() => setUpdatingJobcategory(null)}
            >
              <MdOutlineClear className="inline-block mr-1" /> Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
