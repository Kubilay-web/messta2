"use client";

import Image from "next/image";
import Link from "next/link";
import { BsHeartFill, BsChatFill } from "react-icons/bs";

interface FriendActivityCardProps {
  actor: {
    username: string;
    avatarUrl: string;
  };
  type: "like" | "comment";
  message: string;
  createdAt: string;
  postId: string;
}

const FriendActivityCard = ({
  actor,
  type,
  message,
  createdAt,
  postId,
}: FriendActivityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-3">
      {/* Avatar */}
      <div className="relative w-10 h-10 shrink-0">
        <Image
          src={actor.avatarUrl}
          alt={actor.username}
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {type === "like" ? (
            <BsHeartFill className="text-red-500" />
          ) : (
            <BsChatFill className="text-blue-500" />
          )}

          <Link
            href={`/profile/${actor.username}`}
            className="font-semibold hover:underline"
          >
            {actor.username}
          </Link>
        </div>

        <p className="text-sm text-gray-700 mt-1">{message}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString("tr-TR")}
          </span>

          <Link
            href={`/post/${postId}`}
            className="text-xs text-blue-600 hover:underline"
          >
            Gönderiyi Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendActivityCard;
