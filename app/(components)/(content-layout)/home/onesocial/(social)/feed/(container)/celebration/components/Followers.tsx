import { getAllUsers } from '../../../../../helpers/data'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BsPersonCheckFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

const Followers = async () => {
  const allFollowers = await getAllUsers()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 pb-0 border-b-0">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">Who to follow</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {allFollowers.slice(0, 5).map((follower, idx) => (
          <div className="flex items-center gap-3 mb-3" key={idx}>
            {/* Avatar */}
            <div className="relative">
              <button className="w-12 h-12">
                <Image 
                  className="w-full h-full rounded-full object-cover" 
                  src={follower.avatar} 
                  alt={follower.name}
                />
              </button>
              
              {/* Story border */}
              {follower.isStory && (
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -z-10"></div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <Link 
                className="block font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 truncate" 
                href="#"
              >
                {follower.name}
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{follower.role}</p>
            </div>

            {/* Follow Button */}
            <button
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center ml-auto transition-colors',
                follower.hasRequested 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              )}
            >
              {follower.hasRequested ? (
                <BsPersonCheckFill size={16} />
              ) : (
                <FaPlus size={14} />
              )}
            </button>
          </div>
        ))}

        {/* View More Button */}
        <div className="mt-4">
          <button className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors">
            View more
          </button>
        </div>
      </div>
    </div>
  )
}

export default Followers