"use client";
import { useEffect, useState } from "react";
import { useCityStore } from "@/app/job-portal-store/city"; // Zustand store'undan alıyoruz
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { City } from "@prisma/client";

export default function CityList() {
  const { cities, fetchCities, setUpdatingCity, updatingCity } = useCityStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  // Şehirleri arama terimine göre filtreliyoruz
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Şehir güncelleme butonuna basıldığında güncelleme formunu açıyoruz
  const handleEditCity = (city: City) => {
    setUpdatingCity(city);
  };

  return (
    <div className="my-5">
      {/* Arama kutusu */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Şehirler listesi */}
      <table className="table-responsive table" style={{ width: "80%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Country</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.length === 0 ? (
            <tr>
              <td colSpan={4}>No cities found</td>
            </tr>
          ) : (
            filteredCities.map((city) => (
              <tr key={city.id}>
                <td style={{ width: "33%" }}>{city.name}</td>
                <td style={{ width: "33%" }}>{city.stateId}</td>
                <td style={{ width: "33%" }}>{city.countryId}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => handleEditCity(city)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
