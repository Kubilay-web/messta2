"use client";

import dynamic from "next/dynamic";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { useSession } from "@/app/SessionProvider";
import React, { useEffect } from "react";

const Container = dynamic(() => import("./Container"), { ssr: false });

function VoiceCall() {
  const { user } = useSession();
  const voiceCall = useChatStore((state) => state.voiceCall);
  const socket = useChatStore((state) => state.socket);
  const endCall = useChatStore((state) => state.endCall);

  useEffect(() => {
    if (!voiceCall || !socket) return;

    // ✅ Outgoing voice call
    if (voiceCall.type === "out-going") {
      console.log("📞 Outgoing voice call:", voiceCall);

      socket.emit("outgoing-voice-call", {
        to: voiceCall.id,
        from: {
          id: user.id,
          profilePicture: user.avatarUrl,
          name: user.displayName,
        },
        callType: "voice",
        roomId: voiceCall.roomId,
      });
    }

    // ✅ Event listenerlar
    const handleRejected = () => {
      console.log("❌ Voice call rejected");
      endCall();
    };

    const handleCanceled = () => {
      console.log("🚫 Voice call canceled");
      endCall();
    };

    const handleEnded = () => {
      console.log("🔚 Voice call ended");
      endCall();
    };

    socket.on("voice-call-rejected", handleRejected);
    socket.on("voice-call-canceled", handleCanceled);
    socket.on("call-ended", handleEnded);

    return () => {
      socket.off("voice-call-rejected", handleRejected);
      socket.off("voice-call-canceled", handleCanceled);
      socket.off("call-ended", handleEnded);
    };
  }, [voiceCall, socket, user, endCall]);

  if (!voiceCall) return null;

  return <Container data={voiceCall} />;
}

export default VoiceCall;
