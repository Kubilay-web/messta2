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
    <div className="my-5">
      <input
        type="text"
        value={updatingJobtype ? updatingJobtype.name : name}
        onChange={handleChange}
        className="form-control my-2 p-2"
        placeholder="Enter job type name"
        style={{ outline: "none" }}
      />

      <div className="d-flex justify-content-between mt-2">
        <button
          className={`btn text-light ${updatingJobtype ? "bg-info" : "bg-success"}`}
          onClick={handleSubmit}
        >
          {updatingJobtype ? "Update" : "Create"}
        </button>

        {updatingJobtype && (
          <div className="d-flex gap-2">
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteJobtype();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>
            <button
              className="btn text-light bg-secondary"
              onClick={handleClear}
            >
              <MdOutlineClear />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
