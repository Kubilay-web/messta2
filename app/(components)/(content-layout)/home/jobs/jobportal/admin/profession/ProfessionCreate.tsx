"use client";

import { useProfessionStore } from "@/app/job-portal-store/profession";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";

export default function ProfessionCreate() {
  const {
    name,
    setName,
    updatingProfession,
    setUpdatingProfession,
    createProfession,
    updateProfession,
    deleteProfession,
  } = useProfessionStore();

  return (
    <div className="my-5">
      <input
        type="text"
        value={updatingProfession ? updatingProfession.name : name}
        onChange={(e) =>
          updatingProfession
            ? setUpdatingProfession({
                ...updatingProfession,
                name: e.target.value,
              })
            : setName(e.target.value)
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />

      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingProfession ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingProfession ? updateProfession() : createProfession();
          }}
        >
          {updatingProfession ? "Update" : "Create"}
        </button>

        {updatingProfession && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteProfession();
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingProfession(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
