'use client'
import useToggle from '../../../../../hooks/useToggle'
import type { EventType } from '../../../../../types/data'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsCalendar2Event, BsFileEarmarkText } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import * as yup from 'yup'
import Image from 'next/image'
import EventCard from '../../../../../components/cards/EventCard'
import TextFormInput from '../../../../../components/form/TextFormInput'
import TextAreaFormInput from '../../../../../components/form/TextAreaFormInput'
import DateFormInput from '../../../../../components/form/DateFormInput'
import DropzoneFormInput from '../../../../../components/form/DropzoneFormInput'
import { eventData } from '../../../../../assets/data/social'

import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/02.jpg'
import avatar3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg'
import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'
import avatar6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/06.jpg'
import avatar7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg'

const AllEvents = () => {
  const eventCategories = ['all', 'local', 'this-week', 'online', 'friends', 'following']
  const allEvents = eventData
  const [events, setEvents] = useState<EventType[]>(eventData)
  const [activeTab, setActiveTab] = useState('all')
  const { isTrue: isOpen, toggle } = useToggle()

  const filterEvents = (category: EventType['type'] | 'all') => {
    setActiveTab(category)
    setTimeout(() => {
      const filteredEvents = category === 'all' ? allEvents : allEvents?.filter((event) => event.type?.includes(category))
      setEvents(filteredEvents)
    }, 100)
  }

  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]

  const eventFormSchema = yup.object({
    title: yup.string().required('Please enter event title'),
    description: yup.string().required('Please enter event description'),
    duration: yup.string().required('Please enter event duration'),
    location: yup.string().required('Please enter event location'),
    guest: yup.string().email('Please enter valid email').required('Please enter event guest email'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(eventFormSchema),
  })

  return (
    <>
      {/* Main Card */}
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Discover Events</h1>
          <button
            onClick={toggle}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium flex items-center"
          >
            <FaPlus className="mr-2" />
            Create event
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-wrap justify-center md:justify-start -mb-px">
              {eventCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterEvents(category)}
                  className={`mr-4 py-2 px-1 font-medium text-sm border-b-2 transition-colors capitalize ${
                    activeTab === category
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {events.length !== 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {events?.map((event, idx) => (
                  <EventCard key={idx} {...event} />
                ))}
              </div>
            ) : (
              <div className="text-center my-8 py-8">
                <BsCalendar2Event className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
                <h4 className="mt-4 mb-4 text-gray-600 dark:text-gray-400">No events found</h4>
                <button
                  onClick={toggle}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium"
                >
                  Click here to add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit(() => {})}>
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Create event</h5>
                <button
                  onClick={toggle}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <TextFormInput 
                    name="title" 
                    label="Title" 
                    placeholder="Event name here" 
                    control={control} 
                  />
                  
                  <TextAreaFormInput
                    name="description"
                    label="Description"
                    rows={2}
                    placeholder="Ex: topics, schedule, etc."
                    control={control}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <DateFormInput 
                        options={{ enableTime: false }} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        placeholder="Select date" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time
                      </label>
                      <DateFormInput 
                        options={{ enableTime: true, noCalendar: true }} 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        placeholder="Select time" 
                      />
                    </div>
                    
                    <TextFormInput 
                      name="duration" 
                      label="Duration" 
                      placeholder="1hr 23m" 
                      control={control} 
                    />
                  </div>

                  <TextFormInput 
                    name="location" 
                    label="Location" 
                    placeholder="Logansport, IN 46947" 
                    control={control} 
                  />
                  
                  <TextFormInput 
                    name="guest" 
                    type="email" 
                    label="Add guests" 
                    placeholder="Guest email" 
                    control={control} 
                  />

                  {/* Guests Avatars */}
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <div className="flex -space-x-2">
                        {guests.map((avatar, idx) => (
                          <div className="w-8 h-8" key={idx}>
                            <Image 
                              className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                              src={avatar} 
                              alt="guest" 
                            />
                          </div>
                        ))}
                      </div>
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">+50</span>
                    </div>
                  </div>

                  {/* Dropzone */}
                  <div className="mt-2">
                    <DropzoneFormInput
                      showPreview
                      helpText="Drop presentation and document here or click to upload."
                      icon={BsFileEarmarkText}
                      label="Upload attachment"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  type="button"
                  onClick={toggle}
                  className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg font-medium mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium"
                >
                  Create now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AllEvents