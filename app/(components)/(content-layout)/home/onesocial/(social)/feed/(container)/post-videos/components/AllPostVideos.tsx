'use client'
import DropzoneFormInput from '../../../../../components/form/DropzoneFormInput'
import { getAllPostVideos } from '../../../../../helpers/data'
import { useFetchData } from '../../../../../hooks/useFetchData'
import useToggle from '../../../../../hooks/useToggle'
import type { VideoType } from '../../../../../types/data'
import { timeSince } from '../../../../../utils/date'
import Image from 'next/image'
import Link from 'next/link'
import { BsCameraReels, BsPatchCheckFill, BsPlayFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'

const VideoCard = ({ video }: { video: VideoType }) => {
  const { title, views, image, user, isVerified, time, uploadTime } = video
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative">
        {image && (
          <Image 
            className="w-full h-48 object-cover" 
            src={image} 
            alt={title}
            width={400}
            height={192}
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
            <div className="w-8 h-8 mr-2">
              <Image 
                className="w-full h-full rounded-full object-cover" 
                src={user.avatar} 
                alt={user.name}
                width={32}
                height={32}
              />
            </div>
          )}
          <h6 className="font-medium text-gray-800 dark:text-white">
            <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
              {user?.name}
              {isVerified && (
                <BsPatchCheckFill className="inline ml-1 text-green-500" size={14} />
              )}
            </Link>
          </h6>
          <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            {views}
          </span>
        </div>
        
        {/* Video Title */}
        <h6 className="font-semibold text-gray-800 dark:text-white">
          <Link href="/feed/post-videos" className="hover:text-blue-500 dark:hover:text-blue-400">
            {title}
          </Link>
        </h6>
      </div>
    </div>
  )
}

const AllPostVideos = () => {
  const allVideos = useFetchData(getAllPostVideos)
  const { isTrue: isOpen, toggle } = useToggle()
  const [activeTab, setActiveTab] = useState('tab-1')

  const tabs = [
    { id: 'tab-1', label: 'Home' },
    { id: 'tab-2', label: 'Live' },
    { id: 'tab-3', label: 'Show' },
    { id: 'tab-4', label: 'Saved video' },
  ]

  const VideoNotFound = () => {
    return (
      <div className="text-center my-8 py-8">
        <BsCameraReels className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
        <h4 className="mt-4 mb-4 text-gray-600 dark:text-gray-400">No video found</h4>
        <button
          onClick={toggle}
          className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium"
        >
          Click here to add
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Videos</h1>
          <button
            onClick={toggle}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium flex items-center"
          >
            <FaPlus className="mr-2" />
            Add video
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'tab-1' && allVideos && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allVideos.map((video, idx) => (
                  <VideoCard key={idx} video={video} />
                ))}
              </div>
            )}

            {activeTab === 'tab-2' && allVideos && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allVideos.slice(3, 4).map((video, idx) => (
                  <VideoCard key={idx} video={video} />
                ))}
              </div>
            )}

            {(activeTab === 'tab-3' || activeTab === 'tab-4') && (
              <VideoNotFound />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Create video</h5>
              <button
                onClick={toggle}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form>
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Add title here"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    rows={3}
                    placeholder="Add description here"
                    defaultValue={''}
                  />
                </div>

                {/* Dropzone */}
                <div className="mb-4">
                  <DropzoneFormInput
                    textClassName="mt-3"
                    showPreview
                    label="Upload videos"
                    text="Drag here or click to upload video."
                    icon={BsCameraReels}
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                onClick={toggle}
                className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium"
              >
                Post video
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllPostVideos