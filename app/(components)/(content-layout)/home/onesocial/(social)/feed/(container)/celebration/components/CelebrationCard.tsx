"use client"

import type { CelebrationType } from '../../../../../types/data'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BsBell, BsBellSlash, BsThreeDots, BsTrash } from 'react-icons/bs'
import { useState } from 'react'

const CelebrationCard = ({ celebration }: { celebration: CelebrationType }) => {
  const { title, user, isEvent, placeholder, textAvatar } = celebration
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="flex mb-3">
      {/* Avatar */}
      <div className="relative mr-3">
        <div className="w-14 h-14">
          {textAvatar ? (
            <div className="w-full h-full rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-600 font-bold">BV</span>
            </div>
          ) : (
            <>
              {user?.avatar && (
                <button className="w-full h-full">
                  <Image 
                    className="w-full h-full rounded-full object-cover" 
                    src={user.avatar} 
                    alt="avatar" 
                  />
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Status indicator */}
        {user?.status && (
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
        )}
        
        {/* Story border */}
        {user?.isStory && (
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -z-10"></div>
        )}
      </div>

      {/* Content */}
      <div className="ml-2 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="font-medium text-gray-800 dark:text-white">{title}</div>
          
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BsThreeDots size={18} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsTrash size={16} className="mr-3" />
                    Delete
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsBell size={16} className="mr-3" />
                    Turn off notification
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BsBellSlash size={16} className="mr-3" />
                    Mute Amanda Read
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event or Textarea */}
        {isEvent ? (
          <Link 
            href="/events/details" 
            className="inline-block mt-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md text-sm font-medium"
          >
            View event
          </Link>
        ) : (
          <div className="relative w-full mt-2">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
              rows={1}
              placeholder={placeholder}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CelebrationCard