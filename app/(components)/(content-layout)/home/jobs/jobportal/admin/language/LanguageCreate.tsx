"use client";

import { useLanguageStore } from "@/app/job-portal-store/language";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

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

  return (
    <div className="my-5">
      <input
        type="text"
        placeholder="Language"
        value={updatingLanguage ? updatingLanguage?.name : name}
        onChange={(e) =>
          updatingLanguage
            ? setUpdatingLanguage({ ...updatingLanguage, name: e.target.value })
            : setName(e.target.value)
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />
      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingLanguage ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingLanguage ? updateLanguage() : createLanguage();
          }}
        >
          {updatingLanguage ? "Update" : "Create"}
        </button>

        {updatingLanguage && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteLanguage();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingLanguage(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
