'use client'
import useToggle from '../../../../hooks/useToggle'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

const LoadMoreButton = () => {
  const { isTrue: isLoadButton, toggle } = useToggle()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    toggle()
    setIsLoading(true)
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'relative inline-flex items-center justify-center rounded-lg bg-blue-50 px-6 py-3 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        { 'pointer-events-none opacity-80': isLoading }
      )}
      disabled={isLoading}
      aria-pressed={isLoadButton}
    >
      <span className={clsx('transition-all', { 'opacity-0': isLoading })}>
        Load more activity
      </span>
      
      <div className={clsx(
        'absolute inset-0 flex items-center justify-center transition-all',
        { 'opacity-0 scale-95': !isLoading, 'opacity-100 scale-100': isLoading }
      )}>
        {/* Spinner */}
        <svg
          className="h-5 w-5 animate-spin text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </button>
  )
}

export default LoadMoreButton