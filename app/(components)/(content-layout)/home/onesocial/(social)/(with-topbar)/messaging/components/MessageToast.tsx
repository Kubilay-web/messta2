'use client'
import { useChatContext } from '../../../../context/useChatContext'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa'
import { FaFaceSmile, FaXmark } from 'react-icons/fa6'

const MessageToast = () => {
  const { chatToast } = useChatContext()
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState('')

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={chatToast.toggle}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="New message"
      >
        <BsPencilSquare size={24} className="mx-auto" />
      </button>

      {/* Toast/Modal */}
      {chatToast.open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={chatToast.toggle}
            aria-hidden="true"
          />

          {/* Toast Content */}
          <div className="absolute bottom-4 right-4 w-full max-w-md">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">New message</h3>
                <button
                  onClick={chatToast.toggle}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <FaXmark size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Recipient Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Type a name or multiple names"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Message Area */}
                <div className="mb-4 h-48 border border-gray-200 rounded-lg p-3 overflow-y-auto">
                  {/* Existing messages could go here */}
                  <p className="text-sm text-gray-500 italic">Start typing your message...</p>
                </div>

                {/* Message Input */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message"
                      rows={1}
                      spellCheck="false"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = 'auto'
                        target.style.height = target.scrollHeight + 'px'
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      aria-label="Add emoji"
                    >
                      <FaFaceSmile size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      aria-label="Attach file"
                    >
                      <FaPaperclip size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Handle send message
                        console.log('Sending:', { recipient, message })
                        setMessage('')
                        chatToast.toggle()
                      }}
                      className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                      disabled={!message.trim() || !recipient.trim()}
                    >
                      <FaPaperPlane size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageToast