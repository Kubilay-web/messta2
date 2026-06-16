"use client";

import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { Button } from "../../../../components/ui/button";
import { Skeleton } from "../../../../components/ui/skeleton";
import { UserAvatar } from "../../../../components/user-avatar";
import { useSubscription } from "../../../subscriptions/hooks/use-subscription";
import { SubscriptionButton } from "../../../subscriptions/ui/components/subscription-button";
import { useSession } from "@/app/SessionProvider";

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[60px] w-[60px] rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mt-3 rounded-full" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-start gap-4">
        <Skeleton className="h-[160px] w-[160px] rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48 mt-4" />
          <Skeleton className="h-10 w-32 mt-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const UserPageInfo = ({ users }) => {
  const { user } = useSession();
  const currentUserId = user?.id;

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

  const isCurrentUser = currentUserId === users.id;

  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size="lg"
            imageUrl={users.avatarUrl || "/assets/images/default-user.avif"}
            name={users.username}
            className="h-[60px] w-[60px]"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{users.username}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{users.subscriberCount} subscribers</span>
              <span>&bull;</span>
              <span>{users.videoCount} videos</span>
            </div>
          </div>
        </div>

        {isCurrentUser ? (
          <Button
            variant="secondary"
            asChild
            className="w-full mt-3 rounded-full"
          >
            <Link prefetch href="/home/youtube/studio">
              Go to studio
            </Link>
          </Button>
        ) : (
          <SubscriptionButton
            disabled={isPending}
            isSubscribed={users.viewerSubscribed}
            onClick={onClick}
            className="w-full mt-3"
          />
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-start gap-4">
        <UserAvatar
          size="xl"
          imageUrl={users.avatarUrl || "/assets/images/default-user.avif"}
          name={users.username}
          className={cn(
            isCurrentUser &&
              "cursor-pointer hover:opacity-80 transition-opacity duration-300"
          )}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{users.username}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <span>{users.subscriberCount} subscribers</span>
            <span>&bull;</span>
            <span>{users.videoCount} videos</span>
          </div>

          <div className="mt-5">
            {isCurrentUser ? (
              <Button variant="secondary" asChild className="mt-3 rounded-full">
                <Link prefetch href="/home/youtube/studio">
                  Go to studio
                </Link>
              </Button>
            ) : (
              <SubscriptionButton
                disabled={isPending}
                isSubscribed={users.viewerSubscribed}
                onClick={onClick}
                className="mt-3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
