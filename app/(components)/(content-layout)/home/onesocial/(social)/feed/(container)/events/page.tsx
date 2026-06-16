"use client"

import Link from 'next/link'
import AllEvents from './components/AllEvents'

import { useState } from 'react'



const Events = () => {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 mx-auto">
      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-2 md:mb-0">
              <strong className="text-green-800 dark:text-green-300">Upcoming event:</strong>{' '}
              <span className="text-green-700 dark:text-green-400">
                The learning conference on Sep 19 2024
              </span>
            </div>
            <div className="flex items-center">
              <Link 
                href="/event-details" 
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors"
              >
                View event
              </Link>
              <button
                onClick={() => setShowAlert(false)}
                className="ml-3 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <AllEvents />
    </div>
  )
}

export default Events