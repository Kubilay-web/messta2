import { currentYear, developedBy, developedByLink } from '../../../context/constants'

import Link from 'next/link'



const NotFound = () => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          {/* Spacing for desktop */}
          <div className="h-24 hidden lg:block" />
          
          <div className="flex flex-col items-center justify-center text-center py-8 md:py-12">
            {/* 404 SVG Illustration */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-12">
              <svg
                className="w-full h-auto"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1285.3 712.4"
                xmlSpace="preserve"
                aria-labelledby="error-illustration"
              >
                <title id="error-illustration">404 Error Illustration</title>
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      '\n          .st0{opacity:0.2;fill:#0B2252;enable-background:new;}\n          .st1{fill:#DAEEFF;}\n          .st2{fill:#6AC1FF;}\n          .st3{fill:#3FB790;}\n          .st4{fill:#34916F;}\n          .st5{fill:#90DAD8;}\n          .st6{fill:#FFFFFF;}\n          .st7{fill:url(#SVGID_1_);}\n          .st8{fill:#14336D;}\n          .st9{fill:#FFAA9D;}\n          .st10{fill:url(#SVGID_00000080196097221175926860000015854635151939166352_);}\n          .st11{fill:url(#SVGID_00000125570478491118859570000016173875777852424844_);}\n          .st12{fill:url(#SVGID_00000139994743433262585760000002217132992610938001_);}\n          .st13{fill:url(#SVGID_00000103980266939832754290000005538789883632006285_);}\n        ',
                  }}
                />
                <g id="illustration">
                  {/* SVG content remains the same */}
                  <g>
                    <ellipse className="st0" cx="642.7" cy="698.2" rx="642.6" ry="14.2" />
                    {/* ... rest of the SVG paths remain unchanged ... */}
                  </g>
                </g>
              </svg>
            </div>

            {/* 404 Text */}
            <div className="space-y-4 max-w-xl">
              <h1 className="text-8xl md:text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Page Not Found!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Either something went wrong or this page doesn&apos;t exist anymore.
              </p>

              {/* Home Button */}
              <div className="pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Go to home page
                </Link>
              </div>
            </div>
          </div>

          {/* Spacing for desktop */}
          <div className="h-24 hidden lg:block" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Navigation Links */}
            <nav className="flex justify-center md:justify-start">
              <ul className="flex flex-wrap items-center gap-4 md:gap-6">
                <li>
                  <Link 
                    href="/settings/profile" 
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    target="_blank" 
                    href={developedByLink}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                    target="_blank" 
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy-terms" 
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  >
                    Privacy & terms
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear}{' '}
                <Link
                  target="_blank"
                  href={developedByLink}
                  className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                  {developedBy}
                </Link>
                {' '}All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default NotFound