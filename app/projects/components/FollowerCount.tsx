"use client";

import useFollowerInfo from "@/app/hooks/useFollowerInfo";
import { FollowerInfo } from "@/app/lib/types";
import { formatNumber } from "@/app/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowerCount({
  userId,
  initialState,
}: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">{formatNumber(data.followers)}</span>
    </span>
  );
}
