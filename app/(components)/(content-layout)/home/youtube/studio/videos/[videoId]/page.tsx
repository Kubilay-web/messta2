"use client";

import { useEffect, useState } from "react";
import { VideoView } from "../../../modules/studio/ui/views/video-view";



interface PageProps {
  params: { videoId: string };
}

const Page = ({ params }: PageProps) => {
  const { videoId } = params;

  const [video, setVideo] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/${videoId}`, { cache: "no-store" }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/videocategories`, { cache: "no-store" }),
        ]);

        if (!videoRes.ok) throw new Error("Failed to fetch video");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

        const videoData = await videoRes.json();
        const categoriesData = await categoriesRes.json();

        setVideo(videoData);
        setCategories(categoriesData.items ?? categoriesData);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (error || !video) return <p className="text-red-500">{error ?? "Video not found"}</p>;

  return <VideoView video={video} categories={categories} />;
};

export default Page;
