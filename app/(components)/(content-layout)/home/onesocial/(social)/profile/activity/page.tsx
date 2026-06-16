import { activityData } from './data'
import Image from 'next/image'
import { BsLockFill, BsUnlockFill } from 'react-icons/bs'
import { timeSince } from '../../../utils/date'
import clsx from 'clsx'
import LoadMoreButton from './components/LoadMoreButton'


const Activity = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Activity feed</h2>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:left-10" />

          {activityData.map((timeline, idx) => (
            <div
              key={idx}
              className={clsx('relative flex pb-6 last:pb-0', {
                'items-center': activityData.length - 1 !== idx,
              })}
            >
              {/* Timeline Icon */}
              <div className="relative z-10 flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
                  {timeline?.avatar ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm md:h-14 md:w-14">
                      <Image
                        src={timeline.avatar}
                        alt={timeline.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : timeline.textAvatar ? (
                    <div
                      className={clsx(
                        'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm md:h-14 md:w-14',
                        {
                          'bg-blue-500': timeline.textAvatar.variant === 'primary',
                          'bg-gray-500': timeline.textAvatar.variant === 'secondary',
                          'bg-green-500': timeline.textAvatar.variant === 'success',
                          'bg-red-500': timeline.textAvatar.variant === 'danger',
                          'bg-yellow-500': timeline.textAvatar.variant === 'warning',
                          'bg-cyan-500': timeline.textAvatar.variant === 'info',
                          'bg-gray-300': timeline.textAvatar.variant === 'light',
                          'bg-gray-800': timeline.textAvatar.variant === 'dark',
                        }
                      )}
                    >
                      <span className="font-semibold">{timeline.textAvatar.text}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Timeline Content */}
              <div className="ml-4 flex-1 md:ml-6">
                <div className="flex flex-col justify-between md:flex-row">
                  <div className="flex-1">
                    <p className="mb-1 text-sm text-gray-600">{timeline.title}</p>
                    
                    {timeline.type && (
                      <p className="mb-2 flex items-center text-sm text-gray-500">
                        {timeline.type === 'only me' ? (
                          <BsLockFill className="mr-1 h-4 w-4" />
                        ) : (
                          <BsUnlockFill className="mr-1 h-4 w-4" />
                        )}
                        {timeline.type}
                      </p>
                    )}
                    
                    {timeline.description && (
                      <div className="mt-2">{timeline.description}</div>
                    )}
                  </div>
                  
                  <div className="mt-2 flex-shrink-0 md:mt-0 md:ml-3">
                    <p className="whitespace-nowrap text-sm text-gray-500">
                      {timeSince(timeline.time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative border-t border-gray-100 px-6 py-4">
        <div className="flex justify-center">
          <LoadMoreButton />
        </div>
      </div>
    </div>
  )
}

export default Activity