'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaCameraRetro, FaPlus } from 'react-icons/fa'


import GlightBox from '../../../components/GlightBox'
import { getAllMedia } from '../../../helpers/data'
import { toAlphaNumber } from '../../../utils/change-casing'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsChatFill,
  BsChatLeftTextFill,
  BsEnvelope,
  BsFlag,
  BsHandThumbsUpFill,
  BsHeartFill,
  BsLink,
  BsPencilSquare,
  BsPersonX,
  BsReplyFill,
  BsShare,
  BsSlashCircle,
  BsThreeDots,
  BsXCircle,
} from 'react-icons/bs'
import Link from 'next/link'

import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'



const ActionDropdown = () => {
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
              Unfollow lori ferguson
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

const Media = async () => {
  const mediaData = await getAllMedia()
  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col items-start justify-between border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center">
        <h5 className="mb-2 text-lg font-semibold text-gray-900 sm:mb-0">Photos</h5>
        <button 
          className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          data-bs-toggle="modal" 
          data-bs-target="#modalCreateAlbum"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Create album
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Add Photo Card */}
          <div className="relative flex h-full min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-gray-400 hover:bg-gray-50">
            <Link href="#" className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <FaCameraRetro className="mb-2 h-8 w-8 text-gray-400" />
              <h6 className="text-sm font-medium text-gray-600">Add photo</h6>
            </Link>
          </div>

          {/* Media Items */}
          {mediaData.map((media, idx) => (
            <div key={idx} className="group">
              {/* Image with Lightbox */}
              <GlightBox 
                href={media.image.src} 
                data-gallery="image-popup" 
                data-glightbox="description: .custom-desc2; descPosition: left;"
              >
                <div className="overflow-hidden rounded-lg">
                  <Image 
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    src={media.image} 
                    alt={media.title || 'Media image'} 
                    width={300}
                    height={200}
                  />
                </div>
              </GlightBox>

              {/* Stats */}
              <div className="mt-2 flex items-center space-x-4">
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-red-600">
                  <BsHeartFill className="mr-1 h-4 w-4 text-red-500" />
                  {toAlphaNumber(media.likes)}
                </Link>
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <BsChatLeftTextFill className="mr-1 h-4 w-4" />
                  {toAlphaNumber(media.comments)}
                </Link>
              </div>

              {/* Lightbox Content */}
              <div className="glightbox-desc custom-desc2 z-5 hidden">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={avatar4}
                          alt="Lori Ferguson"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h6 className="text-sm font-semibold text-gray-900">Lori Ferguson</h6>
                        <span className="text-xs text-gray-500">2hr</span>
                      </div>
                      <p className="text-xs text-gray-600">Web Developer at StackBros</p>
                    </div>
                  </div>
                  <ActionDropdown />
                </div>

                <p className="mb-4 text-gray-700">
                  I&apos;m so privileged to be involved in the @bootstrap hiring process!{' '}
                  <Link href="#" className="text-blue-600 hover:underline">#internship #inclusivebusiness</Link>{' '}
                  <Link href="#" className="text-blue-600 hover:underline">#internship</Link>{' '}
                  <Link href="#" className="text-blue-600 hover:underline">#hiring</Link>{' '}
                  <Link href="#" className="text-blue-600 hover:underline">#apply</Link>
                </p>

                {/* Post Actions */}
                <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center space-x-4">
                    <Link href="#" className="flex items-center text-sm font-medium text-gray-900 hover:text-blue-600">
                      <BsHandThumbsUpFill className="mr-2 h-4 w-4" />
                      Liked (56)
                    </Link>
                    <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                      <BsChatFill className="mr-2 h-4 w-4" />
                      Comments (12)
                    </Link>
                  </div>
                  <ShareDropdown />
                </div>

                {/* Comment Input */}
                <div className="mb-4 flex">
                  <div className="mr-2 flex-shrink-0">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={avatar4}
                        alt="Your avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <form className="relative flex-1">
                    <textarea
                      className="w-full resize-none rounded-lg bg-gray-100 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={1}
                      placeholder="Add a comment..."
                      defaultValue=""
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      🙂
                    </button>
                  </form>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-2 flex-shrink-0">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={avatar5}
                          alt="Frances Guerrero"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg bg-gray-100 p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h6 className="text-sm font-semibold text-gray-900">
                              <Link href="#" className="hover:text-blue-600">Frances Guerrero</Link>
                            </h6>
                            <p className="mt-1 text-sm text-gray-700">
                              Removed demands expense account in outward tedious do.
                            </p>
                          </div>
                          <small className="text-xs text-gray-500">5hr</small>
                        </div>
                      </div>
                      
                      {/* Comment Actions */}
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                        <Link href="#" className="hover:text-gray-900">Like (3)</Link>
                        <Link href="#" className="hover:text-gray-900">Reply</Link>
                        <Link href="#" className="hover:text-gray-900">View 5 replies</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Media