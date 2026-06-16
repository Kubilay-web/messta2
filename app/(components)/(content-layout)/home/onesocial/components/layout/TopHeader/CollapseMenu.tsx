'use client'
import { useState, useEffect } from 'react'

import AppMenu from './AppMenu'
import { useLayoutContext } from '../../../context/useLayoutContext'
import { BsSearch } from 'react-icons/bs'

const CollapseMenu = ({ isSearch }: { isSearch?: boolean }) => {
  const {
    mobileMenu: { open },
  } = useLayoutContext()
  const [isVisible, setIsVisible] = useState(open)

  // Collapse animasyonu için
  useEffect(() => {
    if (open) {
      setIsVisible(true)
    } else {
      // Animasyon bitmeden önce içeriği gizlememek için timeout
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isVisible && !open) return null

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div>
        {isSearch && (
          <div className="mt-3 lg:mt-0 px-4 lg:px-0">
            <div className="w-full">
              <form className="rounded-md relative">
                <input 
                  className="w-full pl-10 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="search" 
                  placeholder="Search..." 
                  aria-label="Search" 
                />
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent px-3 py-0 border-0" 
                  type="submit"
                >
                  <BsSearch className="text-lg" />
                </button>
              </form>
            </div>
          </div>
        )}

        <AppMenu />
      </div>
    </div>
  )
}

export default CollapseMenu