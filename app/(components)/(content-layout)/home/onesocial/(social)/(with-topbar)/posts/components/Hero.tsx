import bg06Img from '@/app/(components)/(content-layout)/home/onesocial/assets/images/bg/06.jpg'
import { BsSearch } from 'react-icons/bs'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative py-16 md:py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bg06Img}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex justify-center py-12 md:py-16">
          <div className="max-w-2xl text-center">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Change your social presence.
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              For who thoroughly her boy estimating conviction.
            </p>

            {/* Search Form */}
            <form className="relative max-w-lg mx-auto">
              <div className="relative">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <BsSearch className="text-gray-400" size={22} />
                </div>
                
                {/* Search Input */}
                <input
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 text-gray-900 placeholder-gray-500 shadow-lg"
                />
                
                {/* Search Button */}
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
              
              {/* Optional: Search suggestions */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-sm text-gray-300">Try:</span>
                <button type="button" className="text-sm text-gray-300 hover:text-white underline transition-colors">
                  Social media
                </button>
                <span className="text-gray-300">•</span>
                <button type="button" className="text-sm text-gray-300 hover:text-white underline transition-colors">
                  Marketing
                </button>
                <span className="text-gray-300">•</span>
                <button type="button" className="text-sm text-gray-300 hover:text-white underline transition-colors">
                  Branding
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero