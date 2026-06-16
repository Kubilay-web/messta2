"use client";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useStateStore } from "@/app/job-portal-store/state";
import { useCountryStore } from "@/app/job-portal-store/country";

export default function StateList() {
  const { fetchStates, states, setUpdatingState } = useStateStore();
  console.log("states",states)
  const { fetchCountries, countries } = useCountryStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, [fetchCountries, fetchStates]);

  const filteredStates = states.filter((state) =>
    state.statename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5 max-w-4xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search state"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Responsive State List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStates.length > 0 ? (
          filteredStates.map((state) => {
            const countryName =
              countries.find((country) => country.id === state.countryId)
                ?.name || "Unknown";

            return (
              <div
                key={state.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{state.statename}</h3>
                  <p className="text-gray-500 text-sm">{countryName}</p>
                </div>
                <button
                  onClick={() => setUpdatingState(state)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                >
                  <FaRegEdit />
                </button>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No state found
          </p>
        )}
      </div>
    </div>
  );
}
