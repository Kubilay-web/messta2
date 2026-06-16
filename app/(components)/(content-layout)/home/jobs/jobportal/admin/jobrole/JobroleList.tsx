"use client";

import { useEffect, useState } from "react";
import { useJobroleStore } from "@/app/job-portal-store/jobrole";
import { FaRegEdit } from "react-icons/fa";

export default function JobroleList() {
  const { fetchJobrole, jobrole, setUpdatingJobrole } = useJobroleStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobrole();
  }, [fetchJobrole]);

  const filteredJobroles = jobrole?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search job role"
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
          {filteredJobroles.length > 0 ? (
            filteredJobroles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingJobrole(role)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No job role found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
