"use client";

import React, { useState } from "react";

const dummyData = [
  {
    category: "Software Development",
    jobs: [
      {
        title: "Frontend Developer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        pricePerHour: 30,
        logo: "/assets/images/jobportal/de.jpg",
        postedDate: "2024-03-13",
        jobType: "Full-time",
      },
    ],
  },
  {
    category: "Web Design",
    jobs: [
      {
        title: "UI/UX Designer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        pricePerHour: 25,
        logo: "/assets/images/jobportal/dee.jpg",
        postedDate: "2024-03-11",
        jobType: "Full-time",
      },
    ],
  },
  {
    category: "Finance",
    jobs: [
      {
        title: "Financial Analyst",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        pricePerHour: 45,
        logo: "/assets/images/jobportal/dee.jpg",
        postedDate: "2024-03-08",
        jobType: "Part-time",
      },
    ],
  },
  // ... diğer kategoriler
];

export default function FeaturedJob() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Popular Featured Jobs
      </h2>

      {/* Kategori Butonları */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {dummyData.map((categoryData, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(categoryData.category)}
            className={`px-5 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
              selectedCategory === categoryData.category
                ? "bg-blue-600 shadow-lg"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {categoryData.category}
          </button>
        ))}
      </div>

      {/* Seçilen Kategori Başlığı */}
      {selectedCategory && (
        <>
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-6">
            {selectedCategory}
          </h3>

          {/* Job Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyData
              .find((cat) => cat.category === selectedCategory)
              ?.jobs.map((job, jobIndex) => (
                <div
                  key={jobIndex}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-2">{job.description}</p>
                  <p className="text-gray-700 text-sm mb-1">
                    Price per Hour: ${job.pricePerHour}
                  </p>
                  <p className="text-gray-700 text-sm mb-1">
                    Posted: {job.postedDate}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">{job.jobType}</p>
                  <button className="mt-auto bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
