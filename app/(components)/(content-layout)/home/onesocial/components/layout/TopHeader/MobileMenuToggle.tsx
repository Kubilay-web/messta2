'use client'

import { useLayoutContext } from "../../../context/useLayoutContext"

const MobileMenuToggle = () => {
  const {
    mobileMenu: { open, toggle },
  } = useLayoutContext()

  return (
    <button
      className="ml-auto w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded flex flex-col items-center justify-center space-y-1 transition-colors"
      type="button"
      aria-label="Toggle navigation"
      aria-expanded={open}
      onClick={toggle}
    >
      <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300">
        <span className="sr-only">Menu</span>
      </span>
      <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300">
        <span className="sr-only">Menu</span>
      </span>
      <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300">
        <span className="sr-only">Menu</span>
      </span>
    </button>
  )
}

export default MobileMenuToggle