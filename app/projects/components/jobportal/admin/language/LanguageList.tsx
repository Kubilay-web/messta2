"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/app/job-portal-store/language";
import { FaRegEdit } from "react-icons/fa";

export default function LanguageList() {
  const { fetchLanguages, languages, setUpdatingLanguage } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search language"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Language Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <tr key={language._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{language.name}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
                      onClick={() => setUpdatingLanguage(language)}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-3 px-4 text-center text-gray-500">
                  No language found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
