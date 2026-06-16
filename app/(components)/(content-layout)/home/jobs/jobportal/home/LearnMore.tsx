"use client";

import Image from "next/image";

export default function FeatureComponent() {
  return (
    <section className="bg-gray-100 rounded-xl shadow-lg p-8 md:p-16 my-8 mx-4 md:mx-16 flex flex-col md:flex-row items-center gap-8">
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-wide drop-shadow-md">
          Explore Career Opportunities
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-600 mb-6 drop-shadow-sm">
          Find Jobs That Match Your Skills and Passion – Start Your Career Search Now!
        </p>
        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
          <button className="bg-blue-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
            Search
          </button>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        <div className="relative w-full max-w-lg rounded-xl overflow-hidden transform transition-transform duration-500 hover:scale-105">
          <Image
            src="/assets/images/jobportal/job.png"
            alt="Feature"
            width={800}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
