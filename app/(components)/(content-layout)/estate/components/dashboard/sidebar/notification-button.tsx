"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { cn } from "../../../lib/utils";
import { RecentActivity } from "../../../types/types";
import { timeAgo } from "../../../lib/getPastTime";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export default function NotificationButton({
  notifications: initialNotifications,
}: {
  notifications: RecentActivity[];
}) {
  const [notifications, setNotifications] =
    useState<RecentActivity[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white text-black">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex gap-3 p-3 rounded-lg",
                notification.read ? "opacity-60" : ""
              )}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{notification.activity}</h3>
                <p className="text-sm text-gray-500">
                  {notification.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {timeAgo(notification.createdAt)}
                  </span>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
