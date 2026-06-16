import { currentYear, developedBy, developedByLink } from '../../context/constants'
import type { ProfilePanelLink } from '../../types/data'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type settingPanelProps = {
  links: ProfilePanelLink[]
}

const SettingPanel = ({ links }: settingPanelProps) => {
  const pathName = usePathname()
  
  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <ul className="space-y-1">
            {links.map((item, idx) => (
              <li key={idx}>
                <Link 
                  className={clsx(
                    'flex items-center p-3 rounded-lg transition-colors font-medium',
                    pathName === item.link 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  )} 
                  href={item.link}
                >
                  <div className="w-5 h-5 mr-3">
                    <Image 
                      height={20} 
                      width={19} 
                      className="object-contain w-full h-full"
                      src={item.image} 
                      alt="icon" 
                    />
                  </div>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center py-3 border-t border-gray-200">
          <Link 
            href="home/onesocial/profile/feed" 
            className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
      
      <ul className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="home/onesocial/profile/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="home/onesocial/settings/account"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            target="_blank"
            href={developedByLink}
          >
            Support
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            target="_blank"
            href="#"
          >
            Docs
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="home/onesocial/help"
          >
            Help
          </Link>
        </li>
        <li>
          <Link 
            className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
            href="home/onesocial/privacy-terms"
          >
            Privacy &amp; terms
          </Link>
        </li>
      </ul>
      
      <p className="text-xs text-center mt-4 text-gray-500">
        ©{currentYear}{' '}
        <Link 
          className="text-gray-600 hover:text-blue-600 transition-colors"
          target="_blank"
          href={developedByLink}
        >
          {developedBy}
        </Link>
      </p>
    </>
  )
} 

export default SettingPanel