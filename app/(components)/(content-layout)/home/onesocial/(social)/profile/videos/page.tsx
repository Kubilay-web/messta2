"use client";

import { useEffect, useState } from "react";
import { BsChatLeftTextFill, BsHeartFill, BsPlayFill } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import GlightBox from "../../../components/GlightBox";
import { toAlphaNumber } from "../../../utils/change-casing";

const VideoCard = ({ comments, image, likes, time, muxPlaybackId }: any) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white">
      {/* Video Thumbnail Container */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <Image 
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            src={image} 
            alt="Video thumbnail" 
            width={300}
            height={192}
          />
        </div>
        
        {/* Play Button */}
        <div className="absolute right-3 top-3">
          <GlightBox 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600" 
            data-glightbox 
            href={`https://stream.mux.com/${muxPlaybackId}.m3u8`} // Mux video URL
          >
            <BsPlayFill className="h-5 w-5" />
          </GlightBox>
        </div>
        
        {/* Video Duration */}
        <div className="absolute bottom-0 left-0 flex w-full p-3">
          <span className="rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
            {time}
          </span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="px-0 pb-0 pt-3">
        <div className="flex items-center space-x-4">
          <Link 
            href="#" 
            className="flex items-center text-sm text-gray-600 hover:text-red-600"
          >
            <BsHeartFill className="mr-1.5 h-4 w-4 text-red-500" />
            {toAlphaNumber(likes)}
          </Link>
          <Link 
            href="#" 
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <BsChatLeftTextFill className="mr-1.5 h-4 w-4" />
            {toAlphaNumber(comments)}
          </Link>
        </div>
      </div>
    </div>
  )
}


const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/onesocial/videos");
        const data = await response.json();

        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {/* Add Video Card */}
          <div className="relative flex h-full min-h-[180px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-gray-400 hover:bg-gray-50">
            <Link
              href="#"
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              <FaCameraRetro className="mb-2 h-9 w-9 text-gray-400" />
              <h6 className="text-sm font-medium text-gray-600">Add Video</h6>
            </Link>
          </div>

          {/* Video Cards */}
          {videos.slice(0, 4).map((video, idx) => (
            <div key={idx}>
              <VideoCard
                comments={video.stats.comments}
                image={video.thumbnailUrl}
                likes={video.stats.likes}
                time={video.duration}
                muxPlaybackId={video.muxPlaybackId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 py-4"></div>
    </div>
  );
};

export default Videos;
