import { create } from "zustand";
import { io, Socket } from "socket.io-client";

export interface Contact {
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
  userId?: string;

  
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  message: string;
  type: string;
  createdAt: string;
  messageStatus: string;
}

interface ChatStore {
  activeChat: any;
  setActiveChat: (chat: any) => void;

  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;

  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;

  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;

  searchResults: Contact[];
  searchContacts: (query: string) => void;
  clearContactSearch: () => void;

  showSearchMessages: boolean;
  setShowSearchMessages: (val: boolean) => void;

  socket: Socket | null;
  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;

  videoCall: any | undefined;
  voiceCall: any | undefined;
  incomingVoiceCall: any | undefined;
  incomingVideoCall: any | undefined;

  setVideoCall: (val: any | undefined) => void;
  setVoiceCall: (val: any | undefined) => void;
  setIncomingVoiceCall: (val: any | undefined) => void;
  setIncomingVideoCall: (val: any | undefined) => void;
  endCall: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  activeChat: null,
  setActiveChat: (chat) => set({ activeChat: chat }),

  messages: [],
  setMessages: (messages) => {
    set({ messages });
    // unread messages update
    const updatedContacts = get().contacts.map((contact) => {
      const unreadCount = messages.filter(
        (msg) =>
          msg.senderId === contact.userId &&
          msg.receiverId === get().activeChat?.id &&
          msg.messageStatus !== "read"
      ).length;
      return { ...contact, totalUnreadMessages: unreadCount };
    });
    set({ contacts: updatedContacts });
  },
  addMessage: (message) => {
    set((state) => {
      const newMessages = [...state.messages, message];
      const updatedContacts = state.contacts.map((contact) => {
        if (contact.userId === message.senderId) {
          return {
            ...contact,
            totalUnreadMessages: (contact.totalUnreadMessages || 0) + 1,
          };
        }
        return contact;
      });
      return { messages: newMessages, contacts: updatedContacts };
    });
  },

  contacts: [],
  setContacts: (contacts) =>
    set({
      contacts: contacts.map((c) => ({
        ...c,
        totalUnreadMessages: c.totalUnreadMessages || 0,
      })),
    }),

  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),

  searchResults: [],
  searchContacts: (query: string) => {
    if (!query) {
      set({ searchResults: [] });
      return;
    }
    const results = get().contacts.filter(
      (c) =>
        c.username?.toLowerCase().includes(query.toLowerCase()) ||
        c.displayName?.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchResults: results });
  },
  clearContactSearch: () => set({ searchResults: [] }),

  showSearchMessages: false,
  setShowSearchMessages: (val) => set({ showSearchMessages: val }),

  socket: null,
  connectSocket: (userId) => {
    if (get().socket) return;

    const socket = io("https://chat-backend-05d7.onrender.com", {
      transports: ["websocket", "polling"],
    });

    socket.emit("add-user", userId);

    socket.on("receive-message", (msg) => {
      const formattedMessage: ChatMessage = {
        id: crypto.randomUUID(),
        senderId: msg.from,
        receiverId: msg.to,
        message: msg.message,
        type: "text",
        createdAt: new Date().toISOString(),
        messageStatus: "sent",
      };
      get().addMessage(formattedMessage);
    });

    socket.on("user-online", (userId: string) => {
      set((state) => ({
        onlineUsers: [...new Set([...state.onlineUsers, userId])],
      }));
    });

    socket.on("user-offline", (userId: string) => {
      set((state) => ({
        onlineUsers: state.onlineUsers.filter((id) => id !== userId),
      }));
    });

    socket.on("receive-call", (callData) => {
      if (callData.type === "video") set({ incomingVideoCall: callData });
      else if (callData.type === "voice") set({ incomingVoiceCall: callData });
    });

    set({ socket });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  videoCall: undefined,
  voiceCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,

  setVideoCall: (val) => set({ videoCall: val }),
  setVoiceCall: (val) => set({ voiceCall: val }),
  setIncomingVoiceCall: (val) => set({ incomingVoiceCall: val }),
  setIncomingVideoCall: (val) => set({ incomingVideoCall: val }),
  endCall: () =>
    set({
      videoCall: undefined,
      voiceCall: undefined,
      incomingVoiceCall: undefined,
      incomingVideoCall: undefined,
    }),
}));
