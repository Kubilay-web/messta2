"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/job-portal-store/language";
import { FaRegEdit } from "react-icons/fa";

export default function LanguageList() {
  // Using Zustand store
  const { fetchLanguages, languages, setUpdatingLanguage } = useLanguageStore();

  // Local state for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch languages on mount
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  // Filter languages based on the search term
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search language"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Language Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((language) => (
              <tr key={language._id}>
                <td>{language.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingLanguage(language)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No language found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
