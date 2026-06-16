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
    
    // Simüle edilmiş yükleme (2 saniye)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'group relative inline-flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-6 py-3 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
        { 'pl-10': isLoading }
      )}
      disabled={isLoading}
      aria-pressed={isLoadButton}
    >
      {isLoading && (
        <svg
          className="absolute left-4 h-4 w-4 animate-spin text-blue-600"
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
      )}
      
      <span className={clsx(
        'transition-opacity duration-200',
        { 'opacity-0': isLoading, 'opacity-100': !isLoading }
      )}>
        Load more connections
      </span>
      
      <span className={clsx(
        'absolute transition-opacity duration-200',
        { 'opacity-0': !isLoading, 'opacity-100': isLoading }
      )}>
        Loading...
      </span>
    </button>
  )
}

export default LoadMoreButton