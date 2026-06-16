'use client'
import { Fragment, useState } from 'react'
import { notifications } from './data'


const Notification = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [emailFrequency, setEmailFrequency] = useState<string>('NotiRadio2')

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h5 className="text-lg font-semibold text-gray-900">Notification</h5>
        <p className="mt-1 text-sm text-gray-600">
          Tried law yet style child. The bore of true of no be deal. Frequently sufficient to be unaffected. 
          The furnished she concluded depending procuring concealed.
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="divide-y divide-gray-100">
          {notifications.map((notification, idx) => {
            const accordionKey = `email-accordion-${idx}`

            return (
              <Fragment key={idx}>
                {/* Notification Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="mr-4 flex-1">
                    <div className="flex items-center">
                      <h6 className="text-sm font-semibold text-gray-900">
                        {notification.title}
                        {notification.isPremium && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                            Pro only
                          </span>
                        )}
                      </h6>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                  </div>
                  
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      id={`NotiSwitchCheckChecked-${idx}`}
                      disabled={notification.isPremium}
                      defaultChecked={notification.isChecked}
                    />
                    <div className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 ${notification.isPremium ? 'opacity-50' : ''}`}></div>
                  </label>
                </div>

                {/* Email Accordion (if applicable) */}
                {notification.isEmail && (
                  <div className="py-4">
                    <div className="rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleAccordion(accordionKey)}
                        className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left hover:bg-gray-100"
                        aria-expanded={openAccordion === accordionKey}
                        aria-controls={`accordion-content-${idx}`}
                      >
                        <div>
                          <h6 className="text-sm font-semibold text-gray-900">Email notifications</h6>
                          <p className="mt-1 text-xs text-gray-500">As hastened oh produced prospect.</p>
                        </div>
                        <svg
                          className={`h-5 w-5 transform text-gray-500 transition-transform ${openAccordion === accordionKey ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div
                        id={`accordion-content-${idx}`}
                        className={`px-5 transition-all ${openAccordion === accordionKey ? 'block py-4' : 'hidden'}`}
                      >
                        {/* Email Checkboxes */}
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id={`NotiSwitchCheckChecked6-${idx}`}
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                            <label htmlFor={`NotiSwitchCheckChecked6-${idx}`} className="ml-2 text-sm text-gray-700">
                              Product emails
                            </label>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id={`NotiSwitchCheckChecke7-${idx}`}
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`NotiSwitchCheckChecke7-${idx}`} className="ml-2 text-sm text-gray-700">
                              Feedback emails
                            </label>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="my-4 border-t border-gray-200"></div>

                        {/* Email Frequency */}
                        <div>
                          <h6 className="mb-3 text-sm font-semibold text-gray-900">Email frequency</h6>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <input
                                type="radio"
                                name={`NotiRadio-${idx}`}
                                id={`NotiRadio1-${idx}`}
                                className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={emailFrequency === `NotiRadio1-${idx}`}
                                onChange={() => setEmailFrequency(`NotiRadio1-${idx}`)}
                              />
                              <label htmlFor={`NotiRadio1-${idx}`} className="ml-2 text-sm text-gray-700">
                                Daily
                              </label>
                            </div>
                            
                            <div className="flex items-start">
                              <input
                                type="radio"
                                name={`NotiRadio-${idx}`}
                                id={`NotiRadio2-${idx}`}
                                className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={emailFrequency === `NotiRadio2-${idx}`}
                                onChange={() => setEmailFrequency(`NotiRadio2-${idx}`)}
                                defaultChecked
                              />
                              <label htmlFor={`NotiRadio2-${idx}`} className="ml-2 text-sm text-gray-700">
                                Weekly
                              </label>
                            </div>
                            
                            <div className="flex items-start">
                              <input
                                type="radio"
                                name={`NotiRadio-${idx}`}
                                id={`NotiRadio3-${idx}`}
                                className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={emailFrequency === `NotiRadio3-${idx}`}
                                onChange={() => setEmailFrequency(`NotiRadio3-${idx}`)}
                              />
                              <label htmlFor={`NotiRadio3-${idx}`} className="ml-2 text-sm text-gray-700">
                                Periodically
                              </label>
                            </div>
                            
                            <div className="flex items-start">
                              <input
                                type="radio"
                                name={`NotiRadio-${idx}`}
                                id={`NotiRadio4-${idx}`}
                                className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={emailFrequency === `NotiRadio4-${idx}`}
                                onChange={() => setEmailFrequency(`NotiRadio4-${idx}`)}
                              />
                              <label htmlFor={`NotiRadio4-${idx}`} className="ml-2 text-sm text-gray-700">
                                Off
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )
          })}
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

export default Notification