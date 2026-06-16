'use client'
import { messages } from '../../../../assets/data/other'
import { useChatContext } from '../../../../context/useChatContext'
import { ChatMessageType, UserType } from '../../../../types/data'
import { addOrSubtractMinutesFromDate } from '../../../../utils/date'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArchive, BsCameraVideoFill, BsCheckLg, BsMicMute, BsPersonCheck, BsTelephoneFill, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { FaCircle, FaPaperclip, FaPaperPlane } from 'react-icons/fa'
import * as yup from 'yup'
import { FaCheck, FaCheckDouble, FaFaceSmile } from 'react-icons/fa6'
import TextFormInput from '../../../../components/form/TextFormInput'
import SimpleBar from "simplebar-react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import avatar10 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/10.jpg'
import { useLayoutContext } from '../../../../context/useLayoutContext'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' })
  })
  return <div ref={elementRef} />
}

const UserMessage = ({ message, toUser }: { message: ChatMessageType; toUser: UserType }) => {
  const received = message.from.id === toUser.id
  
  return (
    <div className={`flex mb-3 ${received ? 'justify-end text-right' : ''}`}>
      {!received && (
        <div className="flex-shrink-0 mr-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={message.from.avatar}
              alt=""
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        </div>
      )}
      
      <div className={`max-w-xs md:max-w-md ${received ? 'text-right' : ''}`}>
        <div className={`inline-block p-3 rounded-2xl ${
          received 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          {message.image ? (
            <div className="space-y-2">
              <p className="text-sm">{message.message}</p>
              <div className="p-2 border-2 border-gray-200 rounded-lg">
                <div className="relative w-20 h-20">
                  <Image
                    src={message.image}
                    alt="image"
                    fill
                    className="object-cover rounded"
                    sizes="80px"
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm">{message.message}</p>
          )}
        </div>
        
        <div className={`flex items-center mt-1 text-xs text-gray-500 ${received ? 'justify-end' : ''}`}>
          <span>
            {message.sentOn.toLocaleString('en-US', { 
              hour: 'numeric', 
              minute: 'numeric', 
              hour12: true 
            })}
          </span>
          
          {message.isRead ? (
            <FaCheckDouble className="ml-1 text-blue-500" size={12} />
          ) : message.isSend ? (
            <FaCheck className="ml-1 text-gray-400" size={12} />
          ) : null}
        </div>
      </div>
    </div>
  )
}




const ChatArea = () => {
  const { theme } = useLayoutContext()
  const { activeChat } = useChatContext()
  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message'),
  })

  const { reset, handleSubmit, control } = useForm({
    resolver: yupResolver(messageSchema),
  })

  const [toUser] = useState<UserType>({
    id: '108',
    lastActivity: addOrSubtractMinutesFromDate(0),
    lastMessage: 'Hey! Okay, thank you for letting me know. See you!',
    status: 'online',
    avatar: avatar10,
    mutualCount: 30,
    name: 'Judy Nguyen',
    role: 'web',
  })

  const getMessagesForUser = useCallback(() => {
    if (activeChat) {
      setUserMessages(
        messages.filter((m) => 
          (m.to.id === toUser.id && m.from.id === activeChat.id) || 
          (toUser.id === m.from.id && m.to.id === activeChat.id)
        ),
      )
    }
  }, [activeChat, toUser])

  useEffect(() => {
    getMessagesForUser()
  }, [activeChat, getMessagesForUser])

  const sendChatMessage = (values: { newMessage?: string }) => {
    if (activeChat && values.newMessage) {
      const newUserMessages = [...userMessages]
      newUserMessages.push({
        id: (userMessages.length + 1).toString(),
        from: toUser,
        to: activeChat,
        message: values.newMessage,
        sentOn: addOrSubtractMinutesFromDate(-0.1),
      })
      
      setTimeout(() => {
        const otherNewMessages = [...newUserMessages]
        otherNewMessages.push({
          id: (userMessages.length + 2).toString(),
          from: activeChat,
          to: toUser,
          message: values.newMessage ?? '',
          sentOn: addOrSubtractMinutesFromDate(0),
        })
        setUserMessages(otherNewMessages)
      }, 1000)
      
      setUserMessages(newUserMessages)
      reset()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    })
  }

  if (!activeChat) return null

  const { avatar, name, status } = activeChat
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              status === 'online' ? 'bg-green-500' : 
              status === 'offline' ? 'bg-gray-400' : 
              'bg-yellow-500'
            }`} />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500 capitalize">{status}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Audio Call */}
          <button
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Audio call"
          >
            <BsTelephoneFill size={18} />
          </button>
          
          {/* Video Call */}
          <button
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Video call"
          >
            <BsCameraVideoFill size={18} />
          </button>
          
          {/* Options Menu */}
          <div className="relative">
            <button
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              onClick={() => {/* Add menu toggle */}}
            >
              <BsThreeDotsVertical size={18} />
            </button>
            
            {/* Dropdown Menu would go here */}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <SimpleBar className="h-full p-4">
          <div className="text-center mb-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Jul 16, 2022, 06:15 am
            </span>
          </div>
          
          {userMessages.map((message) => (
            <UserMessage
              message={message}
              key={message.id}
              toUser={toUser}
            />
          ))}
          
          <AlwaysScrollToBottom />
        </SimpleBar>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit(sendChatMessage)} className="flex items-end space-x-2">
          <div className="flex-1">
            <TextFormInput
              name="newMessage"
              control={control}
              placeholder="Type a message..."
              containerClassName="w-full"
              noValidate
            />
          </div>
          
          {/* Emoji Picker */}
          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
            >
              <FaFaceSmile size={20} />
            </button>
            
            {emojiPickerOpen && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                <Picker
                  data={data}
                  theme={theme}
                  onEmojiSelect={(emoji: any) => {
                    // Handle emoji selection
                    console.log(emoji.native)
                    setEmojiPickerOpen(false)
                  }}
                  onClickOutside={() => setEmojiPickerOpen(false)}
                />
              </div>
            )}
          </div>
          
          {/* Attachment Button */}
          <button
            type="button"
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <FaPaperclip size={20} />
          </button>
          
          {/* Send Button */}
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatArea