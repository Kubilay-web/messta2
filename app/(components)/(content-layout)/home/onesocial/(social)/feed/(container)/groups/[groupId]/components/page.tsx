'use client'
import Image from 'next/image'
import {
  BsBookmark,
  BsBookmarkCheck,
  BsCalendarDate,
  BsCalendarPlus,
  BsCameraReels,
  BsChatFill,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsFilm,
  BsFlag,
  BsGear,
  BsGlobe2,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsLock,
  BsPatchCheckFill,
  BsPencilSquare,
  BsPeople,
  BsPerson,
  BsPersonCheck,
  BsPersonCheckFill,
  BsPersonX,
  BsReplyFill,
  BsSendFill,
  BsShare,
  BsSlashCircle,
  BsThreeDots,
  BsXCircle,
} from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

import logo13 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/13.svg'
import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/02.jpg'
import avatar3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg'
import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'
import avatar6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/06.jpg'
import avatar7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg'
import avatar8 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/08.jpg'
import avatar9 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/09.jpg'
import avatar10 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/10.jpg'
import { useFetchData } from '@/app/(components)/(content-layout)/home/onesocial/hooks/useFetchData'
import { getAllFeeds } from '@/app/(components)/(content-layout)/home/onesocial/helpers/data'
import PostCard from '@/app/(components)/(content-layout)/home/onesocial/components/cards/PostCard'
import CreatePostCard from '@/app/(components)/(content-layout)/home/onesocial/components/cards/CreatePostCard'
import Link from 'next/link'
import { useState } from 'react'

const ActionMenu = ({ name }: { name?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <BsThreeDots size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsBookmark size={18} className="mr-3" />
              Save post
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsPersonX size={18} className="mr-3" />
              Unfollow {name}
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsXCircle size={18} className="mr-3" />
              Hide post
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsSlashCircle size={18} className="mr-3" />
              Block
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BsFlag size={18} className="mr-3" />
              Report post
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const AboutCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">About</h2>
      </div>
      <div className="p-6 relative">
        <p className="text-gray-600 dark:text-gray-300">
          He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
        </p>
        <ul className="space-y-2 mt-3">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <BsCalendarDate className="mr-3" size={16} />
            People: <strong className="ml-1">20 Members</strong>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <BsHeart className="mr-3" size={16} />
            Status: <strong className="ml-1">Public</strong>
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <BsGlobe2 className="mr-3" size={16} />
            <strong>stackbros.in</strong>
          </li>
        </ul>
      </div>
    </div>
  )
}

const AllGroupDetails = () => {
  const members = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10]
  const allPosts = useFetchData(getAllFeeds)
  const [activeTab, setActiveTab] = useState('group-tab-1')
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false)

  const tabs = [
    { id: 'group-tab-1', label: 'Feed' },
    { id: 'group-tab-2', label: 'About' },
    { id: 'group-tab-3', label: 'Connections', badge: '230' },
    { id: 'group-tab-4', label: 'Media' },
    { id: 'group-tab-5', label: 'Videos' },
    { id: 'group-tab-6', label: 'Events' },
  ]

  const emptyStates = [
    { id: 'group-tab-2', icon: BsPerson, text: 'No about details' },
    { id: 'group-tab-3', icon: BsPeople, text: 'No connections found' },
    { id: 'group-tab-4', icon: BsFilm, text: 'No media found' },
    { id: 'group-tab-5', icon: BsCameraReels, text: 'No videos found' },
    { id: 'group-tab-6', icon: BsCalendarPlus, text: 'No events found' },
  ]

  const getEmptyState = (tabId: string) => {
    return emptyStates.find(state => state.id === tabId)
  }

  return (
    <div>
      {/* Group Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-4">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <div className="w-20 h-20">
                <Image className="w-full h-full object-cover rounded-lg" src={logo13} alt="logo" />
              </div>
            </div>
            <div className="md:ml-4 mt-2 md:mt-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                Apple Education
                <BsPatchCheckFill className="text-green-500 ml-2" size={16} />
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Private group</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">28.3K members</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start mt-4 md:mt-0 md:ml-auto">
              <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md text-sm font-medium flex items-center mr-2">
                <BsPersonCheckFill size={16} className="mr-2" />
                Joined
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium flex items-center mr-2">
                <FaPlus className="mr-2" size={14} />
                Invite
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsGroupMenuOpen(!isGroupMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 dark:bg-gray-700 text-white rounded-md"
                >
                  <BsThreeDots size={18} />
                </button>
                {isGroupMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BsBookmark size={18} className="mr-3" />
                        Share profile in a message
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BsFileEarmarkPdf size={18} className="mr-3" />
                        Save your profile to PDF
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BsLock size={18} className="mr-3" />
                        Lock profile
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BsGear size={18} className="mr-3" />
                        Profile settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Members Avatars */}
          <div className="flex items-center justify-center md:justify-start mt-4">
            <div className="flex -space-x-2">
              {members.map((member, idx) => (
                <div className="w-8 h-8" key={idx}>
                  <Image
                    className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                    src={member}
                    alt="member"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xs text-white">+19</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-3">
              Carolyn Ortiz, Frances Guerrero, and 20 joined group
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center md:justify-start px-6 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className="ml-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Feed Tab */}
        {activeTab === 'group-tab-1' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <CreatePostCard />
              {allPosts?.slice(0, 1).map((post, idx) => <PostCard key={idx} {...post} />)}
              
              {/* Custom Post Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 px-4 py-3 flex items-center">
                    <BsHeartFill className="text-red-500 mr-2" size={16} />
                    Sam Lanson likes this post
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-3">
                        <button className="w-full h-full">
                          <Image
                            className="w-full h-full rounded-full object-cover"
                            src={logo13}
                            alt="Apple Education"
                          />
                        </button>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-800 dark:text-white">
                          <Link href="#" className="hover:text-blue-500">Apple Education</Link>
                        </h6>
                        <p className="text-sm text-gray-500 dark:text-gray-400">9 November at 23:29</p>
                      </div>
                    </div>
                    <ActionMenu />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start
                    recognition your first Apple Teacher badge today!
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center">
                      <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-2">
                        <BsHeartFill size={10} />
                      </span>
                      Louis, Billy and 126 others
                    </Link>
                    <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center">
                      <BsChatFill className="mr-2" size={16} />
                      Comments (12)
                    </Link>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-4 grid grid-cols-4 gap-2">
                    <button className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      <BsHeart className="mr-2" size={18} />
                      <span className="text-sm">Liked (56)</span>
                    </button>
                    <button className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      <BsChatFill className="mr-2" size={18} />
                      <span className="text-sm">Comments (12)</span>
                    </button>
                    <button className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      <BsReplyFill className="transform rotate-180 mr-2" size={16} />
                      <span className="text-sm">Share (3)</span>
                    </button>
                    <button className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      <BsSendFill className="mr-2" size={16} />
                      <span className="text-sm">Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AboutCard />
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'group-tab-1' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            {(() => {
              const emptyState = getEmptyState(activeTab)
              if (emptyState) {
                const Icon = emptyState.icon
                return (
                  <div className="text-center my-8 py-8">
                    <Icon className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
                    <h4 className="mt-4 mb-4 text-gray-600 dark:text-gray-400">{emptyState.text}</h4>
                    <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium">
                      Click here to add
                    </button>
                  </div>
                )
              }
              return null
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllGroupDetails