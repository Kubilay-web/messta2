"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BsCheckLg,
  BsPersonAdd,
  BsPersonX,
  BsClock,
  BsPersonCheck,
  BsSearch,
  BsFilter,
  BsArrowRepeat,
} from "react-icons/bs";
import { useSession } from "@/app/SessionProvider";

interface Friend {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  mutualCount: number;
  status: "pending" | "accepted" | "rejected" | "requested";
  createdAt: string;
}

interface FriendRequest {
  id: string;
  userId: string;
  friendId: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
  };
  status: string;
  createdAt: string;
}

export default function FriendsPage() {
  const { user } = useSession();

  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "sent">(
    "friends"
  );
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [activeTab, user]);

  const fetchFriends = async () => {
    try {
      setLoading(true);

      const endpoints = {
        friends: "/api/onesocial/friends/list",
        requests: "/api/onesocial/friends/requests",
        sent: "/api/onesocial/friends/sent-requests",
      };

      const res = await fetch(endpoints[activeTab], {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();

      if (activeTab === "friends") setFriends(data.friends ?? []);
      if (activeTab === "requests") setRequests(data.requests ?? []);
      if (activeTab === "sent") setSentRequests(data.requests ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    const res = await fetch(`/api/onesocial/friends/accept/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      fetchFriends();
    }
  };

  const handleRejectRequest = async (id: string) => {
    const res = await fetch(`/api/onesocial/friends/reject/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleCancelRequest = async (id: string) => {
    const res = await fetch(`/api/onesocial/friends/cancels/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setSentRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/onesocial/friends/remove/${friendId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setFriends((prev) => prev.filter((f) => f.userId !== friendId));
    }
  };

  const filteredFriends = friends.filter(
    (f) =>
      f.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* -------------------- RENDER STATES -------------------- */

  // 1️⃣ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading friends...
      </div>
    );
  }

  // 2️⃣ Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
          href="/api/auth/signin"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Sign in
        </Link>
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Friends
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your connections
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-gray-900 p-1 rounded-xl border dark:border-gray-800 w-fit">
          {(["friends", "requests", "sent"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {tab === "friends" && "Friends"}
              {tab === "requests" && "Requests"}
              {tab === "sent" && "Sent"}
            </button>
          ))}
        </div>

        {/* Search */}
        {activeTab === "friends" && (
          <div className="relative mb-8 max-w-md">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search friends..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Friends */}
        {activeTab === "friends" &&
          (filteredFriends.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No friends found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-5 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden bg-gray-200">
                      {friend.avatarUrl ? (
                        <Image
                          src={friend.avatarUrl}
                          alt={friend.displayName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center font-semibold text-blue-600">
                          {friend.displayName[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {friend.displayName}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{friend.username}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFriend(friend.userId)}
                    className="mt-5 w-full py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                  >
                    Remove Friend
                  </button>
                </div>
              ))}
            </div>
          ))}

        {/* Requests */}
        {activeTab === "requests" &&
          (requests.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No pending requests
            </div>
          ) : (
            <div className="space-y-4 max-w-xl">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {r.user.displayName}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{r.user.username}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptRequest(r.id)}
                      className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(r.id)}
                      className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* Sent */}
        {activeTab === "sent" &&
          (sentRequests.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No sent requests
            </div>
          ) : (
            <div className="space-y-4 max-w-xl">
              {sentRequests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {r.user.displayName}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{r.user.username}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelRequest(r.id)}
                    className="px-4 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
