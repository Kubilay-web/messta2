
import ChatArea from './components/ChatArea'
import ChatToggler from './components/ChatToggler'
import ChatUserList from './components/ChatUserList'
import MessageToast from './components/MessageToast'



const Messaging = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ChatToggler />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messaging</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chat with your connections</p>
            </div>
          </div>
          <MessageToast />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active chats
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                6
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Connect and chat with your friends in real-time
            </p>
          </div>
          <MessageToast />
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex h-[calc(100vh-200px)] min-h-[600px]">
            {/* Sidebar - Chat List */}
            <div className="hidden lg:block w-1/3 xl:w-1/4 border-r border-gray-200 dark:border-gray-700">
              <div className="h-full flex flex-col">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Conversations
                  </h2>
                </div>
                
                {/* Chat Users List */}
                <div className="flex-1 overflow-hidden">
                  <ChatUserList />
                </div>
              </div>
            </div>

            {/* Mobile Chat List (Hidden by default) */}
            <div className="lg:hidden fixed inset-0 z-40">
              {/* This will be toggled by ChatToggler */}
              <div className="absolute inset-y-0 left-0 w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-xl transform -translate-x-full">
                {/* Mobile sidebar content */}
                <ChatUserList />
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1">
              <div className="h-full">
                <ChatArea />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Messaging