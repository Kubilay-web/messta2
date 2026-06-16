"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Expert Team",
    description:
      "Our team consists of experienced professionals dedicated to delivering exceptional results.",
  },
  {
    id: 2,
    title: "Quality Service",
    description:
      "We prioritize providing top-notch service to ensure customer satisfaction.",
  },
  {
    id: 3,
    title: "Innovative Solutions",
    description:
      "We provide creative and innovative solutions to meet your unique needs.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Why Choose Us
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
          >
            <FaCheckCircle className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
