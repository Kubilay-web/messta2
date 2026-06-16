"use client";

import React from "react";
import Image from "next/image"; // Import Image from next/image
import {
  BsCameraVideoFill,
  BsTelephoneFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useChatStore } from "@/app/chat-store/useChatSotre"; // Ensure this path is correct
import { BiSearchAlt2 } from "react-icons/bi";

function ChatHeader() {
  const activeChat = useChatStore((state) => state.activeChat);
  const setVoiceCall = useChatStore((state) => state.setVoiceCall);
  const setVideoCall = useChatStore((state) => state.setVideoCall);


    const setShowSearchMessages = useChatStore(
    (state) => state.setShowSearchMessages
  );


  const handleVoiceCall = () => {
    if (!activeChat) return;
    setVoiceCall({
      ...activeChat,
      type: "out-going",
      callType: "voice",
      roomId: Date.now(),
    });
  };

  const handleVideoCall = () => {
    if (!activeChat) return;
    setVideoCall({
      ...activeChat,
      type: "out-going",
      callType: "video",
      roomId: Date.now(),
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={activeChat.avatarUrl} // Assuming avatarUrl is the correct property
                alt={activeChat.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                activeChat.status === "online"
                  ? "bg-green-500"
                  : activeChat.status === "offline"
                    ? "bg-gray-400"
                    : "bg-yellow-500"
              }`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {activeChat.username}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {activeChat.status}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Audio Call */}
          <button
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Audio call"
            onClick={handleVoiceCall} // Hook up the function here
          >
            <BsTelephoneFill size={18} />
          </button>

          {/* Video Call */}
          <button
            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Video call"
            onClick={handleVideoCall} // Hook up the function here
          >
            <BsCameraVideoFill size={18} />
          </button>

          <BiSearchAlt2
            className="text-blue-600 cursor-pointer text-xl"
            onClick={() => setShowSearchMessages(true)}
          />

          {/* Options Menu */}
          <div className="relative">
            <button
              className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              onClick={() => {
                // Add menu toggle logic here
              }}
            >
              <BsThreeDotsVertical size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
