"use client";

import { useLanguageStore } from "@/app/job-portal-store/language";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function LanguageCreate() {
  const {
    name,
    setName,
    updatingLanguage,
    setUpdatingLanguage,
    createLanguage,
    updateLanguage,
    deleteLanguage,
  } = useLanguageStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatingLanguage ? updateLanguage() : createLanguage();
  };

  const handleClear = () => setUpdatingLanguage(null);

  return (
    <div className="my-5 w-full max-w-md mx-auto p-5 bg-white shadow-lg rounded-xl">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Language"
        value={updatingLanguage ? updatingLanguage.name : name}
        onChange={(e) =>
          updatingLanguage
            ? setUpdatingLanguage({ ...updatingLanguage, name: e.target.value })
            : setName(e.target.value)
        }
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-between">
        <button
          onClick={handleSubmit}
          className={`flex-1 min-w-[100px] text-white font-medium py-2 px-4 rounded-lg transition ${
            updatingLanguage ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {updatingLanguage ? "Update" : "Create"}
        </button>

        {updatingLanguage && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteLanguage();
              }}
              className="flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
            >
              <MdOutlineClear size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
