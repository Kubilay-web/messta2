'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import SimpleBar from "simplebar-react";
const Plyr = dynamic(() => import('plyr-react'))

import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar12 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/12.jpg'

import 'plyr-react/plyr.css'
import { BsBookmarkCheck, BsEnvelope, BsLink, BsPencilSquare, BsReplyFill, BsShare } from 'react-icons/bs'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { commentData } from '../data'
import Link from 'next/link'
import { timeSince } from '@/app/(components)/(content-layout)/home/onesocial/utils/date';
import LoadContentButton from '@/app/(components)/(content-layout)/home/onesocial/components/LoadContentButton';
import { useState } from 'react'

const Player = () => {
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState<'up' | 'down' | null>(null)

  return (
    <div className="flex flex-col lg:flex-row gap-0">
      {/* Left Column - Video Player */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white dark:bg-gray-800 rounded-l-xl lg:rounded-r-none shadow-lg border border-gray-200 dark:border-gray-700 p-0 h-full">
          {/* Video Player */}
          <div className="relative rounded-t-xl overflow-hidden">
            <Plyr
              crossOrigin="anonymous"
              controls
              source={{
                type: 'video',
                poster: '/videos/poster.jpg',
                sources: [{ src: '/videos/video-feed.mp4' }],
              }}
              options={{
                ratio: '16:9',
                fullscreen: { enabled: true },
                autoplay: false,
              }}
            />
          </div>

          {/* Video Info */}
          <div className="p-6">
            <div className="flex flex-col 2xl:flex-row 2xl:justify-between mb-6">
              <div className="mb-4 2xl:mb-0">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  New movie trailers (2021 - 2022) September
                </h4>
                <div className="flex items-center mt-3">
                  <div className="w-12 h-12 mr-3">
                    <Image 
                      className="w-full h-full rounded-full object-cover" 
                      src={avatar1} 
                      alt="Frances Guerrero"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-800 dark:text-white mb-0">
                      <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
                        Frances Guerrero
                      </Link>
                    </h6>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span>145.2K views</span>
                      <span>12 dec, 2022</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share and Reactions */}
              <div className="flex items-start space-x-3">
                {/* Share Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <BsReplyFill className="transform rotate-180 mr-2" size={18} />
                    Share (3)
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
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <BsPencilSquare size={18} className="mr-3" />
                          Share to News Feed
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reactions */}
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedReaction(selectedReaction === 'up' ? null : 'up')}
                    className={`flex items-center px-3 py-1.5 text-sm transition-colors ${
                      selectedReaction === 'up'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FaThumbsUp className="mr-1.5" size={14} />
                    457
                  </button>
                  <button
                    onClick={() => setSelectedReaction(selectedReaction === 'down' ? null : 'down')}
                    className={`flex items-center px-3 py-1.5 text-sm transition-colors border-l border-gray-200 dark:border-gray-700 ${
                      selectedReaction === 'down'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    01
                    <FaThumbsDown className="ml-1.5" size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300">
              He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of
              compliment alteration to. Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was
              lucky. Express besides it present if at an opinion visitor.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Comments */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white dark:bg-gray-800 rounded-r-xl lg:rounded-l-none shadow-lg border border-gray-200 dark:border-gray-700 h-full">
          {/* Comments Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white">3,664 Comments</h5>
          </div>

          {/* Comments List */}
          <div className="p-6 h-[400px]">
            <SimpleBar className="h-full">
              <div className="space-y-4">
                {commentData.map((item, idx) => (
                  <div className="comment-item" key={idx}>
                    <div className="flex">
                      <div className="w-8 h-8">
                        <button className="w-full h-full">
                          <Image 
                            className="w-full h-full rounded-full object-cover" 
                            src={item.avatar} 
                            alt={item.name}
                            width={32}
                            height={32}
                          />
                        </button>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h6 className="font-semibold text-gray-800 dark:text-white mb-1">
                              <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
                                {item.name}
                              </Link>
                            </h6>
                            <small className="text-xs text-gray-500 dark:text-gray-400">
                              {timeSince(item.createdAt)}
                            </small>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.comment}</p>
                        </div>
                        
                        {/* Comment Actions */}
                        <div className="flex items-center space-x-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                          <button className="hover:text-gray-700 dark:hover:text-gray-300">
                            Like{item.likeCount && ` (${item.likeCount})`}
                          </button>
                          <button className="hover:text-gray-700 dark:hover:text-gray-300">
                            Reply
                          </button>
                          {item.repliesCount && (
                            <button className="hover:text-gray-700 dark:hover:text-gray-300">
                              View {item.repliesCount} replies
                            </button>
                          )}
                        </div>

                        {/* Replies */}
                        {item.reply && (
                          <div className="ml-6 space-y-3 mt-3">
                            {item.reply.map((reply, replyIdx) => (
                              <div className="flex" key={replyIdx}>
                                <div className="w-6 h-6">
                                  <button className="w-full h-full">
                                    <Image 
                                      className="w-full h-full rounded-full object-cover" 
                                      src={reply.avatar} 
                                      alt={reply.name}
                                      width={24}
                                      height={24}
                                    />
                                  </button>
                                </div>
                                <div className="ml-2 flex-1">
                                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <h6 className="font-medium text-gray-800 dark:text-white text-sm mb-1">
                                        <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
                                          {reply.name}
                                        </Link>
                                      </h6>
                                      <small className="text-xs text-gray-500 dark:text-gray-400">
                                        {timeSince(reply.createdAt)}
                                      </small>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">{reply.comment}</p>
                                  </div>
                                  
                                  {/* Reply Actions */}
                                  <div className="flex items-center space-x-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                                    <button className="hover:text-gray-700 dark:hover:text-gray-300">
                                      Like {reply.likeCount && reply.likeCount}
                                    </button>
                                    <button className="hover:text-gray-700 dark:hover:text-gray-300">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Load More Replies */}
                            {item.reply && item.reply.length >= 2 && (
                              <div className="ml-4">
                                <LoadContentButton name="Load more replies" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Load More Comments */}
                <div className="pt-4">
                  <LoadContentButton name="Load more comments" />
                </div>
              </div>
            </SimpleBar>
          </div>

          {/* Add Comment Form */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <div className="w-8 h-8 mr-3">
                <button className="w-full h-full">
                  <Image 
                    className="w-full h-full rounded-full object-cover" 
                    src={avatar12} 
                    alt="Your avatar"
                    width={32}
                    height={32}
                  />
                </button>
              </div>
              <form className="relative flex-1">
                <textarea
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 dark:text-white"
                  rows={1}
                  placeholder="Add a comment..."
                  defaultValue={''}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  🙂
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player