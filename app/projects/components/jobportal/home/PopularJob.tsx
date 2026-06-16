// PopularJobsSection.js
"use client";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaDesktop,
  FaBuilding,
  FaChalkboardTeacher,
  FaMedkit,
  FaUserTie,
} from "react-icons/fa";

export default function PopularJobsSection() {
  // Define popular job categories
  const jobCategories = [
    { name: "Roofer", icon: FaBriefcase },
    { name: "Bricklayer", icon: FaDesktop },
    { name: "Electrician", icon: FaBuilding },
    { name: "Plumber", icon: FaChalkboardTeacher },
    { name: "Heating Repairman", icon: FaMedkit },
    { name: "Elevator Repairman", icon: FaUserTie },
    { name: "Gardener", icon: FaBriefcase },
    { name: "Watchmen", icon: FaDesktop },
    { name: "Construction", icon: FaBuilding },
    { name: "Education", icon: FaChalkboardTeacher },
    { name: "Healthcare", icon: FaMedkit },
    { name: "Business", icon: FaUserTie },
    { name: "Finance", icon: FaBriefcase },
    { name: "Technology", icon: FaDesktop },
    { name: "Construction", icon: FaBuilding },
    { name: "Education", icon: FaChalkboardTeacher },
    { name: "Healthcare", icon: FaMedkit },
    { name: "Business", icon: FaUserTie },
  ];

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <div className="popular-jobs-section-job m-5">
      <h2
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "1px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          padding: "1px",
        }}
      >
        Popular Job Categories
      </h2>
      <div className="job-category-row-job">
        {jobCategories.slice(0, 5).map((category, index) => (
          <div key={index} className="job-category-job">
            <category.icon />
            <h6
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "15px",
                fontWeight: "bold",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                padding: "1px",
              }}
            >
              12 job available
            </h6>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="job-category-row-job">
        {jobCategories.slice(5, 10).map((category, index) => (
          <div key={index} className="job-category-job">
            <category.icon />
            <h6
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "15px",
                fontWeight: "bold",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                padding: "1px",
              }}
            >
              12 job available
            </h6>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="job-category-row-job">
        {jobCategories.slice(10, 15).map((category, index) => (
          <div key={index} className="job-category-job">
            <category.icon />
            <h6
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "15px",
                fontWeight: "bold",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                padding: "1px",
              }}
            >
              12 job available
            </h6>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
