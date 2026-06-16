"use client";

import { interestsData } from "./data";
import Image from "next/image";
import {
  BsBriefcase,
  BsCalendarDate,
  BsEnvelope,
  BsGeoAlt,
  BsHeart,
  BsPencilSquare,
  BsPlusCircleDotted,
  BsThreeDots,
  BsTrash,
} from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "@/app/SessionProvider";

const Interests = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
        <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
          See all
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interestsData.map((item, idx) => (
            <div key={idx} className="group relative flex items-center">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <h6 className="truncate text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  <Link href="#" className="absolute inset-0">
                    <span className="sr-only">View {item.name}</span>
                  </Link>
                  {item.name}
                </h6>
                <p className="truncate text-xs text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        <BsThreeDots className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsPencilSquare className="mr-3 h-4 w-4" />
              Edit
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsTrash className="mr-3 h-4 w-4" />
              Delete
            </a>
          </div>
        </>
      )}
    </div>
  );
};

const About = () => {
  const [profile, setProfile] = useState(null);
  const params = useParams();
  const { user } = useSession();
  const usernames = user.username;

  // API'den profil bilgilerini al

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `/api/onesocial/profile/${usernames}`
        );
        if (response.data.success) {
          setProfile(response.data.data.user);
        }
      } catch (error) {
        console.error("Profile bilgileri alınırken bir hata oluştu:", error);
      }
    };

    if (usernames) {
      fetchProfile();
    }
  }, [usernames]); // user.username değiştiğinde fetchProfile tekrar çalışır

  if (!profile) return <div>Loading...</div>; // Eğer profil verisi gelmemişse, yükleniyor mesajı göster

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Profile Info</h2>
        </div>
        <div className="p-6">
          {/* Overview Section */}
          <div className="mb-4 rounded-lg border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h6 className="text-sm font-medium text-gray-900">Overview</h6>
              <ActionDropdown />
            </div>
            <p className="text-sm text-gray-600">
              {profile.bio || "No bio available"}{" "}
              {/* Bio'nun API'den gelen değerini göster */}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Born */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                <BsCalendarDate className="mr-2 inline-block h-4 w-4 text-gray-400" />
                Born:{" "}
                <span className="ml-1 font-medium text-gray-900">
                  {profile.birthDate || "Unknown"}
                </span>
              </p>
              <ActionDropdown />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                <BsHeart className="mr-2 inline-block h-4 w-4 text-gray-400" />
                Status:{" "}
                <span className="ml-1 font-medium text-gray-900">
                  {profile.status || "Unknown"}
                </span>
              </p>
              <ActionDropdown />
            </div>

            {/* Job */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                <BsBriefcase className="mr-2 inline-block h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {profile.job || "No job information"}
                </span>
              </p>
              <ActionDropdown />
            </div>

            {/* Location */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                <BsGeoAlt className="mr-2 inline-block h-4 w-4 text-gray-400" />
                Lives in:{" "}
                <span className="ml-1 font-medium text-gray-900">
                  {profile.location || "Unknown"}
                </span>
              </p>
              <ActionDropdown />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-600">
                <BsEnvelope className="mr-2 inline-block h-4 w-4 text-gray-400" />
                Email:{" "}
                <span className="ml-1 font-medium text-gray-900">
                  {profile.email || "No email available"}
                </span>
              </p>
              <ActionDropdown />
            </div>

            {/* Add Workplace */}
            <Link
              href="#"
              className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50"
            >
              <BsPlusCircleDotted className="mr-2 h-5 w-5" />
              Add a workplace
            </Link>

            {/* Add Education */}
            <Link
              href="#"
              className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50"
            >
              <BsPlusCircleDotted className="mr-2 h-5 w-5" />
              Add a education
            </Link>
          </div>
        </div>
      </div>

      {/* Interests Card */}
      <Interests />
    </div>
  );
};

export default About;
