"use client"

import Image from 'next/image'
import Link from 'next/link'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsChatFill,
  BsCodeSlash,
  BsEnvelope,
  BsEyeFill,
  BsFlag,
  BsHandThumbsUpFill,
  BsLink,
  BsLink45Deg,
  BsPatchCheckFill,
  BsPencilSquare,
  BsReplyFill,
  BsShare,
  BsSlashCircle,
  BsThreeDots,
  BsXCircle,
} from 'react-icons/bs'
import RelatedVideos from './components/RelatedVideos'
import UserComments from '../../../../../components/UserComments'
import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import { useState, useEffect } from 'react'

const PostVideoDetails = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)
  const [allComments, setAllComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Verileri useEffect ile al
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // getAllFeeds fonksiyonunu import et ve kullan
        const response = await fetch('/api/feeds') // veya uygun API endpoint
        const data = await response.json()
        setAllComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
        setAllComments([])
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  // Veya direkt örnek verilerle çalışmak isterseniz:
  const sampleComments = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: avatar1,
        verified: true
      },
      text: "Great video! Very informative.",
      time: "2 hours ago",
      likes: 245,
      replies: []
    }
  ]

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-4 mx-auto">
      {/* Main Video Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        {/* Video Player */}
        <div className="rounded-xl overflow-hidden mb-6">
          <iframe
            className="w-full h-[450px]"
            src="https://www.youtube.com/embed/n_Cn8eFo7u8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              What's it like to work at Google?
            </h1>
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <Image 
                  className="w-full h-full rounded-full object-cover" 
                  src={avatar1} 
                  alt="Frances Guerrero"
                  width={32}
                  height={32}
                />
              </div>
              <h6 className="font-medium text-gray-800 dark:text-white">
                <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
                  Frances Guerrero
                  <BsPatchCheckFill className="ml-1.5 text-green-500" size={14} />
                </Link>
              </h6>
            </div>
          </div>

          {/* Action Dropdown */}
          <div className="relative mt-3 sm:mt-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BsThreeDots size={20} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsBookmark size={18} className="mr-3" />
                    Save video
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsLink45Deg size={18} className="mr-3" />
                    Copy link
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsXCircle size={18} className="mr-3" />
                    Hide post
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsSlashCircle size={18} className="mr-3" />
                    Block
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsFlag size={18} className="mr-3" />
                    Report post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
          <Link href="#" className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            <BsHandThumbsUpFill size={18} className="mr-2" />
            Liked (23K)
          </Link>
          <Link href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <BsChatFill size={18} className="mr-2" />
            Comments (10K)
          </Link>
          <Link href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <BsEyeFill size={18} className="mr-2" />
            458M Views
          </Link>

          {/* Share Dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
            >
              <BsReplyFill className="transform rotate-180 mr-2" size={18} />
              Share (3K)
            </button>

            {isShareDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsEnvelope size={18} className="mr-3" />
                    Send via Direct Message
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsBookmarkCheck size={18} className="mr-3" />
                    Bookmark
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsLink size={18} className="mr-3" />
                    Copy link to post
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsShare size={18} className="mr-3" />
                    Share post via …
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsCodeSlash size={18} className="mr-3" />
                    Embed
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsPencilSquare size={18} className="mr-3" />
                    Share to News Feed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="flex my-4">
          <div className="w-8 h-8 mr-3">
            <Image 
              className="w-full h-full rounded-full object-cover" 
              src={avatar1} 
              alt="Your avatar"
              width={32}
              height={32}
            />
          </div>
          <form className="relative flex-1">
            <textarea
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              placeholder="Add a comment..."
              defaultValue={''}
            />
          </form>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading comments...</div>
          ) : (
            // API'den gelen verileri kullan
            allComments.slice(0, 1).map((comment, idx) => (
              <UserComments comment={comment} key={idx} />
            ))
          )}
          
          {/* Veya örnek verileri kullanmak isterseniz:
          {sampleComments.map((comment, idx) => (
            <UserComments comment={comment} key={idx} />
          ))} */}
        </div>
      </div>

      {/* Related Videos */}
      <RelatedVideos />
    </div>
  )
}

export default PostVideoDetails