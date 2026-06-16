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
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search country"
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
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <tr key={country.id}>
                <td>{country.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingCountry(country)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No country found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
