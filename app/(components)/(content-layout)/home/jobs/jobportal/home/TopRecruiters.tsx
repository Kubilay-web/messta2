"use client";

import React from "react";
import Image from "next/image";

const recruitersData = [
  {
    id: 1,
    image: "/assets/images/jobportal/dee.jpg",
    title: "ABC Corporation",
    rating: 4.5,
    numRatings: 120,
    location: "New York",
    jobAvailability: 30,
  },
  {
    id: 2,
    image: "/assets/images/jobportal/dee.jpg",
    title: "XYZ Solutions",
    rating: 4.2,
    numRatings: 80,
    location: "Los Angeles",
    jobAvailability: 25,
  },
  {
    id: 3,
    image: "/assets/images/jobportal/dee.jpg",
    title: "Global Tech",
    rating: 4.8,
    numRatings: 200,
    location: "San Francisco",
    jobAvailability: 40,
  },
  {
    id: 4,
    image: "/assets/images/jobportal/dee.jpg",
    title: "Innovate Inc.",
    rating: 4.3,
    numRatings: 95,
    location: "Chicago",
    jobAvailability: 15,
  },
];

export default function TopRecruiters() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Top Recruiters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recruitersData.map((recruiter) => (
          <div
            key={recruiter.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={recruiter.image}
                alt={recruiter.title}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {recruiter.title}
              </h3>
            </div>

            <div className="flex items-center space-x-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 ${
                    i < Math.floor(recruiter.rating) ? "block" : "block opacity-30"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-600 text-sm ml-2">
                {recruiter.rating} ({recruiter.numRatings})
              </span>
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-2">
              <span className="mr-1">📍</span>
              <span>{recruiter.location}</span>
            </div>

            <div className="text-blue-600 font-medium text-sm">
              {recruiter.jobAvailability} jobs available
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
