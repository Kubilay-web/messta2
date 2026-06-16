"use client";

import { useIndustryStore } from "@/app/job-portal-store/industry";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function IndustryList() {
  const { industries, fetchIndustries, updatingIndustry, setUpdatingIndustry } =
    useIndustryStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  const filteredIndustry = industries?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search industry"
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
          {filteredIndustry.length > 0 ? (
            filteredIndustry.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingIndustry(c)}
                    aria-label={`Edit ${c.name}`}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No industries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
