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
            ? setUpdatingEducation({
                ...updatingEducation,
                name: e.target.value,
              })
            : setName(e.target.value)
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />

      {/* Button Section */}
      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingEducation ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingEducation ? updateEducation() : createEducation();
          }}
        >
          {updatingEducation ? "Update" : "Create"}
        </button>

        {updatingEducation && (
          <>
            {/* Delete Education */}
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteEducation();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            {/* Clear Update */}
            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingEducation(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
