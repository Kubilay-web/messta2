"use client";
import { useState } from "react";
import Basic from "@/app/projects/components/jobportal/candidate/Basic";
import Profile from "./Profile";
import AccountSettings from "./AccountSettings";
import ExperienceEdu from "./ExperienceEdu";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic", component: <Basic /> },
    { id: "profile", label: "Profile", component: <Profile /> },
    { id: "experience", label: "Experience & Education", component: <ExperienceEdu /> },
    { id: "account", label: "Account Settings", component: <AccountSettings /> },
  ];

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 justify-start mb-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-b-lg p-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="w-full transition-all duration-300">
                {tab.component}
              </div>
            )
        )}
      </div>
    </div>
  );
}
