// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import { Input } from "../../../../components/ui/input";
// import { MessageList } from "./message-list";
// import { MessageView } from "./message-view";
// import { ComposeMessage } from "./message-compose";

// // Sample data - in a real app, this would come from an API
// const initialMessages = [
//   {
//     id: "1",
//     sender: "Ms. Johnson",
//     senderEmail: "johnson../../../..school.edu",
//     subject: "Math Class Performance Update",
//     preview: "I wanted to discuss John's recent progress in mathematics...",
//     content: `I wanted to discuss John's recent progress in mathematics. He's shown remarkable improvement in algebra concepts over the past few weeks.

// His participation in class has increased significantly, and he's been helping other students understand complex problems.

// Would you be available for a brief meeting next week to discuss strategies to further support his mathematical development?`,
//     timestamp: new Date("2024-01-02T14:30:00"),
//     read: false,
//     labels: ["academic", "important"],
//     avatar: "/management/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "2",
//     sender: "Principal Williams",
//     senderEmail: "principal../../../..school.edu",
//     subject: "Upcoming Parent-Teacher Conference",
//     preview:
//       "This is a reminder about the upcoming parent-teacher conference scheduled for...",
//     content: `This is a reminder about the upcoming parent-teacher conference scheduled for next Thursday.

// We'll be discussing your child's academic progress, social development, and setting goals for the remainder of the academic year.

// Please confirm your attendance by responding to this message. If the scheduled time doesn't work for you, we can arrange an alternative.`,
//     timestamp: new Date("2024-01-02T11:00:00"),
//     read: true,
//     labels: ["administrative"],
//     avatar: "/management/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: "3",
//     sender: "Coach Thompson",
//     senderEmail: "thompson../../../..school.edu",
//     subject: "Basketball Team Practice Schedule",
//     preview:
//       "Here's the updated basketball practice schedule for the upcoming season...",
//     content: `Here's the updated basketball practice schedule for the upcoming season.

// Practices will be held every Tuesday and Thursday from 3:30 PM to 5:00 PM.

// Please ensure your child brings appropriate sports attire and a water bottle. We're looking forward to a great season!`,
//     timestamp: new Date("2024-01-01T15:45:00"),
//     read: true,
//     labels: ["sports", "schedule"],
//     avatar: "/management/placeholder.svg?height=40&width=40",
//   },
// ];

// export default function MessagesPage() {
//   const [messages, setMessages] = useState(initialMessages);
//   const [selectedMessageId, setSelectedMessageId] = useState(messages[0].id);
//   const [composeOpen, setComposeOpen] = useState(false);

//   const selectedMessage = messages.find((m) => m.id === selectedMessageId);

//   const handleArchive = (id: string) => {
//     setMessages(messages.filter((m) => m.id !== id));
//     if (selectedMessageId === id) {
//       setSelectedMessageId(messages[0].id);
//     }
//   };

//   const handleSendMessage = (message: {
//     recipient: string;
//     subject: string;
//     content: string;
//   }) => {
//     // In a real app, this would send the message to an API
//     console.log("Sending message:", message);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left sidebar */}
//       <div className="w-80 flex-none border-r bg-gray-50/40">
//         <div className="p-4 border-b">
//           <div className="relative">
//             <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
//             <Input className="pl-8" placeholder="Search messages..." />
//           </div>
//         </div>
//         <MessageList
//           messages={messages}
//           selectedId={selectedMessageId}
//           onSelect={setSelectedMessageId}
//           onArchive={handleArchive}
//           onComposeClick={() => setComposeOpen(true)}
//         />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         {selectedMessage && (
//           <MessageView
//             message={selectedMessage}
//             onSendReply={(content) => {
//               console.log("Sending reply:", content);
//               // Here you would typically send the reply to your API
//             }}
//             onArchive={() => handleArchive(selectedMessage.id)}
//           />
//         )}
//       </div>

//       <ComposeMessage
//         open={composeOpen}
//         onOpenChange={setComposeOpen}
//         onSend={handleSendMessage}
//       />
//     </div>
//   );
// }












"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { MessageList } from "./message-list";
import { MessageView } from "./message-view";
import { ComposeMessage } from "./message-compose";

const initialMessages = [
  {
    id: "1",
    sender: "Ms. Johnson",
    senderEmail: "johnson@school.edu",
    subject: "Math Class Performance Update",
    preview: "I wanted to discuss John's recent progress in mathematics...",
    content: `I wanted to discuss John's recent progress in mathematics...`,
    timestamp: new Date("2024-01-02T14:30:00"),
    read: false,
    labels: ["academic", "important"],
    avatar: "/management/placeholder.svg",
  },
  {
    id: "2",
    sender: "Principal Williams",
    senderEmail: "principal@school.edu",
    subject: "Upcoming Parent-Teacher Conference",
    preview:
      "This is a reminder about the upcoming parent-teacher conference...",
    content: `Reminder for parent-teacher conference...`,
    timestamp: new Date("2024-01-02T11:00:00"),
    read: true,
    labels: ["administrative"],
    avatar: "/management/placeholder.svg",
  },
  {
    id: "3",
    sender: "Coach Thompson",
    senderEmail: "thompson@school.edu",
    subject: "Basketball Team Practice Schedule",
    preview: "Here's the updated basketball practice schedule...",
    content: `Basketball practice schedule...`,
    timestamp: new Date("2024-01-01T15:45:00"),
    read: true,
    labels: ["sports", "schedule"],
    avatar: "/management/placeholder.svg",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessageId, setSelectedMessageId] = useState(messages[0].id);
  const [composeOpen, setComposeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedMessage = messages.find((m) => m.id === selectedMessageId);

  const handleArchive = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessageId === id && messages.length > 1) {
      setSelectedMessageId(messages[0].id);
    }
  };

  const handleSendMessage = (message: {
    recipient: string;
    subject: string;
    content: string;
  }) => {
    console.log("Sending message:", message);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-50 transform bg-gray-50/95 transition-transform sm:static sm:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:w-80 w-72 flex-none border-r`}
      >
        <div className="p-4 border-b flex items-center justify-between sm:hidden">
          <span className="font-semibold text-lg">Messages</span>
          <button onClick={() => setSidebarOpen(false)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 border-b hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input className="pl-8" placeholder="Search messages..." />
          </div>
        </div>
        <MessageList
          messages={messages}
          selectedId={selectedMessageId}
          onSelect={(id) => {
            setSelectedMessageId(id);
            setSidebarOpen(false); // close sidebar on mobile after selection
          }}
          onArchive={handleArchive}
          onComposeClick={() => {
            setComposeOpen(true);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="sm:hidden flex items-center p-2 border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-2 p-1"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-lg">Messages</span>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {selectedMessage ? (
            <MessageView
              message={selectedMessage}
              onSendReply={(content) => console.log("Sending reply:", content)}
              onArchive={() => handleArchive(selectedMessage.id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No message selected
            </div>
          )}
        </div>
      </div>

      <ComposeMessage
        open={composeOpen}
        onOpenChange={setComposeOpen}
        onSend={handleSendMessage}
      />
    </div>
  );
}
