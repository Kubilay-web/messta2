import { Sidebar, SidebarContent } from "@/app/(components)/(content-layout)/home/youtube/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/app/(components)/(content-layout)/home/youtube/components/ui/separator";
import { PersonalSection } from "./personal-section";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-node" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};
