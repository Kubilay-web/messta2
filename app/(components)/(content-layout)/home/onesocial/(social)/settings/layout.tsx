'use client'
import { settingPanelLinksData } from '../../assets/data/layout'
import SettingPanel from '../../components/layout/SettingPanel'
import { useLayoutContext } from '../../context/useLayoutContext'
import useViewPort from '../../hooks/useViewPort'
import type { ChildrenType } from '../../types/component'
import { FaSlidersH } from 'react-icons/fa'
import { useState } from 'react'

const SettingLayout = ({ children }: ChildrenType) => {
  const { width } = useViewPort()
  const { startOffcanvas } = useLayoutContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden">
            <div className="mb-6 flex items-center">
              <button
                onClick={toggleSidebar}
                className="flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="button"
                aria-label="Open settings menu"
              >
                <FaSlidersH className="h-5 w-5" />
                <span className="ml-2 text-sm font-semibold">Settings</span>
              </button>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-8">
              <SettingPanel links={settingPanelLinksData} />
            </div>
          </div>

          {/* Mobile Offcanvas Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={toggleSidebar}
                aria-hidden="true"
              />

              {/* Sidebar Panel */}
              <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                  <button
                    onClick={toggleSidebar}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    aria-label="Close menu"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4">
                  <SettingPanel links={settingPanelLinksData} onClose={toggleSidebar} />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SettingLayout