import { currentYear, developedBy, developedByLink } from '../../../../context/constants'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-3 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Left side - Navigation links */}
          <div className="mb-4 lg:mb-0">
            <ul className="flex flex-wrap gap-4 lg:gap-6">
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
          </div>
          
          {/* Right side - Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p className="text-center lg:text-right">
              ©{currentYear}{' '}
              <a 
                className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
                target="_blank" 
                href={developedByLink}
              >
                {developedBy}
              </a>{' '}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer