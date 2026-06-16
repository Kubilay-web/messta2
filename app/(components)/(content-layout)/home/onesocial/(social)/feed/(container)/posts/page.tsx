"use client";

import { useSession } from "@/app/SessionProvider";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsBookmark,
  BsBookmarkFill,
  BsSend,
} from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";

interface Post {
  id: string;
  text?: string;
  images: string[];
  createdAt: string | Date;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  comments: any[];
  React: any[];
  SavedPost: any[];
}

export default function PostList() {
  const { user } = useSession();
  const params = useParams<{ username?: string }>();
  const username = params?.username;

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  /* =======================
     FETCH POSTS
  ======================= */
  const fetchPosts = useCallback(async () => {
    if (loading) return;

    const fetchUsername = username || user?.username;
    if (!fetchUsername) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/onesocial/profile/${fetchUsername}/posts?page=${page}&limit=6&type=${activeTab}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (data.success) {
        setPosts((prev) =>
          page === 1 ? data.data.posts : [...prev, ...data.data.posts]
        );
        setHasMore(data.data.hasMore);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [username, user?.username, page, activeTab, loading]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* =======================
     LIKE
  ======================= */
  const handleReact = async (postId: string) => {
    await fetch("/api/onesocial/posts/react", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              React: post.React.some((r) => r.reactBy.id === user?.id)
                ? post.React.filter((r) => r.reactBy.id !== user?.id)
                : [...post.React, { reactBy: { id: user?.id } }],
            }
          : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-3">
      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => {
            setActiveTab("posts");
            setPage(1);
          }}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            activeTab === "posts"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          )}
        >
          <HiOutlinePhotograph /> Posts
        </button>

        <button
          onClick={() => {
            setActiveTab("saved");
            setPage(1);
          }}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            activeTab === "saved"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          )}
        >
          <BsBookmark /> Saved
        </button>
      </div>

      {/* POSTS */}
      <div className="space-y-6">
        {posts.map((post) => {
          const isLiked = post.React.some((r) => r.reactBy.id === user?.id);

          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 px-4 pt-4">
                <Image
                  src={post.user.avatarUrl || "/default-avatar.png"}
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-full"
                />
                <div>
                  <Link
                    href={`/${post.user.username}`}
                    className="font-semibold block"
                  >
                    {post.user.displayName}
                  </Link>
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              {/* TEXT */}
              {post.text && (
                <p className="px-4 pt-3 text-gray-800 dark:text-gray-200">
                  {post.text}
                </p>
              )}

              {/* IMAGES */}
              {post.images.length > 0 && (
                <div
                  className={clsx(
                    "mt-3 grid gap-1",
                    post.images.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  )}
                >
                  {post.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt=""
                      width={500}
                      height={500}
                      className="object-cover w-full max-h-[420px]"
                    />
                  ))}
                </div>
              )}

              {/* STATS */}
              <div className="flex justify-between px-4 py-2 text-sm text-gray-500">
                <span>{post.React.length} likes</span>
                <span>{post.comments.length} comments</span>
              </div>

              {/* ACTIONS */}
              <div className="flex border-t">
                <button
                  onClick={() => handleReact(post.id)}
                  className="flex-1 flex justify-center items-center gap-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isLiked ? (
                    <BsHeartFill className="text-red-500" />
                  ) : (
                    <BsHeart />
                  )}
                  Like
                </button>

                <button
                  onClick={() => setCommentingPostId(post.id)}
                  className="flex-1 flex justify-center items-center gap-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsChat /> Comment
                </button>

                <button className="flex-1 flex justify-center items-center gap-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {post.SavedPost.length ? <BsBookmarkFill /> : <BsBookmark />}
                  Save
                </button>
              </div>

              {/* COMMENT INPUT */}
              {commentingPostId === post.id && (
                <div className="flex items-center gap-2 p-4 border-t">
                  <Image
                    src={user?.avatarUrl || "/default-avatar.png"}
                    width={32}
                    height={32}
                    alt=""
                    className="rounded-full"
                  />
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 outline-none"
                  />
                  <button>
                    <BsSend />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="mt-8 w-full py-2 rounded bg-blue-600 text-white"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
