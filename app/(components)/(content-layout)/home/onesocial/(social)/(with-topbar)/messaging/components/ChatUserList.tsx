'use client'
import { useChatContext } from '../../../../context/useChatContext'
import { getAllUsers } from '../../../../helpers/data'
import { useFetchData } from '../../../../hooks/useFetchData'
import useViewPort from '../../../../hooks/useViewPort'
import { useState, useEffect } from 'react'
import ChatUsers from './ChatUsers'

const ChatUserList = () => {
  const chats = useFetchData(getAllUsers)
  const { width } = useViewPort()
  const { chatList } = useChatContext()
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      chatList.toggle()
      setIsClosing(false)
    }, 300)
  }

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (width < 992 && chatList.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [chatList.open, width])

  // Desktop view
  if (width >= 992) {
    return (
      <div className="w-full">
        {chats && <ChatUsers chats={chats} />}
      </div>
    )
  }

  // Mobile sidebar
  return (
    <>
      {/* Backdrop */}
      {chatList.open && (
        <div 
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-50'
          }`}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        chatList.open 
          ? isClosing ? '-translate-x-full' : 'translate-x-0' 
          : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto">
          {chats && <ChatUsers chats={chats} />}
        </div>
      </div>
    </>
  )
}

export default ChatUserList