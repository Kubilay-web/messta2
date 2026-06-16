import backgroundImg7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/bg/07.jpg'
import ChoicesFormInput from '../../../../components/form/ChoicesFormInput'
import DateFormInput from '../../../../components/form/DateFormInput'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={backgroundImg7}
            alt="Hero background"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Heading Section */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Find events near you
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Let&apos;s uncover the best places to eat, drink, and shop nearest to you.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Select Genre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select genre
                  </label>
                  <ChoicesFormInput 
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    data-position="bottom"
                    data-search-enabled="false"
                  >
                    <option value="category">Category</option>
                    <option value="comedy">Comedy</option>
                    <option value="dance">Dance</option>
                    <option value="family">Family</option>
                    <option value="music">Music</option>
                    <option value="workshop">Workshop</option>
                  </ChoicesFormInput>
                </div>

                {/* Date From */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date from
                  </label>
                  <DateFormInput 
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="12/10/2022"
                    options={{ enableTime: false }}
                  />
                </div>

                {/* Date To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date to
                  </label>
                  <DateFormInput 
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="14/10/2022"
                    options={{ enableTime: false }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Filter Dates
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero