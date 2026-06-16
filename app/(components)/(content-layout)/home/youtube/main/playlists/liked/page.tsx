"use client";

import { Suspense, useEffect, useState } from "react";
import { LikedView } from "../../../modules/playlists/views/liked-view";
import { useSession } from "@/app/SessionProvider";

export const dynamic = "force-dynamic";

const Page = () => {
  const [likedVideos, setLikedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user}=useSession();
  const userId=user.id;

  const LIMIT = 20;

  // Veri çekme fonksiyonu
  const fetchLikedVideos = async () => {
    try {
      const response = await fetch(
        `/api/video/playlists/liked?userId=${userId}&limit=${LIMIT}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch liked videos");
      }
      const data = await response.json();
      setLikedVideos(data.items);
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde veriyi çek
  useEffect(() => {
    fetchLikedVideos();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {loading ? (
          <p>Loading liked videos...</p>
        ) : (
          <LikedView likedVideos={likedVideos} />
        )}
      </div>
    </Suspense>
  );
};

export default Page;
