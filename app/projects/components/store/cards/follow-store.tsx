"use client";
import { cn } from "@/app/lib/utils";
import { followStore, UserInfo } from "@/app/queries/user";
import { Check, MessageSquareMore, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

interface Props {
  id: string;
  isUserFollowingStore: boolean;
  setFollowersCount?: Dispatch<SetStateAction<number>>;
}

const FollowStore: FC<Props> = ({
  id,
  isUserFollowingStore,
  setFollowersCount,
}) => {
  const [following, setFollowing] = useState<boolean>(isUserFollowingStore);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleStoreFollow = async () => {
    if (!user.isSignedIn) router.push("/");
    try {
      setLoading(true);
      const res = await followStore(id);
      setFollowing(res);
      if (setFollowersCount) {
        if (res === true) {
          setFollowersCount((prev) => prev + 1);
        } else {
          setFollowersCount((prev) => prev - 1);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something happend, Try again later !");
    }
  };

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="w-fit md:w-96">
      <div className="flex items-center justify-between rounded-xl px-4 py-3">
        <div className="flex">
          <div
            className={cn(
              "mx-2 flex h-9 w-28 cursor-pointer items-center rounded-full border border-black bg-white px-4 text-base font-bold text-black hover:bg-black hover:text-white",
              {
                "w-32 bg-black text-white": following,
              },
            )}
            onClick={() => handleStoreFollow()}
          >
            {following ? (
              <>
                {loading ? (
                  <div className="flex w-full justify-center">
                    <PulseLoader size={5} color="#fff" />
                  </div>
                ) : (
                  <>
                    <Check className="me-1 w-4" />
                    <span>Following</span>
                  </>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <div className="flex w-full justify-center">
                    <PulseLoader size={5} />
                  </div>
                ) : (
                  <>
                    <Plus className="me-1 w-4" />
                    <span>Follow</span>
                  </>
                )}
              </>
            )}
          </div>
          <div className="mx-2 flex h-9 cursor-pointer items-center rounded-full border border-black bg-black px-4 text-base font-bold text-white">
            <MessageSquareMore className="me-2 w-4" />
            <span>Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowStore;
