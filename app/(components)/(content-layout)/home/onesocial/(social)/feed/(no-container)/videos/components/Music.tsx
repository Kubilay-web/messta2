'use client'
import TinySlider from '../../../../../components/TinySlider'
import type { VideoType } from '../../../../../types/data'
import Image from 'next/image'
import { renderToString } from 'react-dom/server'
import { BsPlayFill } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa'
import type { TinySliderSettings } from 'tiny-slider'
import { musicData } from '../data'
import Link from 'next/link'

const MusicCard = ({ music }: { music: VideoType }) => {
  const { title, views, time, image, iframe } = music
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
      {/* Image/Video Container */}
      <div className="relative">
        {image && (
          <>
            <Image 
              className="w-full h-48 object-cover" 
              src={image} 
              alt={title}
              width={400}
              height={192}
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <BsPlayFill size={24} />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between">
              <span className="bg-black/70 px-2 py-1 rounded text-white text-xs">
                {time}
              </span>
              <span className="bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center">
                <FaHeart size={12} className="mr-1" />
              </span>
            </div>
          </>
        )}
        {iframe && (
          <div className="relative w-full pt-[56.25%]">
            <iframe 
              src={iframe} 
              title="Music video"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h6 className="font-semibold text-gray-800 dark:text-white mb-2">
          <Link 
            href="/feed/videos/details" 
            className="hover:text-blue-500 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        </h6>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {views} views
        </span>
      </div>
    </div>
  )
}

const Music = () => {
  const musicSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: false,
    controls: true,
    edgePadding: 0,
    items: 5,
    nav: false,
    responsive: {
      1: {
        items: 1,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  }

  return (
    <>
      {/* Title */}
      <div className="mt-4 mb-4">
        <h5 className="text-xl font-bold text-gray-800 dark:text-white">Music</h5>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <TinySlider 
          className="-mx-2" 
          settings={musicSliderSettings}
        >
          {musicData.map((music, idx) => (
            <div key={idx} className="px-2">
              <MusicCard music={music} />
            </div>
          ))}
        </TinySlider>
      </div>
    </>
  )
}

export default Music