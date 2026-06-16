"use client";

import { useEffect, useState } from "react";
import { useCountryStore } from "@/app/job-portal-store/country";
import { FaRegEdit } from "react-icons/fa";

export default function CountryList() {
  const { fetchCountries, countries, setUpdatingCountry } = useCountryStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-6">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search country..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <tr
                  key={country.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 font-medium">{country.name}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="rounded-lg bg-blue-500 p-2 text-white shadow hover:bg-blue-600"
                      onClick={() => setUpdatingCountry(country)}
                    >
                      <FaRegEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No country found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
