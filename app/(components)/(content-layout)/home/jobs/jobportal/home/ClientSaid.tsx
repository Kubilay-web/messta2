"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const profiles = [
  {
    id: 1,
    name: "John Doe",
    occupation: "Software Engineer",
    description: "Passionate about building great software.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    occupation: "UI/UX Designer",
    description: "Loves crafting beautiful user experiences.",
    rating: 5,
    photo: "/assets/images/jobportal/de.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    occupation: "Product Manager",
    description: "Ensures projects meet business goals.",
    rating: 4,
    photo: "/assets/images/jobportal/de.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    occupation: "Backend Developer",
    description: "Specializes in scalable server-side apps.",
    rating: 5,
    photo: "/assets/images/jobportal/de.jpg",
  },
];

export default function ClientSaid() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 9000000000); // 5 saniye
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-12 px-4 md:px-12 max-w-7xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Our Happy Clients
      </h3>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="w-24 h-24 relative mb-4 rounded-full overflow-hidden">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold">{profile.name}</h4>
                <p className="text-gray-500 text-sm">{profile.occupation}</p>
                <p className="mt-2 text-gray-700 text-sm">{profile.description}</p>
                <div className="mt-3 flex space-x-1 text-yellow-400">
                  {[...Array(profile.rating)].map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0 ? profiles.length - 1 : currentIndex - 1
            )
          }
        >
          ◀
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % profiles.length)
          }
        >
          ▶
        </button>
      </div>
    </section>
  );
}
