// app/notifications/page.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { timeSince } from '@/app/lib/date'
import Image from 'next/image'
import {
  BsBell,
  BsBellSlash,
  BsCheckLg,
  BsThreeDots,
  BsTrash,
  BsVolumeMute,
  BsArrowRepeat,
  BsCheckAll
} from 'react-icons/bs'
import LoadMoreButton from './components/LoadMoreButton'
import { useSession } from '@/app/SessionProvider'

interface Notification {
  id: string
  title: string
  description?: string
  time: Date
  isRead: boolean
  isFriendRequest: boolean
  avatar?: string
  textAvatar?: {
    text: string
    variant: string
  }
}

interface ApiResponse {
  notifications: Notification[]
  hasMore: boolean
  totalCount: number
  unreadCount: number
}

const Notifications = () => {
  const { user } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [showHeaderDropdown, setShowHeaderDropdown] = useState(false)
  const limit = 20

  const avatarColors: Record<string, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-cyan-600',
  }

  // Bildirimleri fetch et
  const fetchNotifications = useCallback(async (reset = false) => {


    try {
      setLoading(true)
      const currentSkip = reset ? 0 : skip
      
      const response = await fetch(
        `/api/onesocial/notifications?limit=${limit}&skip=${currentSkip}`,
        {
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }

      const data: ApiResponse = await response.json()
      
      if (reset) {
        setNotifications(data.notifications)
      } else {
        setNotifications(prev => [...prev, ...data.notifications])
      }
      
      setHasMore(data.hasMore)
      setUnreadCount(data.unreadCount)
      setSkip(currentSkip + data.notifications.length)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }, [user, status, skip])

  // İlk yükleme
  useEffect(() => {
    fetchNotifications(true)
  }, [user])

  // Bildirimi okundu işaretle
  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/onesocial/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'markAsRead',
          notificationId
        })
      })

      // Local state'i güncelle
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      )
      
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  // Tümünü okundu işaretle
  const markAllAsRead = async () => {
    try {
      await fetch('/api/onesocial/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'markAllAsRead'
        })
      })

      // Local state'i güncelle
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      )
      
      setUnreadCount(0)
      setShowHeaderDropdown(false)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  // Bildirimi sil
  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch('/api/onesocial/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          notificationId
        })
      })

      // Local state'i güncelle
      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      )
      
      // Eğer silinen okunmamışsa count'u güncelle
      const deletedNotification = notifications.find(n => n.id === notificationId)
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
      
      setShowDropdown(null)
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  // Refresh bildirimler
  const refreshNotifications = () => {
    fetchNotifications(true)
  }

  // Dropdown'ları kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setShowDropdown(null)
        setShowHeaderDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Please sign in to view notifications
            </h2>
            <a
              href="/api/auth/signin"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
              <button
                onClick={refreshNotifications}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh"
              >
                <BsArrowRepeat size={18} />
              </button>
            </div>
            
            {/* Settings Dropdown */}
            <div className="relative dropdown-container">
              <button 
                onClick={() => setShowHeaderDropdown(!showHeaderDropdown)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <BsThreeDots size={20} />
              </button>
              
              {/* Dropdown Menu */}
              {showHeaderDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="py-1">
                    <button
                      onClick={markAllAsRead}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <BsCheckAll className="mr-3" size={18} />
                      Mark all read
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <BsBellSlash className="mr-3" size={18} />
                      Push notifications
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <BsBell className="mr-3" size={18} />
                      Email notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
                  <BsBell size={96} className="mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You're all caught up! Check back later for new notifications.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notification) => {
                  const isUnread = !notification.isRead
                  const avatarVariant = notification.textAvatar?.variant || 'primary'
                  
                  return (
                    <li 
                      key={notification.id} 
                      className={`
                        relative p-4 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-750
                        ${isUnread ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''}
                      `}
                      onClick={() => {
                        if (isUnread) {
                          markAsRead(notification.id)
                        }
                      }}
                    >
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={notification.avatar}
                                alt=""
                                width={48}
                                height={48}
                                className="object-cover rounded-full"
                              />
                            </div>
                          ) : notification.textAvatar ? (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${avatarColors[avatarVariant]}`}>
                              <span className="text-white font-bold">
                                {notification.textAvatar.text}
                              </span>
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                              <BsBell className="text-white" size={20} />
                            </div>
                          )}
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notification.description ? 'mb-0' : 'mb-2'} text-gray-800 dark:text-gray-200`}>
                            {notification.title}
                          </p>
                          
                          {notification.description && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.description}
                            </div>
                          )}
                          
                          {/* Friend Request Actions */}
                          {notification.isFriendRequest && (
                            <div className="flex gap-2 mt-3">
                              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                                Accept
                              </button>
                              <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Time and Actions */}
                        <div className="flex flex-col items-end gap-3">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {timeSince(new Date(notification.time))}
                          </span>
                          
                          {/* Notification Actions Dropdown */}
                          <div className="relative dropdown-container">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowDropdown(showDropdown === notification.id ? null : notification.id)
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <BsThreeDots size={16} />
                            </button>
                            
                            {showDropdown === notification.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                <div className="py-1">
                                  {isUnread && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                      <BsCheckLg className="mr-3" size={16} />
                                      Mark as read
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <BsTrash className="mr-3" size={16} />
                                    Delete
                                  </button>
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <BsVolumeMute className="mr-3" size={16} />
                                    Mute notifications
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Unread Indicator */}
                      {isUnread && (
                        <div className="absolute top-4 left-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Load More Button */}
          {notifications.length > 0 && hasMore && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={() => fetchNotifications(false)}
                disabled={loading}
                className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Notifications