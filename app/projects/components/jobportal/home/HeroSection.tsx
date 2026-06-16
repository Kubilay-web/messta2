// HeroSection.js
"use client";
import Image from "next/image";
import JobSearchForm from "./JobSearch";
import { useEffect } from "react";
export default function HeroSection() {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);
  return (
    <div className="hero-section-job">
      <Image
        src="/assets/images/jobportal/job.png"
        layout="fill"
        objectFit="cover"
        alt="Hero Background"
      />
      <div className="hero-content-job">
        <h1
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "40px",
            fontWeight: "bold",
            letterSpacing: "1px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            padding: "1px",
          }}
        >
          Find Your Dream Job
        </h1>
        <JobSearchForm />
      </div>
    </div>
  );
}
