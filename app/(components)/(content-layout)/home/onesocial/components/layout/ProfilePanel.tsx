"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { currentYear, developedBy, developedByLink } from '../../context/constants'
import type { ProfilePanelLink } from '../../types/data'

import avatar7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg'
import bgBannerImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/bg/01.jpg'
import { useSession } from '@/app/SessionProvider';

type ProfilePanelProps = {
  links: ProfilePanelLink[]
}

type UserData = {
  id: string
  username: string
  displayName: string | null
  email: string
  avatarUrl: string | null
  googleId: string
  role: string
  rolejob: string
  bio?: string | null
  location?: string | null
  portfolio?: string | null
}

type UserStats = {
  posts: number
  friends: number
  friendRequests: number
  photos: number
  videos: number
  events: number
}

const ProfilePanel = ({ links }: ProfilePanelProps) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const {user}=useSession();

  // Kullanıcı verilerini fetch et
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('/api/onesocial/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })

        if (!response.ok) {
          console.warn('Failed to fetch user data, using default values')
          return
        }

        const data = await response.json()
        
        if (data.success) {
          setUserData(data.users)
          setStats(data.stats)
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Avatar URL'sini kontrol et
  const getAvatarUrl = () => {
    if (!loading && userData?.avatarUrl) {
      return userData.avatarUrl
    }
    return avatar7
  }

  // Kullanıcı adını kontrol et
  const getDisplayName = () => {
    if (!loading && userData?.displayName) {
      return userData.displayName
    }
    if (!loading && userData?.username) {
      return userData.username
    }
    return "Sam Lanson" // Default değer
  }

  // Bio veya rol bilgisini göster
  const getUserBio = () => {
    if (!loading && userData?.bio) {
      return userData.bio
    }
    if (!loading && userData?.rolejob) {
      // Rolejob'u formatla
      const roleMap: Record<string, string> = {
        'COMPANY': 'Company',
        'CANDIDATE': 'Candidate',
        'ADMIN': 'Admin'
      }
      return `${roleMap[userData.rolejob] || userData.rolejob}`
    }
    return "Web Developer at StackBros" // Default değer
  }

  // Format number
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
  }

  // Get stats or default values
  const getPostsCount = () => {
    if (!loading && stats?.posts !== undefined) {
      return formatNumber(stats.posts)
    }
    return "256" // Default değer
  }

  const getFollowersCount = () => {
    if (!loading && stats?.friends !== undefined) {
      return formatNumber(stats.friends)
    }
    return "2.5K" // Default değer
  }

  const getFollowingCount = () => {
    if (!loading && stats?.friendRequests !== undefined) {
      return formatNumber(stats.friendRequests)
    }
    return "365" // Default değer
  }

  // Bio text (varsa kullanıcı bio'su, yoksa default)
  const getBioText = () => {
    if (!loading && userData?.bio) {
      return userData.bio
    }
    return "I'd love to change the world, but they won't give me the source code."
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden">
        <div
          className="h-12 bg-cover bg-center"
          style={{ backgroundImage: `url(${userData?.avatarUrl})` }}
        />

        <div className="pt-0 px-4">
          <div className="text-center">
            <div className="flex justify-center -mt-6 mb-3">
              <div className="relative">
                <span role="button" className="cursor-pointer">
                  <div className="w-16 h-16 border-3 border-white rounded-full overflow-hidden">
                    {loading ? (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    ) : (
                      <Image 
                        src={getAvatarUrl()} 
                        alt="avatar" 
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </span>
              </div>
            </div>

            <h5 className="font-semibold text-lg mb-0">
              <Link href="#" className="hover:text-blue-600 transition-colors">
                {loading ? (
                  <div className="h-6 w-32 mx-auto bg-gray-200 animate-pulse rounded" />
                ) : (
                  getDisplayName()
                )}
              </Link>
            </h5>
            <div className="text-sm text-gray-600">
              {loading ? (
                <div className="h-4 w-40 mx-auto bg-gray-200 animate-pulse rounded mt-1" />
              ) : (
                getUserBio()
              )}
            </div>
            <div className="mt-3 text-gray-700">
              {loading ? (
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
              ) : (
                getBioText()
              )}
            </div>

            <div className="flex justify-center items-center gap-3 md:gap-6 my-4">
              <div className="text-center">
                <h6 className="font-bold text-lg mb-0">
                  {loading ? (
                    <div className="h-6 w-8 mx-auto bg-gray-200 animate-pulse rounded" />
                  ) : (
                    getPostsCount()
                  )}
                </h6>
                <p className="text-xs text-gray-500">Post</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <h6 className="font-bold text-lg mb-0">
                  {stats?.following}
                </h6>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-center">
                <h6 className="font-bold text-lg mb-0">
                    {stats?.followers}
                </h6>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <ul className="space-y-2">
            {links.map((item, idx) => (
              <li key={item.name + idx}>
                <Link 
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                  href={item.link}
                >
                  <div className="w-5 h-5 mr-2">
                    <Image 
                      src={item.image} 
                      alt="icon" 
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center py-3 border-t border-gray-200 mt-4">
          <Link 
            className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            href={`/home/onesocial/profile/${user.username}`}
          >
            View Profile
          </Link>
        </div>
      </div>
      
      <ul className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="/profile/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="/settings/account"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            target="_blank"
            rel="noreferrer"
            href={developedByLink}
          >
            Support
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            target="_blank"
            rel="noreferrer"
            href="#"
          >
            Docs
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="/help"
          >
            Help
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="/privacy-terms"
          >
            Privacy &amp; terms
          </Link>
        </li>
      </ul>

      <p className="text-xs text-center mt-4 text-gray-500">
        ©{currentYear}{' '}
        <a 
          className="text-gray-600 hover:text-blue-600 transition-colors"
          target="_blank"
          rel="noreferrer"
          href={developedByLink}
        >
          {developedBy}
        </a>
      </p>
    </>
  )
}

export default ProfilePanel