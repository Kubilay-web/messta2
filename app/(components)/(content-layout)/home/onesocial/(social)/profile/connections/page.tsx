'use client'

import clsx from 'clsx'
import Image from 'next/image'
import LoadMoreButton from './components/LoadMoreButton'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Connections = () => {
  const [connections, setConnections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const res = await fetch('/api/onesocial/connections?limit=5', {
        cache: 'no-store',
        credentials: 'include'
      })
      
      if (!res.ok) {
        console.error('Failed to fetch connections:', res.status)
        return
      }
      
      const data = await res.json()
      console.log('API Response:', data)
      
      if (data.success && data.data) {
        setConnections(data.data)
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
    } finally {
      setLoading(false)
    }
  }

  const mockMutualAvatars = [
    '/avatars/avatar1.jpg',
    '/avatars/avatar2.jpg',
    '/avatars/avatar3.jpg'
  ]

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Connections</h2>
        </div>
        <div className="p-6">
          <div className="animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6 last:mb-0 md:flex md:items-center">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Connections</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {connections.length > 0 ? (
          connections.map((connection) => (
            <div 
              key={connection.id} 
              className="mb-6 last:mb-0 md:flex md:items-center"
            >
              {/* Avatar */}
              <div className="mb-4 md:mb-0 md:mr-4">
                <Link 
                  href={`/profile/${connection.user?.username || 'user'}`} 
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={connection.user?.avatar || '/default-avatar.png'}
                      alt={connection.user?.name || 'User avatar'}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                </Link>
              </div>

              {/* User Info */}
              <div className="flex-1">
                {/* Name and Role */}
                <div className="mb-2 flex flex-col sm:flex-row sm:items-start">
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                    <Link 
                      href={`/profile/${connection.user?.username || 'user'}`} 
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {connection.user?.name || 'Unknown User'}
                    </Link>
                  </h6>
                  {connection.user?.role && (
                    <span className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300 sm:mt-0 sm:ml-2">
                      {connection.user.role}
                    </span>
                  )}
                </div>

                {/* Shared Connections and Description */}
                <div className="flex flex-wrap items-center">
                  {/* Mutual Friends */}
                  <div className="mb-2 mr-3 flex items-center md:mb-0">
                    <div className="-space-x-2 flex">
                      {mockMutualAvatars.slice(0, 3).map((avatar, idx) => (
                        <div 
                          key={idx} 
                          className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-white dark:border-gray-800"
                        >
                          <Image
                            src={avatar}
                            alt={`Mutual friend ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="24px"
                          />
                        </div>
                      ))}
                      {connection.mutualFriends > 3 && (
                        <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 dark:border-gray-800">
                          <span className="text-xs font-medium text-white">
                            +{connection.mutualFriends - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {connection.mutualFriends || 0} mutual friend{connection.mutualFriends !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {/* Bio/Location */}
                  <p className={clsx(
                    'text-xs text-gray-600 dark:text-gray-300',
                    { 'mt-2 md:mt-0': connection.user?.bio || connection.user?.location }
                  )}>
                    {connection.user?.bio && (
                      <span className="mr-2">{connection.user.bio}</span>
                    )}
                    {connection.user?.location && (
                      <span className="flex items-center">
                        <svg className="mr-1 h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {connection.user.location}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex md:mt-0 md:ml-auto">
                <button className="mr-2 rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30">
                  Remove
                </button>
                <button className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30">
                  Message
                </button>
              </div>
            </div>
          ))
        ) : (
          // Boş durum
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">No connections yet</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Connect with people to see them here
            </p>
            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Find Connections
            </button>
          </div>
        )}

        {/* Load More Button */}
        {connections.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link href="/connections">
              <LoadMoreButton />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Connections