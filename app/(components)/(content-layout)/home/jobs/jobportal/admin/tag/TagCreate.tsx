"use client";

import { useTagStore } from "@/app/job-portal-store/tag";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function TagCreate() {
  const {
    name,
    setName,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTagStore();

  return (
    <div className="my-5">
      <input
        type="text"
        placeholder="Tag Name"
        value={updatingTag ? updatingTag.name : name}
        onChange={(e) =>
          updatingTag
            ? setUpdatingTag({ ...updatingTag, name: e.target.value })
            : setName(e.target.value)
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />
      <div className="d-flex justify-content-between">
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingTag ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingTag ? updateTag() : createTag(); // Eğer güncellenen tag varsa, güncellenir, yoksa yeni tag oluşturulur
          }}
        >
          {updatingTag ? "Update" : "Create"}
        </button>

        {updatingTag && (
          <>
            <button
              className="btn bg-danger text-light"
              onClick={(e) => {
                e.preventDefault();
                deleteTag(); // Tag silme işlemi
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingTag(null)}
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
