"use client";

import { useJobexperienceStore } from "@/app/job-portal-store/jobexperiences";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function JobExperienceCreate() {
  const {
    name,
    setName,
    updatingJobexperience,
    setUpdatingJobexperience,
    createJobexperience,
    updateJobexperience,
    deleteJobexperience,
  } = useJobexperienceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (updatingJobexperience) {
      setUpdatingJobexperience({ ...updatingJobexperience, name: value });
    } else {
      setName(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatingJobexperience) {
      await updateJobexperience();
    } else {
      await createJobexperience();
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteJobexperience();
  };

  return (
    <form className="my-5 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter job experience name"
        value={updatingJobexperience ? updatingJobexperience.name : name}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white font-medium shadow ${
            updatingJobexperience ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {updatingJobexperience ? "Update" : "Create"}
        </button>

        {updatingJobexperience && (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow transition"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>

            <button
              type="button"
              onClick={() => setUpdatingJobexperience(null)}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium shadow transition"
            >
              <MdOutlineClear size={20} />
            </button>
          </>
        )}
      </div>
    </form>
  );
}
