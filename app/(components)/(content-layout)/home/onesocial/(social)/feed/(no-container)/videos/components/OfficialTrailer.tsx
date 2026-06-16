import VideoPlayer from './VideoPlayer'
import type { VideoType } from '../../../../../types/data'
import Image from 'next/image'
import Link from 'next/link'
import { getAllTrendingVideos } from '../../../../../helpers/data'

const TrailerCard = ({ trailer }: { trailer: VideoType }) => {
  const { title, views, iframe, isVideoPlayer, user } = trailer
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
      {/* Video Container */}
      <div className="relative">
        {isVideoPlayer && <VideoPlayer />}
        {iframe && (
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
      <div className="p-4 relative">
        <h6 className="font-semibold text-gray-800 dark:text-white mb-3">
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
          
          <div>
            <h6 className="font-medium text-gray-800 dark:text-white text-sm leading-tight">
              <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
                {user?.name}
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

const OfficialTrailer = async () => {
  const allTrailers = await getAllTrendingVideos()
  
  return (
    <>
      {/* Header */}
      <div className="mt-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-0">Official Trailer</h5>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors sm:w-auto w-full">
            View more video
          </button>
        </div>
      </div>

      {/* Trailers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTrailers.slice(6, 9).map((trailer, idx) => (
          <TrailerCard key={idx} trailer={trailer} />
        ))}
      </div>
    </>
  )
}

export default OfficialTrailer