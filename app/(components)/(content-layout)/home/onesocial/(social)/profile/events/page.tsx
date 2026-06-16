"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { BsCalendarCheck, BsGeoAlt, BsPeople } from "react-icons/bs";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // API'den etkinlik verisini alıyoruz
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/onesocial/events");
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("error fetch data", error);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="flex flex-col items-start justify-between border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 sm:mb-0">
          Discover Events
        </h2>
        <button className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
          <FaPlus className="mr-2 h-4 w-4" />
          Create events
        </button>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {events.map((event) => (
          <div key={event.id} className="rounded-lg border border-gray-200 bg-white p-4 mb-6">
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              {/* Event Image */}
              <div className="mb-4 sm:mb-0 sm:mr-4">
                <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl border-4 border-white shadow-sm">
                    <Image
                      src={event.logo?.url || "/default-image.jpg"}
                      alt={event.name.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>

              {/* Event Info */}
              <div className="flex-1 sm:ml-4">
                <h5 className="mb-2 text-lg font-semibold text-gray-900">
                  <Link href={`/event/details/${event.id}`} className="hover:text-blue-600">
                    {event.name.text}
                  </Link>
                </h5>

                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <BsCalendarCheck className="mr-2 h-4 w-4 flex-shrink-0" />
                    {new Date(event.start.local).toLocaleString()}
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <BsGeoAlt className="mr-2 h-4 w-4 flex-shrink-0" />
                    {event.location.address.localized_address_display}
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <BsPeople className="mr-2 h-4 w-4 flex-shrink-0" />
                    {event.ticket_classes[0]?.quantity_total} going
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
