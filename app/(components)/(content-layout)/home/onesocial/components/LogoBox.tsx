'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutContext } from '../context/useLayoutContext'
import logo from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo.svg'

const LogoBox = () => {
  const { theme } = useLayoutContext()
  
  return (
    <Link 
      href="/" 
      className="flex items-center"
      aria-label="Home"
    >
      <div className="relative h-9 w-9 flex-shrink-0">
        <Image
          src={logo}
          alt="Logo"
          fill
          className="object-contain"
          sizes="36px"
          priority
        />
      </div>
      {/* Eğer logo ile birlikte text de gösterilecekse: */}
      {/* <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
        Brand Name
      </span> */}
    </Link>
  )
}

export default LogoBox
