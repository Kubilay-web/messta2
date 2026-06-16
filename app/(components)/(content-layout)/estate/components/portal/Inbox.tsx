"use client";
import { timeAgo } from "../../lib/getPastTime";
import React, { useState, useEffect } from "react";

export type Reminder = {
  name: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  schoolId: string;
  email: string | null;
  message: string;
  subject: string;
  recipient: "Parents" | "Students" | "Teachers" | "All";
  from: "Administration" | "Parent" | "Student" | "Teacher";
};

interface ReminderInboxProps {
  reminders: Reminder[];
}

export const ReminderInbox: React.FC<ReminderInboxProps> = ({ reminders }) => {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredReminders, setFilteredReminders] =
    useState<Reminder[]>(reminders);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  // Set the first reminder as selected by default
  useEffect(() => {
    if (reminders.length > 0 && !selectedReminder) {
      setSelectedReminder(reminders[0]);
    }
    setFilteredReminders(reminders);
  }, [reminders, selectedReminder]);

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const filtered = reminders.filter(
        (reminder) =>
          reminder.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reminder.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (reminder.name &&
            reminder.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (reminder.email &&
            reminder.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredReminders(filtered);
    } else {
      setFilteredReminders(reminders);
    }
  }, [searchTerm, reminders]);

  // Format the date to a readable format
  const formatDate = (date: Date): string => {
    try {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12

      return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
    } catch (error) {
      return "Invalid date";
    }
  };

  // Format how long ago a message was received
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        if (diffInMinutes < 1) {
          return "just now";
        }
        return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
      }
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `over ${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
    }
  };

  // Format sender name
  const formatSender = (reminder: Reminder): string => {
    if (reminder.name) return reminder.name;
    return reminder.from;
  };

  // Get sender initials for avatar
  const getSenderInitials = (reminder: Reminder): string => {
    if (reminder.name) {
      const nameParts = reminder.name.split(" ");
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return reminder.name.substring(0, 2).toUpperCase();
    }
    return reminder.from.substring(0, 2).toUpperCase();
  };

  // Truncate text - properly handle HTML content
  const truncateText = (text: string, length: number): string => {
    // Create a temporary div to parse the HTML and extract plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + "...";
  };

  // Filter reminders
  const filterReminders = (filterType: "all" | "unread"): void => {
    setActiveFilter(filterType);
    // In a real app, you would filter based on read/unread status
    setFilteredReminders(reminders);
  };

  // Get tag classname based on sender type
  const getTagClassname = (from: Reminder["from"]): string => {
    switch (from) {
      case "Administration":
        return "bg-red-900 text-red-300";
      case "Teacher":
        return "bg-green-900 text-green-300";
      case "Parent":
        return "bg-yellow-900 text-yellow-300";
      case "Student":
        return "bg-blue-900 text-blue-300";
      default:
        return "bg-gray-900 text-gray-300";
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      {/* Left sidebar - list of emails */}
      <div className="w-full md:w-1/2 lg:w-2/5 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <div className="flex mt-4">
            <button
              onClick={() => filterReminders("all")}
              className={`px-4 py-2 ${activeFilter === "all" ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-300 text-gray-800 rounded-l-md transition-colors`}
            >
              All mail
            </button>
            <button
              onClick={() => filterReminders("unread")}
              className={`px-4 py-2 ${activeFilter === "unread" ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-300 text-gray-800 rounded-r-md ml-1 transition-colors`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Reminders list */}
        <div className="flex-grow overflow-y-auto">
          {filteredReminders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No reminders found
            </div>
          ) : (
            filteredReminders.map((reminder) => (
              <div
                key={reminder.id}
                onClick={() => setSelectedReminder(reminder)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${selectedReminder?.id === reminder.id ? "bg-gray-100" : ""}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {getSenderInitials(reminder)}
                    </div>
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <div className="text-gray-900 font-medium">
                        {formatSender(reminder)}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {timeAgo(reminder.createdAt)}
                      </div>
                    </div>
                    <div className="font-medium">{reminder.subject}</div>
                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {truncateText(reminder.message, 60)}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          reminder.from === "Administration"
                            ? "bg-red-100 text-red-800"
                            : reminder.from === "Teacher"
                              ? "bg-green-100 text-green-800"
                              : reminder.from === "Parent"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {reminder.from.toLowerCase()}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded">
                        work
                      </span>
                      {reminder.subject.toLowerCase().includes("important") && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded">
                          important
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right panel - email content */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5">
        {selectedReminder ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {getSenderInitials(selectedReminder)}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {formatSender(selectedReminder)}
                    </h2>
                    <div className="text-gray-700 text-sm">
                      {selectedReminder.subject}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Reply-To:{" "}
                      {selectedReminder.email ||
                        `${selectedReminder.from.toLowerCase()}../..school.edu`}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500">
                  {/* {formatDate(selectedReminder.createdAt)} */}
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-grow overflow-y-auto p-6">
              <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedReminder.message }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                ></path>
              </svg>
              <p className="mt-4">Select a reminder to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
