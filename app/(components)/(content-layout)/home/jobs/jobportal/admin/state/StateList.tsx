"use client";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useStateStore } from "@/app/job-portal-store/state"; // Zustand store import
import { useCountryStore } from "@/app/job-portal-store/country"; // Zustand store import

export default function StateList() {
  const { fetchStates, states, setUpdatingState } = useStateStore();
  const { fetchCountries, countries } = useCountryStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries(); // Country verilerini al
    fetchStates(); // State verilerini al
  }, [fetchCountries, fetchStates]);

  const filteredStates = states.filter((state) =>
    state.statename.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search state"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table-responsive table" style={{ width: "80%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStates.map((state) => (
            <tr key={state.id}>
              <td>{state.statename}</td>
              <td>
                {
                  countries.find((country) => country.id === state.countryId)
                    ?.name
                }
              </td>
              <td>
                <button
                  className="btn btn-link bg-success text-light"
                  onClick={() => setUpdatingState(state)}
                >
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
