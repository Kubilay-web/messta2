"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { UserInfo } from "@/app/queries/user";
import { formatNumbers } from "@/app/lib/utils";

interface Props {
  targetId: string;
  targetType: "question" | "answer";
  upvotes: number;
  downvotes: number;
}

const Votes = ({ targetId, targetType, upvotes, downvotes }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/vote/hasvoted?targetId=${targetId}&targetType=${targetType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        if (data.success) {
          setHasUpvoted(data.data.hasUpvoted);
          setHasDownvoted(data.data.hasDownvoted);
        }
      } catch (err) {
        toast.error("Failed to fetch vote status");
      }
    };

    fetchVoteStatus();
  }, [user, targetId, targetType]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      return toast.error("You must be logged in to vote.");
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetId,
            targetType,
            voteType,
          }),
        },
      );

      const result = await res.json();

      if (!result.success) {
        return toast.error(result.error || "Vote failed.");
      }

      // Gelen mesajı inceleyerek hangi işlem yapıldığını anla
      const msg = result.message;

      if (msg === "Vote removed.") {
        toast.success("Vote removed.");

        if (voteType === "upvote") {
          setHasUpvoted(false);
          setLocalUpvotes((prev) => prev - 1);
        } else {
          setHasDownvoted(false);
          setLocalDownvotes((prev) => prev - 1);
        }
      } else if (msg === "Vote updated.") {
        toast.success("Vote changed.");

        if (voteType === "upvote") {
          setHasUpvoted(true);
          setHasDownvoted(false);
          setLocalUpvotes((prev) => prev + 1);
          setLocalDownvotes((prev) => prev - 1);
        } else {
          setHasDownvoted(true);
          setHasUpvoted(false);
          setLocalDownvotes((prev) => prev + 1);
          setLocalUpvotes((prev) => prev - 1);
        }
      } else if (msg === "Vote created.") {
        toast.success("Vote added.");

        if (voteType === "upvote") {
          setHasUpvoted(true);
          setLocalUpvotes((prev) => prev + 1);
        } else {
          setHasDownvoted(true);
          setLocalDownvotes((prev) => prev + 1);
        }
      } else {
        toast.success("Vote processed.");
      }
    } catch (err) {
      toast.error("An error occurred while voting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      {/* Upvote */}
      <div className="flex-center gap-1.5">
        <Image
          src={
            hasUpvoted
              ? "/assets/stackoverflow/icons/upvoted.svg"
              : "/assets/stackoverflow/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="suble-medium text-dark400_light900">
            {formatNumbers(localUpvotes)}
          </p>
        </div>
      </div>

      {/* Downvote */}
      <div className="flex-center gap-1.5">
        <Image
          src={
            hasDownvoted
              ? "/assets/stackoverflow/icons/downvoted.svg"
              : "/assets/stackoverflow/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="suble-medium text-dark400_light900">
            {formatNumbers(localDownvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
