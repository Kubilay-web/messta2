import { useChatStore } from "@/app/chat-store/useChatSotre";
import React from "react";
import Image from "next/image";

function IncomingVoiceCall() {
  const incomingVoiceCall = useChatStore((state) => state.incomingVoiceCall);
  const socket = useChatStore((state) => state.socket);
  const setVoiceCall = useChatStore((state) => state.setVoiceCall);
  const setIncomingVoiceCall = useChatStore(
    (state) => state.setIncomingVoiceCall
  );

  if (!incomingVoiceCall) return null;

  const { avatarUrl, displayName, senderId } = incomingVoiceCall;
  const safeAvatar = avatarUrl || "/default-avatar.png";

  const acceptCall = () => {
    // Gelen çağrıyı aktif voice call olarak kaydet
    setVoiceCall({ ...incomingVoiceCall, type: "in-coming" });

    // Backend’e kabul bilgisini gönder
    socket?.emit("accept-incoming-call", { from: senderId });

    // Gelen çağrı popup’ını kapat
    setIncomingVoiceCall(undefined);
  };

  const rejectCall = () => {
    // Backend’e reddedildi bilgisini gönder
    socket?.emit("reject-voice-call", { from: senderId });

    // Gelen çağrı popup’ını kapat
    setIncomingVoiceCall(undefined);

    // Aktif call state’ini sıfırla
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
        <div className="text-xs">Incoming Voice Call</div>
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

export default IncomingVoiceCall;
