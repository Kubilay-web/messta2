import { SidebarProvider } from "@/app/(components)/(content-layout)/home/youtube/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar/index";
import { HomeSidebar } from "../components/home-sidebar/index";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar/>
        <div className="flex min-h-screen pt-[4rem]">
          {/* <HomeSidebar/> */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
          </div>
      </div>
    </SidebarProvider>
  );
};


