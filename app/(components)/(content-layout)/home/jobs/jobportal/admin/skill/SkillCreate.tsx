"use client";

import { useSkillStore } from "@/app/job-portal-store/skill";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function SkillCreate() {
  const {
    name,
    setName,
    updatingSkill,
    setUpdatingSkill,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkillStore(); // Zustand store'unu kullanıyoruz

  return (
    <div className="my-5">
      {/* Skill Name Input */}
      <input
        type="text"
        value={updatingSkill ? updatingSkill?.name : name}
        onChange={
          (e) =>
            updatingSkill
              ? setUpdatingSkill({ ...updatingSkill, name: e.target.value }) // Skill güncelleniyorsa, updatingSkill güncellenir
              : setName(e.target.value) // Aksi takdirde, name değeri değişir
        }
        className="my-2 p-2"
        style={{ outline: "none" }}
      />

      <div className="d-flex justify-content-between">
        {/* Create or Update Button */}
        <button
          style={{ backgroundColor: "green" }}
          className={`btn bg-${updatingSkill ? "info" : "green"} text-light`}
          onClick={(e) => {
            e.preventDefault();
            updatingSkill ? updateSkill() : createSkill(); // Güncelleniyorsa update, değilse create işlemi yapılır
          }}
        >
          {updatingSkill ? "Update" : "Create"}{" "}
          {/* Buton metni, güncelleme durumuna göre değişir */}
        </button>

        {/* Delete and Clear Buttons (Only if updatingSkill exists) */}
        {updatingSkill && (
          <>
            {/* Delete Skill Button */}
            <button
              className={`btn bg-danger text-light`}
              onClick={(e) => {
                e.preventDefault();
                deleteSkill(); // Skill silinir
              }}
            >
              <MdOutlineDeleteOutline />
            </button>

            {/* Clear Updating Skill Button */}
            <button
              className="btn bg-success text-light"
              onClick={() => setUpdatingSkill(null)} // UpdatingSkill sıfırlanır
            >
              <MdOutlineClear />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
