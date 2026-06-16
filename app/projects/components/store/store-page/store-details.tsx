"use client";
import { StoreDetailsType } from "@/app/lib/types";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import FollowStore from "../cards/follow-store";
import { useState } from "react";

export default function StoreDEetails({
  details,
}: {
  details: StoreDetailsType;
}) {
  const { averageRating, cover, description, logo, name, numReviews } = details;
  const numOfReviews = new Intl.NumberFormat().format(numReviews);
  const [followersCount, setFollowersCount] = useState<number>(
    details._count.followers,
  );

  return (
    <div className="relative w-full pb-28">
      <div className="relative">
        <Image
          src={cover}
          alt={name}
          width={2000}
          height={500}
          className="h-44 w-full rounded-b-2xl object-cover md:h-96"
        />
        <div className="absolute -bottom-[140px] left-2 flex flex-col md:w-[calc(100%-1rem)] md:flex-row md:items-center md:justify-between">
          <div className="flex">
            <Image
              src={logo}
              alt={name}
              width={200}
              height={200}
              className="h-28 w-28 rounded-full object-cover shadow-2xl md:h-44 md:w-44"
            />
            <div className="ml-1 mt-9 md:mt-14">
              <div className="flex items-center gap-x-1">
                <h1 className="text-md line-clamp-1 font-bold capitalize leading-5">
                  {name.toLowerCase()}
                </h1>
                <CircleCheckBig className="mt-0.5 stroke-green-400" />
              </div>
              <div className="flex items-center gap-x-1">
                <div className="text-sm leading-5">
                  <strong>100%</strong>
                  <span> Positive Feedback</span> <br />
                  <strong>{followersCount}</strong>
                  <strong>
                    {followersCount > 1 ? " Followers" : " Follower"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-full justify-end md:ml-0 md:w-fit">
            <FollowStore
              id={details.id}
              isUserFollowingStore={details.isUserFollowingStore}
              setFollowersCount={setFollowersCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
