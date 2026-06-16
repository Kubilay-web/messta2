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

  // local state icon seçimi için (react-fa-icon-picker gereği)
  const [selectedIcon, setSelectedIcon] = React.useState<string>(
    icon || updatingJobcategory?.icon || "FaUser",
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
    <div className="my-5">
      {updatingJobcategory && (
        <div
          className="pick mr-5"
          style={{ pointerEvents: "none", color: "red", fontSize: "12px" }}
        >
          <i
            className={`fa ${updatingJobcategory.icon}`}
            style={{ fontSize: 34 }}
          />
        </div>
      )}

      <input
        type="text"
        value={updatingJobcategory ? updatingJobcategory.name : name}
        onChange={(e) => {
          if (updatingJobcategory) {
            setUpdatingJobcategory({
              ...updatingJobcategory,
              name: e.target.value,
            });
          } else {
            setName(e.target.value);
          }
        }}
        className="my-2 p-2"
        style={{ outline: "none", width: "100%" }}
      />

      <div className="my-3">
        <IconPicker
          value={selectedIcon}
          onChange={handleIconChange}
          closeOnSelect={true}
          color="currentColor"
          // react-fa-icon-picker opsiyonları (örneğin arama)
          isSearchable={true}
          hideLabel={true}
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className={`btn bg-${updatingJobcategory ? "info" : "primary"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            if (updatingJobcategory) {
              updateJobcategory();
            } else {
              createJobcategory();
            }
          }}
        >
          {updatingJobcategory ? "Update" : "Create"}
        </button>

        {updatingJobcategory && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteJobcategory();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingJobcategory(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
