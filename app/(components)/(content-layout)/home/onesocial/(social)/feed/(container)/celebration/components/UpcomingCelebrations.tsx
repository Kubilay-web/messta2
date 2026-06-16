"use client"

import CelebrationCard from './CelebrationCard'
import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBell, BsBellSlash, BsGeoAltFill, BsThreeDots, BsTrash } from 'react-icons/bs'

const UpcomingCelebrations = () => {
  const [allCelebrations, setAllCelebrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Verileri useEffect ile al
  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        // getAllCelebrations fonksiyonunu kullanmak için API endpoint'i çağır
        const response = await fetch('/api/celebrations')
        const data = await response.json()
        setAllCelebrations(data)
      } catch (error) {
        console.error('Error fetching celebrations:', error)
        setAllCelebrations([])
      } finally {
        setLoading(false)
      }
    }

    fetchCelebrations()
  }, [])

  // Veya örnek veriler kullanmak isterseniz:
  const sampleCelebrations = [
    {
      id: 1,
      date: "15 Feb",
      title: "Anniversary Celebration",
      location: "New York, USA",
      type: "anniversary"
    },
    {
      id: 2,
      date: "18 Feb",
      title: "Birthday Party",
      location: "London, UK",
      type: "birthday"
    },
    {
      id: 3,
      date: "20 Feb",
      title: "Company Milestone",
      location: "Tokyo, Japan",
      type: "milestone"
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 pb-0 border-b border-gray-200 dark:border-gray-700">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Celebration</h5>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading celebrations...</div>
        ) : (
          // API'den gelen verileri kullan
          allCelebrations.slice(5, 8).map((celebration, idx) => (
            <Fragment key={idx}>
              <CelebrationCard celebration={celebration} />
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
            </Fragment>
          ))
        )}

        {/* Veya örnek verileri kullanmak isterseniz:
        {sampleCelebrations.map((celebration, idx) => (
          <Fragment key={idx}>
            <CelebrationCard celebration={celebration} />
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
          </Fragment>
        ))} */}

        {/* Custom Event Card */}
        <div className="flex mb-3">
          {/* Date Avatar */}
          <div className="relative mr-3">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <div className="text-green-600 dark:text-green-400 font-bold text-center leading-tight">
                22 <br /> Feb
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="ml-2 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1">
                <Link 
                  className="block font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 mb-1"
                  href="#"
                >
                  International Conference on Cyber Law, Cybercrime & Cyber Security
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <BsGeoAltFill className="mr-1.5" size={12} />
                  19 School Lane, London, United Kingdom
                </p>
              </div>
              
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
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <BsTrash size={16} className="mr-3" />
                        Delete
                      </button>
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <BsBell size={16} className="mr-3" />
                        Turn off notification
                      </button>
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <BsBellSlash size={16} className="mr-3" />
                        Mute Amanda Read
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Join Button */}
            <Link 
              href="/events/details" 
              className="inline-block mt-3 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md text-sm font-medium"
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingCelebrations