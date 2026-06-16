"use client";

import { useEffect, useState } from "react";
import { useSkillStore } from "@/app/job-portal-store/skill";
import { FaRegEdit } from "react-icons/fa";

export default function SkillList() {
  // Zustand store'dan gerekli state'leri aldık
  const { fetchSkills, skills, setUpdatingSkill } = useSkillStore();

  // Search term için state
  const [searchTerm, setSearchTerm] = useState("");

  // Component mount olduğunda skill'leri çekmek için useEffect kullandık
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Arama filtresi
  const filteredSkills = skills?.filter((c) =>
    c?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      {/* Arama alanı */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search skill"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Skill listesi */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  {/* Edit butonu */}
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingSkill(c)} // Skill'i düzenleme için setUpdatingSkill çağrılır
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No skill found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
