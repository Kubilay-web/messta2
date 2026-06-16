"use client";

import { useEffect, useState } from "react";
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { Select } from "antd";

const { Option } = Select;

export default function StateCreate() {
  const [loading, setLoading] = useState(false);

  const { countries, fetchCountries } = useCountryStore(); // Zustand store for countries
  const {
    statename,
    selectedCountryId,
    setStatename,
    setSelectedCountryId,
    updatingState,
    setUpdatingState,
    createState,
    updateState,
    deleteState,
  } = useStateStore(); // Zustand store for state

  useEffect(() => {
    fetchCountries(); // Fetch countries when the component mounts
  }, [fetchCountries]);

  const handleCountryChange = (value: string) => {
    setSelectedCountryId(value);

    if (updatingState) {
      const selectedCountry = countries.find((c) => c.id === value);

      if (selectedCountry) {
        setUpdatingState({
          ...updatingState,
          countryId: { id: value, name: selectedCountry.name },
        });
      }
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatingState
      ? setUpdatingState({ ...updatingState, statename: e.target.value })
      : setStatename(e.target.value);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatingState ? updateState() : createState();
  };

  const handleDelete = () => {
    if (updatingState) {
      deleteState();
    }
  };

  const handleClear = () => {
    setUpdatingState(null);
  };

  return (
    <div className="my-5">
      <div className="mb-5">
        <Select
          style={{ width: 500, height: 50 }}
          placeholder="Select a country"
          loading={loading}
          value={selectedCountryId}
          onChange={handleCountryChange}
        >
          {countries &&
            countries.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
        </Select>
      </div>

      <div>
        {countries &&
          countries.map((c) => (
            <p key={c.id}>
              {updatingState?.countryId?.id === c.id
                ? updatingState?.countryId?.name
                : ""}
            </p>
          ))}
      </div>

      <input
        type="text"
        placeholder="State name"
        value={updatingState ? updatingState?.statename : statename}
        onChange={handleStateChange}
        className="my-2 p-2"
        style={{ outline: "none" }}
      />
      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingState ? "info" : "green"} text-light`}
          onClick={handleSave}
        >
          {updatingState ? "Update" : "Create"}
        </button>

        {updatingState && (
          <>
            <button
              className={`btn bg-danger text-light`}
              onClick={handleDelete}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button className="btn bg-success text-light" onClick={handleClear}>
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
