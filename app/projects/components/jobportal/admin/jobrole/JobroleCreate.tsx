"use client";

import { useJobroleStore } from "@/app/job-portal-store/jobrole";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function JobroleCreate() {
  const {
    name,
    setName,
    updatingJobrole,
    setUpdatingJobrole,
    createJobrole,
    updateJobrole,
    deleteJobrole,
  } = useJobroleStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (updatingJobrole) {
      setUpdatingJobrole({ ...updatingJobrole, name: value });
    } else {
      setName(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatingJobrole ? updateJobrole() : createJobrole();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteJobrole();
  };

  const handleClear = () => {
    setUpdatingJobrole(null);
  };

  return (
    <div className="my-5">
      <input
        type="text"
        placeholder="Job Role"
        value={updatingJobrole ? updatingJobrole.name : name}
        onChange={handleInputChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          className={`flex-1 min-w-[100px] rounded-lg px-4 py-2 text-white shadow ${
            updatingJobrole ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {updatingJobrole ? "Update" : "Create"}
        </button>

        {updatingJobrole && (
          <>
            <button
              className="flex-1 min-w-[100px] rounded-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2 shadow transition"
              onClick={handleDelete}
            >
              <MdOutlineDeleteOutline className="inline-block mr-2" />
              Delete
            </button>

            <button
              className="flex-1 min-w-[100px] rounded-lg bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 shadow transition"
              onClick={handleClear}
            >
              <MdOutlineClear className="inline-block mr-2" />
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
