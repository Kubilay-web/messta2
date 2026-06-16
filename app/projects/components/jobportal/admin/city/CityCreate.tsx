"use client";
import { useEffect, useState } from "react";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { Select } from "antd";
import { useCityStore } from "@/app/job-portal-store/city";
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function CityCreate() {
  const {
    name,
    setName,
    selectedCountryId,
    setSelectedCountryId,
    selectedStateId,
    setSelectedStateId,
    updatingCity,
    setUpdatingCity,
    createCity,
    updateCity,
    deleteCity,
  } = useCityStore();

  const { fetchCountries, countries } = useCountryStore();
  const { fetchStates, states } = useStateStore();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, [fetchCountries, fetchStates]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchs = (value: string) => {
    setSearchTerms(value);
  };

  const handleCityUpdate = async () => {
    updateCity();
  };

  const handleCityCreate = () => {
    createCity();
  };

  const handleCityDelete = () => {
    deleteCity();
  };

  return (
    <div className="my-6 w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      {/* Country */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Country
        </p>
        <Select
          showSearch
          style={{ width: "100%", height: 48 }}
          placeholder="Select a country"
          loading={loading}
          value={selectedCountryId}
          onChange={(value) => {
            setSelectedCountryId(value);
            if (updatingCity) {
              const selectedCountry = countries.find((c) => c.id === value);
              if (selectedCountry) {
                setUpdatingCity({
                  ...updatingCity,
                  countryId: { id: value, name: selectedCountry.name },
                });
              }
            }
          }}
          onSearch={handleSearch}
          filterOption={(input, option) =>
            option?.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          className="rounded-lg border border-gray-300 shadow-sm"
        >
          {countries
            .filter((country) =>
              country.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((country) => (
              <Option key={country.id} value={country.id}>
                {country.name}
              </Option>
            ))}
        </Select>
      </div>

      {/* State */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Select State
        </p>
        <Select
          showSearch
          style={{ width: "100%", height: 48 }}
          placeholder="Select a state"
          loading={loading}
          value={selectedStateId}
          onChange={(value) => {
            setSelectedStateId(value);
            if (updatingCity) {
              const selectedState = states.find((s) => s.id === value);
              if (selectedState) {
                setUpdatingCity({
                  ...updatingCity,
                  stateId: { id: value, statename: selectedState.statename },
                });
              }
            }
          }}
          onSearch={handleSearchs}
          filterOption={(input, option) =>
            option?.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          className="rounded-lg border border-gray-300 shadow-sm"
        >
          {states
            .filter((state) =>
              state.statename
                .toLowerCase()
                .includes(searchTerms.toLowerCase())
            )
            .map((state) => (
              <Option key={state.id} value={state.id}>
                {state.statename}
              </Option>
            ))}
        </Select>
      </div>

      {/* City Name */}
      <input
        type="text"
        value={updatingCity ? updatingCity?.name : name}
        onChange={(e) =>
          updatingCity
            ? setUpdatingCity({ ...updatingCity, name: e.target.value })
            : setName(e.target.value)
        }
        placeholder="Enter city name"
        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          className={`flex-1 rounded-lg px-4 py-2 text-white transition ${
            updatingCity
              ? "bg-sky-600 hover:bg-sky-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={(e) => {
            e.preventDefault();
            updatingCity ? handleCityUpdate() : handleCityCreate();
          }}
        >
          {updatingCity ? "Update" : "Create"}
        </button>

        {updatingCity && (
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                handleCityDelete();
              }}
            >
              <MdOutlineDeleteOutline size={20} />
            </button>

            <button
              className="rounded-lg bg-blue-600 p-2 text-white hover:bg-green-700"
              onClick={() => setUpdatingCity(null)}
            >
              <MdOutlineClear size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
