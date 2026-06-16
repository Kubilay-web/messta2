import React from "react";
import { BsChatDots } from "react-icons/bs";

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
      {/* Modern sohbet ikonu */}
      <div className="p-6 rounded-full bg-blue-100 text-blue-600 mb-4">
        <BsChatDots size={60} />
      </div>

      {/* Başlık */}
      <h2 className="text-gray-800 text-xl font-semibold mb-2">
        No messages yet
      </h2>

      {/* Alt açıklama */}
      <p className="text-gray-500 text-center max-w-xs">
        Start a conversation by selecting a contact or sending a new message.
      </p>
    </div>
  );
}

export default Empty;
