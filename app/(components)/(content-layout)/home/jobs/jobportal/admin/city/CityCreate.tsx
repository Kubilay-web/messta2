"use client";
import { useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Select } from "antd";
import { useCityStore } from "@/app/job-portal-store/city"; // Importing the Zustand store
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { useRouter } from "next/navigation"; // Importing useRouter

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
  const router = useRouter(); // Initialize the router

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
    <div className="my-5">
      <p className="m-1 p-1">Select Country</p>

      <Select
        showSearch
        style={{ width: 500, height: 50 }}
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
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="form-control my-2 p-2"
      >
        {countries
          .filter((country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((country) => (
            <Option key={country.id} value={country.id}>
              {country.name}
            </Option>
          ))}
      </Select>

      <p className="m-1 p-1">Select State</p>
      <Select
        showSearch
        style={{ width: 500, height: 60 }}
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
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        className="form-control my-2 p-2"
      >
        {states
          .filter((state) =>
            state.statename.toLowerCase().includes(searchTerms.toLowerCase()),
          )
          .map((state) => (
            <Option key={state.id} value={state.id}>
              {state.statename}
            </Option>
          ))}
      </Select>

      <input
        type="text"
        value={updatingCity ? updatingCity?.name : name}
        onChange={(e) =>
          updatingCity
            ? setUpdatingCity({ ...updatingCity, name: e.target.value })
            : setName(e.target.value)
        }
        className="form-control my-2 p-2"
      />
      <div className="d-flex justify-content-between">
        <button
          className={`btn bg-${updatingCity ? "info" : "primary"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingCity ? handleCityUpdate() : handleCityCreate();
          }}
        >
          {updatingCity ? "Update" : "Create"}
        </button>

        {updatingCity && (
          <>
            <button
              className={`btn bg-danger text-light`}
              onClick={(e) => {
                e.preventDefault();
                handleCityDelete();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingCity(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
