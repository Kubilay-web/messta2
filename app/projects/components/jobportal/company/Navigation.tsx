// components/Navigation.js
"use client";
import { useState } from "react";
import CompanyInfo from "./CompanyInfo";
import FoundingInfo from "./FoundingInfo";
import AccountSetting from "./AccountSetting";
import AccountPassword from "./AccountPassword";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("nav-home");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 sm:mr-4 mb-2 sm:mb-0 rounded-t-lg font-medium transition-colors duration-300 ${
            activeTab === "nav-home"
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("nav-home")}
        >
          Company info
        </button>
        <button
          className={`px-4 py-2 sm:mr-4 mb-2 sm:mb-0 rounded-t-lg font-medium transition-colors duration-300 ${
            activeTab === "nav-profile"
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("nav-profile")}
        >
          Founding info
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-300 ${
            activeTab === "nav-contact"
              ? "bg-white border border-b-0 border-gray-300 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => handleTabClick("nav-contact")}
        >
          Account Setting
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-300 rounded-b-lg p-6 shadow-sm">
        {activeTab === "nav-home" && <CompanyInfo />}
        {activeTab === "nav-profile" && <FoundingInfo />}
        {activeTab === "nav-contact" && (
          <div className="space-y-4">
            <AccountSetting />
            <AccountPassword />
          </div>
        )}
      </div>
    </div>
  );
}
