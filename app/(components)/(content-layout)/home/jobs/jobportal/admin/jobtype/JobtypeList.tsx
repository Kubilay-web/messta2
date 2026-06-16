"use client";

import { useEffect, useState } from "react";
import { useJobtypeStore } from "@/app/job-portal-store/jobtype";
import { FaRegEdit } from "react-icons/fa";

export default function JobtypeList() {
  const { jobtypes, fetchJobtypes, setUpdatingJobtype } = useJobtypeStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobtypes();
  }, []);

  const filteredJobtypes = jobtypes.filter((j) =>
    j.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search jobtype"
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
          {filteredJobtypes.length > 0 ? (
            filteredJobtypes.map((jobtype) => (
              <tr key={jobtype.id}>
                <td>{jobtype.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingJobtype(jobtype)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No jobtype found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
