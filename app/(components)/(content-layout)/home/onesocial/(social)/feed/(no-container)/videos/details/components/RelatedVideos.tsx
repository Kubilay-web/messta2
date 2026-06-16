import { getAllTrendingVideos } from '@/app/(components)/(content-layout)/home/onesocial/helpers/data'
import type { VideoType } from '@/app/(components)/(content-layout)/home/onesocial/types/data'
import Image from 'next/image'
import Link from 'next/link'
import { BsPlayFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

const VideoCard = ({ video }: { video: VideoType }) => {
  const { title, views, iframe, time, image } = video
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
      {/* Video Thumbnail */}
      <div className="relative group">
        {image && (
          <>
            <Image 
              className="w-full h-40 object-cover" 
              src={image} 
              alt={title}
              width={400}
              height={160}
            />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <BsPlayFill size={24} />
              </button>
            </div>
            
            {/* Time and Like Badges */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between">
              {time && (
                <span className="bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {time}
                </span>
              )}
              <span className="bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center">
                <FaHeart size={12} className="mr-1" />
              </span>
            </div>
          </>
        )}
        {iframe && (
          <div className="relative w-full pt-[56.25%]">
            <iframe 
              src="https://player.vimeo.com/video/151500895?h=68ba58e49a" 
              title="Vimeo video"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h6 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          <Link 
            href="/feed/videos/details" 
            className="hover:text-blue-500 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        </h6>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {views} views
        </span>
      </div>
    </div>
  )
}

const RelatedVideos = async () => {
  const allVideos = await getAllTrendingVideos()
  
  return (
    <div className="mb-6">
      {/* Title */}
      <div className="mt-4 mb-4">
        <h5 className="text-xl font-bold text-gray-800 dark:text-white">More related video</h5>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {allVideos.slice(0, 6).map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </div>
  )
}

export default RelatedVideos