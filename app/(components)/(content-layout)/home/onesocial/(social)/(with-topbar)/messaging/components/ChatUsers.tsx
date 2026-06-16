'use client'
import SimpleBar from "simplebar-react";
import { useChatContext } from "../../../../context/useChatContext";
import type { UserType } from "../../../../types/data";
import Image from 'next/image'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const ChatItem = ({ id, avatar, lastMessage, name, status, isStory }: UserType) => {
  const { changeActiveChat, activeChat } = useChatContext()
  const isActive = activeChat?.id === id

  return (
    <li onClick={() => changeActiveChat(id)} className="cursor-pointer">
      <div className={`
        flex items-start p-3 rounded-lg transition-all duration-200 hover:bg-gray-50
        ${isActive ? 'bg-blue-50 border border-blue-100' : 'hover:border hover:border-gray-200'}
      `}>
        {/* Avatar */}
        <div className="relative flex-shrink-0 mr-3">
          <div className={`
            relative w-10 h-10 rounded-full overflow-hidden
            ${isStory ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          `}>
            <Image
              src={avatar}
              alt={name || 'User'}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          
          {/* Online status indicator */}
          {status === 'online' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
          {status === 'offline' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h6 className="font-semibold text-gray-900 truncate">{name}</h6>
          </div>
          <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        </div>
      </div>
    </li>
  )
}

const ChatUsers = ({ chats }: { chats: UserType[] }) => {
  const [users, setUsers] = useState<UserType[]>([...chats])
  const [searchQuery, setSearchQuery] = useState('')

  const search = (text: string) => {
    setSearchQuery(text)
    if (text) {
      const filtered = chats.filter((user) => 
        user.name?.toLowerCase().includes(text.toLowerCase())
      )
      setUsers(filtered)
    } else {
      setUsers([...chats])
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
            placeholder="Search for chats..."
            className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-label="Search chats"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <BsSearch className="text-gray-400" />
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setUsers([...chats])
              }}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-hidden">
        <SimpleBar className="h-full">
          <div className="py-2">
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Recent Chats
              </h3>
            </div>
            
            <ul className="space-y-1 px-2">
              {users.slice(0, 5).map((chat, idx) => (
                <ChatItem {...chat} key={idx} />
              ))}
            </ul>

            {/* No results message */}
            {users.length === 0 && (
              <div className="px-4 py-8 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">No chats found</p>
                <p className="text-sm text-gray-400 mt-1">Try different search terms</p>
              </div>
            )}

            {/* Show count */}
            {users.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing {users.length} of {chats.length} chats
                </p>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default ChatUsers