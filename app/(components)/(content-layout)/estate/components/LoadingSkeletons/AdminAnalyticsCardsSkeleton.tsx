"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

export function DashboardCardsSkeleton() {
  // Create an array of 5 items to match our 5 cards
  const skeletonCards = Array(5).fill(null);

  return (
    <div className="space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {skeletonCards.map((_, i) => (
          <Card
            key={i}
            className="relative overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-gray-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  {/* Title skeleton */}
                  <Skeleton className="h-4 w-2/3 mb-3" />

                  {/* Value skeleton */}
                  <Skeleton className="h-8 w-1/2" />
                </div>

                {/* Icon skeleton */}
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>

              {/* Link skeleton */}
              <Skeleton className="mt-3 h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tables Section Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Students Table Skeleton */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            {/* Table header skeleton */}
            <div className="border-b">
              <div className="flex py-2.5">
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>

            {/* Table rows skeleton */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="border-b">
                <div className="flex py-3">
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}

            {/* Link skeleton */}
            <div className="mt-4">
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Events Table Skeleton */}
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            {/* Table header skeleton */}
            <div className="border-b">
              <div className="flex py-2.5">
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4 mr-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>

            {/* Table rows skeleton */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="border-b">
                <div className="flex py-3">
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4 mr-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}

            {/* Link skeleton */}
            <div className="mt-4">
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
