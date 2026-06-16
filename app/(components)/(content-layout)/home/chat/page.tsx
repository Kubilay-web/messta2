"use client";

import React, { useEffect, useState } from "react";
import ChatList from "./components/Chatlist/ChatList";
import Empty from "./components/Empty";
import Chat from "./components/Chat/Chat";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { useSession } from "@/app/SessionProvider";
import SearchMessages from "./components/Chat/SearchMessages";
import VideoCall from "./components/Call/VideoCall";
import VoiceCall from "./components/Call/VoiceCall";
import IncomingVideoCall from "./components/common/IncomingVideoCall";
import IncomingCall from "./components/common/IncomingCall";

export default function Page() {
  const activeChat = useChatStore((state) => state.activeChat);
  const setMessages = useChatStore((state) => state.setMessages);
  const messages = useChatStore((state) => state.messages);
  const connectSocket = useChatStore((state) => state.connectSocket);
  const disconnectSocket = useChatStore((state) => state.disconnectSocket);
  const endCall = useChatStore((state) => state.endCall);

  // ✅ state’leri store’dan çekelim
  const incomingVoiceCall = useChatStore((state) => state.incomingVoiceCall);
  const setIncomingVoiceCall = useChatStore(
    (state) => state.setIncomingVoiceCall
  );




  const incomingVideoCall = useChatStore((state) => state.incomingVideoCall);
  const setIncomingVideoCall = useChatStore(
    (state) => state.setIncomingVideoCall
  );

    console.log("incomingVideoCall",incomingVideoCall)

  const voiceCall = useChatStore((state) => state.voiceCall);
  const videoCall = useChatStore((state) => state.videoCall);
  const socket = useChatStore((state) => state.socket);

  const searchResults = useChatStore((state) => state.searchResults);
  const showSearchMessages = useChatStore((state) => state.showSearchMessages);

  const { user } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user.id) {
      connectSocket(user.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [user, connectSocket, disconnectSocket]);

  useEffect(() => {
    const getMessages = async () => {
      if (!activeChat || !user) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/messages/${user.id}/${activeChat.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data.messages);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [activeChat, user, setMessages]);

  // 🔔 Socket Events
  useEffect(() => {
    if (!socket) return;

    const handleIncomingVoice = (callData: any) => {
      console.log("📞 incoming voice:", callData);
      setIncomingVoiceCall(callData);
    };

    const handleIncomingVideo = (callData: any) => {
      console.log("🎥 incoming video:", callData);
      setIncomingVideoCall(callData);
    };


    const handleRejectedVoice = () => endCall();
    const handleRejectedVideo = () => endCall();
    const handleCanceledVoice = () => endCall();
    const handleCanceledVideo = () => endCall();
    const handleEndCall = () => endCall();

    socket.on("incoming-voice-call", handleIncomingVoice);
    socket.on("incoming-video-call", handleIncomingVideo);
    socket.on("voice-call-rejected", handleRejectedVoice);
    socket.on("video-call-rejected", handleRejectedVideo);
    socket.on("voice-call-canceled", handleCanceledVoice);
    socket.on("video-call-canceled", handleCanceledVideo);
    socket.on("call-ended", handleEndCall);

    return () => {
      socket.off("incoming-voice-call", handleIncomingVoice);
      socket.off("incoming-video-call", handleIncomingVideo);
      socket.off("voice-call-rejected", handleRejectedVoice);
      socket.off("video-call-rejected", handleRejectedVideo);
      socket.off("voice-call-canceled", handleCanceledVoice);
      socket.off("video-call-canceled", handleCanceledVideo);
      socket.off("call-ended", handleEndCall);
    };
  }, [socket, setIncomingVoiceCall, setIncomingVideoCall, endCall]);

  return (
    <>
    
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingCall />}

      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}

      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}

      {!videoCall && !voiceCall && (
        <div className="min-h-screen bg-white text-white dark:bg-gray-800 dark:text-white transition-colors">
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 overflow-auto">
              <ChatList />
            </div>
            <div className="flex-1 overflow-auto">
              {activeChat ? (
                <div
                  className={`grid ${
                    showSearchMessages ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  <Chat messages={messages} />
                  {showSearchMessages && <SearchMessages />}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
