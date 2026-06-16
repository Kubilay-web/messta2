"use client";

import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { validateRequest } from "@/app/auth";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "@/app/SessionProvider";

interface ChatListHeaderProps {
  toggleContactList: () => void; // `toggleContactList` fonksiyonu void döner
}

function ChatListHeader({ toggleContactList }: ChatListHeaderProps) {
  const { user } = useSession();


  // Handle when the user clicks the "New Chat" icon
  const handleAllContactsPage = () => {
    toggleContactList(); // Toggle visibility of ContactList
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-white">
      <div className="cursor-pointer">
        <Avatar type="sm" image={user?.avatarUrl} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl text-black"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl text-black"
            title="Menu"
          />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
