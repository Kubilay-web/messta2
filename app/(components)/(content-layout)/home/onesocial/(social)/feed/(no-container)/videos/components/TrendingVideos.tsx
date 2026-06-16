import { getAllTrendingVideos } from '../../../../../helpers/data'
import type { VideoType } from '../../../../../types/data'
import Image from 'next/image'
import Link from 'next/link'
import { BsPatchCheckFill, BsPlayFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

const VideoCard = ({ video }: { video: VideoType }) => {
  const { title, views, iframe, image, isVerified, time, user } = video
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
      {/* Video Thumbnail */}
      <div className="relative group">
        {image ? (
          <>
            <Image 
              className="w-full h-48 object-cover" 
              src={image} 
              alt={title}
              width={400}
              height={192}
            />
            
            {/* Play Button on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <Link 
                href="/feed/videos/details"
                className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <BsPlayFill size={24} />
              </Link>
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
        ) : (
          <div className="relative w-full pt-[56.25%]">
            <iframe 
              src={iframe} 
              title={title}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h6 className="font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
          <Link 
            href="/feed/videos/details" 
            className="hover:text-blue-500 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        </h6>
        
        {/* User Info */}
        <div className="flex items-center">
          {user?.avatar && (
            <div className="w-8 h-8 mr-3">
              <Image 
                className="w-full h-full rounded-full object-cover" 
                src={user.avatar} 
                alt={user.name}
                width={32}
                height={32}
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h6 className="font-medium text-gray-800 dark:text-white text-sm leading-tight truncate">
              <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                {user?.name}
                {isVerified && (
                  <BsPatchCheckFill className="ml-1.5 text-green-500" size={14} />
                )}
              </Link>
            </h6>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TrendingVideos = async () => {
  const allTrendingVideos = await getAllTrendingVideos()
  
  return (
    <>
      {/* Header */}
      <div className="mt-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-0">Trending</h5>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors sm:w-auto w-full">
            View more video
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {allTrendingVideos.slice(0, 6).map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </>
  )
}

export default TrendingVideos