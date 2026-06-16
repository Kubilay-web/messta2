import { createContext, use, useState, useEffect } from 'react'

import type { BootstrapVariantType, ChildrenType } from '../types/component'

type ShowNotificationType = {
  title?: string
  message: string
  variant?: BootstrapVariantType
  delay?: number
}

type ToastrProps = {
  show: boolean
  onClose?: () => void
} & ShowNotificationType

type NotificationContextType = {
  showNotification: ({ title, message, variant }: ShowNotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const variantToColor = (variant: BootstrapVariantType = 'light'): string => {
  switch(variant) {
    case 'success': return 'bg-green-500 text-white border-green-600'
    case 'danger': return 'bg-red-500 text-white border-red-600'
    case 'warning': return 'bg-yellow-500 text-white border-yellow-600'
    case 'info': return 'bg-blue-500 text-white border-blue-600'
    case 'primary': return 'bg-blue-600 text-white border-blue-700'
    case 'secondary': return 'bg-gray-500 text-white border-gray-600'
    case 'light': return 'bg-white text-gray-800 border-gray-300'
    case 'dark': return 'bg-gray-800 text-white border-gray-900'
    default: return 'bg-white text-gray-800 border-gray-300'
  }
}

function Toastr({ show, title, message, onClose, variant = 'light', delay = 2000 }: Readonly<ToastrProps>) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [show, delay, onClose])

  if (!isVisible) return null

  const colors = variantToColor(variant)

  return (
    <div className="fixed top-4 right-4 z-50 m-3">
      <div className={`min-w-64 max-w-md rounded-lg shadow-lg border ${colors} animate-slide-in`}>
        <div className="p-4">
          {title && (
            <div className="flex justify-between items-start mb-2">
              <strong className="font-semibold">{title}</strong>
              <button
                onClick={() => {
                  setIsVisible(false)
                  onClose?.()
                }}
                className="ml-2 text-current hover:opacity-70 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  )
}

export function useNotificationContext() {
  const context = use(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within an NotificationProvider')
  }
  return context
}

export function NotificationProvider({ children }: ChildrenType) {
  const defaultConfig = {
    show: false,
    message: '',
    title: '',
    delay: 2000,
  }

  const [config, setConfig] = useState<ToastrProps>(defaultConfig)
  const hideNotification = () => {
    setConfig({ show: false, message: '', title: '' })
  }

  const showNotification = ({ title, message, variant, delay = 2000 }: ShowNotificationType) => {
    setConfig({
      show: true,
      title,
      message,
      variant: variant ?? 'light',
      onClose: hideNotification,
      delay,
    })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <Toastr {...config} />
      {children}
    </NotificationContext.Provider>
  )
}