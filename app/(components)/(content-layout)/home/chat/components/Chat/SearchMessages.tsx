"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { BiSearchAlt2 } from "react-icons/bi";
import { calculateTime } from "../../utils/CalculateTime";

function SearchMessages() {
  const activeChat = useChatStore((state) => state.activeChat);
  const messages = useChatStore((state) => state.messages);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<any[]>([]);
  const setShowSearchMessages = useChatStore(
    (state) => state.setShowSearchMessages
  );

  // 🔍 Arama filtreleme
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchedMessages([]);
      return;
    }

    const filtered = messages.filter((msg) =>
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedMessages(filtered);
  }, [searchTerm, messages]);

  return (
    <div className="border-colors-conversation-border border-l w-full bg-colors-conversation-border flex flex-col z-10 max-h-screen">
      {/* Header */}
      <div className="h-16 px-4 py-5 flex gap-10 items-center bg-white text-colors-primary-strong">
        <IoClose
          className="cursor-pointer text-black text-2xl"
          onClick={() => setShowSearchMessages(false)}
        />
        <span className="text-black">Search Messages</span>
      </div>

      {/* Search input */}
      <div className="overflow-auto h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-white flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
              <BiSearchAlt2 className="text-panel-header-icon text-gray-400 cursor-pointer text-lg" />
              <input
                type="text"
                placeholder="Search Messages"
                className="bg-transparent text-sm focus:outline-none text-black placeholder-black w-[200px] border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Arama başlamamışsa placeholder */}
          {!searchTerm.length && (
            <span className="mt-10 text-black">
              Search for messages with {activeChat?.username}
            </span>
          )}
        </div>

        {/* Sonuçlar */}
        <div className="flex flex-col h-full">
          {searchTerm.length > 0 && searchedMessages.length === 0 && (
            <span className="text-black w-full flex justify-center mt-10">
              No messages found
            </span>
          )}

          {searchedMessages.map((message) => (
            <div
              key={message.id}
              className="flex cursor-pointer flex-col justify-center hover:bg-gray-400 w-full px-5 border-b border-gray-500 py-5"
            >
              <div className="text-sm text-black">
                {calculateTime(message.createdAt)}
              </div>
              <div className="text-black">{message.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
