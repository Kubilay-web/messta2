'use client'
import useToggle from '../../../../hooks/useToggle'
import { BsEye, BsX } from 'react-icons/bs'
import { Fragment } from 'react'

const ActivityViewButton = () => {
  const { isTrue: isOpen, toggle } = useToggle()
  const activityLog = [
    { location: 'London, UK', device: 'This Apple iMac' },
    { location: 'California, USA', device: 'This Apple iMac' },
    { location: 'New york, USA', device: 'This Windows' },
    { location: 'Mumbai, India', device: 'This Windows' },
  ]

  return (
    <Fragment>
      <button
        onClick={toggle}
        className="mt-1 inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:mt-0"
      >
        <BsEye className="mr-2 h-4 w-4" />
        View
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={toggle}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Content */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Where You&apos;re Logged in
                </h3>
                <button
                  onClick={toggle}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  aria-label="Close"
                >
                  <BsX className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {activityLog.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="mr-4 flex-1">
                        <h6 className="text-sm font-semibold text-gray-900">{item.location}</h6>
                        <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            Active now
                          </span>
                          <span className="text-gray-300">•</span>
                          <span>{item.device}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Logout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ActivityViewButton