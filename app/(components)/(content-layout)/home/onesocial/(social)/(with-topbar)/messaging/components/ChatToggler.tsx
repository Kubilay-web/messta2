'use client'
import { useChatContext } from '../../../../context/useChatContext'
import { FaSlidersH } from 'react-icons/fa'

const ChatToggler = () => {
  const { chatList } = useChatContext()
  
  return (
    <button
      onClick={chatList.toggle}
      type="button"
      className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors duration-200"
      aria-label="Toggle chat sidebar"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
        <FaSlidersH size={18} />
      </span>
      
      <span className="font-semibold text-gray-900 dark:text-white lg:hidden">
        Chats
      </span>
    </button>
  )
}

export default ChatToggler