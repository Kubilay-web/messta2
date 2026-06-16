'use client'
import {
  BsBell,
  BsChatLeftTextFill,
  BsCheckSquare,
  BsGear,
  BsPencilSquare,
  BsPeople,
  BsSearch,
  BsSlashCircle,
  BsThreeDots,
  BsVolumeUpFill,
} from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import { useLayoutContext } from '../../../context/useLayoutContext'
import { FaSlidersH } from 'react-icons/fa'
import type { ChildrenType } from '../../../types/component'
import ProfilePanel from '../../../components/layout/ProfilePanel'
import { profilePanelLinksData1 } from '../../../assets/data/layout'
import Messaging from '../../../components/layout/Messaging'
import { useState } from 'react'

const FeedLayout = ({ children }: ChildrenType) => {
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
  const [isChatDropdownOpen, setIsChatDropdownOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen mt-7">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 -mx-4">
            {/* Left Sidebar - Hidden on mobile, shown in offcanvas */}
            <div className="w-full lg:w-1/4 px-4">
              <div className="flex items-center lg:hidden mb-4">
                <button
                  onClick={startOffcanvas.toggle}
                  className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  <FaSlidersH size={18} />
                </button>
                <span className="font-semibold text-gray-800 dark:text-white ml-3">My profile</span>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block">
                <ProfilePanel links={profilePanelLinksData1} />
              </div>

              {/* Mobile Offcanvas */}
              {startOffcanvas.open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  {/* Overlay */}
                  <div 
                    className="absolute inset-0 bg-black/50" 
                    onClick={startOffcanvas.toggle}
                  />
                  
                  {/* Offcanvas Panel */}
                  <div className="absolute inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                      <h5 className="font-semibold text-gray-800 dark:text-white">Profile Menu</h5>
                      <button
                        onClick={startOffcanvas.toggle}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <FaXmark size={20} />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <ProfilePanel links={profilePanelLinksData1} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 px-4">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Chat Button and Panel - Desktop only */}
      <div className="hidden lg:block">
        {/* Chat Button */}
        <button
          onClick={messagingOffcanvas.toggle}
          className="fixed right-5 bottom-5 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
          aria-label="Open chat"
        >
          <BsChatLeftTextFill size={20} />
        </button>

        {/* Chat Panel */}
        {messagingOffcanvas.open && (
          <div className="fixed inset-y-0 right-0 w-96 z-50">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/30"
              onClick={messagingOffcanvas.toggle}
            />
            
            {/* Chat Panel */}
            <div className="absolute inset-y-0 right-0 w-full bg-white dark:bg-gray-800 shadow-xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h5 className="font-semibold text-gray-800 dark:text-white">Messaging</h5>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <BsPencilSquare size={18} />
                  </button>
                  
                  {/* Chat Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsChatDropdownOpen(!isChatDropdownOpen)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <BsThreeDots size={18} />
                    </button>
                    
                    {isChatDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="py-1">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsCheckSquare size={18} className="mr-3" />
                            Mark all as read
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsGear size={18} className="mr-3" />
                            Chat setting
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsBell size={18} className="mr-3" />
                            Disable notifications
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsVolumeUpFill size={18} className="mr-3" />
                            Message sounds
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsSlashCircle size={18} className="mr-3" />
                            Block setting
                          </button>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BsPeople size={18} className="mr-3" />
                            Create a group chat
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={messagingOffcanvas.toggle}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FaXmark size={18} />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <form className="relative">
                  <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white"
                    placeholder="Search..."
                    aria-label="Search messages"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >
                    <BsSearch size={18} />
                  </button>
                </form>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <Messaging />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FeedLayout