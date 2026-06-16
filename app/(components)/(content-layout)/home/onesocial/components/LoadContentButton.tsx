'use client'
import useToggle from '../hooks/useToggle'
import clsx from 'clsx'

const LoadContentButton = ({ name, className }: { name: string; className?: string }) => {
  const { isTrue: isOpen, toggle } = useToggle()
  
  return (
    <button
      onClick={toggle}
      role="button"
      className={clsx(
        className,
        'inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm',
        { 'text-blue-600': isOpen }
      )}
      aria-pressed={isOpen}
    >
      <div className="flex items-center mr-2">
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mx-0.5" />
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mx-0.5" style={{ animationDelay: '0.2s' }} />
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mx-0.5" style={{ animationDelay: '0.4s' }} />
      </div>
      {name}
    </button>
  )
}

export default LoadContentButton