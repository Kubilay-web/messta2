import Link from "next/link";
import { Plus, BellRing } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "../../../components/ui/sidebar";
import NotificationButton from "./notification-button";

export default function SidebarHeader({
  notifications,
  unreadNotifCount = 0,
}: {
  notifications: any[];
  unreadNotifCount?: number;
}) {
  return (
    <div className="flex h-16 items-center gap-3 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      {/* Hızlı erişim butonları */}
      <div className="flex items-center gap-2 flex-1">
        <Button asChild variant="outline" size="sm" className="h-8 text-xs">
          <Link href="/estate/dashboard/listings/new">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yeni İlan
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="h-8 text-xs hidden sm:flex">
          <Link href="/estate/dashboard/contracts/new">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yeni Sözleşme
          </Link>
        </Button>
      </div>

      {/* Bildirim rozeti (okunmamış ERP bildirimleri) */}
      <Button asChild variant="outline" size="icon" className="relative h-9 w-9">
        <Link href="/estate/dashboard/notifications" aria-label="Bildirimler">
          <BellRing className="h-5 w-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              {unreadNotifCount > 9 ? "9+" : unreadNotifCount}
            </span>
          )}
        </Link>
      </Button>

      <NotificationButton notifications={notifications} />

      <SidebarFooter className="p-0">
        <SidebarMenu>
          <SidebarMenuItem />
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
}
