"use client";

import {
  FaHardHat,
  FaHammer,
  FaBolt,
  FaTools,
  FaFireExtinguisher,
  FaCogs,
  FaLeaf,
  FaUserShield,
  FaBuilding,
  FaChalkboardTeacher,
  FaMedkit,
  FaUserTie,
  FaDesktop,
  FaBriefcase,
} from "react-icons/fa";

export default function PopularJobsSection() {
  const jobCategories = [
    { name: "Roofer", icon: FaHardHat, jobsAvailable: 12 },
    { name: "Bricklayer", icon: FaHammer, jobsAvailable: 8 },
    { name: "Electrician", icon: FaBolt, jobsAvailable: 15 },
    { name: "Plumber", icon: FaTools, jobsAvailable: 10 },
    { name: "Heating Repairman", icon: FaFireExtinguisher, jobsAvailable: 7 },
    { name: "Elevator Repairman", icon: FaCogs, jobsAvailable: 5 },
    { name: "Gardener", icon: FaLeaf, jobsAvailable: 20 },
    { name: "Watchmen", icon: FaUserShield, jobsAvailable: 6 },
    { name: "Construction", icon: FaBuilding, jobsAvailable: 18 },
    { name: "Education", icon: FaChalkboardTeacher, jobsAvailable: 25 },
    { name: "Healthcare", icon: FaMedkit, jobsAvailable: 30 },
    { name: "Business", icon: FaUserTie, jobsAvailable: 22 },
    { name: "Finance", icon: FaBriefcase, jobsAvailable: 12 },
    { name: "Technology", icon: FaDesktop, jobsAvailable: 40 },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 tracking-wide drop-shadow-sm">
        Popular Job Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {jobCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="text-blue-600 text-3xl mb-3">
                <IconComponent />
              </div>
              <h6 className="text-gray-800 font-semibold text-sm mb-1 text-center">
                {category.jobsAvailable} jobs available
              </h6>
              <span className="text-gray-600 text-center font-medium">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
