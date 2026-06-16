"use client";

import dynamic from "next/dynamic";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { useSession } from "@/app/SessionProvider";
import React, { useEffect } from "react";

const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  const { user } = useSession();
  const videoCall = useChatStore((state) => state.videoCall);
  console.log("videoCall",videoCall)
  const socket = useChatStore((state) => state.socket);
  const endCall = useChatStore((state) => state.endCall);

  useEffect(() => {
    if (!videoCall || !socket) return;

    // ✅ Outgoing video call
    if (videoCall.type === "out-going") {
      console.log("🎥 Outgoing video call:", videoCall);

      socket.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: user.id,
          profilePicture: user.avatarUrl,
          name: user.displayName,
        },
        callType: "video",
        roomId: videoCall.roomId,
      });
    }

    // ✅ Event listenerlar
    const handleRejected = () => {
      console.log("❌ Video call rejected");
      endCall();
    };

    const handleCanceled = () => {
      console.log("🚫 Video call canceled");
      endCall();
    };

    const handleEnded = () => {
      console.log("🔚 Video call ended");
      endCall();
    };

    socket.on("video-call-rejected", handleRejected);
    socket.on("video-call-canceled", handleCanceled);
    socket.on("call-ended", handleEnded);

    return () => {
      socket.off("video-call-rejected", handleRejected);
      socket.off("video-call-canceled", handleCanceled);
      socket.off("call-ended", handleEnded);
    };
  }, [videoCall, socket, user, endCall]);

  if (!videoCall) return null;

  return <Container data={videoCall} />;
}

export default VideoCall;
