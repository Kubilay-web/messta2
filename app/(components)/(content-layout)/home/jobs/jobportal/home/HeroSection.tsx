// HeroSection.tsx
"use client";

import Image from "next/image";
import JobSearchForm from "./JobSearch";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      {/* <Image
        src="/assets/images/jobportal/job.png"
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
      /> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-6 md:space-y-8 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
          Find Your Dream Job
        </h1>

        <div className="w-full">
          <JobSearchForm />
        </div>
      </div>
    </section>
  );
}
