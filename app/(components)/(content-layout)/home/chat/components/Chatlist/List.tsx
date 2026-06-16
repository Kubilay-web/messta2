"use client";

import { useSession } from "@/app/SessionProvider";
import React, { useEffect, useState } from "react";
import { useChatStore } from "@/app/chat-store/useChatSotre";
import ChatListItem from "./ChatLIstItem";
import ClipLoader from "react-spinners/ClipLoader";

interface Contact {
  messageId?: string;
  type?: string;
  message?: string;
  messageStatus?: string;
  createdAt?: string;
  senderId?: string;
  receiverId?: string;
  totalUnreadMessages: number;
  username?: string;
  displayName?: string;
  userId?: string; // onlineUsers kontrolü için
  id?: string; // API’den gelen id
}

function List() {
  const { user } = useSession();
  const from = user?.id;

  const contacts = useChatStore((state) => state.contacts);
  const searchResults = useChatStore((state) => state.searchResults);
  const setContacts = useChatStore((state) => state.setContacts);
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const setOnlineUsers = useChatStore((state) => state.setOnlineUsers);
  const socket = useChatStore((state) => state.socket);
  const connectSocket = useChatStore((state) => state.connectSocket);

  const [loading, setLoading] = useState(true);

  // Filtrelenmiş liste: searchResults varsa onu, yoksa tüm contacts göster
  const filteredContacts = searchResults.length > 0 ? searchResults : contacts;

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/initial-contacts/${from}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Fetch failed");

        // userId bilgisini ayarla (id alanını kullan)
        const usersWithId = data.users.map((u: any) => ({
          ...u,
          userId: u.id || u.userId,
        }));

        setContacts(usersWithId);

        // onlineUsers artık userId array’i olmalı
        setOnlineUsers(data.onlineUsers.map(String));
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    }

    if (from) fetchContacts();
  }, [from, setContacts, setOnlineUsers]);

  // Socket bağlantısı ve online kullanıcı güncellemesi
  useEffect(() => {
    if (!from) return;
    connectSocket(from);

    if (!socket) return;

    socket.on("update-online-users", (users: string[]) => {
      setOnlineUsers(users.map(String));
    });

    return () => {
      socket.off("update-online-users");
    };
  }, [from, connectSocket, socket, setOnlineUsers]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full mt-5">
        <ClipLoader size={40} color="#4fa94d" />
      </div>
    );

  return (
    <div className="bg-white flex-auto overflow-auto max-h-full p-4">
      {filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id || contact.userId} />
          ))
        : contacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id || contact.userId} />
          ))}
    </div>
  );
}

export default List;
