'use client'
import useToggle from '../../../../hooks/useToggle'
import { useState } from 'react'

const LoadMoreButton = () => {
  const { isTrue: isLoadButton, toggle } = useToggle()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    toggle()
    setIsLoading(true)
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false)
      // Add your actual load more logic here
      console.log('Loading more content...')
    }, 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative inline-flex items-center justify-center
        px-6 py-3
        bg-blue-50 hover:bg-blue-100
        text-blue-600 hover:text-blue-700
        font-medium
        rounded-lg
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-70 disabled:cursor-not-allowed
        ${isLoading ? 'pr-12' : ''}
      `}
      aria-label={isLoading ? "Loading..." : "Load more notifications"}
      aria-busy={isLoading}
    >
      {/* Load Text */}
      <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        Load more notifications
      </span>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute right-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
      )}
    </button>
  )
}

export default LoadMoreButton