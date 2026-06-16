'use client'

import { useState } from 'react'



const Communication = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('0')
  const [connectionRequest, setConnectionRequest] = useState<string>('ComRadio2')

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? '' : key)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Who can connect with you?</h2>
        <p className="mt-1 text-sm text-gray-600">
          He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. 
          Unaffected at ye of compliment alteration to.
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Accordion */}
        <div className="space-y-2">
          {/* Accordion Item 1 - Connection Request */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <button
              onClick={() => toggleAccordion('0')}
              className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left hover:bg-gray-100"
              aria-expanded={openAccordion === '0'}
              aria-controls="accordion-content-0"
            >
              <h3 className="text-sm font-semibold text-gray-900">Connection request</h3>
              <svg
                className={`h-5 w-5 transform text-gray-500 transition-transform ${openAccordion === '0' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              id="accordion-content-0"
              className={`px-5 transition-all ${openAccordion === '0' ? 'block py-4' : 'hidden'}`}
            >
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="ComRadio"
                    id="ComRadio5"
                    className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={connectionRequest === 'ComRadio5'}
                    onChange={() => setConnectionRequest('ComRadio5')}
                  />
                  <label htmlFor="ComRadio5" className="ml-2 text-sm text-gray-700">
                    Everyone on social (recommended)
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="ComRadio"
                    id="ComRadio2"
                    className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={connectionRequest === 'ComRadio2'}
                    onChange={() => setConnectionRequest('ComRadio2')}
                    defaultChecked
                  />
                  <label htmlFor="ComRadio2" className="ml-2 text-sm text-gray-700">
                    Only people who know your email address
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="ComRadio"
                    id="ComRadio3"
                    className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={connectionRequest === 'ComRadio3'}
                    onChange={() => setConnectionRequest('ComRadio3')}
                  />
                  <label htmlFor="ComRadio3" className="ml-2 text-sm text-gray-700">
                    Only people who appear in your mutual connection list
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Item 2 - Who can message you */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <button
              onClick={() => toggleAccordion('1')}
              className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left hover:bg-gray-100"
              aria-expanded={openAccordion === '1'}
              aria-controls="accordion-content-1"
            >
              <h3 className="text-sm font-semibold text-gray-900">Who can message you</h3>
              <svg
                className={`h-5 w-5 transform text-gray-500 transition-transform ${openAccordion === '1' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              id="accordion-content-1"
              className={`px-5 transition-all ${openAccordion === '1' ? 'block py-4' : 'hidden'}`}
            >
              <div className="space-y-4">
                {/* Switch 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Enable message request notifications</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked" />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
                
                {/* Switch 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Allow connections to add you on group</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked2" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
                
                {/* Switch 3 */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Allow Sponsored Messages</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages
                    </p>
                  </div>
                  <label className="relative mt-1 inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked3" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Item 3 - How people can find you */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <button
              onClick={() => toggleAccordion('2')}
              className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left hover:bg-gray-100"
              aria-expanded={openAccordion === '2'}
              aria-controls="accordion-content-2"
            >
              <h3 className="text-sm font-semibold text-gray-900">How people can find you</h3>
              <svg
                className={`h-5 w-5 transform text-gray-500 transition-transform ${openAccordion === '2' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              id="accordion-content-2"
              className={`px-5 transition-all ${openAccordion === '2' ? 'block py-4' : 'hidden'}`}
            >
              <div className="space-y-4">
                {/* Switch 4 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Allow search engines to show your profile?</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked4" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
                
                {/* Switch 5 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Allow people to search by your email address?</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked5" />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
                
                {/* Switch 6 */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Allow Sponsored Messages</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages
                    </p>
                  </div>
                  <label className="relative mt-1 inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" id="comSwitchCheckChecked6" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-100 px-6 py-4">
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Communication