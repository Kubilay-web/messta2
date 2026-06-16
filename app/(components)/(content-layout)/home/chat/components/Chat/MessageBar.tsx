"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useSession } from "@/app/SessionProvider";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import EmojiPicker from "emoji-picker-react";
import CaptureAudio from "../common/CaptureAudio";
import { FaFaceSmile, FaPaperPlane } from "react-icons/fa6";
import TextFormInput from "../../../onesocial/components/form/TextFormInput";
import Picker from "@emoji-mart/react";

function MessageBar() {
  const { user } = useSession();
  const activeChat = useChatStore((state) => state.activeChat);
  const socket = useChatStore((state) => state.socket);
  const addMessage = useChatStore((state) => state.addMessage);

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ yeni state
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(e.target as Node)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleEmojiModal = () => setShowEmojiPicker(!showEmojiPicker);

const handleEmojiClick = (emoji: any) => {
  setMessage((prev) => prev + emoji.native);
};

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const sendMessage = async () => {
    if (!message.trim() && !file) return;
    if (!activeChat) return;

    setLoading(true); // ✅ loading başlat
    try {
      const formData = new FormData();
      formData.append("from", user.id);
      formData.append("to", activeChat.id);
      formData.append("message", message);
      if (file) formData.append("file", file);

      formData.append(
        "type",
        [
          message.trim() ? "text" : null,
          file
            ? file.type.startsWith("video")
              ? "video"
              : file.type.startsWith("audio")
                ? "audio"
                : "image"
            : null,
        ]
          .filter(Boolean)
          .join(",")
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/messages/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        const newMsg = {
          id: crypto.randomUUID(),
          senderId: user.id,
          message: message || filePreview,
          type: [
            message.trim() ? "text" : null,
            file
              ? file.type.startsWith("video")
                ? "video"
                : file.type.startsWith("audio")
                  ? "audio"
                  : "image"
              : null,
          ]
            .filter(Boolean)
            .join(","),
          createdAt: new Date().toISOString(),
          messageStatus: "sent",
          fileUrl: file ? filePreview : null,
        };

        addMessage(newMsg);

        if (socket) {
          socket.emit("send-message", {
            from: user.id,
            to: activeChat.id,
            message: newMsg.message,
            type: newMsg.type,
          });
        }

        setMessage("");
        setFile(null);
        setFilePreview(null);
      } else {
        console.error("Failed to send message:", data.error || data.message);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false); // ✅ loading durdur
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {dragOver && (
        <div className="absolute inset-0 bg-white/30 flex justify-center items-center text-gray-700 font-bold text-lg z-50 rounded-t-lg">
          Drop your file here
        </div>
      )}

      {filePreview && (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {file?.type.startsWith("video") ? (
            <video src={filePreview} className="h-24 rounded" controls />
          ) : file?.type.startsWith("audio") ? (
            <audio src={filePreview} className="w-48" controls />
          ) : (
            <img src={filePreview} className="h-24 rounded" />
          )}
          <button
            onClick={() => {
              setFile(null);
              setFilePreview(null);
            }}
            className="text-red-500 font-bold"
          >
            X
          </button>
        </div>
      )}

      {/* <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3 relative">
          <BsEmojiSmile
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            id="emoji-open"
            onClick={handleEmojiModal}
          />
          {showEmojiPicker && (
            <div
              className="absolute bottom-24 left-0 z-40"
              ref={emojiPickerRef}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
          <label>
            <ImAttachment className="text-colors-panel-header-icon cursor-pointer text-2xl" />
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleFileChange(e.target.files[0])
              }
            />
          </label>
        </div>

        <CaptureAudio
          onAudioCapture={(audioFile) => {
            setFile(audioFile);
            setFilePreview(URL.createObjectURL(audioFile));
          }}
        />

        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="bg-colors-input-background text-sm focus:outline-none h-10 rounded-lg px-4 py-2 w-full border-none 
                     !text-white placeholder:text-white placeholder:opacity-100"
        />

        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white border-solid"></div>
        ) : (
          <MdSend
            onClick={sendMessage}
            className="text-colors-panel-header-icon cursor-pointer text-3xl"
          />
        )}
      </div> */}

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <input
              name="newMessage"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full text-black placeholder:text-gray-600 focus:outline-none"
            />
          </div>

          {/* Emoji Picker */}
          <div className="relative">
            <div
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              onClick={handleEmojiModal}
            >
              <FaFaceSmile size={20} />
            </div>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                  <Picker onEmojiSelect={handleEmojiClick} theme="light" />
              </div>
            )}

            {/* <label>
              <ImAttachment className="text-colors-panel-header-icon cursor-pointer text-2xl" />
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
            </label> */}
          </div>

          {/* Attachment Button */}
          <div className="relative">
            <label className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer transition-colors flex items-center justify-center">
              <ImAttachment size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
            </label>
          </div>
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-700 border-solid"></div>
          ) : (
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              onClick={sendMessage}
            >
              <FaPaperPlane size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
