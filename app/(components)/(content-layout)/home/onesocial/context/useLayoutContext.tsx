'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type OffcanvasState = {
  open: boolean
  toggle: () => void
}

export type LayoutState = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  mobileMenu: OffcanvasState
  startOffcanvas: OffcanvasState
  messagingOffcanvas: OffcanvasState
}

const LayoutContext = createContext<LayoutState | undefined>(undefined)

export type ChildrenType = {
  children: ReactNode
}

const storageThemeKey = 'theme'

export const LayoutProvider = ({ children }: ChildrenType) => {
  // Tema state
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Mobile Menu
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenu: OffcanvasState = {
    open: mobileOpen,
    toggle: () => setMobileOpen((prev) => !prev),
  }

  // Start Offcanvas (Profil paneli)
  const [startOpen, setStartOpen] = useState(false)
  const startOffcanvas: OffcanvasState = {
    open: startOpen,
    toggle: () => setStartOpen((prev) => !prev),
  }

  // Messaging Offcanvas
  const [messagingOpen, setMessagingOpen] = useState(false)
  const messagingOffcanvas: OffcanvasState = {
    open: messagingOpen,
    toggle: () => setMessagingOpen((prev) => !prev),
  }

  // Tema ayarlarını client-side kontrol et
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageThemeKey) as 'light' | 'dark' | null

      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme)
      } else {
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        setTheme(preferredTheme)
      }
    }
  }, [])

  // Tema değişince localStorage güncelle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageThemeKey, theme)
    }
  }, [theme])

  return (
    <LayoutContext.Provider
      value={{ theme, setTheme, mobileMenu, startOffcanvas, messagingOffcanvas }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

// Hook ile kullanımı
export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
}
