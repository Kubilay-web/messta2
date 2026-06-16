"use client";

import { useEffect, useState } from "react";
import { useJobcategoryStore } from "@/app/job-portal-store/jobcategories";
import { FaRegEdit } from "react-icons/fa";
import IconPicker from "react-icons-picker";

export default function JobCategoryList() {
  const { jobcategories, setUpdatingJobcategory, fetchJobcategories } =
    useJobcategoryStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobcategories();
  }, []);

  const filteredJobcategories = jobcategories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Icon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobcategories.length > 0 ? (
            filteredJobcategories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <div
                    className="pick"
                    style={{
                      pointerEvents: "none",
                      fontSize: "12px",
                    }}
                  >
                    <IconPicker
                      onClick={() => setUpdatingJobcategory(c)}
                      value={c.icon}
                      color={true}
                      size={32}
                    />
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingJobcategory(c)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No job categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
