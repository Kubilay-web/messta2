"use client";

import { useOrganizationStore } from "@/app/job-portal-store/organization";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function OrganizationList() {
  const {
    fetchOrganizations,
    organizations,
    setUpdatingOrganization,
  } = useOrganizationStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const filteredOrganizations = organizations?.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-5 w-full max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search organization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">Name</th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganizations && filteredOrganizations.length > 0 ? (
              filteredOrganizations.map((org) => (
                <tr
                  key={org.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6">{org.name}</td>
                  <td className="py-3 px-6">
                    <button
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                      onClick={() => setUpdatingOrganization(org)}
                    >
                      <FaRegEdit size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-500">
                  No organization found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
