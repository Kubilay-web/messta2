"use client";

import { useEffect, useMemo } from "react";
import PostCard from "../../../../../components/cards/PostCard";
import LoadMoreButton from "./LoadMoreButton";
import usePostStore, { Activity, Post } from "@/app/social-store/post";

/* =======================
   ACTIVITY CARD
======================= */
const ActivityCard = ({ activity }: { activity: Activity }) => {
  const handleClick = () => {
    const el = document.getElementById(`post-${activity.postId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring", "ring-blue-400", "ring-offset-2");
      setTimeout(() => {
        el.classList.remove("ring", "ring-blue-400", "ring-offset-2");
      }, 1500);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-start gap-3 bg-blue-50 dark:bg-gray-800 p-4 rounded-xl border border-blue-100 dark:border-gray-700 cursor-pointer hover:bg-blue-100/60 transition"
    >
      <img
        src={activity.actor.avatarUrl || "/default-avatar.png"}
        alt={activity.actor.username}
        className="w-9 h-9 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{activity.actor.username}</span>{" "}
          {activity.type === "like"
            ? "gönderiyi beğendi"
            : "gönderiye yorum yaptı"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(activity.createdAt).toLocaleString("tr-TR")}
        </p>
      </div>
    </div>
  );
};

/* =======================
   FEEDS
======================= */
const Feeds = () => {
  const { posts, activities, fetchPosts, fetchActivities } = usePostStore();

  useEffect(() => {
    fetchPosts();
    fetchActivities();
  }, []);

  /* =======================
     ACTIVITY → POST MAP
  ======================= */
  const activitiesByPostId = useMemo(() => {
    return activities.reduce<Record<string, Activity[]>>((acc, activity) => {
      if (!acc[activity.postId]) acc[activity.postId] = [];
      acc[activity.postId].push(activity);
      return acc;
    }, {});
  }, [activities]);

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const relatedActivities = activitiesByPostId[post.id] || [];

        return (
          <div key={post.id} className="space-y-3">
            {/* POST */}
            <div id={`post-${post.id}`}>
              <PostCard
                id={post.id}
                createdAt={post.createdAt}
                caption={post.text}
                photos={post.images}
                videos={post.videos}
                socialUser={{
                  id: post.user.id,
                  name: post.user.username,
                  avatar: post.user.avatarUrl,
                }}
                likesCount={post.likesCount}
                isVideo={false}
              />
            </div>

            {/* ACTIVITY’LER */}
            {relatedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        );
      })}

      <LoadMoreButton />
    </div>
  );
};

export default Feeds;
