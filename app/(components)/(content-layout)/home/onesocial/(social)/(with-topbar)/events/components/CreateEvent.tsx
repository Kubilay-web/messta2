'use client'
import Image from 'next/image'
import DateFormInput from '../../../../components/form/DateFormInput'
import TextAreaFormInput from '../../../../components/form/TextAreaFormInput'
import DropzoneFormInput from '../../../../components/form/DropzoneFormInput'
import TextFormInput from '../../../../components/form/TextFormInput'
import useToggle from '../../../../hooks/useToggle'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import * as yup from 'yup'

import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/02.jpg'
import avatar3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg'
import avatar4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/04.jpg'
import avatar5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/05.jpg'
import avatar6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/06.jpg'
import avatar7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg'
import { yupResolver } from '@hookform/resolvers/yup'
import { BsFileEarmarkText } from 'react-icons/bs'
import { useState } from 'react'

const CreateEvent = () => {
  const guests = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7]
  const { isTrue: isOpen, toggle } = useToggle()
  const [isClosing, setIsClosing] = useState(false)

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

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      toggle()
      setIsClosing(false)
    }, 300)
  }

  const onSubmit = (data: any) => {
    console.log('Event submitted:', data)
    // Handle form submission
  }

  return (
    <>
      {/* Create Event Button */}
      <button
        onClick={toggle}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FaPlus size={14} />
        <span>Create event</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${isClosing ? 'bg-opacity-0' : 'bg-opacity-50'}`}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className={`relative bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create event
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  <div className="space-y-4">
                    <TextFormInput 
                      name="title" 
                      label="Title" 
                      placeholder="Event name here" 
                      containerClassName="w-full"
                      control={control} 
                    />
                    
                    <TextAreaFormInput
                      name="description"
                      label="Description"
                      rows={2}
                      placeholder="Ex: topics, schedule, etc."
                      containerClassName="w-full"
                      control={control}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <DateFormInput 
                          options={{ enableTime: false }} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Select date" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <DateFormInput 
                          options={{ enableTime: true, noCalendar: true }} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Select time" 
                        />
                      </div>
                      
                      <TextFormInput 
                        name="duration" 
                        label="Duration" 
                        placeholder="1hr 23m" 
                        containerClassName="w-full"
                        control={control} 
                      />
                    </div>

                    <TextFormInput 
                      name="location" 
                      label="Location" 
                      placeholder="Logansport, IN 46947" 
                      containerClassName="w-full"
                      control={control} 
                    />
                    
                    <TextFormInput 
                      name="guest" 
                      type="email" 
                      label="Add guests" 
                      placeholder="Guest email" 
                      containerClassName="w-full"
                      control={control} 
                    />

                    {/* Guest Avatars */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guests
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        {guests.map((avatar, idx) => (
                          <div key={idx} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <Image
                              src={avatar}
                              alt={`Guest ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          </div>
                        ))}
                        <span className="ml-2 text-sm text-gray-500">+50</span>
                      </div>
                    </div>

                    {/* Dropzone */}
                    <div className="mt-4">
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
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Create now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateEvent