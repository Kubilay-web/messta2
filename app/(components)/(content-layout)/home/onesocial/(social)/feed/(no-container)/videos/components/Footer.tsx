import Image from 'next/image'

import appStore from '@/app/(components)/(content-layout)/home/onesocial/assets/images/app-store.svg'
import googlePlay from '@/app/(components)/(content-layout)/home/onesocial/assets/images/google-play.svg'
import { currentYear, developedBy, developedByLink } from '../../../../../context/constants';
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="md:w-2/3">
          <ul className="flex flex-wrap gap-4 lg:gap-6 mb-4">
            <li>
              <Link 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                href="/profile/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                target="_blank" 
                href={developedByLink}
              >
                Support
              </Link>
            </li>
            <li>
              <Link 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                target="_blank" 
                href="#"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                href="/privacy-terms"
              >
                Privacy & terms
              </Link>
            </li>
          </ul>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            ©{currentYear}{' '}
            <a 
              className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              target="_blank" 
              href={developedByLink}
            >
              {developedBy}
            </a>{' '}
            All rights reserved. Supposing so be resolving breakfast am or perfectly. Is drew am hill from me. Valley by oh twenty direct me so.
            Departure defective arranging rapturous did believe him all had supported.
          </p>
        </div>

        {/* Right Section - App Store Links */}
        <div className="md:w-1/3">
          <div className="flex justify-start md:justify-end">
            <button className="w-32 h-12">
              <Image 
                className="w-full h-full object-contain" 
                src={appStore} 
                alt="Download on App Store"
                width={128}
                height={48}
              />
            </button>
            <button className="w-32 h-12 ml-3">
              <Image 
                className="w-full h-full object-contain" 
                src={googlePlay} 
                alt="Get it on Google Play"
                width={128}
                height={48}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer