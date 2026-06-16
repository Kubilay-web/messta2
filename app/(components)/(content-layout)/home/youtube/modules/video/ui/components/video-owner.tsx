import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { UserAvatar } from "../../../../components/user-avatar";
import { UserInfo } from "../../../user/ui/components/user-info";
import { SubscriptionButton } from "../../../subscriptions/ui/components/subscription-button";
import { VideoGetOneOutput } from "../../types";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const [isSubscribed, setIsSubscribed] = useState(user.viewerSubscribed);
  const [isPending, setIsPending] = useState(false);

  console.log("user---------------dsdf0",user)

  const handleSubscription = async () => {
    setIsPending(true);
    try {
      const res = await fetch(`/api/video/studio/videos/subscribed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error("Abonelik güncellenemedi");
      const data = await res.json();
      setIsSubscribed(data.isSubscribed);
    } catch (err) {
      console.error("Error updating subscription:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
      <Link prefetch href={`/home/youtube/main/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar size="lg" imageUrl={user.avatarUrl} name={user.username} /> 
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo size="lg" name={user.username} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {user.subscriberCount} subscribers
            </span>
          </div>
        </div>
      </Link>

      {user.isOwner ? (
        <Button variant="secondary" className="rounded-full" asChild>
          <Link prefetch href={`/home/youtube/studio/videos/${videoId}`}>Edit video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={handleSubscription}
          disabled={isPending}
          isSubscribed={isSubscribed}
          className="flex-none"
        />
      )}
    </div>
  );
};
