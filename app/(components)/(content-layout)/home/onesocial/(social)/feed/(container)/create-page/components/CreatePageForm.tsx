'use client'
import ChoicesFormInput from '../../../../../components/form/ChoicesFormInput'
import TextAreaFormInput from '../../../../../components/form/TextAreaFormInput'
import TextFormInput from '../../../../../components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from 'react-icons/bs'

const CreatePageForm = () => {
  const createFormSchema = yup.object({
    pageName: yup.string().required('Please enter your page name'),
    displayName: yup.string().required('Please enter your display name'),
    email: yup.string().email('Please enter valid email').required('Please enter your email'),
    url: yup.string().required('Please enter your website url'),
    phoneNo: yup.number().required('Please enter your phone no'),
    aboutPage: yup.string().required('Please enter your page description').max(300, 'character limit must less then 300'),
  })
  
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createFormSchema),
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-0">Create a page</h1>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit(() => {})}>
          {/* Page Name */}
          <div>
            <TextFormInput 
              name="pageName" 
              label="Page name" 
              placeholder="Page name (Required)" 
              control={control} 
            />
            <small className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
              Name that describes what the page is about.
            </small>
          </div>

          {/* Grid for Display Name, Email, and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Display Name */}
            <div>
              <TextFormInput
                name="displayName"
                label="Display name"
                placeholder="Display name (Required)"
                control={control}
              />
            </div>

            {/* Email */}
            <div>
              <TextFormInput 
                name="email" 
                label="Email" 
                placeholder="Email (Required)" 
                control={control} 
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category (required)
              </label>
              <ChoicesFormInput 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                data-search-enabled="true"
              >
                <option value="PV">Comedy</option>
                <option value="PB">Technology</option>
                <option value="PV">Education</option>
                <option value="PV">Entertainment</option>
                <option value="PV">Hotel</option>
                <option value="PV">Travel</option>
              </ChoicesFormInput>
            </div>
          </div>

          {/* Grid for URL and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Website URL */}
            <div>
              <TextFormInput 
                name="url" 
                label="Website URL" 
                placeholder="https://stackbros.in" 
                control={control} 
              />
            </div>

            {/* Phone Number */}
            <div>
              <TextFormInput 
                name="phoneNo" 
                label="Phone number" 
                placeholder="Phone number (Required)" 
                control={control} 
              />
            </div>
          </div>

          {/* About Page */}
          <div>
            <TextAreaFormInput 
              name="aboutPage" 
              label="About page" 
              rows={3} 
              placeholder="Description (Required)" 
              control={control} 
            />
            <small className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
              Character limit: 300
            </small>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Social Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Facebook */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook
                </label>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-gray-50 dark:bg-gray-700">
                    <BsFacebook className="text-blue-600" size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                    placeholder="https://www.facebook.com" 
                  />
                </div>
              </div>

              {/* Twitter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter
                </label>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-gray-50 dark:bg-gray-700">
                    <BsTwitter className="text-blue-400" size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                    placeholder="https://www.twitter.com" 
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram
                </label>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-gray-50 dark:bg-gray-700">
                    <BsInstagram className="text-pink-600" size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                    placeholder="https://www.instagram.com" 
                  />
                </div>
              </div>

              {/* Pinterest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pinterest
                </label>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-gray-50 dark:bg-gray-700">
                    <BsPinterest className="text-red-600" size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                    placeholder="https://www.pinterest.com" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create a page
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePageForm