"use client";

import { useEffect, useState } from "react";
import { useProfessionStore } from "@/app/job-portal-store/profession";
import { FaRegEdit } from "react-icons/fa";

export default function ProfessionList() {
  const { fetchProfessions, professions, setUpdatingProfession } =
    useProfessionStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProfessions();
  }, []);

  const filteredProfessions = professions?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search profession"
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
          {filteredProfessions.length > 0 ? (
            filteredProfessions.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingProfession(p)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No profession found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
