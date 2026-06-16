"use client"

import { timeSince } from '../../../utils/date'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BsBellFill } from 'react-icons/bs'
import { notificationData } from '../../../assets/data/notification'

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<typeof notificationData>([])

  // Client-side'da veriyi al
  useEffect(() => {
    // Burada getAllNotifications() fonksiyonunu çağırabiliriz
    // Veya doğrudan notificationData'yı kullanabiliriz
    setNotifications(notificationData.slice(0, 4))
  }, [])

  return (
 <li className="relative ml-2 list-none">
      <button
        className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        <BsBellFill size={15} className="text-gray-600" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h6 className="font-semibold m-0 flex items-center">
              Notifications 
              <span className="ml-2 px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded">
                4 new
              </span>
            </h6>
            <Link className="text-sm text-blue-600 hover:text-blue-800" href="#">
              Clear all
            </Link>
          </div>
          
          <div className="p-0 max-h-96 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {notifications.map((notification, idx) => (
                <li key={notification.id} className="rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={clsx(
                    'flex items-start p-3 relative',
                    { 'border-l-4 border-blue-500 bg-blue-50': !notification.isRead }
                  )}>
                    <div className="flex-shrink-0 mr-3 hidden md:block">
                      {notification.avatar ? (
                        <div className="w-10 h-10">
                          <Image 
                            className="rounded-full object-cover w-full h-full" 
                            src={notification.avatar} 
                            alt=""
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : notification.textAvatar ? (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.textAvatar?.variant === 'success' ? 'bg-green-500' :
                          notification.textAvatar?.variant === 'danger' ? 'bg-red-500' :
                          notification.textAvatar?.variant === 'warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}>
                          <span className="text-white font-bold">
                            {notification.textAvatar?.text}
                          </span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">N/A</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 mr-3">
                      <p className={clsx(
                        'text-sm',
                        notification.description ? 'mb-1' : 'mb-2'
                      )}>
                        {notification.title}
                      </p>
                      {notification.description && (
                        <div className="text-sm text-gray-600">
                          {notification.description}
                        </div>
                      )}
                      {notification.isFriendRequest && (
                        <div className="flex mt-2">
                          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors mr-2">
                            Accept
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition-colors">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 whitespace-nowrap hidden md:block">
                      {timeSince(notification.time).slice(0, 5)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-t text-center">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
              See all incoming activity
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default NotificationDropdown