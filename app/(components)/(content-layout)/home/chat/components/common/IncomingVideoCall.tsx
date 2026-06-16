import { useChatStore } from "@/app/chat-store/useChatSotre";
import React from "react";
import Image from "next/image";

function IncomingVideoCall() {
  const incomingVideoCall = useChatStore((state) => state.incomingVideoCall);
  const socket = useChatStore((state) => state.socket);
  const setVideoCall = useChatStore((state) => state.setVideoCall);
  const setIncomingVideoCall = useChatStore(
    (state) => state.setIncomingVideoCall
  );

  if (!incomingVideoCall) return null;

  const { avatarUrl, displayName, senderId } = incomingVideoCall;
  const safeAvatar = avatarUrl || "/default-avatar.png";

  const acceptCall = () => {
    setVideoCall({ ...incomingVideoCall, type: "in-coming" });

    socket?.emit("accept-incoming-call", { from: senderId }); // backend ile uyumlu
    setIncomingVideoCall(undefined);
  };


  const rejectCall = () => {
  // Backend'e video call reddedildiğini bildir
  socket?.emit("reject-video-call", { from: senderId });

  // Gelen çağrıyı frontend'de temizle
  setIncomingVideoCall(undefined);

  // Aramayı sonlandır (videoCall / voiceCall state'lerini temizler)
  useChatStore.getState().endCall();
};

  return (
    <div className="h-24 w-80 fixed bottom-8 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-colors-conversation-panel-background text-white drop-shadow-2xl border-colors-icon-green border-2">
      <div>
        <Image
          src={safeAvatar}
          alt={displayName || "Unknown"}
          height={70}
          width={70}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{displayName || "Unknown"}</div>
        <div className="text-xs">Incoming Video Call</div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
            onClick={rejectCall}
          >
            Reject
          </button>
          <button
            className="bg-blue-500 p-1 px-3 text-sm rounded-full"
            onClick={acceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
