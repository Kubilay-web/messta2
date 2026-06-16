import { getAllUsers } from '../../helpers/data'
import { useFetchData } from '../../hooks/useFetchData'
import Link from 'next/link'
import useToggle from '../../hooks/useToggle'
import  {type ChatMessageType, type UserType } from '../../types/data'
import { addOrSubtractMinutesFromDate, timeSince } from '../../utils/date'

import { messages } from '../../assets/data/other'

import clsx from 'clsx'
import Image from 'next/image'
import SimpleBar from "simplebar-react"
import { FaCheck, FaCheckDouble, FaCircle, FaFaceSmile, FaPaperclip, FaXmark } from 'react-icons/fa6'
import {
  BsArchive,
  BsCameraVideo,
  BsChatSquare,
  BsChatSquareText,
  BsDashLg,
  BsFlag,
  BsTelephone,
  BsThreeDotsVertical,
  BsTrash,
  BsVolumeUp,
} from 'react-icons/bs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatContext } from '../../context/useChatContext'
import TextAreaFormInput from '../form/TextAreaFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import avatar10 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/10.jpg'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  return <div ref={elementRef} />
}

const UserMessage = ({ message, toUser }: { message: ChatMessageType; toUser: UserType }) => {
  const received = message.from.id === toUser.id
  return (
    <div className={clsx('flex mb-1', { 'justify-end text-right': received })}>
      <div className="flex-shrink-0 w-6 h-6 mr-2">
        {!received && (
          <div className="w-full h-full">
            <Image 
              className="rounded-full object-cover w-full h-full" 
              src={message.from.avatar} 
              alt="" 
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="w-full">
          <div className={clsx('flex flex-col', received ? 'items-end' : 'items-start')}>
            {message.image ? (
              <div className="bg-gray-100 text-gray-700 p-2 px-3 rounded-lg">
                <p className="text-sm mb-0">{message.message}</p>
                <div className="p-2 border-2 border-gray-200 rounded-md mt-2 shadow-none">
                  <Image width={87} height={91} src={message.image} alt="image" />
                </div>
              </div>
            ) : (
              <div className={clsx(
                'p-2 px-3 rounded-lg max-w-xs',
                received ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              )}>
                {message.message}
              </div>
            )}
            {message.isRead ? (
              <div className="flex my-2">
                <div className="text-sm text-gray-500">
                  {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                <div className="text-sm ml-2">
                  <FaCheckDouble className="text-blue-500" />
                </div>
              </div>
            ) : message.isSend ? (
              <div className="flex my-2">
                <div className="text-sm text-gray-500">
                  {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                <div className="text-sm ml-2">
                  <FaCheck />
                </div>
              </div>
            ) : (
              <div className="text-sm my-2 text-gray-500">
                {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UserCard = ({ user, openToast }: { user: UserType; openToast: () => void }) => {
  const { changeActiveChat } = useChatContext()
  return (
    <>
      <li
        onClick={() => {
          openToast()
          changeActiveChat(user.id)
        }}
        className="mt-3 flex items-center gap-3 relative cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
      >
        <div className={clsx(
          'relative',
          { 'avatar-story': user.isStory }
        )}>
          {user.avatar && (
            <div className="w-10 h-10 relative">
              <div className={clsx(
                'absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full',
                user.status === 'online' ? 'bg-green-500' :
                user.status === 'offline' ? 'bg-red-500' :
                'bg-yellow-500'
              )} />
              <Image 
                className="rounded-full object-cover w-full h-full" 
                src={user.avatar} 
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          )}
        </div>
        <div className="overflow-hidden flex-1">
          <div className="font-medium hover:text-blue-600 transition-colors">
            {user.name}
          </div>
          <div className="text-sm text-gray-500 truncate">{user.lastMessage}</div>
        </div>
        <div className="text-sm text-gray-500 whitespace-nowrap"> {timeSince(user.lastActivity)} </div>
      </li>
    </>
  )
}

const Messaging = () => {
  const { isTrue: isOpen, toggle, setTrue } = useToggle()
  const { activeChat } = useChatContext()
  const { isTrue: isOpenCollapseToast, toggle: toggleToastCollapse } = useToggle(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
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
        messages.filter((m) => (m.to.id === toUser.id && m.from.id === activeChat.id) || (toUser.id === m.from.id && m.to.id === activeChat.id)),
      )
    }
  }, [activeChat, toUser])

  useEffect(() => {
    getMessagesForUser()
  }, [activeChat])

  const sendChatMessage = (values: { newMessage?: string }) => {
    if (activeChat) {
      const newUserMessages = [...userMessages]
      newUserMessages.push({
        id: (userMessages.length + 1).toString(),
        from: toUser,
        to: activeChat,
        message: values.newMessage ?? '',
        sentOn: addOrSubtractMinutesFromDate(-0.1),
      })
      setTimeout(() => {
        const otherNewMessages = [...newUserMessages]
        otherNewMessages.push({
          id: (userMessages.length + 1).toString(),
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
  const allUserMessages = useFetchData<UserType[]>(getAllUsers)

  return (
    <>
      <ul className="space-y-2">
        {allUserMessages?.map((user, idx) => <UserCard user={user} key={idx} openToast={setTrue} />)}

        <li className="mt-3">
          <Link 
            className="block w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-center hover:bg-blue-100 transition-colors" 
            href="/messaging"
          >
            See all in messaging
          </Link>
        </li>
      </ul>
      
      <div className="relative">
        {isOpen && (
          <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className={clsx('flex-shrink-0 w-10 h-10 mr-3', { 'avatar-story': activeChat?.isStory })}>
                  {activeChat?.avatar && (
                    <div className="w-full h-full">
                      <Image 
                        className="rounded-full object-cover w-full h-full" 
                        src={activeChat.avatar} 
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h6 className="font-semibold mb-0">{activeChat?.name}</h6>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FaCircle className={clsx(
                      'mr-1',
                      activeChat?.status === 'offline' ? 'text-red-500' : 'text-green-500'
                    )} />
                    {activeChat?.status}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="relative">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsCameraVideo className="mr-2" />
                          Video call
                        </Link>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsTelephone className="mr-2" />
                          Audio call
                        </Link>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsTrash className="mr-2" />
                          Delete
                        </Link>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsChatSquareText className="mr-2" />
                          Mark as unread
                        </Link>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsVolumeUp className="mr-2" />
                          Muted
                        </Link>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsArchive className="mr-2" />
                          Archive
                        </Link>
                        <div className="border-t my-1"></div>
                        <Link 
                          href="#" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <BsFlag className="mr-2" />
                          Report
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  onClick={toggleToastCollapse}
                >
                  <BsDashLg />
                </button>
                <button 
                  onClick={toggle} 
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  <FaXmark />
                </button>
              </div>
            </div>
            
            {isOpenCollapseToast && (
              <div className="p-4">
                <SimpleBar className="h-64">
                  <div className="text-center text-sm text-gray-500 my-2">Jul 16, 2022, 06:15 am</div>
                  {userMessages.map((message) => (
                    <UserMessage message={message} key={message.id} toUser={toUser} />
                  ))}
                  <AlwaysScrollToBottom />
                </SimpleBar>
                <form onSubmit={handleSubmit(sendChatMessage)} className="mt-4">
                  <TextAreaFormInput
                    className="mb-3"
                    name="newMessage"
                    control={control}
                    rows={1}
                    placeholder="Type a message"
                    noValidate
                    containerClassName="w-full"
                  />
                  <div className="flex flex-wrap items-end gap-2 mt-2">
                    <button 
                      type="button" 
                      className="px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100 transition-colors"
                    >
                      <FaFaceSmile className="text-base" />
                    </button>
                    <button 
                      type="button" 
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors"
                    >
                      <FaPaperclip className="text-base" />
                    </button>
                    <button 
                      type="button" 
                      className="px-3 py-1.5 bg-green-50 text-green-600 text-sm rounded hover:bg-green-100 transition-colors"
                    >
                      Gif
                    </button>
                    <button 
                      type="submit" 
                      className="ml-auto px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Messaging