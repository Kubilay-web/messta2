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
    <div className="my-5 space-y-4">
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
        className="w-full rounded border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Salary Type Name"
      />

      <div className="flex flex-wrap gap-3">
        <button
          className={`text-white rounded px-5 py-2 transition-colors duration-200 ${
            updatingSalarytype ? "bg-teal-500 hover:bg-teal-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
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
              className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                deleteSalarytype();
              }}
            >
              <MdOutlineDeleteOutline className="inline-block" />
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition-colors duration-200"
              onClick={() => setUpdatingSalarytype(null)}
            >
              <MdOutlineClear className="inline-block" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
