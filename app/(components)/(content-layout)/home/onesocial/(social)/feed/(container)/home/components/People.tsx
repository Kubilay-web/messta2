'use client'
import TinySlider from '../../../../../components/TinySlider'
import Image from 'next/image'
import { renderToString } from 'react-dom/server'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { TinySliderSettings } from 'tiny-slider'
import clsx from 'clsx'
import { useFetchData } from '../../../../../hooks/useFetchData'

import type { UserType } from '../../../../../types/data'
import { getAllUsers } from '../../../../../helpers/data'
import Link from 'next/link'
import { useState } from 'react'

const PeopleCard = ({ people }: { people: UserType }) => {
  const { avatar, mutualCount: mutual, name, isStory } = people
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <div className="p-4 pb-0">
        {/* Avatar with story border */}
        <div className="relative inline-block mb-3">
          <button className="w-16 h-16">
            <Image 
              className="w-full h-full rounded-full object-cover" 
              src={avatar} 
              alt={name}
              width={64}
              height={64}
            />
          </button>
          
          {/* Story border */}
          {isStory && (
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 -z-10"></div>
          )}
        </div>
        
        <h6 className="font-semibold text-gray-800 dark:text-white mb-1 mt-1">
          <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
            {name}
          </Link>
        </h6>
        <p className="text-sm text-gray-600 dark:text-gray-400">{mutual} mutual connections</p>
      </div>

      <div className="p-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors">
          Add friend
        </button>
      </div>
    </div>
  )
}

const People = () => {
  const allPeople = useFetchData(getAllUsers)
  
  const peopleSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: true,
    controls: true,
    edgePadding: 30,
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h6 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">People you may know</h6>
        <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium">
          See all
        </button>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="relative">
          {allPeople && (
            <TinySlider className="-mx-2" settings={peopleSliderSettings}>
              {allPeople?.slice(0, 4).map((people, idx) => (
                <div key={idx} className="px-2">
                  <PeopleCard people={people} />
                </div>
              ))}
            </TinySlider>
          )}
        </div>
      </div>
    </div>
  )
}

export default People