import React from "react";

export default function FrontLoading() {
  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="w-full bg-blue-600 p-4 flex items-center justify-center space-x-2">
        <div className="h-4 w-4 bg-blue-400 animate-pulse rounded"></div>
        <div className="h-4 w-48 bg-blue-400 animate-pulse rounded"></div>
        <div className="h-4 w-32 bg-blue-400 animate-pulse rounded"></div>
        <div className="h-4 w-24 bg-blue-400 animate-pulse rounded"></div>
        {/* Close button */}
        <div className="absolute right-4 h-4 w-4 bg-blue-400 animate-pulse rounded"></div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-20 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-28 bg-blue-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Small Welcome Text */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 mb-8">
          <div className="h-16 w-3/4 bg-gray-200 animate-pulse rounded mx-auto"></div>
          <div className="h-16 w-2/3 bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>

        {/* Subheading */}
        <div className="mb-12">
          <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded mx-auto"></div>
          <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded mx-auto mt-2"></div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <div className="h-12 w-36 bg-blue-200 animate-pulse rounded"></div>
          <div className="h-12 w-36 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}
