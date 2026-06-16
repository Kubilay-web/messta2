import { developedByLink, developedBy } from '../../context/constants'
import type { ChildrenType } from '../../types/component'
import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'

const HelpLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 pt-10 pb-10 lg:flex-row lg:pb-6">
            <div className="hidden w-1/4 lg:block">
              <figure className="m-0">
                {/* SVG content remains the same */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                  {/* Keep all the SVG paths exactly as they were */}
                  <g id="freepik--Table--inject-3">
                    <path
                      d="M484.72,456c0,.15-106,.26-236.71.26S11.28,456.14,11.28,456s106-.26,236.73-.26S484.72,455.85,484.72,456Z"
                      style={{ fill: '#263238' }}
                    />
                  </g>
                  {/* ... rest of SVG paths ... */}
                </svg>
              </figure>
            </div>
            
            <div className="w-full text-center lg:w-1/2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Hi Sam, we&apos;re here to help.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Search here to get answers to your questions.
              </p>
              <div className="relative mx-auto mt-8 max-w-md">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <BsSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            
            <div className="hidden w-1/4 lg:block">
              <figure className="m-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                  {/* Second SVG content remains the same */}
                  <g id="freepik--Plant--inject-2">
                    <path
                      d="M74.26,342.83c5.24-2.7,11.4-3.05,17.21-2.09,3.12.52,6.37,1.45,8.5,3.8s2.52,6.47.08,8.48c-1.45,1.2-3.47,1.38-5.35,1.36-4.55-.05-9.6-.85-13.23,1.88-2.08,1.57-3.46,4.16-5.93,4.93s-5.17-.68-6.45-2.87a10,10,0,0,1-.73-7.39A11.28,11.28,0,0,1,74.26,342.83Z"
                      className="fill-primary"
                    />
                    {/* ... rest of SVG paths ... */}
                  </g>
                </svg>
              </figure>
            </div>
          </div>
          
          {children}
        </div>
      </main>

      <footer className="bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="w-full md:w-1/2">
              <nav className="flex flex-wrap justify-center gap-6 md:justify-start">
                <Link
                  href="/profile/about"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
                <Link
                  href={developedByLink}
                  target="_blank"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Support
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Docs
                </Link>
                <Link
                  href="/privacy-terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy &amp; terms
                </Link>
              </nav>
            </div>
            
            <div className="mt-4 w-full text-center md:mt-0 md:w-1/2 md:text-right">
              <p className="text-sm text-gray-600">
                ©{new Date().getFullYear()}{' '}
                <a
                  href={developedByLink}
                  target="_blank"
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  {developedBy}
                </a>{' '}
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HelpLayout