"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

import { InfiniteScroll } from "../../../../components/infinite-scroll";
import { SubscriptionItem, SubscriptionItemSkeleton } from "../components/subscription-item";


const LIMIT = 30; // Sabit limit

export const SubscriptionsSection = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const query = cursor ? `?cursor=${cursor}&limit=${LIMIT}` : `?limit=${LIMIT}`;
      const res = await fetch(`/api/video/subscriptions${query}`);
      const data = await res.json();

      setSubscriptions((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  const handleUnsubscribe = async (creatorId: string) => {
    setUnsubscribing(creatorId);
    try {
      const res = await fetch(`/api/video/subscriptions/${creatorId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to unsubscribe");

      setSubscriptions((prev) => prev.filter((s) => s.creatorId !== creatorId));
      toast.success("Unsubscribed");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUnsubscribing(null);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {subscriptions.length === 0 && loading
          ? Array.from({ length: 8 }).map((_, i) => <SubscriptionItemSkeleton key={i} />)
          : subscriptions.map((subscription) => (
              <Link
                prefetch
                key={subscription.creatorId}
                href={`/home/youtube/main/users/${subscription.user.id}`}
              >
                <SubscriptionItem
                  name={subscription.user.name}
                  imageUrl={subscription.user.imageUrl}
                  subscriberCount={subscription.user.subscriberCount}
                  onUnsubscribe={() => handleUnsubscribe(subscription.creatorId)}
                  disabled={unsubscribing === subscription.creatorId}
                />
              </Link>
            ))
        }
      </div>

      <InfiniteScroll
        hasNextPage={hasMore}
        isFetchingNextPage={loading}
        fetchNextPage={fetchSubscriptions}
      />
    </>
  );
};
