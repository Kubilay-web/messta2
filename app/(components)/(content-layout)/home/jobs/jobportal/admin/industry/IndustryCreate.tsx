"use client";

import { useIndustryStore } from "@/app/job-portal-store/industry";

import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export default function IndustryCreate() {
  const {
    name,
    setName,
    updatingIndustry,
    setUpdatingIndustry,
    createIndustry,
    updateIndustry,
    deleteIndustry,
  } = useIndustryStore();

  return (
    <div className="my-5">
      <input
        type="text"
        placeholder="Industry Name"
        value={updatingIndustry ? updatingIndustry?.name : name}
        onChange={(e) =>
          updatingIndustry
            ? setUpdatingIndustry({ ...updatingIndustry, name: e.target.value })
            : setName(e.target.value)
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />
      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingIndustry ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            if (updatingIndustry) {
              updateIndustry();
              toast.success("Successful updated");
            } else {
              createIndustry();
              toast.success("Successful created");
            }
          }}
        >
          {updatingIndustry ? "update" : "create"}
        </button>

        {updatingIndustry && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteIndustry();
                toast.success("Successful deleted");
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingIndustry(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
