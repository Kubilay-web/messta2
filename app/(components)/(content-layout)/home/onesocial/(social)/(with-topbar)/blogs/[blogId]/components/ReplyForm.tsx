'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const ReplyForm = () => {
  const replyFormSchema = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    comment: yup.string().required('Please enter your comment'),
  })

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(replyFormSchema),
  })

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data)
    // Handle form submission here
  }

  return (
    <form 
      className="mt-2 space-y-4" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.name ? 'border-red-300' : 'border-gray-300'}
              transition-colors duration-200
            `}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.email ? 'border-red-300' : 'border-gray-300'}
              transition-colors duration-200
            `}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Comment Field */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Your Comment *
        </label>
        <textarea
          id="comment"
          rows={3}
          {...register('comment')}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${errors.comment ? 'border-red-300' : 'border-gray-300'}
            transition-colors duration-200
          `}
          placeholder="Enter your comment"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      {/* Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="save-info"
            name="save-info"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="save-info" className="text-gray-700">
            Save my name and email in this browser for the next time I comment.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Post comment
        </button>
      </div>
    </form>
  )
}

export default ReplyForm