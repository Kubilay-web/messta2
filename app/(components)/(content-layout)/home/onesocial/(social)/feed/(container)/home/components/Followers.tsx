'use client'
import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BsPersonCheckFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

interface SuggestionUser {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  role?: string
  workplace?: string
  mutualFollowers: number
  isFollowing: boolean
  hasRequested: {
    id: string
    status: string
    isIncoming: boolean
  } | null
  stats: {
    posts: number
    followers: number
    following: number
  }
}

const Followers = () => {
  const [users, setUsers] = useState<SuggestionUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [followingLoading, setFollowingLoading] = useState<Record<string, boolean>>({})
  const [friendRequestLoading, setFriendRequestLoading] = useState<Record<string, boolean>>({})

  // Takip önerilerini getir
  const fetchSuggestions = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/onesocial/suggestions?limit=5')
      const data = await response.json()

      if (data.success) {
        setUsers(data.users)
      } else {
        setError(data.error || 'Failed to fetch suggestions')
      }
    } catch (err) {
      setError('Network error')
      console.error('Fetch suggestions error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSuggestions()
  }, [fetchSuggestions])

  // Kullanıcıyı takip et/bırak
  const handleFollow = async (userId: string) => {
    try {
      setFollowingLoading(prev => ({ ...prev, [userId]: true }))
      
      const response = await fetch(`/api/onesocial/suggestions/${userId}/follow`, {
        method: 'POST',
      })
      
      const data = await response.json()

      if (data.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, isFollowing: data.following }
            : user
        ))
      }
    } catch (err) {
      console.error('Follow error:', err)
    } finally {
      setFollowingLoading(prev => ({ ...prev, [userId]: false }))
    }
  }

  // Arkadaşlık isteği gönder/iptal et
  const handleFriendRequest = async (userId: string) => {
    try {
      setFriendRequestLoading(prev => ({ ...prev, [userId]: true }))
      
      const user = users.find(u => u.id === userId)
      const hasRequest = user?.hasRequested
      
      if (hasRequest) {
        // İsteği iptal et
        const response = await fetch(`/api/onesocial/suggestions/${userId}/friend-request`, {
          method: 'DELETE',
        })
        
        const data = await response.json()
        
        if (data.success) {
          setUsers(prev => prev.map(user => 
            user.id === userId 
              ? { ...user, hasRequested: null }
              : user
          ))
        }
      } else {
        // Yeni istek gönder
        const response = await fetch(`/api/onesocial/suggestions/${userId}/friend-request`, {
          method: 'POST',
        })
        
        const data = await response.json()
        
        if (data.success) {
          setUsers(prev => prev.map(user => 
            user.id === userId 
              ? { 
                  ...user, 
                  hasRequested: data.request 
                    ? {
                        id: data.request.id,
                        status: data.request.status,
                        isIncoming: false
                      }
                    : null 
                }
              : user
          ))
        }
      }
    } catch (err) {
      console.error('Friend request error:', err)
    } finally {
      setFriendRequestLoading(prev => ({ ...prev, [userId]: false }))
    }
  }

  // Arkadaşlık isteğini kabul et
  const handleAcceptFriendRequest = async (userId: string, requestId: string) => {
    try {
      setFriendRequestLoading(prev => ({ ...prev, [userId]: true }))
      
      const response = await fetch(`/api/onesocial/suggestions/${userId}/friend-request`, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { 
                ...user, 
                hasRequested: data.request 
                  ? {
                      id: data.request.id,
                      status: 'accepted',
                      isIncoming: false
                    }
                  : null 
              }
            : user
        ))
      }
    } catch (err) {
      console.error('Accept friend request error:', err)
    } finally {
      setFriendRequestLoading(prev => ({ ...prev, [userId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 pb-0 border-b-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">Who to follow</h2>
        </div>
        <div className="p-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 mb-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => fetchSuggestions()}
            className="mt-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 pb-0 border-b-0">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">Who to follow</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {users.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No suggestions available</p>
        ) : (
          users.map((user) => (
            <div className="flex items-center gap-3 mb-4" key={user.id}>
              {/* Avatar */}
              <div className="relative">
                <Link href={`/profile/${user.username}`} className="w-10 h-10 block">
                  <Image 
                    className="w-full h-full rounded-full object-cover" 
                    src={user.avatar || '/default-avatar.png'} 
                    alt={user.name}
                    width={40}
                    height={40}
                  />
                </Link>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <Link 
                  className="block font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 truncate" 
                  href={`/profile/${user.username}`}
                >
                  {user.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.role || user.workplace || user.bio || 'User'}
                </p>
                {user.mutualFollowers > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {user.mutualFollowers} mutual follower{user.mutualFollowers !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="flex gap-2">
                {/* Follow/Unfollow Button */}
                {!user.hasRequested?.isIncoming && (
                  <button
                    onClick={() => handleFollow(user.id)}
                    disabled={followingLoading[user.id]}
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                      user.isFollowing
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    )}
                    aria-label={user.isFollowing ? "Following" : "Follow"}
                    title={user.isFollowing ? "Unfollow" : "Follow"}
                  >
                    {followingLoading[user.id] ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : user.isFollowing ? (
                      <BsPersonCheckFill size={14} />
                    ) : (
                      <FaPlus size={12} />
                    )}
                  </button>
                )}

            
              </div>
            </div>
          ))
        )}

        {/* View More Button */}
        {users.length > 0 && (
          <div className="mt-4">
            <button 
              onClick={() => fetchSuggestions()}
              className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh suggestions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Followers