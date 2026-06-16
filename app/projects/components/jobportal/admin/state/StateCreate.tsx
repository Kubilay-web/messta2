"use client";

import { useEffect, useState } from "react";
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { Select } from "antd";

const { Option } = Select;

export default function StateCreate() {
  const [loading, setLoading] = useState(false);

  const { countries, fetchCountries } = useCountryStore();
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
  } = useStateStore();

  useEffect(() => {
    fetchCountries();
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
    if (updatingState) deleteState();
  };

  const handleClear = () => setUpdatingState(null);

  return (
    <div className="my-5 max-w-lg">
      {/* Country Select */}
      <div className="mb-4">
        <Select
          style={{ width: "100%" }}
          placeholder="Select a country"
          loading={loading}
          value={selectedCountryId}
          onChange={handleCountryChange}
          className="rounded border border-gray-300"
        >
          {countries?.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* State Input */}
      <input
        type="text"
        placeholder="State name"
        value={updatingState ? updatingState.statename : statename}
        onChange={handleStateChange}
        className="w-full mb-4 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleSave}
          className={`flex-1 py-2 px-4 rounded text-white font-semibold ${
            updatingState ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {updatingState ? "Update" : "Create"}
        </button>

        {updatingState && (
          <>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              <MdOutlineDeleteOutline className="inline-block mr-1" />
              Delete
            </button>

            <button
              onClick={handleClear}
              className="flex-1 py-2 px-4 rounded bg-gray-500 hover:bg-gray-600 text-white font-semibold transition"
            >
              <MdOutlineClear className="inline-block mr-1" />
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
