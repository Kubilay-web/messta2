"use client"

import type { EventType } from '../../types/data'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsBookmarkCheck, BsCalendarCheck, BsEnvelope, BsGeoAlt, BsPeople, BsPerson, BsShare, BsShareFill } from 'react-icons/bs'
import { FaThumbsUp } from 'react-icons/fa'

const EventCard = ({ attendees, category, date, image, location, title, label, id }: EventType) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative">
        <div className="relative h-48 w-full">
          <Image 
            className="object-cover" 
            src={image} 
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {label && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {label}
          </div>
        )}
      </div>

      <div className="p-4 relative">
        <Link 
          className="inline-block -mt-8 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded hover:bg-blue-600 transition-colors" 
          href="/event/details"
        >
          {category}
        </Link>
        
        <h5 className="mt-3 font-semibold text-lg">
          <Link 
            href={`/feed/events/${id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h5>

        <p className="mb-0 text-sm text-gray-600">
          <BsCalendarCheck size={17} className="inline mr-1" />
          {date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} at{' '}
          {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <BsGeoAlt size={17} className="inline mr-1" />
          {location}
        </p>

        <div className="flex items-center my-3">
          <div className="flex -space-x-2">
            {attendees.map((avatar, idx) => (
              <div 
                className="relative w-6 h-6 border-2 border-white rounded-full" 
                key={idx}
              >
                <Image 
                  className="rounded-full object-cover" 
                  src={avatar} 
                  alt="avatar"
                  width={24}
                  height={24}
                />
              </div>
            ))}
            <div className="relative w-6 h-6 border-2 border-white rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs text-white">+{Math.floor(Math.random() * 100)}</span>
            </div>
          </div>
          <span className="ml-3 text-sm text-gray-500">are attending</span>
        </div>

        <div className="flex mt-3 justify-between items-center">
          <div className="w-full mr-3">
            <input 
              type="checkbox" 
              className="hidden" 
              id={`Interested${id}`} 
            />
            <label 
              className="block w-full text-center px-3 py-1.5 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50 cursor-pointer transition-colors" 
              htmlFor={`Interested${id}`}
            >
              <span className="flex items-center justify-center gap-1">
                <FaThumbsUp size={12} className="mr-1" /> 
                Interested
              </span>
            </label>
          </div>
          
          <div className="relative">
            <button
              className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <BsShareFill />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsEnvelope size={18} className="mr-2" />
                    Send via Direct Message
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsBookmarkCheck size={18} className="mr-2" />
                    Share to News Feed
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsPeople size={18} className="mr-2" />
                    Share to a group
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsShare size={18} className="mr-2" />
                    Share post via …
                  </Link>
                  <div className="border-t my-1"></div>
                  <Link 
                    href="#" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BsPerson size={18} className="mr-2" />
                    Share on a friend&apos;s profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard