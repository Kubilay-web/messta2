'use client'
import { usePathname } from 'next/navigation'
import { useMemo, type HTMLProps } from 'react'

import type { ChildrenType } from '../../../types/component'

const StyledHeader = ({ children, ...restProps }: ChildrenType & HTMLProps<HTMLHeadingElement>) => {
  const transparentPages = ['/event', '/events/details']

  const pathname = usePathname()

  const classes = useMemo(() => {
    if (transparentPages.includes(pathname)) {
      return {
        header: 'z-40 bg-transparent',
        nav: 'flex items-center justify-between py-4 px-4 lg:px-8 text-white',
      }
    }
    return {
      header: 'z-40 bg-white shadow-sm',
      nav: 'flex items-center justify-between py-4 px-4 lg:px-8',
    }
  }, [pathname])

  return (
    <header className={classes.header} {...restProps}>
      <nav className={classes.nav}>{children}</nav>
    </header>
  )
}

export default StyledHeader