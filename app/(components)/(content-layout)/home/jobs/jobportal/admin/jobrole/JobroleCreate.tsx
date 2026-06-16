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
        className="my-2 p-2"
        style={{ outline: "none" }}
      />
      <div className="d-flex justify-content-between">
        <button
          onClick={handleSubmit}
          className={`btn text-light ${updatingJobrole ? "bg-info" : "bg-success"}`}
        >
          {updatingJobrole ? "Update" : "Create"}
        </button>

        {updatingJobrole && (
          <>
            <button className="btn bg-danger text-light" onClick={handleDelete}>
              <MdOutlineDeleteOutline />
            </button>
            <button className="btn bg-success text-light" onClick={handleClear}>
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
