'use client'
import useToggle from '../../../hooks/useToggle'
import clsx from 'clsx'

const LoadMoreButton = () => {
  const { isTrue: isLoadButton, toggle } = useToggle()
  
  return (
    <button
      onClick={toggle}
      role="button"
      aria-pressed={isLoadButton}
      className={clsx(
        'px-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium transition-all duration-300 relative overflow-hidden min-w-[120px]',
        { 
          'opacity-75 cursor-not-allowed hover:bg-blue-50 dark:hover:bg-blue-900/20': isLoadButton,
          'hover:shadow-md': !isLoadButton
        }
      )}
      disabled={isLoadButton}
    >
      {/* Loading Spinner */}
      {isLoadButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
          <div className="w-5 h-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Button Text */}
      <span className={clsx(
        'transition-opacity duration-300 inline-flex items-center justify-center',
        { 
          'opacity-0': isLoadButton, 
          'opacity-100': !isLoadButton 
        }
      )}>
        Load more
      </span>
    </button>
  )
}

export default LoadMoreButton