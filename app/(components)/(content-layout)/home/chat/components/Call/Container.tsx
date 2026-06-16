"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineCallEnd } from "react-icons/md";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import { useSession } from "@/app/SessionProvider";

interface ContainerProps {
  data: any;
}

export default function Container({ data }: ContainerProps) {
  const { user } = useSession();
  const socket = useChatStore((state) => state.socket);
  const endCallStore = useChatStore((state) => state.endCall);

  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState<string>();
  const [zg, setZg] = useState<ZegoExpressEngine>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [publishStreamId, setPublishStreamId] = useState<string>();

  if (!data) return null;

  // Çağrı kabul durumu
  useEffect(() => {
    if (data.type === "out going") {
      const onAcceptCall = () => setCallAccepted(true);
      socket?.on("accept-call", onAcceptCall);
      return () => {
        socket?.off("accept-call", onAcceptCall);
      };
    } else {
      const timeout = setTimeout(() => setCallAccepted(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [data, socket]);

  // Token alma
  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/zego/token/${user.id}`
        );
        const json = await res.json();
        if (json.token) setToken(json.token);
        else console.error("Token alınamadı:", json);
      } catch (e) {
        console.error(e);
      }
    }
    fetchToken();
  }, [user.id]);

  // Zego başlatma
  useEffect(() => {
    if (!token) return;

    async function startCall() {
      const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      if (!appId || appId <= 0) {
        console.error("Geçersiz Zego AppID");
        return;
      }

      const engine = new ZegoExpressEngine(appId);
      setZg(engine);

      await engine.loginRoom(
        data.roomId.toString(),
        token,
        { userID: user.id.toString(), userName: user.displayName },
        { userUpdate: true }
      );

      // Local stream oluştur
      const local = await engine.createStream({
        camera: {
          audio: true,
          video: data.callType === "video",
        },
      });
      setLocalStream(local);

      // Local video render
      const localContainer = document.getElementById("local-video");
      if (localContainer) {
        localContainer.innerHTML = "";
        const localVideo = document.createElement("video");
        localVideo.id = "video-local-zego";
        localVideo.className = "h-28 w-32 rounded-md";
        localVideo.autoplay = true;
        localVideo.muted = true;
        localVideo.playsInline = true;
        localVideo.srcObject = local;
        localContainer.appendChild(localVideo);
      }

      // Yayın başlat
      const streamId = "stream-" + user.id + "-" + Date.now();
      setPublishStreamId(streamId);
      await engine.startPublishingStream(streamId, local);

      // Remote stream listener
      engine.on("roomStreamUpdate", async (roomId, updateType, streamList) => {
        const remoteContainer = document.getElementById("remote-video");
        if (!remoteContainer) return;

        if (updateType === "ADD" && streamList.length > 0) {
          for (const streamInfo of streamList) {
            if (streamInfo.streamID === streamId) continue; // Kendi yayını ekleme

            const remoteVideo = document.createElement("video");
            remoteVideo.id = `remote-video-${streamInfo.streamID}`;
            remoteVideo.autoplay = true;
            remoteVideo.playsInline = true;
            remoteVideo.className =
              "rounded-md max-w-full max-h-[70vh] object-cover";

            remoteContainer.appendChild(remoteVideo);

            try {
              const stream = await engine.startPlayingStream(
                streamInfo.streamID
              );
              remoteVideo.srcObject = stream;
            } catch (error) {
              console.error("Stream oynatma hatası:", error);
            }
          }
        }

        if (updateType === "DELETE" && streamList.length > 0) {
          for (const streamInfo of streamList) {
            await engine.stopPlayingStream(streamInfo.streamID);
            const videoElement = document.getElementById(
              `remote-video-${streamInfo.streamID}`
            );
            if (videoElement && videoElement.parentNode) {
              videoElement.parentNode.removeChild(videoElement);
            }
          }
          await engine.logoutRoom(data.roomId.toString());
          endCallStore();
        }
      });
    }

    startCall();

    return () => {
      if (zg && localStream && publishStreamId) {
        zg.destroyStream(localStream);
        zg.stopPublishingStream(publishStreamId);
        zg.logoutRoom(data.roomId.toString());
      }
    };
  }, [token, data, user, endCallStore]);

  // Çağrıyı bitirme
  const endCall = async () => {
    if (zg && localStream && publishStreamId) {
      zg.destroyStream(localStream);
      await zg.stopPublishingStream(publishStreamId);
      await zg.logoutRoom(data.roomId.toString());
    }

    const fromId = user.id || data.from || data.id;

    if (data.callType === "voice")
      socket?.emit("reject-voice-call", { from: fromId });
    else if (data.callType === "video")
      socket?.emit("reject-video-call", { from: fromId });

    endCallStore();
    setCallAccepted(false);
  };

  return (
    <div className="border-colors-conversation-border border-l w-full bg-colors-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white relative">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl">{data.displayName}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video"
            ? "On going call"
            : "Calling"}
        </span>
      </div>

      {(!callAccepted || data.callType === "voice") && (
        <div className="my-24">
          <Image
            src={data.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}

      {/* Remote video */}
      <div
        className="my-5 relative w-full h-[70vh] flex justify-center items-center bg-black"
        id="remote-video"
      ></div>

      {/* Local video */}
      <div
        className="absolute bottom-5 right-5 w-32 h-28 bg-black"
        id="local-video"
      ></div>

      <div className="my-8 flex justify-center w-full">
        <button
          onClick={endCall}
          className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full hover:bg-red-700 transition"
        >
          <MdOutlineCallEnd className="text-3xl text-white" />
        </button>
      </div>
    </div>
  );
}
