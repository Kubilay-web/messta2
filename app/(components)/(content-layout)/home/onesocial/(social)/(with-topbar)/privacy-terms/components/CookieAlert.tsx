'use client'
import Image from 'next/image'
import { useState } from 'react'
import cookieImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/cookie.svg'
import Link from 'next/link'

const CookieAlert = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed start-0 bottom-0 z-50 p-4 m-3 w-10/12 md:w-4/12 lg:w-3/12 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-gray-800">
        <Image 
          src={cookieImg} 
          width={62} 
          height={50} 
          className="h-12 w-auto mb-3" 
          alt="cookie" 
        />
        <p className="mb-3 text-sm">
          This website stores cookies on your computer. To find out more about the cookies we use, see our{' '}
          <Link 
            className="text-gray-800 underline hover:text-gray-600 transition-colors" 
            href="#"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleClose}
            className="px-3 py-2 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors border border-green-200"
          >
            Accept
          </button>
          <button
            onClick={handleClose}
            className="px-3 py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors border border-red-200"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieAlert