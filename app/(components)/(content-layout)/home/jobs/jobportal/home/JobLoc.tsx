// pages/index.tsx
"use client";

import Image from "next/image";

const dummyData = [
  {
    location: "New York",
    vacancies: 10,
    number: 30,
    companies: [
      { name: "Company A", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  {
    location: "San Francisco",
    vacancies: 8,
    number: 20,
    companies: [
      { name: "Company B", image: "/assets/images/jobportal/dee.jpg" },
    ],
  },
  {
    location: "Los Angeles",
    vacancies: 12,
    number: 25,
    companies: [
      { name: "Company C", image: "/assets/images/jobportal/de.jpg" },
    ],
  },
  // ... diğer lokasyonlar
];

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        Job by Locations
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Explore job opportunities in different locations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.location}
            </h3>
            <div className="text-gray-600 mb-4">
              <span className="block">Vacancies: {item.vacancies}</span>
              <span className="block">Available Companies: {item.number}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {item.companies.map((company, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-gray-100 rounded-lg p-3"
                >
                  <div className="w-20 h-20 relative mb-2 rounded-full overflow-hidden">
                    <Image
                      src={company.image}
                      alt={company.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-center">
                    {company.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
