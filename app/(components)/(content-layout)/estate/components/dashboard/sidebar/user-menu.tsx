"use client";
import { createUserLog } from "../../../actions/user-logs";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { SidebarMenuButton } from "../../../components/ui/sidebar";
import { useDeviceInfo } from "../../../hooks/useDeviceInfo";
import { getInitials } from "../../../lib/getInitials";
import { getCurrentTime } from "../../../lib/timeUtils";
import { useUserSession } from "../../../store/auth";
import useSchoolStore from "../../../store/school";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function UserMenu() {
  const { user: data, clearSession } = useUserSession();
  const user = {
    name: data?.name,
    email: data?.email,
    avatar: data?.image ?? "/avatars/shadcn.jpg",
  };
  const initials = getInitials(user.name);
  const router = useRouter();
  const { school } = useSchoolStore();
  const { getDeviceInfo } = useDeviceInfo();

  const { time } = getCurrentTime();
  async function handleLogout() {
    try {
      const deviceInfo = await getDeviceInfo();
      const name = user?.name ?? "";
      const activity = `User (${name}) Logged Out`;
      const schoolId = school?.id ?? "";
      const log = {
        name,
        activity,
        time: time,
        ipAddress: deviceInfo.ipAddress,
        device: deviceInfo.device,
        schoolId,
      };
      await createUserLog(log);
      await clearSession();
      toast.success("Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Try again");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="flex items-center space-x-2 w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
