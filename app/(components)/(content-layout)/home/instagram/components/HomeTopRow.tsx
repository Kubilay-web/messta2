import { getSessionEmailOrThrow } from "../actions";
import db from "@/app/lib/db";
import { FollowerInstagram, ProfileInstagram } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function HomeTopRow({
  follows,
  profiles,
}: {
  follows: FollowerInstagram[];
  profiles: ProfileInstagram[];
}) {
  return (
    <div className="-mx-4 pl-4 md:pl-0">
      <div className="flex gap-3 sm:justify-center w-full overflow-x-auto">
        <div>
          <div className="flex flex-col items-center">
            <Link href="/home/instagram/create">
              <button
                className="w-[92px] h-[92px] rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(to top right, #f58529, #dd2a7b)",
                }}
              >
                <PlusIcon size={42} className="text-white" />
              </button>
            </Link>
            <p className="text-center text-gray-600 text-sm mt-2">New Story</p>
          </div>
        </div>
        {profiles.map((profile) => (
          <div className="w-24 flex flex-col justify-center items-center">
            <div>
              <div
                className="inline-block p-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(to top right, #FFA500 50%, #FF5733 80%)",
                }}
              >
                <div className="inline-block p-0.5 bg-white dark:bg-black rounded-full">
                  <Avatar
                    size="6"
                    radius="full"
                    fallback={"avatar"}
                    src={profile.avatar || ""}
                  />
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm">
              {profile.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
