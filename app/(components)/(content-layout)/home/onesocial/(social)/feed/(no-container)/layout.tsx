'use client'
import { profilePanelLinksData2 } from '../../../assets/data/layout';
import ProfilePanel from '../../../components/layout/ProfilePanel';
import SimpleBar from "simplebar-react";
import { useLayoutContext } from '../../../context/useLayoutContext';
import useViewPort from '../../../hooks/useViewPort';
import type { ChildrenType } from '../../../types/component';
import { FaSlidersH } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

const Feed2Layout = ({ children }: ChildrenType) => {
  const { startOffcanvas } = useLayoutContext()
  const { width } = useViewPort()
  
  const isDesktop = width >= 992

  return (
    <main className="min-h-screen">
      <div className="flex">
        {/* Desktop Sidebar */}
        {isDesktop ? (
          <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <SimpleBar className="h-full">
              <div className="p-4">
                <ProfilePanel links={profilePanelLinksData2} />
              </div>
            </SimpleBar>
          </div>
        ) : (
          /* Mobile Toggle Button */
          <div className="lg:hidden p-4">
            <button
              onClick={startOffcanvas.toggle}
              className="flex items-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              type="button"
            >
              <FaSlidersH size={18} />
              <span className="font-semibold ml-2">My profile</span>
            </button>
          </div>
        )}

        {/* Mobile Offcanvas */}
        {!isDesktop && startOffcanvas.open && (
          <div className="fixed inset-0 z-50">
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
                <ProfilePanel links={profilePanelLinksData2} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Feed2Layout