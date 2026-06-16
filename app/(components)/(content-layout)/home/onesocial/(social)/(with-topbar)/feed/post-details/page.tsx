'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsBookmark, BsFlag, BsPersonX, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs'

import post1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/16by9/big/01.jpg'
import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import { getAllFeeds } from '../../../../helpers/data'
import UserComments from '../../../../components/UserComments'




const ActionMenu = ({ name }: { name?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Post options"
      >
        <BsThreeDots size={18} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="py-1">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BsBookmark className="mr-3" size={18} />
                Save post
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BsPersonX className="mr-3" size={18} />
                Unfollow {name}
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BsXCircle className="mr-3" size={18} />
                Hide post
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BsSlashCircle className="mr-3" size={18} />
                Block
              </a>
              
              <div className="border-t border-gray-100 my-1" />
              
              <a
                href="#"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BsFlag className="mr-3" size={18} />
                Report post
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const PostDetails = async () => {
  const allComments = await getAllFeeds()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Post Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Post Image */}
            <div className="relative w-full h-96 md:h-[500px]">
              <Image
                src={post1}
                alt="Post image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            {/* Post Content */}
            <div className="p-6 md:p-8">
              {/* Author Info */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Link href="#" className="block">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2">
                        <Image
                          src={avatar4}
                          alt="Lori Ferguson"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h6 className="font-semibold text-gray-900 dark:text-white">
                        <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                          Lori Ferguson
                        </Link>
                      </h6>
                      <span className="text-sm text-gray-500 dark:text-gray-400">• 2hr</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Web Developer at StackBros</p>
                  </div>
                </div>
                <ActionMenu name="Lori Ferguson" />
              </div>

              {/* Post Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Speedily say has suitable disposal add boy. On forth doubt miles of child.
              </h1>

              {/* Post Body */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished. 
                  Speedily say has suitable disposal add boy. On forth doubt miles of child.
                </p>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Comments
                </h3>
                {allComments.slice(0, 1).map((comment, idx) => (
                  <UserComments comment={comment} key={idx} showStats />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostDetails