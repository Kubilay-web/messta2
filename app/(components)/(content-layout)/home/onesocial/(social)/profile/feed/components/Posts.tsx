'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsChatFill,
  BsEnvelope,
  BsFlag,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsPencilSquare,
  BsPersonX,
  BsReplyFill,
  BsSendFill,
  BsShare,
  BsSlashCircle,
  BsThreeDots,
  BsXCircle,
} from 'react-icons/bs'

import logo13 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/13.svg'

import PostCard from '../../../../components/cards/PostCard'
import { getAllFeeds } from '../../../../helpers/data'
import Link from 'next/link'

const ActionMenu = ({ name }: { name?: string }) => {
  const [isOpen, setIsOpen] = useState(false)
 

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        aria-expanded={isOpen}
        aria-label="Post actions"
      >
        <BsThreeDots className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsBookmark className="mr-3 h-4 w-4 text-gray-400" />
              Save post
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsPersonX className="mr-3 h-4 w-4 text-gray-400" />
              Unfollow {name}
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsXCircle className="mr-3 h-4 w-4 text-gray-400" />
              Hide post
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsSlashCircle className="mr-3 h-4 w-4 text-gray-400" />
              Block
            </a>
            
            <div className="my-1 border-t border-gray-100" />
            
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsFlag className="mr-3 h-4 w-4 text-gray-400" />
              Report post
            </a>
          </div>
        </>
      )}
    </div>
  )
}

const ShareDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        aria-expanded={isOpen}
      >
        <BsReplyFill className="mr-2 h-4 w-4 rotate-180" />
        Share (3)
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsEnvelope className="mr-3 h-4 w-4 text-gray-400" />
              Send via Direct Message
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsBookmarkCheck className="mr-3 h-4 w-4 text-gray-400" />
              Bookmark
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsLink className="mr-3 h-4 w-4 text-gray-400" />
              Copy link to post
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsShare className="mr-3 h-4 w-4 text-gray-400" />
              Share post via …
            </a>
            
            <div className="my-1 border-t border-gray-100" />
            
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <BsPencilSquare className="mr-3 h-4 w-4 text-gray-400" />
              Share to News Feed
            </a>
          </div>
        </>
      )}
    </div>
  )
}

const Posts = async () => {
  const allPosts = await getAllFeeds()
  
  return (
    <div className="space-y-4">
      {/* First Post from PostCard */}
      {allPosts.slice(0, 1).map((post, idx) => (
        <PostCard {...post} key={idx} />
      ))}

      {/* Second Post */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Likes header */}
        <div className="border-b border-gray-100">
          <p className="px-4 py-2 text-sm text-gray-600">
            <BsHeartFill className="mr-1 inline-block h-4 w-4 text-red-500" />
            Sam Lanson likes this post
          </p>
        </div>

        {/* Post Header */}
        <div className="border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={logo13}
                    alt="Apple Education logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
              <div>
                <h6 className="text-sm font-semibold text-gray-900">
                  <Link href="#" className="hover:text-blue-600">
                    Apple Education
                  </Link>
                </h6>
                <p className="text-xs text-gray-500">9 November at 23:29</p>
              </div>
            </div>
            <ActionMenu name="Apple Education" />
          </div>
        </div>

        {/* Post Content */}
        <div className="px-6 py-4">
          <p className="text-gray-700">
            Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start recognition
            your first Apple Teacher badge today!
          </p>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-100 pt-3">
            <Link
              href="#"
              className="mb-2 flex items-center text-xs text-gray-600 hover:text-gray-900 sm:mb-0"
            >
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                <BsHeartFill className="h-2.5 w-2.5" />
              </span>
              Louis, Billy and 126 others
            </Link>
            <Link
              href="#"
              className="flex items-center text-xs text-gray-600 hover:text-gray-900"
            >
              <BsChatFill className="mr-1 h-4 w-4" />
              Comments (12)
            </Link>
          </div>
        </div>

        {/* Post Actions Footer */}
        <div className="border-t border-gray-100 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <Link
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <BsHeart className="mr-2 h-4 w-4" />
              Liked (56)
            </Link>
            
            <Link
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <BsChatFill className="mr-2 h-4 w-4" />
              Comments (12)
            </Link>
            
            <ShareDropdown />
            
            <Link
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <BsSendFill className="mr-2 h-4 w-4" />
              Send
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts