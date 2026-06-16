"use client";
import { followProfile, unfollowProfile } from "../actions";
import { FollowerInstagram } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinus2Icon, UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
  profileIdToFollow,
  ourFollow = null,
}: {
  profileIdToFollow: string;
  ourFollow: FollowerInstagram | null;
}) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          // unfollow
          await unfollowProfile(profileIdToFollow);
        } else {
          // follow
          await followProfile(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <button
        className={
          "flex items-center gap-2 px-4 py-2 text-black rounded-md text-lg " +
          (isFollowed
            ? "bg-gradient-to-tr from-orange-400 to-red-500 via-orange-400" // Takip ediliyorsa
            : "bg-gradient-to-tr from-orange-400 to-red-500 via-red-500") // Takip edilmiyorsa
        }
      >
        {isFollowed ? <UserMinusIcon /> : <UserPlusIcon />}
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
}
