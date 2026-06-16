"use client";

import { useOrganizationStore } from "@/app/job-portal-store/organization";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function OrganizationList() {
  const {
    fetchOrganizations,
    organizations,
    setUpdatingOrganization,
    updatingOrganization,
  } = useOrganizationStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const filteredOrganizations = organizations?.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="my-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search organization"
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
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org) => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>
                  <button
                    className="btn btn-link bg-success text-light"
                    onClick={() => setUpdatingOrganization(org)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No organization found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
