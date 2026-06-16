import { SidebarTrigger } from "@/app/(components)/(content-layout)/home/youtube/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

import { SearchInput } from "./search-input";
import { AuthButton } from "../../../../auth/ui/components/auth-button";


export const HomeNavbar = () => {
  return (
    <nav className="h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0">
          {/* <SidebarTrigger /> */}
          <Link href="/home/youtube/main">
            <div className="px-4 flex items-center gap-1">
              <Image src="/youtube/youtube-logo.svg" height={32} width={32} alt="logo" />
              <p className="text-xl font-semibold tracking-tight">NewTube</p>
            </div>
          </Link>
        </div>
        {/* search bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                <SearchInput/>
        </div>
        {/* <div className="flex-shrink-0 items-center flex gap-4">
              <AuthButton/>
        </div> */}
      </div>
    </nav>
  );
};
