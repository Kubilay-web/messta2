import { FC } from "react";
import { validateRequest } from "@/app/auth";
import Logo from "@/app/projects/components/logo/logo";
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import {
  adminDashboardSidebarOptions,
  SellerDashboardSidebarOptions,
} from "@/app/constants/data";
import { Store } from "@prisma/client";
import SidebarNavSeller from "./nav-seller";
import StoreSwitcher from "./store-switcher";

interface SidebarProps {
  isAdmin?: boolean;
  stores?: Store[];
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin, stores }) => {
  const { user } = await validateRequest();

  return (
    <div className="flex h-screen w-[300px] flex-col border-r p-4">
      <Logo width="100%" height="180px" />
      <span className="mt-3"></span>
      {user && <UserInfo user={user} />}
      {!isAdmin && stores && <StoreSwitcher stores={stores} />}
      {isAdmin ? (
        <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
      ) : (
        <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions} />
      )}
    </div>
  );
};

export default Sidebar;
