"use client";

import { useEffect, useState } from "react";
import { Separator } from "../../../../components/ui/separator";
import { UserPageBanner, UserPageBannerSkeleton } from "../components/user-page-banner";
import { UserPageInfo, UserPageInfoSkeleton } from "../components/user-page-info";

interface UserSectionProps {
  userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
  const [user, setUser] = useState<any>(null); // tekil user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/video/users?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        const extractedUser = data.items?.[0]?.data?.user;

        if (!extractedUser) {
          throw new Error("User not found");
        }

        setUser(extractedUser);

      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col">
        <UserPageBannerSkeleton />
        <UserPageInfoSkeleton />
        <Separator />
      </div>
    );
  }

  if (error || !user) {
    return <p className="text-red-500">Error: {error || "User not found"}</p>;
  }

  // user'ı props olarak users adıyla gönderiyoruz (komponent böyle istiyor)
  return (
    <div className="flex flex-col">
      <UserPageBanner users={user} />
      <UserPageInfo users={user} />
      <Separator />
    </div>
  );
};
