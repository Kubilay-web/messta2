"use client";

import { useSalarytypeStore } from "@/app/job-portal-store/salarytype";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function SalaryCreate() {
  const {
    name,
    setName,
    updatingSalarytype,
    setUpdatingSalarytype,
    createSalarytype,
    updateSalarytype,
    deleteSalarytype,
  } = useSalarytypeStore();

  return (
    <div className="my-5">
      <input
        type="text"
        value={updatingSalarytype ? updatingSalarytype.name : name}
        onChange={(e) =>
          updatingSalarytype
            ? setUpdatingSalarytype({
                ...updatingSalarytype,
                name: e.target.value,
              })
            : setName(e.target.value)
        }
        className="my-2 rounded border border-gray-300 p-2"
        style={{ outline: "none" }}
        placeholder="Salary Type Name"
      />

      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: updatingSalarytype ? "#17a2b8" : "green" }}
          className={`btn text-light rounded px-4 py-2`}
          onClick={(e) => {
            e.preventDefault();
            updatingSalarytype ? updateSalarytype() : createSalarytype();
          }}
        >
          {updatingSalarytype ? "Update" : "Create"}
        </button>

        {updatingSalarytype && (
          <>
            <button
              className="btn bg-danger text-light rounded px-3 py-2"
              onClick={(e) => {
                e.preventDefault();
                deleteSalarytype();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light rounded px-3 py-2"
              onClick={() => setUpdatingSalarytype(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
