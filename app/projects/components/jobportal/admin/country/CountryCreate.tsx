"use client";

import { useCountryStore } from "@/app/job-portal-store/country";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function CountryCreate() {
  const {
    name,
    setName,
    updatingCountry,
    setUpdatingCountry,
    createCountry,
    updateCountry,
    deleteCountry,
  } = useCountryStore();

  return (
    <div className="my-6">
      {/* Input */}
      <input
        type="text"
        value={updatingCountry ? updatingCountry?.name : name}
        onChange={(e) =>
          updatingCountry
            ? setUpdatingCountry({ ...updatingCountry, name: e.target.value })
            : setName(e.target.value)
        }
        placeholder="Enter country name"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
      />

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-3">
        <button
          className={`flex-1 rounded-lg px-4 py-2 font-medium text-white shadow transition ${
            updatingCountry
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={(e) => {
            e.preventDefault();
            updatingCountry ? updateCountry() : createCountry();
          }}
        >
          {updatingCountry ? "Update" : "Create"}
        </button>

        {updatingCountry && (
          <>
            <button
              className="rounded-lg bg-red-500 p-2 text-white shadow hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                deleteCountry();
              }}
            >
              <MdOutlineDeleteOutline size={22} />
            </button>

            <button
              className="rounded-lg bg-gray-500 p-2 text-white shadow hover:bg-gray-600"
              onClick={() => setUpdatingCountry(null)}
            >
              <MdOutlineClear size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
