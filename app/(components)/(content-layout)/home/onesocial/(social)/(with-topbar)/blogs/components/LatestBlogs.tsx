import { getAllBlogs } from '../../../../helpers/data'
import type { BlogType } from '../../../../types/data'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { BsCalendarDate, BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const BlogCard = ({ blog }: { blog: BlogType }) => {
  const { category, date, description, image, title, categoryVariant, id } = blog

  // Category color mapping
  const categoryColors: Record<string, { bg: string, text: string }> = {
    primary: { bg: 'bg-blue-100', text: 'text-blue-600' },
    secondary: { bg: 'bg-gray-100', text: 'text-gray-600' },
    success: { bg: 'bg-green-100', text: 'text-green-600' },
    danger: { bg: 'bg-red-100', text: 'text-red-600' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    info: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
  }

  const colorConfig = categoryColors[categoryVariant] || { bg: 'bg-gray-100', text: 'text-gray-600' }

  return (
    <div className="bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Image */}
        <div className="col-span-1">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="col-span-2 space-y-2">
          {/* Category */}
          <Link 
            href="#" 
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorConfig.bg} ${colorConfig.text}`}
          >
            {category}
          </Link>

          {/* Title */}
          <h5 className="text-lg font-bold text-gray-900 group">
            <Link 
              href={`/blogs/${id}`} 
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {title}
            </Link>
          </h5>

          {/* Description (hidden on mobile) */}
          <div className="hidden sm:block">
            <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
            
            {/* Date */}
            <div className="flex items-center text-sm text-gray-500">
              <BsCalendarDate className="mr-2" size={14} />
              <span>{date.toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>

          {/* Date for mobile */}
          <div className="sm:hidden flex items-center text-sm text-gray-500">
            <BsCalendarDate className="mr-2" size={14} />
            <span>{date.toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LatestBlogs = async () => {
  const allBlogs = await getAllBlogs()
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Latest blogs</h2>
      
      <div className="space-y-6">
        {allBlogs.map((blog, idx) => (
          <Fragment key={idx}>
            <BlogCard blog={blog} />
            {idx !== allBlogs.length - 1 && (
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
            )}
          </Fragment>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <nav aria-label="Blog pagination">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {/* Previous Button */}
            <li>
              <button
                disabled
                className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-400 bg-white cursor-not-allowed"
              >
                <BsChevronLeft className="mr-1" size={14} />
                Prev
              </button>
            </li>

            {/* Page Numbers */}
            <li>
              <button className="px-3 py-2 text-sm border border-blue-600 rounded-md text-white bg-blue-600">
                1
              </button>
            </li>
            
            <li>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                2
              </button>
            </li>
            
            <li>
              <button
                disabled
                className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-400 bg-white cursor-not-allowed"
              >
                ...
              </button>
            </li>
            
            <li>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                15
              </button>
            </li>

            {/* Next Button */}
            <li>
              <button className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
                <BsChevronRight className="ml-1" size={14} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default LatestBlogs