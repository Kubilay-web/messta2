"use client";
import { followStore, UserInfo } from "@/app/queries/user";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageSquareMore, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Props {
  store: {
    id: string;
    url: string;
    name: string;
    logo: string;
    followersCount: number;
    isUserFollowingStore: boolean;
  };
}

const StoreCard: FC<Props> = ({ store }) => {
  const { id, name, logo, url, followersCount, isUserFollowingStore } = store;
  const [user, setUser] = useState<any>(null);
  const [following, setFollowing] = useState<boolean>(isUserFollowingStore);
  const [storeFollowersCount, setStoreFollowersCount] =
    useState<number>(followersCount);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  const handleStoreFollow = async () => {
    if (!user) router.push("/");
    try {
      const res = await followStore(id);
      setFollowing(res);
      if (res) {
        setStoreFollowersCount((prev) => prev + 1);
        toast.success(`You are now following ${name}`);
      }
      if (!res) {
        setStoreFollowersCount((prev) => prev - 1);
        toast.success(`You unfollowed ${name}`);
      }
    } catch (error) {
      toast.error("Something happend, Try again later !");
    }
  };

  return (
    <div className="mt-5 w-full">
      <div className="flex flex-col gap-5 rounded-xl bg-[#f5f5f5] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex">
          <Link href={`/store/${url}`}>
            <Image
              src={logo}
              alt={name}
              width={50}
              height={50}
              className="min-h-12 min-w-12 rounded-full object-cover"
            />
          </Link>
          <div className="mx-2">
            <div className="text-xl font-bold leading-6">
              <Link href={`/store/${url}`} className="text-main-primary">
                {name}
              </Link>
            </div>
            <div className="mt-1 text-sm leading-5">
              <strong>100%</strong>
              <span>Positive Feedback</span>&nbsp;|&nbsp;
              <strong>{storeFollowersCount}</strong>
              <strong> Followers</strong>
            </div>
          </div>
        </div>
        <div className="flex">
          <div
            className="mx-2 flex h-9 cursor-pointer items-center rounded-full border border-black px-4 text-base font-bold hover:bg-black hover:text-white"
            onClick={() => handleStoreFollow()}
          >
            {following ? (
              <Check className="me-1 w-4" />
            ) : (
              <Plus className="me-1 w-4" />
            )}
            <span>{following ? "Following" : "Follow"}</span>
          </div>
          <div className="mx-2 flex h-9 cursor-pointer items-center rounded-full border border-black px-4 text-base font-bold hover:bg-black hover:text-white">
            <MessageSquareMore className="me-2 w-4" />
            <span>Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
