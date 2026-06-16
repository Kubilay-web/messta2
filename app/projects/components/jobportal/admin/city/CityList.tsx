"use client";
import { useEffect, useState } from "react";
import { useCityStore } from "@/app/job-portal-store/city"; 
import { FaRegEdit } from "react-icons/fa";
import { City } from "@prisma/client";

export default function CityList() {
  const { cities, fetchCities, setUpdatingCity } = useCityStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCity = (city: City) => {
    setUpdatingCity(city);
  };

  return (
    <div className="my-6 w-full max-w-5xl overflow-hidden rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Cities Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                State
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Country
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCities.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No cities found
                </td>
              </tr>
            ) : (
              filteredCities.map((city) => (
                <tr
                  key={city.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {city.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {city.stateId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    {city.countryId}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-green-700"
                      onClick={() => handleEditCity(city)}
                    >
                      <FaRegEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
