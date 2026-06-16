'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { FaChevronDown, FaPlus } from 'react-icons/fa6'

import { findAllParent, findMenuItem, getAppMenuItems, getMenuItemFromURL } from '../../../helpers/menu'
import type { MenuItemType } from '../../../types/menu'

type SubMenus = {
  item: MenuItemType
  itemClassName?: string
  linkClassName?: string
  activeMenuItems?: Array<string>
  level: number
}

const MenuItemWithChildren = ({ item, activeMenuItems, itemClassName, linkClassName, level }: SubMenus) => {
  const [isOpen, setIsOpen] = useState(false)
  const level1 = level === 1

  return (
    <li className={clsx('relative', itemClassName)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-between w-full hover:text-blue-600 transition-colors',
          linkClassName,
          activeMenuItems?.includes(item.key) && 'text-blue-600'
        )}
      >
        {item.label}
        {level1 ? (
          <FaChevronDown size={8} className={clsx('ml-1 transition-transform', isOpen && 'rotate-180')} />
        ) : (
          <FaPlus size={10} className={clsx('transition-transform', isOpen && 'rotate-45')} />
        )}
      </button>
      {isOpen && (
        <ul className={clsx(
          'bg-white rounded-md shadow-lg border min-w-[200px] z-10',
          level1 ? 'absolute top-full left-0 mt-1' : 'absolute left-full top-0 ml-1'
        )}>
          {(item.children ?? []).map((child, idx) => (
            <Fragment key={idx + child.key + idx}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  level={level + 1}
                  activeMenuItems={activeMenuItems}
                  itemClassName="relative"
                  linkClassName={clsx(
                    'flex items-center justify-between px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors w-full',
                    activeMenuItems?.includes(child.key) && 'text-blue-600 bg-blue-50'
                  )}
                />
              ) : (
                <MenuItem 
                  item={child} 
                  level={level + 1} 
                  linkClassName={clsx(
                    'px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition-colors block',
                    activeMenuItems?.includes(child.key) && 'text-blue-600 bg-blue-50'
                  )} 
                />
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </li>
  )
}

const MenuItem = ({ item, linkClassName, level, itemClassName }: SubMenus) => {
  return item.isDivider ? (
    <hr className="my-2 border-gray-200" />
  ) : (
    <li className={itemClassName}>
      <MenuItemLink item={item} linkClassName={linkClassName} level={level + 1} />
    </li>
  )
}

const MenuItemLink = ({ item, linkClassName }: SubMenus) => {
  const Icon = item.icon
  return (
    <Link 
      href={item.url ?? ''} 
      target={item.target} 
      className={clsx('flex items-center', linkClassName)}
    >
      {Icon && <Icon className="text-green-500 mr-2" />}
      {item.label}
    </Link>
  )
}

const AppMenu = () => {
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([])

  const menuItems = getAppMenuItems()

  const pathname = usePathname()

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '')
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL)

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key)
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)])
      }
    }
  }, [pathname, menuItems])

  useEffect(() => {
    activeMenu()
  }, [activeMenu, menuItems])

  return (
    <ul className="flex items-center space-x-4">
      {(menuItems ?? []).map((item, idx) => {
        return (
          <Fragment key={item.key + idx}>
            {item.children ? (
              <MenuItemWithChildren
                item={item}
                activeMenuItems={activeMenuItems}
                level={1}
                itemClassName="relative"
                linkClassName={clsx(
                  'px-3 py-2 hover:text-blue-600 transition-colors',
                  activeMenuItems.includes(item.key) && 'text-blue-600'
                )}
              />
            ) : (
              <MenuItem
                item={item}
                level={1}
                itemClassName="relative"
                linkClassName={clsx(
                  'px-3 py-2 hover:text-blue-600 transition-colors block',
                  activeMenuItems.includes(item.key) && 'text-blue-600'
                )}
              />
            )}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default AppMenu