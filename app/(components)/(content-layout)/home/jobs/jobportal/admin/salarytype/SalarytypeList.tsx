"use client";
import { useEffect, useState } from "react";
import { useSalarytypeStore } from "@/app/job-portal-store/salarytype";
import { FaRegEdit } from "react-icons/fa";

export default function SalaryList() {
  const {
    salarytypes,
    fetchSalarytypes,
    setUpdatingSalarytype,
    updatingSalarytype,
  } = useSalarytypeStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSalarytypes();
  }, [fetchSalarytypes]);

  const filteredSkill = salarytypes?.filter((c) =>
    c?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search salary type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkill.length > 0 ? (
            filteredSkill.map((c) => (
              <tr key={c.id}>
                <td>{c.name} </td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingSalarytype(c)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No salary type found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
