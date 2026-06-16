"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { FaMapMarkerAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function JobsCard({ jobs }) {
  const router = useRouter();
  const id = jobs?.id;
  const [skills, setSkills] = useState([]);
  const [jobBookmark, setJobBookmark] = useState([]);

  useEffect(() => {
    if (id) {
      fetchSkills();
      fetchBookmarks();
    }
  }, [id]);

  const fetchSkills = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/searchjobs/skills`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );
      const data = await res.json();
      console.log("skills---->", data);
      if (res.ok) setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      console.log("data--->", data);
      if (res.ok) setJobBookmark(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/bookmark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: jobs?.id }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Bookmarked");
        fetchBookmarks();
      } else toast.error(data.err);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnbookmark = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/unbookmark`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: jobs?.id }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Removed from bookmarks");
        fetchBookmarks();
      } else toast.error(data.err);
    } catch (err) {
      console.error(err);
    }
  };

  const isBookmarked = jobBookmark?.some((item) => item?.jobId === jobs?.id);

  const handleClick = () => {
    // router.push(`/job-portal/job/?slug=${jobs?.slug}`);

    router.push(`/home/jobs/job-details/${jobs?.slug}`);
  };

  return (
    <div className="mb-6 flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-md transition duration-300 hover:shadow-lg md:flex-row">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src={jobs?.company?.logoSecureUrl || "/default-logo.png"}
          alt="Company Logo"
          className="h-20 w-20 rounded-full border object-cover md:h-24 md:w-24"
        />
      </div>

      {/* Job Info */}
      <div className="flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h5
            onClick={handleClick}
            className="cursor-pointer text-xl font-semibold text-blue-600 hover:underline md:text-2xl"
          >
            {jobs?.title}
          </h5>

          <button
            onClick={isBookmarked ? handleUnbookmark : handleBookmark}
            className="flex items-center gap-1 text-blue-500 transition hover:text-blue-700"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            <span className="hidden sm:inline">
              {isBookmarked ? "Unbookmark" : "Bookmark"}
            </span>
          </button>
        </div>

        <div className="mt-1 text-gray-600">
          <span className="font-medium">{jobs?.company_id?.name}</span> ·{" "}
          <span className="inline-flex items-center gap-1">
            <FaMapMarkerAlt className="text-blue-500" />
            {jobs?.country?.name || "Unknown"}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>
            <strong>Type:</strong> {jobs?.job_type?.name}
          </span>
          <span>
            <strong>Experience:</strong> {jobs?.job_experience?.name}
          </span>
          <span>
            <strong>Posted:</strong> {moment(jobs?.createdAt).fromNow()}
          </span>
        </div>

        {/* Skills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((item) => (
            <span
              key={item?.skill?.id}
              className="rounded-full bg-green-100 px-3 py-1 text-sm text-blue-700"
            >
              {item?.skill?.name}
            </span>
          ))}
        </div>

        {/* Salary */}
        <div className="mt-4 font-semibold text-gray-800">
          <span>💰 Salary: </span>
          {jobs?.salary_mode === "custom" ? (
            <>${jobs?.custom_salary} /hr</>
          ) : (
            <>
              ${jobs?.min_salary} - ${jobs?.max_salary} /hr
            </>
          )}
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          {jobs?.featured && (
            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
              Featured
            </span>
          )}
          {jobs?.highlight && (
            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
              Highlight
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
