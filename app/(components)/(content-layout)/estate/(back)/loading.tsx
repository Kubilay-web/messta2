import React from "react";
import { Skeleton } from "../components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <div className="flex items-center">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14 ml-1" />
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 py-4 space-y-1">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="px-6 py-1">
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="px-6 py-1">
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Menu Items with icons */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="px-4 py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>

        {/* User profile at bottom */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-32 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header with search and actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Welcome banner */}
        <div className="bg-blue-500 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-blue-400" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 bg-blue-400" />
              <Skeleton className="h-4 w-40 bg-blue-400" />
            </div>
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28 mt-4" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students Table */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="space-y-2">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Table rows */}
              {[1, 2, 3].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4 py-3 border-t">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="space-y-2">
              {/* Table header */}
              <div className="grid grid-cols-2 gap-4 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Event rows */}
              {[1, 2, 3].map((event) => (
                <div
                  key={event}
                  className="grid grid-cols-2 gap-4 py-3 border-t"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
