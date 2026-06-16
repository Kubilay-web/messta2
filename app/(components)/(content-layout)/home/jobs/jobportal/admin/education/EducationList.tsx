"use client";
import { useEffect, useState } from "react";
import { useEducationStore } from "@/app/job-portal-store/education";
import { FaRegEdit } from "react-icons/fa";

export default function EducationList() {
  const { fetchEducation, educations, setUpdatingEducation } =
    useEducationStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const filteredEducation = educations?.filter((education) =>
    education?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Education"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Education List Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEducation.length > 0 ? (
            filteredEducation.map((education) => (
              <tr key={education.id}>
                <td>{education.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingEducation(education)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No education found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
