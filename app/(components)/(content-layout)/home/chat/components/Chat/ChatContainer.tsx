"use client";

import { useChatStore } from "@/app/chat-store/useChatSotre";
import { useSession } from "@/app/SessionProvider";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { calculateTime } from "../../utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";

function ChatContainer() {
  const activeChat = useChatStore((state) => state.activeChat);
  const { user } = useSession();
  const messages = useChatStore((state) => state.messages) || [];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [messages]);

  // ✅ medya render fonksiyonu
  const renderMedia = (message: any) => {
    if (!message.message) return null;

    // video
    if (message.type.includes("video")) {
      return (
        <video
          src={message.message}
          className="rounded max-w-full md:max-w-[400px] max-h-60 mt-1"
          controls
        />
      );
    }

    // image
    if (message.type.includes("image")) {
      return (
        <img
          src={message.message}
          alt="chat-media"
          className="rounded max-w-full md:max-w-[400px] max-h-60 mt-1"
        />
      );
    }

    // audio
    if (message.type.includes("audio")) {
      return <audio src={message.message} className="mt-1 w-48" controls />;
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="h-[80vh] w-full relative flex-grow overflow-auto">
        <div className="mx-4 md:mx-10 my-6 relative bottom-0 z-40 left-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={50} color="#4fa94d" loading={loading} />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-black">
              No messages yet
            </div>
          ) : (
            <div className="flex w-full">
              <div className="flex flex-col justify-end w-full gap-2 overflow-auto">
                {messages.map((message) => {
                  const isOutgoing = message.senderId === user.id;
                  const types = message.type.split(",");

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isOutgoing ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 text-sm rounded-md flex flex-col items-end max-w-[75%] ${
                          isOutgoing
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {/* Text varsa */}
                        {types.includes("text") && (
                          <span className="break-words">{message.message}</span>
                        )}

                        {/* Media render */}
                        {renderMedia(message)}

                        {/* Meta info */}
                        {/* <div className="flex gap-1 items-end mt-1">
                          <span className="text-colors-bubble-meta text-[11px] pt-1 min-w-fit">
                            {calculateTime(message.createdAt)}
                          </span>
                          {isOutgoing && (
                            <MessageStatus
                              messageStatus={message.messageStatus}
                            />
                          )}
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
