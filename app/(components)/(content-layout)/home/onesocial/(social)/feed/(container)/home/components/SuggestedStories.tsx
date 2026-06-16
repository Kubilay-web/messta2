'use client'
import TinySlider from '../../../../../components/TinySlider'
import type { TinySliderSettings } from 'tiny-slider'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { renderToString } from 'react-dom/server'
import Link from 'next/link'

import post1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/01.jpg'
import post2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/02.jpg'
import post3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/03.jpg'
import post4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/04.jpg'
import post5 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/05.jpg'
import post6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/post/1by1/06.jpg'

const SuggestedStories = () => {
  const storySliderSettings: TinySliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [
      renderToString(<FaChevronLeft className="w-4 h-4" />), 
      renderToString(<FaChevronRight className="w-4 h-4" />)
    ],
    autoplay: true,
    controls: true,
    edgePadding: 24,
    loop: false,
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  }
  
  const stories = [
    {
      name: 'Judy Nguyen',
      image: post2,
    },
    {
      name: 'Samuel Bishop',
      image: post3,
    },
    {
      name: 'Carolyn Ortiz',
      image: post4,
    },
    {
      name: 'Amanda Reed',
      image: post5,
    },
    {
      name: 'Lori Stevens',
      image: post1,
    },
    {
      name: 'Joan Wallace',
      image: post6,
    },
  ]
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Suggested stories</h2>
      <div className="relative overflow-hidden -mx-4 px-4">
        <TinySlider settings={storySliderSettings}>
          {stories.map((story, idx) => (
            <div key={idx} className="px-1">
              <Link 
                href="#" 
                className="flex relative rounded-xl overflow-hidden h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ 
                  backgroundImage: `url(${story.image.src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-white font-medium text-sm group-hover:text-blue-200 transition-colors">
                    {story.name}
                  </span>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-xl transition-all duration-300"></div>
              </Link>
            </div>
          ))}
        </TinySlider>
      </div>
    </div>
  )
}

export default SuggestedStories