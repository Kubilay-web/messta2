// JobSearchForm.tsx
"use client";

import { useState } from "react";

export default function JobSearchForm() {
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ industry, location, keyword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto"
    >
      {/* Industry Input */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="industry" className="text-gray-700 font-semibold mb-1">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g., Software"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Location Input */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="location" className="text-gray-700 font-semibold mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., New York"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Keyword Input */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="keyword" className="text-gray-700 font-semibold mb-1">
          Keyword
        </label>
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., Frontend"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all mt-4 md:mt-0"
      >
        Search
      </button>
    </form>
  );
}
