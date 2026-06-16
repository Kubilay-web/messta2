import Link from 'next/link'
import Image from 'next/image'
import { BsFileEarmarkPlay } from 'react-icons/bs'
import TrendingVideos from './components/TrendingVideos'
import OfficialTrailer from './components/OfficialTrailer'
import Music from './components/Music'
import Footer from './components/Footer'

import backgroundImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/16by9/big/02.jpg'
import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'


const Hero = () => {
  return (
    <div 
      className="rounded-xl py-6 sm:py-8 overflow-hidden relative mb-6"
      style={{
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative p-4 sm:p-8 z-10">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 mr-3">
            <Image 
              className="w-full h-full rounded-full object-cover" 
              src={avatar1} 
              alt="Frances Guerrero"
              width={40}
              height={40}
            />
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <h6 className="font-medium text-white mb-0">
              <Link href="#" className="hover:text-gray-200">
                Frances Guerrero
              </Link>
            </h6>
            <span className="text-sm text-white/90">156.9K views</span>
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          How does the stock market work?
        </h1>
        <p className="text-white/90 mb-6 max-w-2xl">
          Suspicion neglected he resolving agreement perceived at an.
        </p>

        {/* Watch Button */}
        <Link 
          href="/feed/videos/details"
          className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <BsFileEarmarkPlay size={19} className="mr-2" />
          Watch now
        </Link>
      </div>
    </div>
  )
}

const HomeVideos = () => {
  return (
    <div className="space-y-6">
      <Hero />
      <TrendingVideos />
      <OfficialTrailer />
      <Music />
      <Footer />
    </div>
  )
}

export default HomeVideos