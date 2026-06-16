"use client";
import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface CaptureAudioProps {
  onAudioCapture: (audioFile: File) => void;
}

function CaptureAudio({ onAudioCapture }: CaptureAudioProps) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunks.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const file = new File([blob], `audio_${Date.now()}.webm`, {
        type: "audio/webm",
      });
      onAudioCapture(file);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className={`p-2 rounded-full ${
        recording ? "bg-red-500" : "bg-blue-500"
      } text-white`}
    >
      {recording ? <FaStop /> : <FaMicrophone />}
    </button>
  );
}

export default CaptureAudio;
