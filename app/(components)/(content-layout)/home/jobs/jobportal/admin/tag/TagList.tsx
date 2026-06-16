"use client";
import { useEffect, useState } from "react";
import { useTagStore } from "@/app/job-portal-store/tag";
import { FaRegEdit } from "react-icons/fa";

export default function TagList() {
  const { fetchTags, tags, setUpdatingTag } = useTagStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTags(); // Tag'leri yüklemek için
  }, [fetchTags]);

  const filteredTags = tags?.filter((c) =>
    c?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTags.length > 0 ? (
            filteredTags.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingTag(c)} // Tag güncellemeye başla
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No tags found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
