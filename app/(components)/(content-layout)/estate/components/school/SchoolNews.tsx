import { newsData } from "../../data";
import Link from "next/link";
import React from "react";
import NewsCard from "./news-card";
import { News, Section } from "../../types/types";
import NoSection from "./NoSection";
import SectionHeader from "./SectionHeader";

export default function SchoolNews({
  section,
  recentNews,
}: {
  section: Section | null | undefined;
  recentNews: News[];
}) {
  if (!section) {
    return <NoSection />;
  }
  const { title, subtitle } = section;
  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 pt-2">
        <SectionHeader
          title={title as string}
          description={subtitle as string}
        />
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            School News & Updates
          </h2>
          <Link
            href="/news"
            className="text-green-600 text-sm flex items-center hover:underline"
          >
            View all news
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNews.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
}
