import Link from 'next/link'
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs'
import LogoBox from '../../LogoBox'
import CollapseMenu from './CollapseMenu'
import MobileMenuToggle from './MobileMenuToggle'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'

const TopHeader = () => {
  return (
    <header className="relative border-b w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <LogoBox />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <MobileMenuToggle />
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          <CollapseMenu isSearch />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Messaging Icon */}
          <Link
            href="/home/chat"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Messaging"
          >
            <BsChatLeftTextFill className="h-4 w-4" />
          </Link>

          {/* Settings Icon */}
          <Link
            href="/home/onesocial/settings/account"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Settings"
          >
            <BsGearFill className="h-4 w-4" />
          </Link>

          {/* Notification Dropdown */}
          <div className="hidden sm:block">
            <NotificationDropdown />
          </div>

          {/* Profile Dropdown */}
          <div className="hidden sm:block">
            <ProfileDropdown />
          </div>

          {/* Mobile Profile Dropdown */}
          <div className="md:hidden">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopHeader