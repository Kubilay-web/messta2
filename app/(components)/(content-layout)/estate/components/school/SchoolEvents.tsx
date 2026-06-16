import { eventsData } from "../../data";
import Link from "next/link";
import React from "react";
import EventCard from "./event-card";
import NoSection from "./NoSection";
import { EventData, Section } from "../../types/types";
import SectionHeader from "./SectionHeader";

export default function SchoolEvents({
  section,
  recentEvents,
}: {
  section: Section | null | undefined;
  recentEvents: EventData[];
}) {
  if (!section) {
    return <NoSection />;
  }
  const { title, subtitle } = section;
  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4">
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
          <Link
            href="/events"
            className="text-green-600 text-sm flex items-center hover:underline"
          >
            View all events
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
        <SectionHeader
          title={title as string}
          description={subtitle as string}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
