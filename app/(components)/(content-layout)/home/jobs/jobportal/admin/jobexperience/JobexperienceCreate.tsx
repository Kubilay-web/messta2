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
    <div className="my-5">
      <input
        type="text"
        value={updatingJobexperience ? updatingJobexperience.name : name}
        onChange={handleChange}
        className="my-2 p-2"
        style={{ outline: "none" }}
        placeholder="Enter job experience name"
      />

      <div className="d-flex justify-content-between mt-2 gap-2">
        <button
          className="btn text-light"
          style={{
            backgroundColor: updatingJobexperience ? "#0dcaf0" : "green",
          }}
          onClick={handleSubmit}
        >
          {updatingJobexperience ? "Update" : "Create"}
        </button>

        {updatingJobexperience && (
          <>
            <button className="btn bg-danger text-light" onClick={handleDelete}>
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingJobexperience(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
