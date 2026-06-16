'use client'
import TinySlider from '@/app/(components)/(content-layout)/home/onesocial/components/TinySlider'
import { getAllPostVideos } from '@/app/(components)/(content-layout)/home/onesocial/helpers/data'
import { useFetchData } from '@/app/(components)/(content-layout)/home/onesocial/hooks/useFetchData'
import type { VideoType } from '@/app/(components)/(content-layout)/home/onesocial/types/data'
import { timeSince } from '@/app/(components)/(content-layout)/home/onesocial/utils/date'
import Image from 'next/image'
import Link from 'next/link'
import { renderToString } from 'react-dom/server'
import { BsPatchCheckFill, BsPlayFill } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { TinySliderSettings } from 'tiny-slider'

const VideoCard = ({ video }: { video: VideoType }) => {
  const { title, views, image, user, isVerified, time, uploadTime } = video
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative">
        {image && (
          <Image 
            className="w-full h-40 object-cover" 
            src={image} 
            alt={title}
            width={400}
            height={160}
          />
        )}
        
        {/* Play Button */}
        <div className="absolute top-3 right-3">
          <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <BsPlayFill size={20} />
          </button>
        </div>
        
        {/* Time Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          {time && (
            <span className="bg-black/70 px-2 py-1 rounded text-white text-xs">
              {time}
            </span>
          )}
          {uploadTime && (
            <span className="bg-black/70 px-2 py-1 rounded text-white text-xs">
              {timeSince(uploadTime)}
            </span>
          )}
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center mb-3">
          {user?.avatar && (
            <div className="w-6 h-6 mr-2">
              <Image 
                className="w-full h-full rounded-full object-cover" 
                src={user.avatar} 
                alt={user.name}
                width={24}
                height={24}
              />
            </div>
          )}
          <h6 className="font-medium text-gray-800 dark:text-white text-sm">
            <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
              {user?.name}
              {isVerified && (
                <BsPatchCheckFill className="inline ml-1 text-green-500" size={12} />
              )}
            </Link>
          </h6>
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-400">
            {views}
          </span>
        </div>
        
        {/* Video Title */}
        <h6 className="font-semibold text-gray-800 dark:text-white text-sm">
          <Link href="/feed/post-videos" className="hover:text-blue-500 dark:hover:text-blue-400">
            {title}
          </Link>
        </h6>
      </div>
    </div>
  )
}

const RelatedVideos = () => {
  const allVideos = useFetchData(getAllPostVideos)
  
  const videosSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: false,
    controls: true,
    edgePadding: 0,
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Related Videos</h2>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <div className="relative">
          {allVideos && (
            <TinySlider settings={videosSliderSettings} className="-mx-2">
              {allVideos?.map((video, idx) => (
                <div key={idx} className="px-2">
                  <VideoCard video={video} />
                </div>
              ))}
            </TinySlider>
          )}
        </div>
      </div>
    </div>
  )
}

export default RelatedVideos