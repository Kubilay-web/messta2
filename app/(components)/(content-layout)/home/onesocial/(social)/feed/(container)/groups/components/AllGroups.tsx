'use client'
import ChoicesFormInput from '../../../../../components/form/ChoicesFormInput'
import { getAllGroups } from '../../../../../helpers/data'
import { useFetchData } from '../../../../../hooks/useFetchData'
import useToggle from '../../../../../hooks/useToggle'
import type { GroupType } from '../../../../../types/data'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { BsGlobe, BsLock, BsPeople } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { useState } from 'react'

import placeholderImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/placeholder.jpg'

const GroupCard = ({ group }: { group: GroupType }) => {
  const { image, logo, memberCount, members, name, ppd, type, isJoin } = group
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Group Cover Image */}
      <div 
        className="h-20 rounded-t-xl"
        style={{ 
          backgroundImage: `url(${image.src})`, 
          backgroundPosition: 'center', 
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat' 
        }}
      />
      
      {/* Group Info */}
      <div className="p-6 text-center pt-0">
        <div className="relative -mt-8 mb-4 inline-block">
          <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden">
            <Link href="/feed/groups/details">
              <Image 
                className="w-full h-full object-cover" 
                src={logo} 
                alt={name} 
              />
            </Link>
          </div>
        </div>
        
        <h5 className="font-semibold text-gray-800 dark:text-white mb-1">
          <Link href="/feed/groups/details" className="hover:text-blue-500 dark:hover:text-blue-400">
            {name}
          </Link>
        </h5>
        
        <small className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
          {type === 'Private' ? (
            <BsLock size={14} className="mr-1.5" />
          ) : (
            <BsGlobe size={15} className="mr-1.5" />
          )}
          {type} Group
        </small>
        
        {/* Stats */}
        <div className="flex items-center justify-center space-x-4 lg:space-x-6 mt-3">
          <div className="text-center">
            <h6 className="font-bold text-gray-800 dark:text-white text-lg">{memberCount}</h6>
            <small className="text-sm text-gray-600 dark:text-gray-400">Members</small>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <h6 className="font-bold text-gray-800 dark:text-white text-lg">{ppd}</h6>
            <small className="text-sm text-gray-600 dark:text-gray-400">Post per day</small>
          </div>
        </div>
        
        {/* Member Avatars */}
        <div className="flex items-center justify-center mt-3">
          <div className="flex -space-x-2">
            {members.map((avatar, idx) => (
              <div className="w-8 h-8" key={idx}>
                <Image 
                  className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src={avatar} 
                  alt="member"
                />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs text-white">+{Math.floor(Math.random() * 30)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
            isJoin
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
              : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
          }`}
        >
          {isJoin ? 'Leave' : 'Join'} group
        </button>
      </div>
    </div>
  )
}

const AllGroups = () => {
  const { isTrue: isOpen, toggle } = useToggle()
  const allGroups = useFetchData(getAllGroups)
  const [activeTab, setActiveTab] = useState('tab-1')
  const [groupType, setGroupType] = useState('public')

  const tabs = [
    { id: 'tab-1', label: "Friends' groups" },
    { id: 'tab-2', label: 'Suggested for you' },
    { id: 'tab-3', label: 'Popular near you' },
    { id: 'tab-4', label: 'More suggestions' },
  ]

  const GroupNotFound = () => {
    return (
      <div className="text-center my-8 py-8">
        <BsPeople className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
        <h4 className="mt-4 mb-4 text-gray-600 dark:text-gray-400">No group found</h4>
        <button
          onClick={toggle}
          className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium"
        >
          Click here to add
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Main Container */}
      <div>
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-4">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="lg:w-1/6">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Group</h1>
              </div>
              
              <div className="lg:w-2/6 lg:ml-auto">
                <ChoicesFormInput
                  options={{ searchEnabled: false }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  data-search-enabled="false"
                >
                  <option value="AB">Alphabetical</option>
                  <option value="NG">Newest group</option>
                  <option value="RA">Recently active</option>
                  <option value="SG">Suggested</option>
                </ChoicesFormInput>
              </div>
              
              <div className="lg:w-2/6">
                <button
                  onClick={toggle}
                  className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium flex items-center justify-center"
                >
                  <FaPlus className="mr-2" />
                  Create group
                </button>
              </div>
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
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          {activeTab === 'tab-1' && allGroups && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allGroups.slice(0, 5).map((group, idx) => (
                <GroupCard key={idx} group={group} />
              ))}
            </div>
          )}
          
          {activeTab === 'tab-2' && allGroups && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allGroups.slice(5, 8).map((group, idx) => (
                <GroupCard key={idx} group={group} />
              ))}
            </div>
          )}
          
          {(activeTab === 'tab-3' || activeTab === 'tab-4') && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <GroupNotFound />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Create Group</h5>
              <button
                onClick={toggle}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form>
                {/* Group Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Add Group name here" 
                  />
                </div>

                {/* Group Picture */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group picture
                  </label>
                  <div className="flex items-center">
                    <div className="mr-4 relative">
                      <div className="relative">
                        <input type="file" id="avatarUpload" accept=".png, .jpg, .jpeg" className="hidden" />
                        <label 
                          htmlFor="avatarUpload"
                          className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700"
                        >
                          <FaPencil size={14} />
                        </label>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow overflow-hidden">
                        <Image
                          id="avatar-preview"
                          className="w-full h-full object-cover"
                          src={placeholderImg}
                          alt="Group avatar"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select audience
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="groupType"
                        value="public"
                        checked={groupType === 'public'}
                        onChange={(e) => setGroupType(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Public</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="groupType"
                        value="private"
                        checked={groupType === 'private'}
                        onChange={(e) => setGroupType(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Private</span>
                    </label>
                  </div>
                </div>

                {/* Invite Friend */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Invite friend
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Add friend name here" 
                  />
                </div>

                {/* Group Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group description
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    rows={3} 
                    placeholder="Description here" 
                    defaultValue={''} 
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium"
              >
                Create now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllGroups