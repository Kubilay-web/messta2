"use client";

import { useJobtypeStore } from "@/app/job-portal-store/jobtype";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function JobtypeCreate() {
  const {
    name,
    setName,
    updatingJobtype,
    setUpdatingJobtype,
    createJobtype,
    updateJobtype,
    deleteJobtype,
  } = useJobtypeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (updatingJobtype) {
      setUpdatingJobtype({ ...updatingJobtype, name: value });
    } else {
      setName(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatingJobtype ? updateJobtype() : createJobtype();
  };

  const handleClear = () => setUpdatingJobtype(null);

  return (
    <div className="my-5 w-full max-w-md mx-auto p-5 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={updatingJobtype ? updatingJobtype.name : name}
          onChange={handleChange}
          placeholder="Enter job type name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-2 rounded-lg font-semibold text-white transition ${
              updatingJobtype ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {updatingJobtype ? "Update" : "Create"}
          </button>

          {updatingJobtype && (
            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  deleteJobtype();
                }}
                className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <MdOutlineDeleteOutline size={20} />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
              >
                <MdOutlineClear size={20} />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
